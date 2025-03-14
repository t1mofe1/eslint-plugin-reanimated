import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
function fn() {
  return true;
}

function foo() {
  "worklet";
  return true;
}

const test = () => {
  "worklet";
  const test = () => {
    const bar = () => true;
    if (Math.random()) {
      foo();
      bar();
    }
  }
  if (Math.random()) {
    fn();
  }
};

const bar = () => {
  "worklet";
  const {x} = { x: 1 };
  clamp(1, ...[1, 2]);
  for(const foo of [1, 2, 3]) {
    console.log({ foo });
  }
  const object = { a: 1, b: 2, c: 3 };
  for (const property in object) {
    console.log(\`\${property}: \${object[property]}\`);
  }
}
  `,
  name: "test8",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "fn",
      },
      // line: 20,
      // column: 5,
      // endColumn: 7,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
