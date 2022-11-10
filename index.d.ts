import { Rule } from "eslint";
import { Node } from "estree";


declare namespace traverse {
  export type Path = {
    node: Node;
    parent: Node | null;
    parentKey: string | null;
    parentPath: Path;
  };
  
  export type Visitor = (path: Path) => Symbol | void;

  const SKIP: Symbol;
  const STOP: Symbol;
}

declare function traverse(
  context: Rule.RuleContext,
  node: Node,
  visitor: traverse.Visitor
): void;

export = traverse;
