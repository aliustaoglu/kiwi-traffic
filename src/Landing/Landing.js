import React from 'react';
import { Layout, Text, Button, TopNavigation, BottomNavigation } from 'react-native-ui-kitten';
import { ScrollView } from 'react-native';
import { darkColours } from '../utils/colour';
import styled from 'styled-components/native';
import auckland from '../images/auckland.jpg';
import christchurch from '../images/christchurch.jpg';
import highway from '../images/highway.jpg';
import camera from '../images/camera.jpg';
import ImageCard from './ImageCard';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;

class Landing extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  render() {
    return (
      <>
        <TopNavigation subtitle="New Zealand's traffic updates" title="Kiwi Traffic" />
        <Layout style={{ flex: 1, backgroundColor: darkColours['color-basic-focus'], paddingTop: 50 }}>
          <ScrollView>
            <Wrapper>
              <ImageCard image={auckland} text="Auckland Traffic" />
              <ImageCard image={christchurch} text="Christchurch Traffic" />
              <ImageCard image={highway} text="Highway Traffic" />
              <ImageCard image={camera} text="Traffic Cams" />
            </Wrapper>
          </ScrollView>
        </Layout>
        <BottomNavigation selectedIndex={1}>
          <Layout>
            <Text>Settings</Text>
          </Layout>
          <Layout>
            <Text>About</Text>
          </Layout>
        </BottomNavigation>
      </>
    );
  }
}

export default Landing;
