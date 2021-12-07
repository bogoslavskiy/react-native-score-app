import * as React from 'react';
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { EuclidText } from '../EuclidText';
import { Dots } from './Dots';
import { ScoreValue } from './ScoreValue';

type ScoreItem = {
  title: string;
  value: number;
}

interface ScoreProps {
  items: ScoreItem[]
}

const TITLE_AREA_WIDTH = 135;
const VALUE_CONTAINER_SIZE = { width: 104, height: 67 };
const DEBUG = false;

export const Score: React.FC<ScoreProps> = ({ items }) => {
  const { width: screenWidth } = useWindowDimensions();

  const horizontalInset = ((screenWidth / 2) - (TITLE_AREA_WIDTH / 2));

  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.containerScore}>
        <Image source={require('../../assets/icons/score-corner-left.png')} />
        <View style={[styles.valuesContainer, VALUE_CONTAINER_SIZE]}>
          <LinearGradient
            colors={['#090110', 'transparent']}
            style={[
              styles.verticalGradient, 
              styles.verticalGradientTop, 
              { width: VALUE_CONTAINER_SIZE.width }
            ]} 
          />
          {items.map((score, index) => (
            <ScoreValue 
              key={index}
              scrollX={scrollX}
              value={score.value}
              scrollInterval={TITLE_AREA_WIDTH}
              areaSize={VALUE_CONTAINER_SIZE}
              index={index}
            />
          ))}
          <LinearGradient
            colors={['transparent', '#090110']}
            style={[
              styles.verticalGradient, 
              styles.verticalGradientBottom,  
              { width: VALUE_CONTAINER_SIZE.width }
            ]} 
          />
        </View>
        <Image source={require('../../assets/icons/score-corner-right.png')} />
      </View>
      <View style={styles.scrollViewContainer}>
        <Animated.ScrollView 
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          horizontal={true}
          style={styles.scrollView}
          decelerationRate={0}
          snapToInterval={TITLE_AREA_WIDTH}
          snapToAlignment="start"
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingHorizontal: horizontalInset }
          ]}
        > 
          {items.map((score, index) => (
            <View 
              key={`score-title-${index}`}
              style={styles.titleContainer}
            >
              <EuclidText style={styles.titleText}>
                {score.title}
              </EuclidText>
            </View>
          ))}    
        </Animated.ScrollView>
        <LinearGradient
          pointerEvents="none"
          colors={['transparent', '#090110']}
          start={[0, 3]}
          end={[1, 0]}
          style={[
            styles.horizontalGradient,
            styles.horizontalGradientRight,
            { width: horizontalInset }  
          ]} 
        /> 
        <LinearGradient
          pointerEvents="none"
          colors={['transparent', '#090110']}
          start={[1, 3]}
          end={[0, 1]}
          style={[
            styles.horizontalGradient,
            styles.horizontalGradientLeft,
            { width: horizontalInset }        
          ]} 
        />
      </View>
      <Dots 
        scrollX={scrollX}
        itemsLength={items.length}
        interval={TITLE_AREA_WIDTH}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScore: {
    flexDirection: 'row',
    marginBottom: -100,
    width: 212,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valuesContainer: {
    marginHorizontal: 12,
    overflow: 'hidden'
  },
  scrollViewContainer: {
    flexDirection: 'row', 
    marginBottom: 16
  },
  scrollView: {
    height: 135
  },
  scrollViewContent: {
    alignItems: 'flex-end',
  },
  titleContainer: {
    width: TITLE_AREA_WIDTH,
    height: 20
  },
  titleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#FFF',
    textAlign: 'center'
  },
  verticalGradient: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    height: 14,
  },
  verticalGradientTop: {
    top: 0,
  },
  verticalGradientBottom: {
    bottom: 0,
  },
  horizontalGradient: {
    position: 'absolute',
    height: 20,
    bottom: 0,
    zIndex: 1,
  },
  horizontalGradientLeft: {
    left: 0,
  },
  horizontalGradientRight: {
    right: 0,
  },
});
