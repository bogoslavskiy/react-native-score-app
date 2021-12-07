import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Score } from './components/Score/Score';
import useCachedResources from './hooks/useCachedResources';

const scoreItems = [
  { title: 'Mindful minutes', value: 0 },
  { title: 'Current streak', value: 8888 },
  { title: 'Longest streak', value: 33 },
  { title: 'Episodes completed', value: 77777 },
];

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Score items={scoreItems} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090110',
    paddingTop: Constants.statusBarHeight
  },
  scoreContainer: {
    marginTop: 50
  }
});
