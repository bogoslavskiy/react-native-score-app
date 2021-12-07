import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { ScoreValueSymbol } from './ScoreValueSymbol';

interface ScoreValuesProps {
  scrollX: Animated.SharedValue<number>;
  value: number;
  areaSize: { width: number; height: number };
  scrollInterval: number;
  index: number;
} 

export const ScoreValue = React.memo((props: ScoreValuesProps) => {
  const { value, scrollX, areaSize, index, scrollInterval } = props;

  const symbols = React.useMemo(() => Array.from(String(value)), []);

  const translateStyle = useAnimatedStyle(() => ({
    transform: [{ 
      translateY: interpolate(
        -scrollX.value, 
        [index * scrollInterval, (index + 1) * scrollInterval], 
        [index * areaSize.height, (index + 1) * areaSize.height],
      ),  
    }]
  }));

  return (
    <Animated.View 
      key={`score-value-${index}`}
      style={[
        styles.container, 
        areaSize, 
        translateStyle,
      ]} 
    >
      <View style={styles.symbolsContainer}>
        {symbols.map((symbol, symbolIndex) => (
          <ScoreValueSymbol
            key={`symbol-${index}-${symbolIndex}`}
            areaSize={areaSize}
            symbolsLength={symbols.length}
            scrollX={scrollX} 
            scrollInterval={scrollInterval}
            symbolIndex={symbolIndex}
            scoreIndex={index}
            value={symbol}
          />
        ))}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolsContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});