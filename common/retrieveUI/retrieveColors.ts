import { htmlColor, htmlGradient } from "./../../html/builderImpl/htmlColor";
import { AltSceneNode } from "../../altNodes/altMixins";
import { rgbTo6hex } from "../../common/color";
import { notEmpty } from "../../altNodes/altConversion";
import {
  calculateContrastRatio,
  deepFlatten,
  exportFramework,
} from "./commonUI";


type exportSolidColor = {
  hex: string;
  colorName: string;
  exported: string;
  contrastWhite: number;
  contrastBlack: number;
};

export const retrieveGenericSolidUIColors = (
  sceneNode: Array<AltSceneNode>,
  framework: exportFramework
): Array<exportSolidColor> => {
  const selectedChildren = deepFlatten(sceneNode);

  const colorStr: Array<exportSolidColor> = [];

  // collect all fills and strokes SOLID colors
  selectedChildren.forEach((d) => {
    if ("fills" in d) {
      const fills = convertSolidColor(d.fills, framework, d.type);
      if (fills) {
        colorStr.push(...fills);
      }
    }
    if ("strokes" in d) {
      const strokes = convertSolidColor(d.strokes, framework, d.type);
      if (strokes) {
        colorStr.push(...strokes);
      }
    }
  });

  const unique: Record<string, boolean> = {};
  const distinct: Array<exportSolidColor> = [];
  colorStr.forEach(function (x) {
    if (!unique[x.hex]) {
      distinct.push(x);
      unique[x.hex] = true;
    }
  });

  return distinct.sort((a, b) => a.hex.localeCompare(b.hex));
};

const convertSolidColor = (
  fills: ReadonlyArray<Paint> | PluginAPI["mixed"],
  framework: exportFramework,
  nodeType: string
): Array<exportSolidColor> | null => {
  // shortcut to be used for calculateContrastRatio.
  const black = {
    r: 0,
    g: 0,
    b: 0,
  };

  const white = {
    r: 1,
    g: 1,
    b: 1,
  };

  if (fills && fills !== figma.mixed && fills.length > 0) {
    return fills
      .map((fill) => {
        if (fill.type === "SOLID") {
          let exported = "";
          const opacity = fill.opacity ?? 1.0;

          exported = htmlColor(fill.color, opacity);

          return {
            hex: rgbTo6hex(fill.color),
            colorName: "",
            exported: exported,
            contrastBlack: 0,
            contrastWhite: 0,
          };
        }
      })
      .filter(notEmpty);
  }

  return null;
};

type exportLinearGradient = {
  css: string;
  exported: string;
};

export const retrieveGenericLinearGradients = (
  sceneNode: Array<AltSceneNode>,
  framework: exportFramework
): Array<exportLinearGradient> => {
  const selectedChildren = deepFlatten(sceneNode);

  const colorStr: Array<exportLinearGradient> = [];

  // collect all Linear Gradient colors from fills and strokes
  selectedChildren.forEach((d) => {
    if ("fills" in d) {
      const fills = convertGradient(d.fills, framework);
      if (fills) {
        colorStr.push(...fills);
      }
    }
    if ("strokes" in d) {
      const strokes = convertGradient(d.strokes, framework);
      if (strokes) {
        colorStr.push(...strokes);
      }
    }
  });

  // from https://stackoverflow.com/a/18923480/4418073
  const unique: Record<string, boolean> = {};
  const distinct: Array<exportLinearGradient> = [];
  colorStr.forEach(function (x) {
    if (!unique[x.css]) {
      distinct.push(x);
      unique[x.css] = true;
    }
  });

  return distinct;
};

const convertGradient = (
  fills: ReadonlyArray<Paint> | PluginAPI["mixed"],
  framework: exportFramework
): Array<exportLinearGradient> | null => {
  // kind can be text, bg, border...
  // [when testing] fills can be undefined

  if (fills && fills !== figma.mixed && fills.length > 0) {
    return fills
      .map((fill) => {
        if (fill.type === "GRADIENT_LINEAR") {
          let exported = htmlGradient(fill);
          return {
            css: htmlGradient(fill),
            exported: exported,
          };
        }
      })
      .filter(notEmpty);
  }

  return null;
};