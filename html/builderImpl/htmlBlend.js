import { numToAutoFixed } from "../../common/numToAutoFixed";
import { formatWithJSX } from "../../common/parseJSX";
export const htmlOpacity = (node, isJsx) => {
    // [when testing] node.opacity can be undefined
    if (node.opacity !== undefined && node.opacity !== 1) {
        // formatWithJSX is not called here because opacity unit doesn't end in px.
        if (isJsx) {
            return `opacity: ${numToAutoFixed(node.opacity)}, `;
        }
        else {
            return `opacity: ${numToAutoFixed(node.opacity)}; `;
        }
    }
    return "";
};
export const htmlVisibility = (node, isJsx) => {
    if (node.visible !== undefined && !node.visible) {
        return formatWithJSX("visibility", isJsx, "hidden");
    }
    return "";
};
export const htmlRotation = (node, isJsx) => {
    // that's how you convert angles to clockwise radians: angle * -pi/180
    // using 3.14159 as Pi for enough precision and to avoid importing math lib.
    if (node.rotation !== undefined && Math.round(node.rotation) !== 0) {
        return formatWithJSX("transform", isJsx, `rotate(${numToAutoFixed(node.rotation)}deg)`);
    }
    return "";
};
