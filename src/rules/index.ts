import jsFunctionInWorklet, {
  ruleName as jsFunctionInWorkletRuleName,
} from "./js-function-in-worklet";
import noMultipleAnimatedStyleUsages, {
  ruleName as noMultipleAnimatedStyleUsagesRuleName,
} from "./no-multiple-animated-style-usages";
import unsupportedSyntax, {
  ruleName as unsupportedSyntaxRuleName,
} from "./unsupported-syntax";

// TODO: Rules to be added to the plugin:
// - reanimated styles override static
// - conditional reanimated styles doesn't unset applied styles
// - mutating shared values in useAnimatedStyle is not allowed
// - avoid static styles in useAnimatedStyle
// - value stored in useAnimatedRef current is not available on UI thread
// - scrollTo function can only be called from the UI thread
// - can't call UI thread functions with runOnJs
// - can't call runOnUI from the UI thread
// - measure function can only be called from the UI thread
// - useAnimatedStyle runs first on JS thread and then on UI thread, so it can't be used to measure layout and other UI thread only functions
// - can't mutate same shared value in useAnimatedReaction prepare and result functions
// - setNativeProps can only be called from the UI thread

const rules = {
  [jsFunctionInWorkletRuleName]: jsFunctionInWorklet,
  [noMultipleAnimatedStyleUsagesRuleName]: noMultipleAnimatedStyleUsages,
  [unsupportedSyntaxRuleName]: unsupportedSyntax,
};

export default rules;
