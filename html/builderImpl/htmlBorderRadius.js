import { formatWithJSX } from "../../common/parseJSX";
export const htmlBorderRadius = (node, isJsx) => {
    if (node.type === "ELLIPSE") {
        return formatWithJSX("border-radius", isJsx, 9999);
    }
    else if ((!("cornerRadius" in node) && !("topLeftRadius" in node)) ||
        (node.cornerRadius === figma.mixed && node.topLeftRadius === undefined) ||
        node.cornerRadius === 0) {
        return "";
    }
    let comp = "";
    if (node.cornerRadius !== figma.mixed) {
        comp += formatWithJSX("border-radius", isJsx, node.cornerRadius);
    }
    else {
        if (node.topLeftRadius !== 0) {
            comp += formatWithJSX("border-top-left-radius", isJsx, node.topLeftRadius);
        }
        if (node.topRightRadius !== 0) {
            comp += formatWithJSX("border-top-right-radius", isJsx, node.topRightRadius);
        }
        if (node.bottomLeftRadius !== 0) {
            comp += formatWithJSX("border-bottom-left-radius", isJsx, node.bottomLeftRadius);
        }
        if (node.bottomRightRadius !== 0) {
            comp += formatWithJSX("border-bottom-right-radius", isJsx, node.bottomRightRadius);
        }
    }
    return comp;
};
