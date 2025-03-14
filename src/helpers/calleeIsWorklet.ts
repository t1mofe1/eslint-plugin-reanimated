import {
  isArrowFunction,
  isFunctionDeclaration,
  isFunctionTypeNode,
  isMethodSignature,
  type CallExpression,
  type TypeChecker,
} from "typescript";
import getModuleURI from "./getModuleURI";
import isWorkletFunction from "./isWorkletFunction";
import isWorkletDeclaration from "./isWorkletDeclaration";

const calleeIsWorklet = (
  tsNode: CallExpression,
  checker: TypeChecker
): boolean => {
  const declaration = checker.getResolvedSignature(tsNode)?.declaration;

  if (!declaration) {
    return false;
  }

  const uri = getModuleURI(declaration);

  if (isFunctionTypeNode(declaration) || isMethodSignature(declaration)) {
    return isWorkletFunction(declaration, uri);
  }

  if (isFunctionDeclaration(declaration) || isArrowFunction(declaration)) {
    return isWorkletDeclaration(declaration, uri);
  }

  return false;
};

export default calleeIsWorklet;
