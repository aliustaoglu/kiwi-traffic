import React from 'react'
import { Layout, Text } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import MapView from '../Map/MapView'
import axios from 'axios'
import { aucklandTrafficConditions, aucklandHeaders } from '../api/endpoints'
import { parseString } from 'react-native-xml2js'

class AucklandTraffic extends React.Component {
  async componentDidMount () {
    const xmlAkl = await axios.get(aucklandTrafficConditions, { headers: aucklandHeaders })
    const responseAkl = parseString(xmlAkl.data, function (err, result) {
      console.dir(result)
    })

    
  }

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <MapView />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default AucklandTraffic
