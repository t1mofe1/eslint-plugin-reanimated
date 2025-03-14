import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import nodePlugin from "eslint-plugin-n";

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	eslintPlugin.configs["flat/rules-recommended"],
	nodePlugin.configs["flat/recommended"],
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.config.*", '.eslint-doc-generatorrc.js'],
					defaultProject: "tsconfig.build.json",
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			"n/no-missing-import": "off",
			"@typescript-eslint/no-unused-vars": "off",
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-enum-comparison': 'off',
			'@typescript-eslint/no-unnecessary-type-assertion': 'off',
		 	'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/unbound-method': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
		}
	}
);
