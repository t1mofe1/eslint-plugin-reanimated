import path from "path";
import fs from "fs";

const getValidTests = (ruleName: string) => {
  const VALID_FIXTURES = `../fixtures/valid/${ruleName}`;

  const validTests = fs
    .readdirSync(path.join(__dirname, VALID_FIXTURES))
    .map((testFile) => require(path.join(__dirname, VALID_FIXTURES, testFile)))
    .map((file) => file.default);

  return validTests;
};

export default getValidTests;
