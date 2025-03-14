import {
  AST_NODE_TYPES,
  type TSESTree,
  type TSESLint,
} from "@typescript-eslint/utils";
import { createRule } from "../helpers/common";

export const ruleName = "no-multiple-animated-style-usages" as const;
export const messageId = "NoMultipleAnimatedStyleUsagesMessage" as const;

const rule = createRule({
  name: ruleName,
  defaultOptions: [],
  meta: {
    type: "problem",
    docs: {
      description:
        "Animated styles cannot be used multiple times. Call useAnimatedStyle() multiple times instead.",
    },
    messages: {
      [messageId]:
        "{{name}} cannot be used multiple times. Use separate useAnimatedStyle() calls instead.",
    },
    schema: [],
  },
  create: (context) => {
    const animatedStyleReferences = new Map<
      TSESLint.Scope.Variable,
      TSESTree.Identifier[]
    >();

    return {
      // Detect when useAnimatedStyle is called
      CallExpression: (node) => {
        // "CallExpression[callee.name='useAnimatedStyle']": (
        // CallExpression: (node) => {
        // "CallExpression[callee.name='useAnimatedStyle']": (
        // 	node: TSESTree.CallExpression
        // ) => {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name !== "useAnimatedStyle"
        ) {
          return;
        }

        const { parent } = node;

        if (!parent) {
          return;
        }

        const tsNodeToESTreeNodeMap =
          context.sourceCode.parserServices?.tsNodeToESTreeNodeMap;

        if (!tsNodeToESTreeNodeMap) {
          return;
        }

        const declaredVariables = context.sourceCode.getDeclaredVariables(
          // @ts-expect-error: Parent is wrong type here
          tsNodeToESTreeNodeMap.get(parent)
        );

        const [variable] = declaredVariables;

        if (!variable) {
          return;
        }

        animatedStyleReferences.set(variable, []);
      },

      // Detect when useAnimatedStyle is used
      "JSXAttribute Identifier": (node: TSESTree.Identifier) => {
        const found = Array.from(animatedStyleReferences.keys()).find(
          ({ references }) =>
            references.map(({ identifier }) => identifier).includes(node)
        );

        if (!found) {
          return;
        }

        animatedStyleReferences.set(found, [
          ...animatedStyleReferences.get(found)!,
          node,
        ]);
      },

      // Report on exit
      "Program:exit": () => {
        for (const [, identifiers] of animatedStyleReferences) {
          if (identifiers.length < 2) {
            continue;
          }

          identifiers.forEach((identifier) => {
            context.report({
              messageId,
              node: identifier,
              data: {
                name: identifier.name,
              },
            });
          });
        }
      },
    };
  },
});

export default rule;
