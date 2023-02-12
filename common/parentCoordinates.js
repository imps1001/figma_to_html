export const parentCoordinates = (node) => {
    const parentX = "layoutMode" in node ? 0 : node.x;
    const parentY = "layoutMode" in node ? 0 : node.y;
    return [parentX, parentY];
};
