import { htmlColor, htmlGradient } from "./../../html/builderImpl/htmlColor";
import { rgbTo6hex } from "../../common/color";
import { notEmpty } from "../../altNodes/altConversion";
import { deepFlatten, } from "./commonUI";
export const retrieveGenericSolidUIColors = (sceneNode, framework) => {
    const selectedChildren = deepFlatten(sceneNode);
    const colorStr = [];
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
    const unique = {};
    const distinct = [];
    colorStr.forEach(function (x) {
        if (!unique[x.hex]) {
            distinct.push(x);
            unique[x.hex] = true;
        }
    });
    return distinct.sort((a, b) => a.hex.localeCompare(b.hex));
};
const convertSolidColor = (fills, framework, nodeType) => {
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
            var _a;
            if (fill.type === "SOLID") {
                let exported = "";
                const opacity = (_a = fill.opacity) !== null && _a !== void 0 ? _a : 1.0;
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
export const retrieveGenericLinearGradients = (sceneNode, framework) => {
    const selectedChildren = deepFlatten(sceneNode);
    const colorStr = [];
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
    const unique = {};
    const distinct = [];
    colorStr.forEach(function (x) {
        if (!unique[x.css]) {
            distinct.push(x);
            unique[x.css] = true;
        }
    });
    return distinct;
};
const convertGradient = (fills, framework) => {
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
