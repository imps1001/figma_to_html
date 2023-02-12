import { AltSceneNode } from "./../altNodes/altMixins";


export const parentCoordinates = (node: AltSceneNode): [number, number] => {
  const parentX = "layoutMode" in node ? 0 : node.x;
  const parentY = "layoutMode" in node ? 0 : node.y;

  return [parentX, parentY];
};