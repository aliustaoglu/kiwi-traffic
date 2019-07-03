import React, { Component } from 'react';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import Landing from './src/Landing';

global.theme = 'dark'
export default class App extends Component {
  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={dark}>
        <Landing />
      </ApplicationProvider>
    );
  }
}
