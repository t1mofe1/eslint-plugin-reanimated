# Animated styles cannot be used multiple times. Call useAnimatedStyle() multiple times instead (`@t1m0fe1/reanimated/no-multiple-animated-style-usages`)

<!-- end auto-generated rule header -->

Disallow to use an animated style in multiple components

The following example is considered invalid:

```ts
const style = useAnimatedStyle(() => {});
return (
  <>
    <Animated.View style={style} />
    <Animated.View style={style} />
  </>
);
```
