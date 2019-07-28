import { NativeModules } from 'react-native'
// https://github.com/kmagiera/react-native-gesture-handler/issues/344
Object.assign(NativeModules, {
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {}
  },
  PlatformConstants: {
    forceTouchAvailable: false
  }
})

jest.mock("YellowBox");
