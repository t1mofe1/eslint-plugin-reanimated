import {
  TSESTree,
  ESLintUtils,
  AST_NODE_TYPES,
} from "@typescript-eslint/utils";

export const ruleName = "js-thread-on-ui-thread";

export const MESSAGE_IDS = {
  jsThreadOnUiThread: "jsThreadOnUiThread",
  jsThreadFunctionWarning: "jsThreadFunctionWarning",
} as const;

export type Options = [{ extendWorklets?: Record<string, string[]> }];
export type MessageIds = keyof typeof MESSAGE_IDS;
type PluginDocs = {
  description: string;
  recommended: boolean;
};

const DEFAULT_WORKLET_FUNCTIONS = new Set([
  "withTiming",
  "withSpring",
  "withDecay",
  "withRepeat",
  "useAnimatedStyle",
  "useAnimatedProps",
  "createAnimatedPropAdapter",
  "useDerivedValue",
  "useAnimatedScrollHandler",
  "useAnimatedGestureHandler",
  "runOnUI",
  "useAnimatedReaction",
  "useFrameCallback",
  "useWorkletCallback",
]);

const createRule = ESLintUtils.RuleCreator<PluginDocs>(
  (name) => `https://typescript-eslint.io/rules/${name}`
);

const rule = createRule<Options, MessageIds>({
  name: ruleName,
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description:
        "Detects JavaScript thread functions being called directly on the UI thread in react-native-reanimated or extended libraries.",
      recommended: true,
    },
    messages: {
      [MESSAGE_IDS.jsThreadOnUiThread]:
        "JavaScript thread function '{{name}}' is being called directly on the UI thread. Use runOnJS('{{name}}') instead.",
      [MESSAGE_IDS.jsThreadFunctionWarning]:
        "Function '{{name}}' is missing the 'worklet' directive. Add 'worklet' to ensure it runs on the UI thread.",
    },
    schema: [
      {
        type: "object",
        properties: {
          extendWorklets: {
            type: "object",
            additionalProperties: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
        additionalProperties: false,
      },
    ],
    hasSuggestions: true,
  },
  defaultOptions: [{}],
  create(context, [{ extendWorklets }]) {
    const extendedWorklets = extendWorklets
      ? new Set([...DEFAULT_WORKLET_FUNCTIONS])
      : new Set();
    const trackedModules = new Set(["react-native-reanimated"]);

    if (extendWorklets) {
      Object.entries(extendWorklets).forEach(([moduleName, functions]) => {
        trackedModules.add(moduleName);
        functions.forEach((fn) => extendedWorklets.add(`${moduleName}.${fn}`));
      });
    }

    const importMap = new Map<
      string,
      { importedName: string; module: string }
    >();
    let hasRunOnJSImport = false;

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        if (trackedModules.has(node.source.value)) {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === AST_NODE_TYPES.ImportSpecifier &&
              specifier.imported.type === AST_NODE_TYPES.Identifier &&
              specifier.imported.name === "runOnJS"
            ) {
              hasRunOnJSImport = true;
            }
            importMap.set(specifier.local.name, {
              importedName:
                specifier.type === AST_NODE_TYPES.ImportSpecifier &&
                specifier.imported.type === AST_NODE_TYPES.Identifier
                  ? specifier.imported.name
                  : "default",
              module: node.source.value,
            });
          });
        }
      },

      CallExpression(node: TSESTree.CallExpression) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier ||
          (node.callee.type === AST_NODE_TYPES.MemberExpression &&
            node.callee.property.type === AST_NODE_TYPES.Identifier)
        ) {
          const functionName =
            node.callee.type === AST_NODE_TYPES.Identifier
              ? node.callee.name
              : node.callee.property.type === AST_NODE_TYPES.Identifier
              ? node.callee.property.name
              : null;

          const importInfo = functionName ? importMap.get(functionName) : null;
          const originalName = importInfo
            ? importInfo.importedName
            : functionName;
          const moduleName = importInfo ? importInfo.module : null;
          if (!moduleName) {
            console.warn(
              `Warning: Module name missing for function '${originalName}'.`
            );
          }
          const extendedKey =
            moduleName && trackedModules.has(moduleName)
              ? `${moduleName}.${originalName}`
              : originalName;

          if (
            originalName !== "runOnJS" &&
            !extendedWorklets.has(originalName) &&
            !extendedWorklets.has(extendedKey)
          ) {
            context.report({
              node,
              messageId: MESSAGE_IDS.jsThreadOnUiThread,
              data: { name: originalName },
              fix: (fixer) => {
                const fixes = [];

                if (!hasRunOnJSImport) {
                  hasRunOnJSImport = true;

                  fixes.push(
                    fixer.insertTextBefore(
                      context.sourceCode.ast,
                      `import { runOnJS } from "react-native-reanimated";\n`
                    )
                  );
                }

                fixes.push(
                  fixer.replaceText(node.callee, `runOnJS(${originalName})`)
                );

                return fixes;
              },
            });
          }
        }
      },

      ObjectExpression(node: TSESTree.ObjectExpression) {
        node.properties.forEach((prop) => {
          if (
            prop.type === AST_NODE_TYPES.Property &&
            (prop.value.type === AST_NODE_TYPES.FunctionExpression ||
              prop.value.type === AST_NODE_TYPES.ArrowFunctionExpression)
          ) {
            if (
              !extendedWorklets.has(
                prop.key.type === AST_NODE_TYPES.Identifier ? prop.key.name : ""
              )
            ) {
              context.report({
                node: prop.value,
                messageId: MESSAGE_IDS.jsThreadFunctionWarning,
                data: {
                  name:
                    prop.key.type === AST_NODE_TYPES.Identifier
                      ? prop.key.name
                      : "unknown",
                },
                suggest: [
                  {
                    messageId: MESSAGE_IDS.jsThreadFunctionWarning,
                    data: {
                      name:
                        prop.key.type === AST_NODE_TYPES.Identifier
                          ? prop.key.name
                          : "unknown",
                    },
                    fix: (fixer) => {
                      if (
                        (prop.value.type ===
                          AST_NODE_TYPES.FunctionExpression ||
                          prop.value.type ===
                            AST_NODE_TYPES.ArrowFunctionExpression) &&
                        prop.value.body.type === AST_NODE_TYPES.BlockStatement
                      ) {
                        return fixer.insertTextBefore(
                          prop.value.body,
                          `"worklet";\n`
                        );
                      }

                      return null;
                    },
                  },
                ],
              });
            }
          }
        });
      },
    };
  },
});

export default rule;
