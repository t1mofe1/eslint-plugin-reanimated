import test from "bun:test";
import parser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule, { ruleName } from "src/rules/js-function-in-worklet";

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test.it;
RuleTester.itOnly = test.it.only;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
      project: "../tsconfig.test.json",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run(ruleName, rule, {
  valid: [
    {
      code: `
        function test() {
          runOnJS(() => console.log("Hello"));
        }
      `,
    },
    {
      code: `
        const style = useAnimatedStyle(() => {
          return { opacity: 1 };
        });
      `,
    },
    {
      code: `
        const opacity = withTiming(1);
      `,
    },
    {
      code: `
        const obj = {
          myFunc: function() {
            "worklet";
            console.log("Hello");
          }
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        const opacity = withTiming(1);
      `,
      errors: [
        {
          messageId: "jsThreadOnUiThread",
          data: { name: "withTiming" },
        },
      ],
      output: `
        const opacity = runOnJS(withTiming)(1);
      `,
    },
    {
      code: `
        const style = useAnimatedStyle(() => {
          return { opacity: 1 };
        });
      `,
      errors: [
        {
          messageId: "jsThreadFunctionWarning",
          data: { name: "useAnimatedStyle" },
        },
      ],
      output: `
        const style = useAnimatedStyle(() => {
          "worklet";
          return { opacity: 1 };
        });
      `,
    },
    {
      code: `
        const obj = {
          myFunc: function() {
            console.log("Hello");
          }
        };
      `,
      errors: [
        {
          messageId: "jsThreadFunctionWarning",
          data: { name: "myFunc" },
        },
      ],
      output: `
        const obj = {
          myFunc: function() {
            "worklet";
            console.log("Hello");
          }
        };
      `,
    },
  ],
});
