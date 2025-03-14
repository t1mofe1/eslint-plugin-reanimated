import type { Linter } from "eslint";
import { pluginName } from "../helpers/common";
import { ruleName as jsFunctionInWorkletRuleName } from "../rules/js-function-in-worklet";
import { ruleName as noMultipleAnimatedStyleUsagesRuleName } from "../rules/no-multiple-animated-style-usages";
import { ruleName as unsupportedSyntaxRuleName } from "../rules/unsupported-syntax";

const recommendedRules: Partial<Linter.RulesRecord> = {
  [`${pluginName}/${jsFunctionInWorkletRuleName}`]: "error",
  [`${pluginName}/${noMultipleAnimatedStyleUsagesRuleName}`]: "error",
  [`${pluginName}/${unsupportedSyntaxRuleName}`]: "error",
};

export default recommendedRules;
