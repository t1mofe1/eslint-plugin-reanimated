# @t1m0fe1/eslint-plugin-reanimated

> forked from [eslint-plugin-reanimated](https://www.npmjs.com/package/eslint-plugin-reanimated) v2.0.1 as the original repository seems [no longer maintained](https://github.com/wcandillon/eslint-plugin-reanimated/issues/39).

[![npm version](https://img.shields.io/npm/v/@t1m0fe1/eslint-plugin-reanimated.svg)](https://www.npmjs.com/package/@t1m0fe1/eslint-plugin-reanimated)
[![Downloads](https://img.shields.io/npm/dm/@t1m0fe1/eslint-plugin-reanimated.svg)](https://www.npmjs.com/package/@t1m0fe1/eslint-plugin-reanimated)
[![Build Status](https://github.com/t1m0fe1/eslint-plugin-reanimated/workflows/CI/badge.svg)](https://github.com/t1m0fe1/eslint-plugin-reanimated/actions)

The goal of this plugin is to help you when writing animation worklets with Reanimated.

## 💿 Install & Usage

```sh
npm install --save-dev @t1m0fe1/eslint-plugin-reanimated
```

### [`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new) (requires eslint>=v8.23.0)

```js
const reanimatedPlugin = require("@t1m0fe1/eslint-plugin-reanimated");

module.exports = [
  reanimatedPlugin.configs["flat/recommended"],
  {
    rules: {
      "reanimated/js-function-in-worklet": "error",
    }
  }
]
```

To setup without the recommended configs, you'll need to add the plugin:

```js
const reanimatedPlugin = require("@t1m0fe1/eslint-plugin-reanimated");

module.exports = [
  {
    plugins: {
      reanimated: reanimatedPlugin,
    },
    rules: {
      "reanimated/js-function-in-worklet": "error",
    }
  }
]
```

### **[.eslintrc.json](https://eslint.org/docs/latest/use/configure/configuration-files)** (legacy example)

```jsonc
{
  "extends": ["plugin:reanimated/recommended"],
  "rules": {
    "reanimated/js-function-in-worklet": "error"
  }
}
```

To setup without the recommended rules you'll need to add the plugin:

```jsonc
{
  "plugins": ["reanimated"],
  "rules": {
    "reanimated/js-function-in-worklet": "error"
  }
}
```

## 📖 Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                                                 | Description                                                                                                                  | 🔧 | 💡 |
| :----------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :- | :- |
| [js-thread-on-ui-thread](docs/rules/js-thread-on-ui-thread.md)                       | Detects JavaScript thread functions being called directly on the UI thread in react-native-reanimated or extended libraries. | 🔧 | 💡 |
| [no-multiple-animated-style-usages](docs/rules/no-multiple-animated-style-usages.md) | Animated styles cannot be used multiple times. Call useAnimatedStyle() multiple times instead.                               |    |    |
| [unsupported-syntax](docs/rules/unsupported-syntax.md)                               | Some syntaxes are not a supported within a worklet.                                                                          |    |    |

<!-- end auto-generated rules list -->

## 🔧 Configs

<!-- begin auto-generated configs list -->

|    | Name               |
| :- | :----------------- |
|    | `recommended/flat` |

<!-- end auto-generated configs list -->
