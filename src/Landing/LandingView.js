import React from 'react';
import { Layout, TopNavigation } from 'react-native-ui-kitten';
import { ScrollView, SafeAreaView } from 'react-native';
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

class LandingView extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <TopNavigation subtitle="New Zealand's traffic updates" title="Kiwi Traffic" />
        <Layout style={{ flex: 1, backgroundColor: darkColours['color-basic-focus'], paddingTop: 50 }}>
          <ScrollView>
            <Wrapper>
              <ImageCard image={auckland} text="Auckland Traffic" routeName="AucklandTraffic" />
              <ImageCard image={christchurch} text="Christchurch Traffic" />
              <ImageCard image={highway} text="Highway Traffic" routeName="Treis" />
              <ImageCard image={camera} text="Traffic Cams" routeName="TrafficCams" />
            </Wrapper>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }
}

export default LandingView;
