import { name, version } from "../package.json";

import rules from "./rules";
import configs from "./configs";

const plugin = {
  meta: {
    name,
    version,
  },
  rules,
  configs,
};

export default plugin;
