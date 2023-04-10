import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { AnimatedGHContext } from './types';

export default function Touchable(): React.ReactElement {
  const {width} = useWindowDimensions();

  const initialX = (width / 2) - (styles.animatedView.width / 2);
  const initialY = 0;

  const translation = {
    x: useSharedValue(initialX),
    y: useSharedValue(initialY),
  };
  
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = translation.x.value;
      ctx.startY = translation.y.value;
    },
    onActive: (event, ctx) => {
      translation.x.value = ctx.startX + event.translationX;
      translation.y.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      translation.x.value = withSpring(initialX);
      translation.y.value = withSpring(initialY);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translation.x.value,
        },
        {
          translateY: translation.y.value,
        },
      ],
      backgroundColor: "red"
    };
  });

  return (
    <View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.animatedView,
            animatedStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});