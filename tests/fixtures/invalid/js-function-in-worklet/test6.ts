import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix } from "react-native-redash";

import { Card, Cards, StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);
const origin2 = () => -(width / 2 - StyleGuide.spacing * 2);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  transition: Animated.SharedValue<number>;
  index: number;
  card: Cards;
}

const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
  const style = useAnimatedStyle(() => {
    origin2();
    const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);
    return {
      transform: [
        { translateX: origin },
        { rotate: \`\${rotate}rad\` },
        { translateX: -origin },
      ],
    };
  });
  return (
    null
  );
};

export default AnimatedCard;
  `,
  name: "test6",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "origin2",
      },
      // line: 27,
      // column: 5,
      // endColumn: 12,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
