import { htmlMain } from "./../../html/htmlMain";
import { retrieveTopFill } from "../retrieveFill";
import { calculateContrastRatio, deepFlatten } from "./commonUI";
export const retrieveGenericUIText = (sceneNode, framework) => {
    const selectedText = deepFlatten(sceneNode);
    const textStr = [];
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
            if ((fill === null || fill === void 0 ? void 0 : fill.type) === "SOLID") {
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
    const unique = {};
    const distinct = [];
    textStr.forEach(function (x) {
        if (!unique[x.code + x.name]) {
            distinct.push(x);
            unique[x.code + x.name] = true;
        }
    });
    return distinct;
};
