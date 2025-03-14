import type { ESLint } from "eslint";
import { pluginName } from "../helpers/common";
import recommendedRules from "./recommended-rules";

const recommendedConfig: ESLint.ConfigData = {
	plugins: [pluginName],
	rules: recommendedRules,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		projectService: true,
		tsconfigRootDir: __dirname,
	},
};

export default recommendedConfig;
