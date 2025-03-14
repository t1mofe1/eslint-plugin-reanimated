import { createRule, createState } from "../helpers/common";
import isVarInScope from "../helpers/isVarInScope";
import getModuleURI from "../helpers/getModuleURI";
import isAnimatedModule from "../helpers/isAnimatedModule";
import isKnownModule from "../helpers/isKnownModule";
import calleeIsWorklet from "../helpers/calleeIsWorklet";
import detectWorklet from "../helpers/detectWorklet";

export type Options = [
  {
    extendWorkletFuncs?: Record<string, string[]>;
  }
];

export const ruleName = "js-function-in-worklet" as const;
export const messageId = "JSFunctionInWorkletMessage" as const;

const rule = createRule<Options, typeof messageId>({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description:
        "Non-worklet functions should be invoked via runOnJS. Use runOnJS() or workletlize instead.",
    },
    // fixable: "code",
    messages: {
      [messageId]: "{{name}} is not a worklet. Use runOnJS instead.",
    },
    schema: [
      {
        type: "object",
        properties: {
          extendWorkletFuncs: {
            type: "object",
            additionalProperties: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      extendWorkletFuncs: {},
    },
  ],
  create: (context) => {
    const parserServices = context.sourceCode.parserServices;

    if (!parserServices?.program) {
      return {};
    }

    const checker = parserServices.program.getTypeChecker();
    const state = createState();

    // const options = context.options[0] || {};
    // const extendWorkletFuncs = options.extendWorkletFuncs || {};

    return {
      ...detectWorklet(state),

      CallExpression: (node) => {
        if (!state.callerIsWorklet) {
          return;
        }

        const tsNode = parserServices.esTreeNodeToTSNodeMap?.get(node);

        if (!tsNode) {
          return;
        }

        const functionName = tsNode.expression.getText();

        if (functionName === "mixRedash") {
          console.log("mixRedash");
        }

        if (
          isVarInScope(functionName, context.sourceCode.getScope(node))
          // || isExtendedWorklet(functionName, tsNode.expression, extendWorkletFuncs)
        ) {
          return;
        }

        const signature = checker.getResolvedSignature(tsNode);
        const declaration = signature?.declaration;

        if (
          !declaration ||
          isAnimatedModule(declaration) ||
          isKnownModule(getModuleURI(declaration)) ||
          calleeIsWorklet(tsNode, checker)
        ) {
          return;
        }

        context.report({
          messageId,
          node,
          data: {
            name: functionName,
          },
          // fix: (fixer) => {
          //   const functionCall = context.sourceCode.getText(node);

          //   return fixer.replaceText(node, `runOnJS(${functionCall})`);
          // },
        });
      },
    };
  },
});

export default rule;
