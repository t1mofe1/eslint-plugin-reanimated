import { pluginName } from "../helpers/common";
import recommendedRules from "./recommended-rules";

const recommendedFlatConfig = {
  name: `${pluginName}/recommended`,
  plugins: {
    [pluginName]: require(".."),
  },
  rules: recommendedRules,
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
    },
  },
};

export default recommendedFlatConfig;
