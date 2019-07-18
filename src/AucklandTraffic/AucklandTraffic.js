import React from 'react'
import { Layout, Text } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import MapView from '../Map/MapView'
import axios from 'axios'
import { aucklandTrafficConditions, aucklandHeaders } from '../api/endpoints'
import { parseString } from 'react-native-xml2js'

let k = 0

class AucklandTraffic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      latLng: {
        lat: -36.8485,
        lng: 174.7633
      }
    }
  }

  async componentDidMount () {
    /* const xmlAkl = await axios.get(aucklandTrafficConditions, { headers: aucklandHeaders })
    const responseAkl = parseString(xmlAkl.data, function (err, result) {
      console.dir(result)
    }) */
  }

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <MapView latLng={this.state.latLng} zoom={12} onMapReady={() => console.log('MAPREADY')} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default AucklandTraffic
