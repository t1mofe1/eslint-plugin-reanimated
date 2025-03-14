import type { TestCaseError } from "@typescript-eslint/rule-tester";
import { messageId } from "src/rules/no-multiple-animated-style-usages";

export default {
  code: `\
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

const Component = () => {
  const opacity = useSharedValue(1)

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <>
      <Animated.View style={style} />
      <Animated.View style={style} />
    </>
  )
}
  `,
  name: "multiple",
  errors: [
    {
      messageId,
      data: {
        name: "style",
      },
      line: 12,
      column: 29,
      endColumn: 34,
    },
    {
      messageId,
      data: {
        name: "style",
      },
      line: 13,
      column: 29,
      endColumn: 34,
    },
  ] as TestCaseError<typeof messageId>[],
};
