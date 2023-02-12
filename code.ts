import {
  retrieveGenericLinearGradients,
  retrieveGenericSolidUIColors,
} from "./common/retrieveUI/retrieveColors";
import { htmlMain } from "./html/htmlMain";
import { convertIntoAltNodes } from "./altNodes/altConversion";

let parentId: string;
let isJsx = false;
let layerName = false;
let material = true;

let mode: "html" ;

figma.showUI(__html__, { width: 450, height: 550 });

const run = () => {
  // ignore when nothing was selected
  if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({
      type: "empty",
    });
    return;
  }


   // check [ignoreStackParent] description
  if (figma.currentPage.selection.length > 0) {
    parentId = figma.currentPage.selection[0].parent?.id ?? "";
  }

  let result = "";

  const convertedSelection = convertIntoAltNodes(
    figma.currentPage.selection,
    null
  );

  result = htmlMain(convertedSelection, parentId, isJsx, layerName);

  console.log(result);

  figma.ui.postMessage({
    type: "result",
    data: result,
  });

  if (mode === "html") {
    figma.ui.postMessage({
      type: "colors",
      data: retrieveGenericSolidUIColors(convertedSelection, mode),
    });

    figma.ui.postMessage({
      type: "gradients",
      data: retrieveGenericLinearGradients(convertedSelection, mode),
    });
  }
};
  figma.on("selectionchange", () => {
    run();
  });

  figma.ui.onmessage = (msg) => {
    if (msg.type === "html") {
      mode = msg.type;
      run();
    } else if (msg.type === "jsx" && msg.data !== isJsx) {
      isJsx = msg.data;
      run();
    } else if (msg.type === "layerName" && msg.data !== layerName) {
      layerName = msg.data;
      run();
    } else if (msg.type === "material" && msg.data !== material) {
      material = msg.data;
      run();
    }
  };