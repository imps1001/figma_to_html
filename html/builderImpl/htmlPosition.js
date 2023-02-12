export const htmlPosition = (node, parentId = "") => {
    // don't add position to the first (highest) node in the tree
    if (!node.parent || parentId === node.parent.id) {
        return "";
    }
    // Group
    if (node.parent.isRelative === true) {
        // position is absolute, needs to be relative
        return "absoluteManualLayout";
    }
    return "";
};
