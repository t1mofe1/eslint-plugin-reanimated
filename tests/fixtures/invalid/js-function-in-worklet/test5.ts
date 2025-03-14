import type { InvalidTestCase } from "@typescript-eslint/rule-tester";
import {
  MESSAGE_IDS,
  type MessageIds,
  type Options,
} from "src/rules/js-function-in-worklet";

export default {
  code: `\
import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withDecay,
  useAnimatedReaction,
} from "react-native-reanimated";
import {toRad} from "react-native-redash";

const objectKeys = () => Object.keys;

const Camera = ({ camera, canvas }: CameraProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      x: number;
      y: number;
    }
  >({
    onStart: (e, ctx) => {
      const foo = objectKeys({});
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + toRad(translationX, canvas.x);
      y.value = ctx.y + toRad(translationY, canvas.y);
    },
    onEnd: ({ velocityX, velocityY }) => {
      x.value = withDecay({
        velocity: velocityX,
      });
      y.value = withDecay({
        velocity: velocityY,
      });
    },
  });
  return null;
};

export default Camera;
  `,
  name: "test5",
  errors: [
    {
      messageId: MESSAGE_IDS.jsThreadOnUiThread,
      data: {
        name: "objectKeys",
      },
      // line: 28,
      // column: 19,
      // endColumn: 29,
    },
  ],
} as InvalidTestCase<MessageIds, Options>;
