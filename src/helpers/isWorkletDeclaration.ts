import {
  getJSDocTags,
  isBlock,
  isExpressionStatement,
  type Node,
} from "typescript";
import { WORKLET } from "./common";

type Declaration = Node & {
  body?: Node;
};

const isWorkletDeclaration = (
  declaration: Declaration,
  uri: string
): boolean => {
  if (uri.startsWith("typescript/")) {
    return true;
  }

  if (declaration.body && isBlock(declaration.body)) {
    const [statement] = declaration.body.statements;

    if (statement && isExpressionStatement(statement)) {
      return (
        statement.expression.getText().substring(1, WORKLET.length + 1) ===
        WORKLET
      );
    }
  } else {
    const tags = getJSDocTags(declaration);

    return tags.some((tag) => tag.tagName.getText() === WORKLET);
  }

  return false;
};

export default isWorkletDeclaration;
