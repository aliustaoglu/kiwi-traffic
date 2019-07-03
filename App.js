import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, requireNativeComponent} from 'react-native';

const Navigator = requireNativeComponent('NavigatorView')

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Welcome to React Native!</Text>
        <Navigator />
      </View>
    );
  }
}
