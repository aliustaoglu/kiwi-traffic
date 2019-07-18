import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import { View, Text } from 'react-native'
import AucklandTraffic from '../AucklandTraffic/AucklandTraffic';
import { infoConnectUser } from 'react-native-dotenv'

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
    initialRouteName: 'AucklandTraffic'
  }
);

export default createAppContainer(StackNavigator);

console.log(infoConnectUser)