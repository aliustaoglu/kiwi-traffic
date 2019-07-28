import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { Layout } from 'react-native-ui-kitten'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { setShowHeavy, setShowModerate, setShowFree, setShowInfo, setShowCamera } from '../redux/reducers/mapReducer'
import { withNavigation } from 'react-navigation';


const info = require('../../android/app/src/main/assets/img/info.png')
const heavy = require('../../android/app/src/main/assets/img/traffic-heavy.png')
const moderate = require('../../android/app/src/main/assets/img/traffic-moderate.png')
const free = require('../../android/app/src/main/assets/img/traffic-free.png')
const camImg = require('../../android/app/src/main/assets/img/traffic-cams.png')
const back = require('../images/back.png')

const Container = styled(Layout)`
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  height: 10%;
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const ContainerLeft = styled(Layout)`
  display: flex;
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
    const { showHeavy, showModerate, showFree, showInfo, showCamera } = mapReducer
    return (
      <Container testID="testMapLegendContainer">
        <ContainerLeft>
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
          <TouchableOpacity onPress={() => dispatch(setShowCamera(!showCamera))}>
            <Image source={camImg} style={{ width: 50, height: 50, opacity: showCamera ? 1 : 0.35 }} />
          </TouchableOpacity>
        </ContainerLeft>
        <Layout style={{ marginRight: 8 }}>
          <TouchableOpacity onPress={ () => this.props.navigation.goBack(null) }>
            <Image source={back} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </Layout>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapReducer: state.mapReducer
  }
}

export default connect(mapStateToProps)(withNavigation(MapLegend))
