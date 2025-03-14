import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
export type AnimationRunner = (
) => void;

const run: AnimationRunner;

const style = useAnimatedStyle(() => {
  run();
});
  `,
  name: "test7",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "run",
      },
      // line: 7,
      // column: 3,
      // endColumn: 6,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
