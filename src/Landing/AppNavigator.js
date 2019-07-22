import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import { View, Text } from 'react-native'
import AucklandTraffic from '../AucklandTraffic/AucklandTraffic';
import { infoConnectUser } from 'react-native-dotenv'
import CameraDetail from '../AucklandTraffic/CameraDetail';

const StackNavigator = createStackNavigator(
  {
    LandingTabs: {
      screen: LandingTabs
    },
    AucklandTraffic: {
      screen: AucklandTraffic
    },
    CameraDetail: {
      screen: CameraDetail
    }
  },
  {
    initialRouteName: 'AucklandTraffic'
  }
);

export default createAppContainer(StackNavigator);

console.log(infoConnectUser)