import {
  isFunctionDeclaration,
  isFunctionTypeNode,
  isModuleBlock,
  type Signature,
} from "typescript";

const isAnimatedModule = (
  declaration: Exclude<Signature["declaration"], undefined>
): boolean => {
  // Check if the declaration is a function type node and is a child of a function declaration
  // that is a child of a module block and the parent of the module block is named "Animated"
  // or if the declaration is a function declaration and is a child of a module block and the
  // parent of the module block is named "Animated"

  // Example: Animated.View
  const isFunctionTypeNodeCheck =
    isFunctionTypeNode(declaration) &&
    isFunctionDeclaration(declaration.parent) &&
    isModuleBlock(declaration.parent.parent) &&
    declaration.parent.parent.parent.name.getText() === "Animated";

  // Example: Animated.View = () => {}
  const isFunctionDeclarationCheck =
    isFunctionDeclaration(declaration) &&
    isModuleBlock(declaration.parent) &&
    declaration.parent.parent.name.getText() === "Animated";

  return isFunctionTypeNodeCheck || isFunctionDeclarationCheck;
};

export default isAnimatedModule;
