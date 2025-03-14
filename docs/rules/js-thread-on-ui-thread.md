# Detects JavaScript thread functions being called directly on the UI thread in react-native-reanimated or extended libraries (`@t1m0fe1/reanimated/js-thread-on-ui-thread`)

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

Disallow to invoke directly functions that live on the JS thread directly from a worklet.

The following example is considered invalid:

```ts
const foo = () => {
  return true;
}

const bar = () => {
  "worklet";
  foo();
}
```

The following example is considered valid:

```ts
const foo = () => {
  "worklet";
  return true;
}

const bar = (cb: () => void) => {
  "worklet";
  const fn = () => false;
  foo();
  cb();
  fn();
}
```

External modules like redash can mark worklets in their type declaration using the `@worklet` JSDoc tag.
For instance:

```ts
/**
 * Linear interpolation
 * @param value
 * @param x
 * @param y
 * @worklet
 */
export declare const mix: (value: number, x: number, y: number) => number;
```

## Options

<!-- begin auto-generated rule options list -->

| Name             | Type   |
| :--------------- | :----- |
| `extendWorklets` | Object |

<!-- end auto-generated rule options list -->
