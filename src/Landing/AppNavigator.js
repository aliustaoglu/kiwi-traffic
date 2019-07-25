import { createAppContainer, createStackNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import AucklandTraffic from '../AucklandTraffic/AucklandTraffic';
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