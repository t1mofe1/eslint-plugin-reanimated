import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
function foo() {
  return { foo: false };
}

const props = useAnimatedProps(() => ({
  foo: {
    bar: true,
    ...foo()
  }
}));
  `,
  name: "test9",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "foo",
      },
      // line: 8,
      // column: 8,
      // endColumn: 11,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
