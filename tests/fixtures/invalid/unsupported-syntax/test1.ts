import type { TestCaseError } from "@typescript-eslint/rule-tester";
import { messageId } from "src/rules/unsupported-syntax";

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
  name: "unsupported-syntax/test1.ts",
  errors: [
    {
      messageId,
      data: {
        name: "Spread operator",
      },
      line: 27,
      column: 12,
      endColumn: 21,
    },
    {
      messageId,
      data: {
        name: "for of",
      },
      line: 28,
      endLine: 30,
      column: 3,
      endColumn: 4,
    },
    {
      messageId,
      data: {
        name: "for in",
      },
      line: 32,
      endLine: 34,
      column: 3,
      endColumn: 4,
    },
  ] as TestCaseError<typeof messageId>[],
};
