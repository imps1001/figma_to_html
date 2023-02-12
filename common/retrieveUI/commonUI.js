export const calculateContrastRatio = (color1, color2) => {
    const color1luminance = luminance(color1);
    const color2luminance = luminance(color2);
    const contrast = color1luminance > color2luminance
        ? (color2luminance + 0.05) / (color1luminance + 0.05)
        : (color1luminance + 0.05) / (color2luminance + 0.05);
    return 1 / contrast;
};
function luminance(color) {
    const a = [color.r * 255, color.g * 255, color.b * 255].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
export const deepFlatten = (arr) => {
    let result = [];
    arr.forEach((d) => {
        if ("children" in d) {
            result.push(d);
            result = result.concat(deepFlatten(d.children));
        }
        else {
            result.push(d);
        }
    });
    return result;
};
