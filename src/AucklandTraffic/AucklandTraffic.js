import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import MapView from '../Map/MapView'
import axios from 'axios'
import { aucklandTrafficConditions, aucklandHeaders, aucklandSigns, aucklandCameras } from '../api/endpoints'
import { parseString } from 'react-native-xml2js'
import { preRoutes } from '../assets/routes'
import MapLegend from './MapLegend'
import { path } from 'ramda'
import CameraModal from './CameraModal'

const getTrafficData = result => {
  const lastUpdated = result['tns:getTrafficConditionsResponse']['tns:trafficConditions'][0]['tns:lastUpdated']
  let traffic = []
  result['tns:getTrafficConditionsResponse']['tns:trafficConditions'][0]['tns:motorways'].map(motorway => {
    motorway['tns:locations'].map(location => {
      traffic.push({
        congestion: location['tns:congestion'][0],
        direction: location['tns:direction'][0],
        endLat: location['tns:endLat'][0],
        endLon: location['tns:endLon'][0],
        id: location['tns:id'][0],
        inOut: location['tns:inOut'][0],
        name: location['tns:name'][0],
        order: location['tns:order'][0],
        startLat: location['tns:startLat'][0],
        startLon: location['tns:startLon'][0],
        motorway: motorway['tns:name'][0]
      })
    })
  })
  return {
    lastUpdated,
    traffic
  }
}

const getSignsData = result => {
  const signs = result['tns:getSignsResponse']['tns:sign']
  return signs.map(sign => {
    return {
      id: sign['tns:id'][0],
      identifier: sign['tns:identifier'][0],
      name: sign['tns:name'][0],
      description: sign['tns:description'][0],
      direction: sign['tns:direction'][0],
      message: sign['tns:current-message'][0],
      update: sign['tns:last-update'][0],
      lat: sign['tns:lat'][0],
      lon: sign['tns:lon'][0]
    }
  })
}

const getCamsData = result => {
  const cams = result['tns:getCamerasResponse']['tns:camera']

  const camsData = cams.map(cam => {
    return {
      congestionLocations: path(['tns:congestionLocations', 0], cam),
      description: path(['tns:description', 0], cam),
      direction: path(['tns:direction', 0], cam),
      group: path(['tns:group', 0], cam),
      id: path(['tns:id', 0], cam),
      imageUrl: path(['tns:imageUrl', 0], cam),
      lat: path(['tns:lat', 0], cam),
      lon: path(['tns:lon', 0], cam),
      name: path(['tns:name', 0], cam),
      offline: path(['tns:offline', 0], cam),
      region: path(['tns:region', 0], cam),
      thumbUrl: path(['tns:thumbUrl', 0], cam),
      underMaintenance: path(['tns:underMaintenance', 0], cam),
      viewUrl: path(['tns:viewUrl', 0], cam)
    }
  })
  return camsData
}

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
      markerProps: {}
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
      this.setState({ cameras: camsData })
    })
  }

  async componentDidMount () {}

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <If condition={this.state.markerProps.markerType === 'camera'}>
          <CameraModal markerProps={this.state.markerProps} modalVisible={this.state.markerInfoModal} onClose={() => this.setState({ markerInfoModal: false })} />
        </If>
        <Layout style={{ height: '100%' }}>
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
