import React from 'react';
import { Layout, Text } from 'react-native-ui-kitten';
import { SafeAreaView } from 'react-navigation';

class AucklandTraffic extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <Text>Auckland</Text>
        </Layout>
      </SafeAreaView>
    );
  }
}

export default AucklandTraffic;
