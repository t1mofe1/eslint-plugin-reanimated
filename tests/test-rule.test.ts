import * as test from "bun:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { ESLintUtils } from "@typescript-eslint/utils";

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test.it;
RuleTester.itOnly = test.it.only;

const ruleTester = new RuleTester();

const testRule = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    messages: {
      testMessage: "test message",
    },
    schema: [],
    type: "problem",
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclaration(node) {
        node.declarations.forEach((declaration) => {
          if (
            declaration.init &&
            declaration.init.type === "Literal" &&
            declaration.init.value === 2
          ) {
            context.report({
              node: declaration,
              messageId: "testMessage",
            });
          }
        });
      },
    };
  },
});

ruleTester.run("test-rule", testRule, {
  valid: ["const a = 1;"],
  invalid: [
    {
      code: "const a = 2;",
      errors: [{ messageId: "testMessage" }],
    },
  ],
});
