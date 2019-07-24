import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Layout, Text, BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation';
import LandingView from './LandingView';

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
      <BottomNavigationTab title="Settings" />
    </BottomNavigation>
  );
};

const Settings = () => {
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <Layout>
        <Text>SETTTT</Text>
      </Layout>
    </SafeAreaView>
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
