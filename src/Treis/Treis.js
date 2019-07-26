import React from 'react'
import { requireNativeComponent, ActivityIndicator } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { treisFeed, treisHeaders, markerCollection } from '../api/endpoints'
import Axios from 'axios'
import { filter } from 'ramda'
import treisDataTypes from '../enums/treisDataTypes'

const TreisMap = requireNativeComponent('TreisMapViewController')

class Treis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      data: {
        roadworks: {}
      }
    }
    this.onMapReady = this.onMapReady.bind(this)
    this.getRoadworks = this.getRoadworks.bind(this)
  }

  getRoadworks (raw) {
    console.log(raw.constructor.name)
    const filtered = filter(r => r.type === treisDataTypes.collectionTypes.Feature, raw.features)
    filtered.forEach(r => {
      console.log(r)
    })
  }

  async onMapReady () {
    const treisFeed = await Axios.get(markerCollection)
    const { roadworks, roadhazards, areawarnings, generalwarnings, roadclosures, timsigns, vmssigns } = treisFeed.data
    this.setState({ isLoading: false })
    const roadWorkMarkers = this.getRoadworks(roadworks)
    //this.getRoadworks(roadhazards)
    //this.getRoadworks(areawarnings)
    //this.getRoadworks(generalwarnings)
    //this.getRoadworks(roadclosures)
    //this.getRoadworks(timsigns)
    //this.getRoadworks(vmssigns)
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
