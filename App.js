import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Routes from './routes.js';
import storyblok from './utilities/storyblok'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Routes />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
