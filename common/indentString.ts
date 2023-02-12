export const indentString = (str: string, indentLevel: number = 1): string =>{
    const regex = /^(?!\s*$)/gm;
  return str.replace(regex, " ".repeat(indentLevel * 4));
}