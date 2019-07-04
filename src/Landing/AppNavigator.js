import { createAppContainer, createStackNavigator } from 'react-navigation';
import Landing from './Landing';
import { View, Text } from 'react-native'

const StackNavigator = createStackNavigator(
  {
    Landing: {
      screen: Landing
    }
  },
  {
    initialRouteName: 'Landing'
  }
);

export default createAppContainer(StackNavigator);
