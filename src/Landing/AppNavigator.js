import { createAppContainer, createStackNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import AucklandTraffic from '../AucklandTraffic/AucklandTraffic';
import Treis from '../Treis/Treis';
import TrafficCams from '../TrafficCams/TrafficCams';

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
    },
    TrafficCams: {
      screen: TrafficCams
    }
  },
  {
    initialRouteName: 'LandingTabs'
  }
);

export default createAppContainer(StackNavigator);