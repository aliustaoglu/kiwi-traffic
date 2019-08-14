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
import SplashScreen from 'react-native-splash-screen'

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;

class LandingView extends React.Component {
  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <TopNavigation subtitle="New Zealand's traffic updates" title="Kiwi Traffic" />
        <Layout style={{ flex: 1, backgroundColor: darkColours['color-basic-focus'], paddingTop: 50 }}>
          <ScrollView>
            <Wrapper>
              <ImageCard image={auckland} text="Auckland Traffic" routeName="AucklandTraffic" />
              <ImageCard image={highway} text="Highway Status" routeName="Treis" />
              <ImageCard image={camera} text="Traffic Cams" routeName="TrafficCams" />
              <ImageCard image={christchurch} text="Christchurch Roads" routeName="ChristchurchMap" />
            </Wrapper>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }
}

export default LandingView;
