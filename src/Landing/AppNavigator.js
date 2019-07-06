import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import { View, Text } from 'react-native'
import AucklandTraffic from '../AucklandTraffic/AucklandTraffic';

const StackNavigator = createStackNavigator(
  {
    LandingTabs: {
      screen: LandingTabs
    },
    AucklandTraffic: {
      screen: AucklandTraffic
    }
  },
  {
    initialRouteName: 'LandingTabs'
  }
);

export default createAppContainer(StackNavigator);
