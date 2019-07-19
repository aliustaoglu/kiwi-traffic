import React from 'react'
import { Layout, Text } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import MapView from '../Map/MapView'
import axios from 'axios'
import { aucklandTrafficConditions, aucklandHeaders, aucklandSigns } from '../api/endpoints'
import { parseString } from 'react-native-xml2js'

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

class AucklandTraffic extends React.Component {
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
      signsData: []
    }
    this.onMapReady = this.onMapReady.bind(this)
  }

  async onMapReady () {
    const xmlAkl = await axios.get(aucklandTrafficConditions, { headers: aucklandHeaders })
    const xmlSigns = await axios.get(aucklandSigns, { headers: aucklandHeaders })
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
  }

  async componentDidMount () {}

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <MapView polylines={this.state.data} latLng={this.state.latLng} zoom={12} onMapReady={this.onMapReady} signs={this.state.signsData} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default AucklandTraffic
