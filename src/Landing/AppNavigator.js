import { createAppContainer, createStackNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import AucklandTraffic from '../AucklandTraffic/AucklandTraffic';
import CameraDetail from '../AucklandTraffic/CameraDetail';
import Treis from '../Treis/Treis';

const StackNavigator = createStackNavigator(
  {
    LandingTabs: {
      screen: LandingTabs
    },
    AucklandTraffic: {
      screen: AucklandTraffic
    },
    Treis: {
      screen: Treis
    }
  },
  {
    initialRouteName: 'LandingTabs'
  }
);

export default createAppContainer(StackNavigator);