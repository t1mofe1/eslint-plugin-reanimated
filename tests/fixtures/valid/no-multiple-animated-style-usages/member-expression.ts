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
      <Animated.View style={style} />
      <Animated.View style={styles.style} />
    </>
  )
}

const styles = StyleSheet.create({
  style: {
    height: 100,
  },
})
  `,
  name: "member-expression",
};
