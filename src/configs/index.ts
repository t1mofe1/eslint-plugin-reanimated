import recommendedConfig from "./recommended";
import recommendedFlatConfig from "./recommendedFlat";

const configs = {
	recommended: recommendedConfig,
	"recommended/flat": recommendedFlatConfig,
} as const;

export default configs;
