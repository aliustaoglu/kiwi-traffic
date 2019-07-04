import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import { View, Text } from 'react-native'

const StackNavigator = createStackNavigator(
  {
    LandingTabs: {
      screen: LandingTabs
    }
  },
  {
    initialRouteName: 'LandingTabs'
  }
);

export default createAppContainer(StackNavigator);
