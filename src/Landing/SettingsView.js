import React from 'react'
import { SafeAreaView, Image, Dimensions } from 'react-native'
import { Layout, Text, TopNavigation } from 'react-native-ui-kitten'
import { darkColours } from '../utils/colour'
import styled from 'styled-components/native'

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

class SettingsView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const width = Dimensions.get('window').width
    const titleLeft = width / 2 - 100
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Image source={about} style={{ width, height: 200 }} />
        <TitleContainer style={{ left: titleLeft }}>
          <Text>Kiwi Traffic</Text>
        </TitleContainer>
        <Layout style={{ display: 'flex', alignItems: "flex-end", backgroundColor: bgColor }}>
          <Text style={{ fontSize: 8 }}>Photo by Stas Kulesh on Unsplash</Text>
        </Layout>
        <Layout style={{ flex: 1, backgroundColor: bgColor, padding: 10 }}>
          <Text>This is an open source, non-profit project made with React Native. It's free and does not contain any ads.</Text>
        </Layout>
      </SafeAreaView>
    )
  }
}

export default SettingsView
