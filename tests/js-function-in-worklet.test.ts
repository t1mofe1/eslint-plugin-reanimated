import path from "path";
import fs from "fs";

import { ESLintUtils } from "@typescript-eslint/experimental-utils";

import rule from "../src/rules/js-function-in-worklet";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: path.join(__dirname, "fixtures"),
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const code = (name: string) =>
  fs.readFileSync(path.join(__dirname, name), "utf8");
const VALID = "fixtures/valid";
const files = fs.readdirSync(path.join(__dirname, VALID));
const valid = files.map((file) => ({
  code: code(path.join(VALID, file)),
}));

ruleTester.run("js-function-in-worklet", rule, {
  valid,
  invalid: [
    {
      code: code("fixtures/invalid/test1.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "bar",
          },
        },
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "bar",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test2.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "mix",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test3.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "parse",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test4.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "bar",
          },
        },
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "bar",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test5.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "objectKeys",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test6.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "origin2",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test7.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "run",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test8.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "fn",
          },
        },
      ],
    },
    {
      code: code("fixtures/invalid/test9.txt"),
      errors: [
        {
          messageId: "JSFunctionInWorkletMessage",
          data: {
            name: "foo",
          },
        },
      ],
    },
  ],
});
