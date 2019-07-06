import React from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

const Card = styled(Layout)`
  height: 175px;
  width: 175px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ImageCard = ({ image, text, navigation, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Card>
        <ImageBackground style={{ width: 175, height: 175 }} imageStyle={{ borderRadius: 16 }} source={image} resizeMode={FastImage.resizeMode.cover}>
          <Text style={{ fontWeight: '800', fontSize: 16,  alignSelf: 'center', marginTop: 10 }}>{text}</Text>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
};

export default withNavigation(ImageCard);
