import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import nodePlugin from "eslint-plugin-n";

export default tseslint.config({
	extends: [
		eslint.configs.recommended,
		tseslint.configs.recommendedTypeChecked,
		eslintPlugin.configs["flat/rules-recommended"],
		nodePlugin.configs["flat/recommended"],
	],
	files: ["src/**/*.ts"],
	languageOptions: {
		parserOptions: {
			projectService: {
				defaultProject: "tsconfig.build.json",
			},
			tsconfigRootDir: import.meta.dirname,
		},
	},
	rules: {
		"n/no-missing-import": "off",
		"n/no-missing-require": "off",
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-require-imports": "off",
		"@typescript-eslint/no-unnecessary-type-assertion": "off",
		"@typescript-eslint/no-unsafe-enum-comparison": "off",
	},
});
