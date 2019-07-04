import React, { useState } from 'react';
import { Layout, Text, Button, TopNavigation, BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation';
import LandingView from './LandingView';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BottomBar = props => {
  const routes = props.navigation.state.routes;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = idx => {
    props.navigation.navigate(routes[idx].key)
    setSelectedIndex(idx)
  };
  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={onSelect}>
      <BottomNavigationTab title="Home" />
      <BottomNavigationTab title="Settings" />
    </BottomNavigation>
  );
};

const Settings = () => {
  return (
    <Layout>
      <Text>SETTTT</Text>
    </Layout>
  );
};

Settings.navigationSettings = {
  headerText: 'deneme'
};

export default createBottomTabNavigator(
  {
    LandingView: LandingView,
    Settings: Settings
  },
  {
    initialRouteName: 'LandingView',
    navigationOptions: {
      header: null
    },
    tabBarComponent: BottomBar
  }
);
