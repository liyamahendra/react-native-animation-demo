import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
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
  const translation = {
    x: useSharedValue((width / 2) - (styles.animatedView.width / 2)),
    y: useSharedValue(0),
  };
  
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, context) => {
      context.startX = translation.x.value;
      context.startY = translation.y.value;
    },
    onActive: (event, context) => {
      translation.x.value = context.startX + event.translationX;
      translation.y.value = context.startY + event.translationY;
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
      backgroundColor: "blue"
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