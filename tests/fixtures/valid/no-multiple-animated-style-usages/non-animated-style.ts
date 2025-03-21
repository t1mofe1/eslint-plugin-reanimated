export default {
  code: `\
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

const Component = () => {
  const style = {
    opacity: 1
  }

  return (
    <>
      <Animated.View style={style} />
      <Animated.View style={style} />
    </>
  )
}
  `,
  name: "non-animated-style",
};
