import React from 'react'
import styled from 'styled-components/native'
import { Layout } from 'react-native-ui-kitten'

const Container = styled(Layout)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 10%;
`

class MapLegend extends React.Component {
  render () {
    return <Container />
  }
}

export default MapLegend
