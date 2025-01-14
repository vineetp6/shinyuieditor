import type { ShinyUiNode, ShinyUiLeafNode } from "../ShinyUiNode";

type Wrapper = Pick<ShinyUiNode, "id" | "namedArgs">;
export type WrappingNode = Wrapper | ((child: ShinyUiNode) => Wrapper | null);

type ChildToWrapperFunction = (child: ShinyUiNode) => ShinyUiLeafNode | null;
export function wrapInNode({
  child,
  wrapper,
}: {
  child: ShinyUiNode;
  wrapper: ShinyUiLeafNode | ChildToWrapperFunction;
}): ShinyUiNode {
  if (typeof wrapper === "function") {
    const wrapping_node = wrapper(child);
    if (wrapping_node === null) {
      return child;
    }

    wrapper = wrapping_node;
  }
  return {
    ...wrapper,
    children: [child],
  };
}
