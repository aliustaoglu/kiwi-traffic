import React from 'react'
import { SafeAreaView, Image, Dimensions, Linking } from 'react-native'
import { Layout, Text } from 'react-native-ui-kitten'
import { darkColours } from '../utils/colour'
import styled from 'styled-components/native'
import Icon from 'react-native-ionicons'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

const about = require('../images/about.jpg')
const bgColor = darkColours['color-basic-focus']

const TitleContainer = styled(Layout)`
  position: absolute;
  width: 200px;
  height: 40px;
  top: 160px;
  background-color: ${bgColor};
  border-top-left-radius: 64px;
  border-top-right-radius: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TitleText = styled(Text)`
  font-size: 18px;
  font-weight: 800;
`

const SocialIcon = styled(Icon)`
  color: #fff;
  margin-right: 8px;
`

const SocialLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

const CreditText = styled(Text)`
  font-size: 8px;
`

class SettingsView extends React.Component {
  constructor (props) {
    super(props)
    this.onClickSocial = this.onClickSocial.bind(this)
    this.onClickCredit = this.onClickCredit.bind(this)
  }

  onClickCredit = linkType => e => {
    if (linkType === 'about') Linking.openURL('https://unsplash.com/@kulesh')
    if (linkType === 'auckland') Linking.openURL('https://unsplash.com/@samferrara')
    if (linkType === 'highway') Linking.openURL('https://unsplash.com/@johnnyabroad')
  }

  onClickSocial = linkType => e => {
    if (linkType === 'home') Linking.openURL('https://cuneyt.aliustaoglu.biz/en')
    if (linkType === 'linkedin') Linking.openURL('https://www.linkedin.com/in/aliustaoğlu')
    if (linkType === 'github') Linking.openURL('https://github.com/aliustaoglu/kiwi-traffic')
    if (linkType === 'youtube') Linking.openURL('https://www.youtube.com/user/hoshmack')
  }

  render () {
    const width = Dimensions.get('window').width
    const titleLeft = width / 2 - 100
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Image source={about} style={{ width, height: 200 }} />
        <TitleContainer style={{ left: titleLeft }}>
          <TitleText>Kiwi Traffic</TitleText>
        </TitleContainer>
        <Layout style={{ flex: 1, backgroundColor: bgColor, padding: 10 }}>
          <ScrollView>
            <Text>
              This is an open source, non-profit project made with React Native. It's free and does not contain any ads. You can send your ideas, bug reports or
              even pull requests using the repository.
            </Text>
            <Text />
            <Text>Developed by Cüneyt Aliustaoğlu</Text>
            <Text />
            <Text>
              I am a full stack developer based in Auckland. If you want to work with me connect via LinkedIn or GitHub. I am a bedroom musician. See my videos
              on YouTube.
            </Text>
            <SocialLayout>
              <TouchableOpacity onPress={this.onClickSocial('home')}>
                <SocialIcon name='home' />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClickSocial('linkedin')}>
                <SocialIcon name='logo-linkedin' />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClickSocial('github')}>
                <SocialIcon name='logo-github' />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClickSocial('youtube')}>
                <SocialIcon name='logo-youtube' />
              </TouchableOpacity>
            </SocialLayout>
            <Text />
            <TitleText style={{ textAlign: 'center' }}>Credits</TitleText>
            <Layout style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: bgColor }}>
              <TouchableOpacity onPress={this.onClickCredit('about')}>
                <CreditText>About Photo by Stas Kulesh on Unsplash</CreditText>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClickCredit('auckland')}>
                <CreditText>Auckland Photo by Samuel Ferrara on Unsplash</CreditText>
              </TouchableOpacity>
              <TouchableOpacity>
                <CreditText>Christchurch Photo by Unknown</CreditText>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClickCredit('highway')}>
                <CreditText>Highway Photo by Jean-Pierre Brungs on Unsplash </CreditText>
              </TouchableOpacity>
            </Layout>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    )
  }
}

export default SettingsView
