import {
  type TSESTree,
  AST_NODE_TYPES,
  type TSESLint,
} from "@typescript-eslint/utils";
import { defaultState, WORKLET, type State } from "./common";

const functionNames = [
  // Animations
  "withTiming",
  "withSpring",
  "withDecay",
  "withRepeat",

  // Core
  "useAnimatedStyle",
  "useAnimatedProps",
  "createAnimatedPropAdapter",
  "useDerivedValue",

  // Scroll
  "useAnimatedScrollHandler",

  // Threading
  "runOnUI",

  // Advanced APIs
  "useAnimatedReaction",
  "useFrameCallback",
  "useWorkletCallback", // Deprecated
];
const matchFunctions = `/${functionNames.join("|")}/` as const;

const objectNames = [
  "useAnimatedScrollHandler",
  "useAnimatedGestureHandler", // Deprecated
];
const matchObjects = `/${objectNames.join("|")}/` as const;

const detectWorklet = (state: State) => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is a private API
  onCodePathStart: (...args: any[]) => {
    // Check if the function is a worklet:
    // - It is an arrow function or function declaration
    // - It has a block body
    // - The first statement is a directive with the value "worklet"

    const [codePath, node] = args as [TSESLint.CodePath, TSESTree.Node];

    const isFunction =
      node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
      node.type === AST_NODE_TYPES.FunctionDeclaration;

    if (
      isFunction &&
      node.body.type === AST_NODE_TYPES.BlockStatement &&
      node.body.body.length > 0 &&
      node.body.body[0]?.type === AST_NODE_TYPES.ExpressionStatement &&
      node.body.body[0].directive === WORKLET
    ) {
      state.currentCodePath = codePath.id;
      state.callerIsWorklet = true;
    }
  },
  onCodePathEnd: (codePath: TSESLint.CodePath) => {
    if (state.currentCodePath === codePath.id) {
      state = defaultState;
    }
  },

  [`CallExpression[callee.name=${matchObjects}] > ObjectExpression`]: () => {
    state.callerIsObjectHook = true;
  },
  [`CallExpression[callee.name=${matchObjects}] > ObjectExpression:exit`]:
    () => {
      state.callerIsObjectHook = false;
    },

  BlockStatement: () => {
    if (state.callerIsObjectHook) {
      state.callerIsWorklet = true;
    }
  },
  "BlockStatement:exit": () => {
    if (state.callerIsObjectHook) {
      state.callerIsWorklet = false;
    }
  },

  [`CallExpression[callee.name=${matchFunctions}] > ArrowFunctionExpression`]:
    () => {
      state.callerIsWorklet = true;
    },
  [`CallExpression[callee.name=${matchFunctions}] > ArrowFunctionExpression:exit`]:
    () => {
      state.callerIsWorklet = false;
    },
});

export default detectWorklet;
