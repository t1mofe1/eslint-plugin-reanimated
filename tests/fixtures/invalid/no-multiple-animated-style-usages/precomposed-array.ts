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

  const styles = [style]

  return (
    <>
      <Animated.View style={style} />
      <Animated.View style={styles} />
    </>
  )
}
  `,
  name: "precomposed-array",
  errors: [
    {
      messageId,
      data: {
        name: "style",
      },
      line: 14,
      column: 29,
      endColumn: 34,
    },
    {
      messageId,
      data: {
        name: "styles",
      },
      line: 15,
      column: 29,
      endColumn: 35,
    },
  ] as TestCaseError<typeof messageId>[],
};
