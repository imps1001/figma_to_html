import { htmlShadow } from "./builderImpl/htmlShadow";
import { htmlVisibility, htmlRotation, htmlOpacity, } from "./builderImpl/htmlBlend";
import { htmlPosition } from "./builderImpl/htmlPosition";
import { htmlColorFromFills, htmlGradientFromFills, } from "./builderImpl/htmlColor";
import { htmlPadding } from "./builderImpl/htmlPadding";
import { formatWithJSX } from "../common/parseJSX";
import { parentCoordinates } from "../common/parentCoordinates";
import { htmlSize, htmlSizePartial } from "./builderImpl/htmlSize";
import { htmlBorderRadius } from "./builderImpl/htmlBorderRadius";
export class HtmlDefaultBuilder {
    constructor(node, showLayerName, optIsJSX) {
        this.name = "";
        this.hasFixedSize = false;
        this.retrieveFill = (paintArray) => {
            // visible is true or undefinied (tests)
            if (this.visible !== false) {
                const gradient = htmlGradientFromFills(paintArray);
                if (gradient) {
                    return { prop: gradient, kind: "gradient" };
                }
                else {
                    const color = htmlColorFromFills(paintArray);
                    if (color) {
                        return { prop: color, kind: "solid" };
                    }
                }
            }
            return { prop: "", kind: "none" };
        };
        this.isJSX = optIsJSX;
        this.style = "";
        this.visible = node.visible;
        if (showLayerName) {
            this.name = node.name.replace(" ", "");
        }
    }
    blend(node) {
        this.style += htmlVisibility(node, this.isJSX);
        this.style += htmlRotation(node, this.isJSX);
        this.style += htmlOpacity(node, this.isJSX);
        return this;
    }
    border(node) {
        // add border-radius: 10, for example.
        this.style += htmlBorderRadius(node, this.isJSX);
        // add border: 10px solid, for example.
        if (node.strokes && node.strokes.length > 0 && node.strokeWeight > 0) {
            const fill = this.retrieveFill(node.strokes);
            const weight = node.strokeWeight;
            if (node.dashPattern.length > 0) {
                this.style += formatWithJSX("border-style", this.isJSX, "dotted");
            }
            else {
                this.style += formatWithJSX("border-style", this.isJSX, "solid");
            }
            this.style += formatWithJSX("border-width", this.isJSX, weight);
            this.style += formatWithJSX("border-style", this.isJSX, "solid");
            if (fill.kind === "gradient") {
                // Gradient requires these.
                this.style += formatWithJSX("border-image-slice", this.isJSX, 1);
                this.style += formatWithJSX("border-image-source", this.isJSX, fill.prop);
            }
            else {
                this.style += formatWithJSX("border-color", this.isJSX, fill.prop);
            }
        }
        return this;
    }
    position(node, parentId, isRelative = false) {
        const position = htmlPosition(node, parentId);
        if (position === "absoluteManualLayout" && node.parent) {
            // tailwind can't deal with absolute layouts.
            const [parentX, parentY] = parentCoordinates(node.parent);
            const left = node.x - parentX;
            const top = node.y - parentY;
            this.style += formatWithJSX("left", this.isJSX, left);
            this.style += formatWithJSX("top", this.isJSX, top);
            if (isRelative === false) {
                this.style += formatWithJSX("position", this.isJSX, "absolute");
            }
        }
        else {
            this.style += position;
        }
        return this;
    }
    customColor(paintArray, property) {
        const fill = this.retrieveFill(paintArray);
        if (fill.kind === "solid") {
            // When text, solid must be outputted as 'color'.
            const prop = property === "text" ? "color" : property;
            this.style += formatWithJSX(prop, this.isJSX, fill.prop);
        }
        else if (fill.kind === "gradient") {
            if (property === "background-color") {
                this.style += formatWithJSX("background-image", this.isJSX, fill.prop);
            }
            else if (property === "text") {
                this.style += formatWithJSX("background", this.isJSX, fill.prop);
                this.style += formatWithJSX("-webkit-background-clip", this.isJSX, "text");
                this.style += formatWithJSX("-webkit-text-fill-color", this.isJSX, "transparent");
            }
        }
        return this;
    }
    shadow(node) {
        const shadow = htmlShadow(node);
        if (shadow) {
            this.style += formatWithJSX("box-shadow", this.isJSX, htmlShadow(node));
        }
        return this;
    }
    // must be called before Position, because of the hasFixedSize attribute.
    widthHeight(node) {
        // if current element is relative (therefore, children are absolute)
        // or current element is one of the absoltue children and has a width or height > w/h-64
        if ("isRelative" in node && node.isRelative === true) {
            this.style += htmlSize(node, this.isJSX);
        }
        else {
            const partial = htmlSizePartial(node, this.isJSX);
            this.hasFixedSize = partial[0] !== "" && partial[1] !== "";
            this.style += partial.join("");
        }
        return this;
    }
    autoLayoutPadding(node) {
        this.style += htmlPadding(node, this.isJSX);
        return this;
    }
    removeTrailingSpace() {
        if (this.style.length > 0 && this.style.slice(-1) === " ") {
            this.style = this.style.slice(0, -1);
        }
        return this;
    }
    build(additionalStyle = "") {
        this.style += additionalStyle;
        this.removeTrailingSpace();
        if (this.style) {
            if (this.isJSX) {
                this.style = ` style={{${this.style}}}`;
            }
            else {
                this.style = ` style="${this.style}"`;
            }
        }
        if (this.name.length > 0) {
            const classOrClassName = this.isJSX ? "className" : "class";
            return ` ${classOrClassName}="${this.name}"${this.style}`;
        }
        else {
            return this.style;
        }
    }
}
