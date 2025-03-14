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
}

function hello() {
  "worklet";
  bar();
}

const world = () => {
  "worklet";
  bar();
}
  `,
  name: "test4",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "bar",
      },
      // line: 7,
      // column: 3,
      // endColumn: 6,
    },
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "bar",
      },
      // line: 12,
      // column: 3,
      // endColumn: 6,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
