import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { Layout, Text } from 'react-native-ui-kitten'
import Image from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { setShowHeavy, setShowModerate, setShowFree, setShowInfo } from '../redux/reducers/mapReducer'

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
  constructor (props) {
    super(props)
  }

  render () {
    const { mapReducer, dispatch } = this.props
    const { showHeavy, showModerate, showFree, showInfo } = mapReducer
    return (
      <Container>
        <TouchableOpacity onPress={() => dispatch(setShowInfo(!showInfo))}>
          <Image source={info} style={{ width: 50, height: 50, opacity: showInfo ? 1 : 0.35 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setShowHeavy(!showHeavy))}>
          <Image source={heavy} style={{ width: 50, height: 50, opacity: showHeavy ? 1 : 0.35 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setShowModerate(!showModerate))}>
          <Image source={moderate} style={{ width: 50, height: 50, opacity: showModerate ? 1 : 0.35 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setShowFree(!showFree))}>
          <Image source={free} style={{ width: 50, height: 50, opacity: showFree ? 1 : 0.35 }} />
        </TouchableOpacity>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapReducer: state.mapReducer
  }
}

export default connect(mapStateToProps)(MapLegend)
