import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation';
import LandingView from './LandingView';
import SettingsView from './SettingsView';

const BottomBar = props => {
  const routes = props.navigation.state.routes;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = idx => {
    props.navigation.navigate(routes[idx].key);
    setSelectedIndex(idx);
  };
  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={onSelect}>
      <BottomNavigationTab title="Home" />
      <BottomNavigationTab title="About" />
    </BottomNavigation>
  );
};


export default createBottomTabNavigator(
  {
    LandingView: LandingView,
    SettingsView: SettingsView
  },
  {
    initialRouteName: 'LandingView',
    navigationOptions: {
      header: null
    },
    tabBarComponent: BottomBar
  }
);
