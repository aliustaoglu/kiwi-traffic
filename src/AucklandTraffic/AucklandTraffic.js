import React from 'react';
import { Layout, Text } from 'react-native-ui-kitten';
import { SafeAreaView } from 'react-navigation';
import MapView from '../Map/MapView';
import axios from 'axios'

class AucklandTraffic extends React.Component {

  componentDidMount(){
    
  }

  render() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <MapView />
        </Layout>
      </SafeAreaView>
    );
  }
}

export default AucklandTraffic;
