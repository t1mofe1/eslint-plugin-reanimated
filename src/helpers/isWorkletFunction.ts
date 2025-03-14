import { getJSDocTags, type Signature } from "typescript";
import { WORKLET } from "./common";

const isWorkletFunction = (
	declaration: Signature["declaration"],
	uri: string
): boolean => {
	if (
		uri.startsWith("react-native-reanimated/") ||
		uri.startsWith("typescript/") ||
		uri === "@types/node/console.d.ts"
	) {
		return true;
	}

	if (!declaration) {
		return false;
	}

	const tags = getJSDocTags(declaration.parent);

	return tags.some((tag) => tag.tagName.getText() === WORKLET);
};

export default isWorkletFunction;
