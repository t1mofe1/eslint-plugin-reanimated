import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
const bar = () => {
  return true;
};

const foo = () => {
  "worklet";
  return false;
}

function hello() {
  "worklet";
  return true;
}

useAnimatedStyle(() => {
  bar();
});

useAnimatedReaction(() => 1, () => {
  bar();
  foo();
  hello();
});
  `,
  name: "test1",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "bar",
      },
      // line: 16,
      // column: 3,
      // endColumn: 6,
    },
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "bar",
      },
      // line: 20,
      // column: 3,
      // endColumn: 6,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
