export const rgbTo6hex = (color) => {
    const hex = ((color.r * 255) | (1 << 8)).toString(16).slice(1) +
        ((color.g * 255) | (1 << 8)).toString(16).slice(1) +
        ((color.b * 255) | (1 << 8)).toString(16).slice(1);
    return hex;
};
export const rgbTo8hex = (color, alpha) => {
    // when color is RGBA, alpha is set automatically
    // when color is RGB, alpha need to be set manually (default: 1.0)
    const hex = ((alpha * 255) | (1 << 8)).toString(16).slice(1) +
        ((color.r * 255) | (1 << 8)).toString(16).slice(1) +
        ((color.g * 255) | (1 << 8)).toString(16).slice(1) +
        ((color.b * 255) | (1 << 8)).toString(16).slice(1);
    return hex;
};
export const gradientAngle = (fill) => {
    // Thanks Gleb and Liam for helping!
    const decomposed = decomposeRelativeTransform(fill.gradientTransform[0], fill.gradientTransform[1]);
    return (decomposed.rotation * 180) / Math.PI;
};
export const decomposeRelativeTransform = (t1, t2) => {
    const a = t1[0];
    const b = t1[1];
    const c = t1[2];
    const d = t2[0];
    const e = t2[1];
    const f = t2[2];
    const delta = a * d - b * c;
    const result = {
        translation: [e, f],
        rotation: 0,
        scale: [0, 0],
        skew: [0, 0],
    };
    // Apply the QR-like decomposition.
    if (a !== 0 || b !== 0) {
        const r = Math.sqrt(a * a + b * b);
        result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
        result.scale = [r, delta / r];
        result.skew = [Math.atan((a * c + b * d) / (r * r)), 0];
    }
    return result;
};
