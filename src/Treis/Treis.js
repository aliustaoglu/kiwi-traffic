import React from 'react'
import { requireNativeComponent, ActivityIndicator } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { treisFeed, treisHeaders, markerCollection } from '../api/endpoints'
import Axios from 'axios'
import { parseString } from 'react-native-xml2js'
import { objectWithoutKey } from '../utils/dataUtil'

const TreisMap = requireNativeComponent('TreisMapViewController')

const getData = result => {
  console.log(JSON.stringify(result))
  const roadEvent = result['tns:GetTreisInfoResponse']['tns:roadEvent']
  console.log(objectWithoutKey(roadEvent[0], ['tns:wktGeometry']))
}
class Treis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
    this.onMapReady = this.onMapReady.bind(this)
  }

  async onMapReady () {
    const treisFeed = await Axios.get(markerCollection)
    const {areawarnings, roadworks} =  treisFeed.data
    this.setState({ isLoading: false })
    console.log(roadworks)
  }

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <If condition={this.state.isLoading}>
            <ActivityIndicator style={{ height: '100%' }} />
          </If>
          <TreisMap onMapReady={this.onMapReady} style={{ height: '100%' }} latLng={{ lat: -38.6857, lng: 176.0702 }} zoom={7} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default Treis
