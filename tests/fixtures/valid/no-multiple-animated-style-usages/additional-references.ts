export default {
  code: `\
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

const Component = () => {
  const style = useAnimatedStyle(() => ({
    opacity: 1
  }))

  console.log({style})

  return (
    <Animated.View style={style} />
  )
}
  `,
  name: "additional-references",
};
