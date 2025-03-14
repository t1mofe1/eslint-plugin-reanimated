import { createRule, createState } from "../helpers/common";
import detectWorklet from "../helpers/detectWorklet";

export const ruleName = "unsupported-syntax" as const;
export const messageId = "UnsupportedSyntaxMessage" as const;

const rule = createRule({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description: "Some syntaxes are not a supported within a worklet.",
      recommended: true,
    },
    messages: {
      [messageId]: "{{name}} is not a supported syntax within a worklet.",
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    const state = createState();

    return {
      ...detectWorklet(state),

      ForOfStatement: (node) => {
        if (!state.callerIsWorklet) {
          return;
        }

        context.report({
          messageId,
          node,
          data: {
            name: "for of",
          },
        });
      },
      ForInStatement: (node) => {
        if (!state.callerIsWorklet) {
          return;
        }

        context.report({
          messageId,
          node,
          data: {
            name: "for in",
          },
        });
      },
      ObjectPattern: (node) => {
        if (!state.callerIsWorklet) {
          context.report({
            messageId,
            node,
            data: {
              name: "Object destructuring",
            },
          });
        }
      },
      SpreadElement: (node) => {
        if (!state.callerIsWorklet) {
          return;
        }

        context.report({
          messageId,
          node,
          data: {
            name: "Spread operator",
          },
        });
      },
    };
  },
});

export default rule;
