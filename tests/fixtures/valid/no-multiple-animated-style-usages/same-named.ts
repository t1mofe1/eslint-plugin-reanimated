export default {
  code: `\
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated'

const Component = () => {
  const opacity = useSharedValue(1)

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <Animated.View style={style} />
  )
}

const OtherComponent = () => {
  const opacity = useSharedValue(1)

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <Animated.View style={style} />
  )
}

/*
const AddPageIndicator = ({selectedPage, index}: Props) => {
  const {colors} = useTheme();
  const style = useAnimatedStyle(() => ({
    backgroundColor: selectedPage.value === index ? colors.TextNeutral : colors.TextSubdued,
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.verticalBar, style]} />
      <Animated.View style={[styles.horizontalBar, style]} />
    </View>
  );
};
*/
  `,
  name: "same-named",
};
