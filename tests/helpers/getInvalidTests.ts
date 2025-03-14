import path from "path";
import fs from "fs";

const getInvalidTests = (ruleName: string) => {
  const INVALID_FIXTURES = `../fixtures/invalid/${ruleName}`;

  const invalidTests = fs
    .readdirSync(path.join(__dirname, INVALID_FIXTURES))
    .map((testFile) =>
      require(path.join(__dirname, INVALID_FIXTURES, testFile))
    )
    .map((file) => file.default);

  return invalidTests;
};

export default getInvalidTests;
