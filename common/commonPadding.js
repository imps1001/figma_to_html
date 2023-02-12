export const commonPadding = (node) => {
    var _a, _b, _c, _d;
    if ("layoutMode" in node && node.layoutMode !== "NONE") {
        // round the numbers to avoid 5 being different than 5.00001
        // fix it if undefined (in tests)
        node.paddingLeft = Math.round((_a = node.paddingLeft) !== null && _a !== void 0 ? _a : 0);
        node.paddingRight = Math.round((_b = node.paddingRight) !== null && _b !== void 0 ? _b : 0);
        node.paddingTop = Math.round((_c = node.paddingTop) !== null && _c !== void 0 ? _c : 0);
        node.paddingBottom = Math.round((_d = node.paddingBottom) !== null && _d !== void 0 ? _d : 0);
        const arr = {
            horizontal: 0,
            vertical: 0,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
        if (node.paddingLeft > 0 &&
            node.paddingLeft === node.paddingRight &&
            node.paddingLeft === node.paddingBottom &&
            node.paddingTop === node.paddingBottom) {
            return { all: node.paddingLeft };
        }
        else if (node.paddingLeft > 0 && node.paddingLeft === node.paddingRight) {
            // horizontal padding + vertical + individual paddings
            arr.horizontal = node.paddingLeft;
            if (node.paddingTop > 0 && node.paddingTop === node.paddingBottom) {
                arr.vertical = node.paddingTop;
            }
            else {
                if (node.paddingTop > 0) {
                    arr.top = node.paddingTop;
                }
                if (node.paddingBottom > 0) {
                    arr.bottom = node.paddingBottom;
                }
            }
        }
        else if (node.paddingTop > 0 && node.paddingTop === node.paddingBottom) {
            // vertical padding + individual paddings
            arr.vertical = node.paddingBottom;
            if (node.paddingLeft > 0) {
                arr.left = node.paddingLeft;
            }
            if (node.paddingRight > 0) {
                arr.right = node.paddingRight;
            }
        }
        else {
            // individual paddings
            if (node.paddingLeft > 0) {
                arr.left = node.paddingLeft;
            }
            if (node.paddingRight > 0) {
                arr.right = node.paddingRight;
            }
            if (node.paddingTop > 0) {
                arr.top = node.paddingTop;
            }
            if (node.paddingBottom > 0) {
                arr.bottom = node.paddingBottom;
            }
        }
        return arr;
    }
    return null;
};
