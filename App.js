import React, { Component } from 'react';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import AppNavigator from './src/Landing/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

global.theme = 'dark'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={dark}>
        <AppNavigator />
      </ApplicationProvider>
      </Provider>
    );
  }
}
