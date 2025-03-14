import type { TSESLint } from "@typescript-eslint/utils";

const isVarInScope = (name: string, scope: TSESLint.Scope.Scope): boolean => {
	const { variables } = scope;

	if (variables.some((v) => v.name === name)) {
		return true;
	}

	if (scope.type === "function" || scope.upper === null) {
		return false;
	}

	return isVarInScope(name, scope.upper);
};

export default isVarInScope;
