import { formatWithJSX } from "./../../common/parseJSX";
import { commonPadding } from "../../common/commonPadding";
export const htmlPadding = (node, isJsx) => {
    const padding = commonPadding(node);
    if (padding === null) {
        return "";
    }
    if ("all" in padding) {
        return formatWithJSX("padding", isJsx, padding.all);
    }
    let comp = "";
    // horizontal and vertical, as the default AutoLayout
    if (padding.horizontal) {
        comp += formatWithJSX("padding-left", isJsx, padding.horizontal);
        comp += formatWithJSX("padding-right", isJsx, padding.horizontal);
    }
    if (padding.vertical) {
        comp += formatWithJSX("padding-top", isJsx, padding.vertical);
        comp += formatWithJSX("padding-bottom", isJsx, padding.vertical);
    }
    if (padding.top) {
        comp += formatWithJSX("padding-top", isJsx, padding.top);
    }
    if (padding.bottom) {
        comp += formatWithJSX("padding-bottom", isJsx, padding.bottom);
    }
    if (padding.left) {
        comp += formatWithJSX("padding-left", isJsx, padding.left);
    }
    if (padding.right) {
        comp += formatWithJSX("padding-right", isJsx, padding.right);
    }
    // todo use REM
    return comp;
};
