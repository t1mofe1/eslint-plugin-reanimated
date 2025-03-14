import { isSourceFile, type Node } from "typescript";

const URI_PREFIX = "/node_modules/" as const;

const getModuleURI = (n?: Node): string => {
  if (!n) {
    return "";
  }

  if (isSourceFile(n)) {
    const start = n.fileName.indexOf(URI_PREFIX) + URI_PREFIX.length;
    return n.fileName.substring(start);
  }

  return getModuleURI(n.parent);
};

export default getModuleURI;
