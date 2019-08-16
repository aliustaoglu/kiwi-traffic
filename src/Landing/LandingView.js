import React from 'react'
import { Layout, TopNavigation, Text } from 'react-native-ui-kitten'
import { ScrollView, SafeAreaView, View } from 'react-native'
import { darkColours } from '../utils/colour'
import styled from 'styled-components/native'
import auckland from '../images/auckland.jpg'
import christchurch from '../images/christchurch.jpg'
import highway from '../images/highway.jpg'
import camera from '../images/camera.jpg'
import ImageCard from './ImageCard'
import SplashScreen from 'react-native-splash-screen'
import NetInfo from '@react-native-community/netinfo'
import Modal from 'react-native-modal'

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`
let unsubscribe
class LandingView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isConnected: true
    }
  }

  componentDidMount () {
    SplashScreen.hide()
    unsubscribe = NetInfo.addEventListener(netInfo => {
      this.setState({ isConnected: netInfo.isConnected && netInfo.isInternetReachable })
    })
  }

  componentWillUnmount () {
    unsubscribe()
  }

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Modal swipeDirection='down' isVisible={!this.state.isConnected}>
          <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
            <Text>You are offline!</Text>
          </View>
        </Modal>
        <TopNavigation subtitle="New Zealand's traffic updates" title='Kiwi Traffic' />
        <Layout style={{ flex: 1, backgroundColor: darkColours['color-basic-focus'], paddingTop: 50 }}>
          <ScrollView>
            <Wrapper>
              <ImageCard image={auckland} text='Auckland Traffic' routeName='AucklandTraffic' />
              <ImageCard image={highway} text='Highway Status' routeName='Treis' />
              <ImageCard image={camera} text='Traffic Cams' routeName='TrafficCams' />
              <ImageCard image={christchurch} text='Christchurch Roads' routeName='ChristchurchMap' />
            </Wrapper>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    )
  }
}

export default LandingView
