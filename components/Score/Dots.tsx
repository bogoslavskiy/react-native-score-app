import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface DotsProps {
  scrollX: Animated.SharedValue<number>;
  itemsLength: number;
  interval: number;
}

const DOT_SIZE = 5;
const DOT_EXPANDED_SIZE = 16;
const DOT_INACTIVE_OPACITY = 0.3

export const Dots = React.memo((props: DotsProps) => {
  const { scrollX, interval, itemsLength } = props;

  return (
    <View style={styles.container}>
      {Array(itemsLength).fill(0).map((_, index) => (
        <Dot
          key={`score-dot-${index}`}
          index={index}
          interval={interval}
          scrollX={scrollX}
        />
      ))}
    </View>
  );
});

interface DotProps {
  scrollX: Animated.SharedValue<number>;
  interval: number;
  index: number;
}

const Dot = React.memo((props: DotProps) => {
  const { scrollX, interval, index } = props;

  const inputRange = [
    (index - 1) * interval,
    index * interval,
    (index + 1) * interval,
  ];

  const dotAnimationStyle = useAnimatedStyle(() => ({
    width: interpolate(
      scrollX.value, 
      inputRange, 
      [
        DOT_SIZE,
        DOT_EXPANDED_SIZE,
        DOT_SIZE,
      ],
      Extrapolate.CLAMP
    ),
    opacity: interpolate(
      scrollX.value, 
      inputRange, 
      [
        DOT_INACTIVE_OPACITY,
        1,
        DOT_INACTIVE_OPACITY,
      ],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <Animated.View 
      style={[
        styles.dotStyle, 
        dotAnimationStyle
      ]} 
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    marginHorizontal: 3,
    backgroundColor: '#FFF'
  },
});