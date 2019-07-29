import React from 'react'
import { requireNativeComponent, ActivityIndicator } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { markerCollection } from '../api/endpoints'
import Axios from 'axios'
import { filter } from 'ramda'
import treisDataTypes from '../enums/treisDataTypes'
import TreisModal from './TreisModal'
import { BackButton } from '../components/GeneralComponents'


const TreisMap = requireNativeComponent('TreisMapViewController')

class Treis extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      isModalVisible: false,
      modalProps: {},
      data: []
    }
    this.onMapReady = this.onMapReady.bind(this)
    this.flattenData = this.flattenData.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  onClose () {
    this.setState({ isModalVisible: false, modalProps: {} })
  }

  onMarkerClick (p) {
    const markerProps = p.nativeEvent
    const marker = filter(d => d.id === markerProps.id, this.state.data)
    this.setState({ isModalVisible: true, modalProps: marker[0] })
  }

  flattenData (raw) {
    const keys = Object.keys(raw)
    let markers = []
    let extendedMarkers = []
    keys.forEach(key => {
      if (['timsigns', 'vmssigns'].includes(key)) return // tims and vms not useful
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
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <If condition={this.state.isModalVisible}>
          <TreisModal onClose={this.onClose} isModalVisible={this.state.isModalVisible} modalProps={this.state.modalProps} />
        </If>
        <Layout style={{ height: '100%' }}>
          <If condition={this.state.isLoading}>
            <ActivityIndicator style={{ height: '100%' }} />
          </If>
          <TreisMap
            data={this.state.data}
            onMarkerClick={this.onMarkerClick}
            onMapReady={this.onMapReady}
            style={{ height: '100%' }}
            latLng={{ lat: -38.6857, lng: 176.0702 }}
            zoom={7}
          />
          <BackButton onPress={() => this.props.navigation.goBack()} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default Treis
