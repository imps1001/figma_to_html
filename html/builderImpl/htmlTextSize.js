import { htmlSizePartial } from "./htmlSize";
export const htmlTextSize = (node, isJsx) => {
    const [width, height] = htmlSizePartial(node, isJsx);
    let comp = "";
    if (node.textAutoResize !== "WIDTH_AND_HEIGHT") {
        comp += width;
    }
    if (node.textAutoResize === "NONE") {
        comp += height;
    }
    return comp;
};
