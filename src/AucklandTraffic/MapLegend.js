import React from 'react'
import styled from 'styled-components/native'
import { Layout, Text } from 'react-native-ui-kitten'
import Image from 'react-native-fast-image'

const info = require('../../android/app/src/main/assets/img/info.png')
const heavy = require('../../android/app/src/main/assets/img/traffic-heavy.png')
const moderate = require('../../android/app/src/main/assets/img/traffic-moderate.png')
const free = require('../../android/app/src/main/assets/img/traffic-free.png')

const Container = styled(Layout)`
  position: absolute;
  bottom: 0px;
  display: flex;
  height: 10%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

class MapLegend extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
      <Container>
        <Image source={info} style={{ width: 50, height: 50, opacity: 0.3 }} />
        <Image source={heavy} style={{ width: 50, height: 50, opacity: 0.3 }} />
        <Image source={moderate} style={{ width: 50, height: 50, opacity: 0.3 }} />
        <Image source={free} style={{ width: 50, height: 50, opacity: 0.3 }} />
      </Container>
    )
  }
}

export default MapLegend
