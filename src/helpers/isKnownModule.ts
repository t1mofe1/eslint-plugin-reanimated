import path from "path";

/**
 * Checks if a given module URI is known and should be ignored.
 * Compatible with Bun, Node.js, and other package managers.
 */
const isKnownModule = (uri: string): boolean => {
  // Normalize paths to avoid issues on Windows (backslashes vs. slashes)
  const normalizedUri = path.posix.normalize(uri);

  return (
    normalizedUri.startsWith("react-native-reanimated/") ||
    normalizedUri.startsWith("typescript/") ||
    normalizedUri === "@types/node/console.d.ts" ||
    normalizedUri === "bun-types/globals.d.ts" ||
    normalizedUri.startsWith(
      "@shopify/react-native-skia/lib/typescript/src/skia/types/"
    ) ||
    normalizedUri.includes("react-native-skia/package/src/skia/types")
  );
};

export default isKnownModule;
