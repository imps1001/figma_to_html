export const retrieveTopFill = (fills) => {
    if (fills && fills !== figma.mixed && fills.length > 0) {
        // on Figma, the top layer is always at the last position
        // reverse, then try to find the first layer that is visible, if any.
        return [...fills].reverse().find((d) => d.visible !== false);
    }
};
