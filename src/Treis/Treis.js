import React from 'react'
import { requireNativeComponent, ActivityIndicator } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { markerCollection } from '../api/endpoints'
import Axios from 'axios'
import { filter } from 'ramda'
import treisDataTypes from '../enums/treisDataTypes'

const TreisMap = requireNativeComponent('TreisMapViewController')

class Treis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      data: []
    }
    this.onMapReady = this.onMapReady.bind(this)
    this.flattenData = this.flattenData.bind(this)
  }

  flattenData (raw) {
    const keys = Object.keys(raw)
    let markers = []
    let extendedMarkers = []
    keys.forEach(key => {
      const filtered = filter(r => r.type === treisDataTypes.collectionTypes.Feature, raw[key].features)
      filtered.forEach(m => {
        let marker = {}
        marker.coordinates = m.geometry.coordinates
        marker.markerType = key
        marker.id = m.properties.id
        marker.properties = m.properties
        markers.push(marker)
      })
    })
    return markers
  }

  async onMapReady () {
    const treisFeed = await Axios.get(markerCollection)
    const treisData = this.flattenData(treisFeed.data)
    this.setState({ isLoading: false, data: treisData })
  }

  render () {
    console.log(this.state)
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <If condition={this.state.isLoading}>
            <ActivityIndicator style={{ height: '100%' }} />
          </If>
          <TreisMap data={this.state.data} onMapReady={this.onMapReady} style={{ height: '100%' }} latLng={{ lat: -38.6857, lng: 176.0702 }} zoom={7} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default Treis
