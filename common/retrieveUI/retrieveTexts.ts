import { htmlBuilder, htmlMain } from "./../../html/htmlMain";
import { AltSceneNode } from "../../altNodes/altMixins";
import { retrieveTopFill } from "../retrieveFill";
import { calculateContrastRatio, deepFlatten } from "./commonUI";

type exportFramework =  "html";

export const retrieveGenericUIText = (
  sceneNode: Array<AltSceneNode>,
  framework: exportFramework
): Array<namedText> => {
  const selectedText = deepFlatten(sceneNode);
  const textStr: Array<namedText> = [];
  selectedText.forEach((node) => {
    if (node.type === "TEXT") {
        code = htmlMain([node]);
      const black = {
        r: 0,
        g: 0,
        b: 0,
      };

      let contrastBlack = 21;

      const fill = retrieveTopFill(node.fills);

      if (fill?.type === "SOLID") {
        contrastBlack = calculateContrastRatio(fill.color, black);
      }

      textStr.push({
        name: node.name,
        style: style,
        code: code,
        contrastBlack: contrastBlack,
      });
    }
  });

  const unique: Record<string, boolean> = {};
  const distinct: Array<namedText> = [];
  textStr.forEach(function (x) {
    if (!unique[x.code + x.name]) {
      distinct.push(x);
      unique[x.code + x.name] = true;
    }
  });

  return distinct;
};

type namedText = {
  name: string;
  code: string;
  style: string;
  contrastBlack: number;
};