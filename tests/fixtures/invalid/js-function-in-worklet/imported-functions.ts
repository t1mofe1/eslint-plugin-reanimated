import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
import {mixRedash, parseRedash} from "react-native-redash";

useAnimatedStyle(() => {
  mixRedash(1, 0, 1);
  parseRedash("M 0 0")
});
  `,
  name: "imported functions",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "mixRedash",
      },
      // line: 4,
      // column: 3,
      // endColumn: 5,
    },
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "parseRedash",
      },
      // line: 5,
      // column: 3,
      // endColumn: 8,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
