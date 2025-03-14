import type { TestCaseError } from "@typescript-eslint/rule-tester";
import { messageId } from "src/rules/no-multiple-animated-style-usages";

export default {
  code: `\
import {StyleSheet} from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

const Component = () => {
  const opacity = useSharedValue(1)

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <>
      <Animated.View style={[styles.style1, style]} />
      <Animated.View style={[style]} />
    </>
  )
}

const styles = StyleSheet.create({
  style1: {},
})
  `,
  name: "array",
  errors: [
    {
      messageId,
      data: {
        name: "style",
      },
      line: 13,
      column: 45,
      endColumn: 50,
    },
    {
      messageId,
      data: {
        name: "style",
      },
      line: 14,
      column: 30,
      endColumn: 35,
    },
  ] as TestCaseError<typeof messageId>[],
};
