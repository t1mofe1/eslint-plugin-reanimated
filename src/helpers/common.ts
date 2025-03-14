import { ESLintUtils } from "@typescript-eslint/utils";

export interface State {
  currentCodePath: string | null;
  callerIsWorklet: boolean;
  callerIsObjectHook: boolean;
}

export const defaultState: State = {
  currentCodePath: null,
  callerIsWorklet: false,
  callerIsObjectHook: false,
};

export const createState = (): State => defaultState;

export const WORKLET = "worklet";

export type Docs = {
  recommended: boolean;
};

export const pluginName = "reanimated";

export type ReanimatedRuleDocs = {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
};

export const createRule = ESLintUtils.RuleCreator<ReanimatedRuleDocs>(
  (ruleName) =>
    `https://github.com/t1m0fe1/eslint-plugin-reanimated/blob/master/docs/${ruleName}.md`
);
