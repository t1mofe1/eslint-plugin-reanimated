import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
const test2Func = (v, x, y) => v;

useAnimatedStyle(() => {
  test2Func(1, 0, 1);
});
  `,
  name: "test2",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "test2Func",
      },
      // line: 4,
      // column: 3,
      // endColumn: 6,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
