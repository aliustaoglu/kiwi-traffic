import React, { Component } from 'react';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import AppNavigator from './src/Landing/AppNavigator';

global.theme = 'dark'
export default class App extends Component {
  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={dark}>
        <AppNavigator />
      </ApplicationProvider>
    );
  }
}
