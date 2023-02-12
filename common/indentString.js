export const indentString = (str, indentLevel = 1) => {
    const regex = /^(?!\s*$)/gm;
    return str.replace(regex, " ".repeat(indentLevel * 4));
};
