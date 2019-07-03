import React from 'react';
import { Layout, Text, Button, TopNavigation } from 'react-native-ui-kitten';
import { ScrollView } from 'react-native';
import { darkColours } from './utils/colour';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const Card = styled(Layout)`
  height: 150;
  width: 175;
  border-radius: 16;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Landing extends React.Component {
  render() {
    return (
      <>
        <TopNavigation subtitle="New Zealand's traffic updates" title="Kiwi Traffic" />
        <Layout style={{ flex: 1, backgroundColor: darkColours['color-basic-focus'] }}>
          <ScrollView>
            <TouchableOpacity>
              <Card>
                <Text>Auckland</Text>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </Layout>
      </>
    );
  }
}

export default Landing;
