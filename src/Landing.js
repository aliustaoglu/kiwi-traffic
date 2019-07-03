import React from 'react';
import { Layout, Text, Button, TopNavigation } from 'react-native-ui-kitten';
import { ScrollView, View, ImageBackground } from 'react-native';
import { darkColours } from './utils/colour';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import auckland from './images/auckland.jpg';
import christchurch from './images/christchurch.jpg';
import highway from './images/highway.jpg';
import camera from './images/camera.jpg';

const Card = styled(Layout)`
  height: 175px;
  width: 175px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;

class Landing extends React.Component {
  render() {
    return (
      <>
        <TopNavigation subtitle="New Zealand's traffic updates" title="Kiwi Traffic" />
        <Layout style={{ flex: 1, backgroundColor: darkColours['color-basic-focus'], paddingTop: 50 }}>
          <ScrollView>
            <Wrapper>
              <TouchableOpacity>
                <Card>
                  <ImageBackground
                    style={{ width: 175, height: 175 }}
                    imageStyle={{ borderRadius: 16 }}
                    source={auckland}
                    resizeMode={FastImage.resizeMode.cover}
                  >
                    <Text style={{ alignSelf: 'center', marginTop: 10 }}>Auckland Traffic</Text>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity>
                <Card>
                  <ImageBackground
                    style={{ width: 175, height: 175 }}
                    imageStyle={{ borderRadius: 16 }}
                    source={christchurch}
                    resizeMode={FastImage.resizeMode.cover}
                  >
                    <Text style={{ alignSelf: 'center', marginTop: 10 }}>Christchurch Traffic</Text>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity>
                <Card>
                <ImageBackground
                    style={{ width: 175, height: 175 }}
                    imageStyle={{ borderRadius: 16 }}
                    source={highway}
                    resizeMode={FastImage.resizeMode.cover}
                  >
                    <Text style={{ alignSelf: 'center', marginTop: 10 }}>Highway Traffic</Text>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity>
                <Card>
                <ImageBackground
                    style={{ width: 175, height: 175 }}
                    imageStyle={{ borderRadius: 16 }}
                    source={camera}
                    resizeMode={FastImage.resizeMode.cover}
                  >
                    <Text style={{ alignSelf: 'center', marginTop: 10 }}>Traffic Cameras</Text>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>
            </Wrapper>
          </ScrollView>
        </Layout>
      </>
    );
  }
}

export default Landing;
