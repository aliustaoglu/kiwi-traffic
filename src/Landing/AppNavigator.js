import { createAppContainer, createStackNavigator } from 'react-navigation';
import LandingTabs from './LandingTabs';
import AucklandTraffic from '../AucklandTraffic/AucklandTraffic';
import Treis from '../Treis/Treis';
import TrafficCams from '../TrafficCams/TrafficCams';
import ChristchurchMap from '../ChristchurchTraffic/ChristchurchMap';

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
    },
    ChristchurchMap: {
      screen: ChristchurchMap
    }
  },
  {
    initialRouteName: 'LandingTabs'
  }
);

export default createAppContainer(StackNavigator);