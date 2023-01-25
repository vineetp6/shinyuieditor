import { getNode } from "../components/UiNode/TreeManipulation/getNode";
import type { ShinyUiNode } from "../main";
import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";

export function getNamedPath(path: NodePath, tree: ShinyUiNode): string[] {
  const totalDepth = path.length;
  let pathString: string[] = [];
  for (let depth = 0; depth <= totalDepth; depth++) {
    const nodeAtDepth = getNode(tree, path.slice(0, depth));
    if (nodeAtDepth === undefined) {
      // If the selection is not valid (node probably just got moved) then don't
      // render breadcrumb
      break;
    }

    pathString.push(shinyUiNodeInfo[nodeAtDepth.uiName].title);
  }

  return pathString;
}