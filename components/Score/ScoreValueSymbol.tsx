import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { EuclidText } from '../EuclidText';

interface ScoreValueSymbolProps {
  scrollX: Animated.SharedValue<number>;
  symbolsLength: number;
  symbolIndex: number;
  scoreIndex: number;
  value: string;
  areaSize: { width: number; height: number };
  scrollInterval: number;
}

export const ScoreValueSymbol = React.memo((props: ScoreValueSymbolProps) => {
  const { scrollX, symbolIndex, scoreIndex,  value, symbolsLength, areaSize, scrollInterval } = props;
  const square = Math.sqrt(areaSize.width * areaSize.height / symbolsLength); 
  const fontSize = Math.min(square, 56);
  const shift = symbolIndex * (square * 0.5);

  const inputRange = [
    (scoreIndex - 1) * scrollInterval,
    scoreIndex * scrollInterval,
    (scoreIndex + 1) * scrollInterval,
  ];

  const symbolStyle = useAnimatedStyle(() => ({
    transform: [{ 
      translateY: interpolate(
        scrollX.value, 
        inputRange, 
        [shift, 0, -shift],
        Extrapolate.CLAMP
      )
    }]
  }));

  const textStyle = { fontSize };

  return (
    <Animated.View style={symbolStyle}>
      <EuclidText style={[styles.symbolText, textStyle]}>
        {value}
      </EuclidText>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  symbolText: {
    fontSize: 56,
    color: '#FFF',
  }
});