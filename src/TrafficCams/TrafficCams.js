import React from 'react'
import { requireNativeComponent } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { parseString } from 'react-native-xml2js'
import { aucklandCameras, aucklandHeaders } from '../api/endpoints'
import Axios from 'axios'
import { getCamsData } from '../utils/dataUtil'

const TrafficMap = requireNativeComponent('TrafficCamsViewController')

class TrafficCams extends React.Component {
  constructor (props) {
    super(props)
    this.onMapReady = this.onMapReady.bind(this)
    this.state = {
      cameras: []
    }
  }

  async onMapReady () {
    const cameras = await Axios.get(aucklandCameras, { headers: aucklandHeaders })
    const that = this
    parseString(cameras.data, (err, result) => {
      const camsData = getCamsData(result)
      that.setState({ cameras: camsData })
    })
  }

  render () {
    console.log(this.state.cameras)
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <TrafficMap cameras={this.state.cameras} onMapReady={this.onMapReady} style={{ height: '100%' }} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default TrafficCams
