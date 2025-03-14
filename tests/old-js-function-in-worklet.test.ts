import * as test from "bun:test";
import parser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
// import getValidTests from "./helpers/getValidTests";
import getInvalidTests from "./helpers/getInvalidTests";
import rule, { ruleName } from "../src/rules/js-function-in-worklet";

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
  // valid: getValidTests(ruleName),
  valid: [],
  invalid: getInvalidTests(ruleName),
});
