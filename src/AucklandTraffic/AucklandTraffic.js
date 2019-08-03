import React from 'react'
import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import MapView from '../Map/MapView'
import axios from 'axios'
import { aucklandTrafficConditions, aucklandHeaders, aucklandSigns, aucklandCameras } from '../api/endpoints'
import { parseString } from 'react-native-xml2js'
import { preRoutes } from '../assets/routes'
import MapLegend from './MapLegend'
import CameraModal from './CameraModal'
import { getTrafficData, getSignsData, getCamsData } from '../utils/dataUtil'

class AucklandTraffic extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      latLng: {
        lat: -36.8485,
        lng: 174.7633
      },
      data: {
        heavy: [],
        moderate: [],
        free: []
      },
      signsData: [],
      cameras: [],
      markerInfoModal: false,
      markerProps: {},
      isLoading: true
    }
    this.onMapReady = this.onMapReady.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
  }

  onMarkerClick (e) {
    const event = e.nativeEvent
    this.setState({ markerInfoModal: true, markerProps: event })
  }

  async onMapReady () {
    const xmlAkl = await axios.get(aucklandTrafficConditions, { headers: aucklandHeaders })
    const xmlSigns = await axios.get(aucklandSigns, { headers: aucklandHeaders })
    const cameras = await axios.get(aucklandCameras, { headers: aucklandHeaders })
    const that = this
    parseString(xmlAkl.data, function (err, result) {
      const trafficData = getTrafficData(result)
      that.setState({ trafficData })
      const heavy = trafficData.traffic.filter(t => t.congestion === 'Heavy')
      const moderate = trafficData.traffic.filter(t => t.congestion === 'Moderate')
      const free = trafficData.traffic.filter(t => t.congestion === 'Free Flow')
      that.setState({ data: { heavy, moderate, free } })
    })
    parseString(xmlSigns.data, (err, result) => {
      const signsData = getSignsData(result)
      const notEmptySigns = signsData.filter(sign => sign.message.length > 0)
      that.setState({ signsData: notEmptySigns })
    })
    parseString(cameras.data, (err, result) => {
      const camsData = getCamsData(result)
      that.setState({ cameras: camsData })
    })
    this.setState({ isLoading: false })
  }

  async componentDidMount () {}

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }} testID='testAucklandTrafficSafeAreaView'>
        <If condition={this.state.markerProps.markerType === 'camera' && this.state.markerInfoModal}>
          <CameraModal markerProps={this.state.markerProps} onClose={() => this.setState({ markerInfoModal: false })} />
        </If>
        <Layout testID='testAucklandLayout' style={{ height: '100%' }}>
          <If condition={this.state.isLoading}>
            <ActivityIndicator style={{ height: '100%' }} />
          </If>
          <MapView
            style={{ height: '90%' }}
            preRoutes={preRoutes}
            polylines={this.state.data}
            latLng={this.state.latLng}
            zoom={12}
            onMapReady={this.onMapReady}
            onMarkerClick={this.onMarkerClick}
            signs={this.state.signsData}
            mapReducer={this.props.mapReducer}
            cameras={this.state.cameras}
          />
          <MapLegend />
        </Layout>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapReducer: state.mapReducer
  }
}

export default connect(mapStateToProps)(AucklandTraffic)
