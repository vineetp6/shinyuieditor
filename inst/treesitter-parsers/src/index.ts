import type Parser from "web-tree-sitter";

export { setup_python_parser, setup_r_parser } from "./setup_language_parsers";

export type { ParserInitOptions } from "./setup_language_parsers";

export { get_assignment_nodes } from "./get_assignment_nodes";
export { get_ui_assignment } from "./get_ui_assignment";
export { is_call_node, extract_call_content } from "./CallNode";

export {
  getNodePosition,
  getNodePositionAndIndent,
} from "./get_node_positions";

export type { Node_Assignment_Map } from "./get_assignment_nodes";
/**
 * Function to parse a python script into a tree-sitter syntax tree
 */
export type TSParser = Parser;

/**
 * A node within the tree-sitter syntax tree.
 */
export type ParserNode = Parser.SyntaxNode;

/**
 * The main object returned from parsing an app script. Contains the main tree as the root node attribute
 */
export type ParserTree = Parser.Tree;
