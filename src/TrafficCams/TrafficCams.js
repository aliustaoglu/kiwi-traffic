import React from 'react'
import { requireNativeComponent, ActivityIndicator } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { parseString } from 'react-native-xml2js'
import { aucklandCameras, aucklandHeaders } from '../api/endpoints'
import Axios from 'axios'
import { getCamsData } from '../utils/dataUtil'
import { BackButton } from '../components/GeneralComponents';
import CameraModal from '../AucklandTraffic/CameraModal';

const TrafficMap = requireNativeComponent('TrafficCamsViewController')

class TrafficCams extends React.Component {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  constructor (props) {
    super(props)
    this.onMapReady = this.onMapReady.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.state = {
      cameras: [],
      isLoading: true,
      markerInfoModal: false,
      markerProps: {}
    }
  }

  onMarkerClick (e) {
    const event = e.nativeEvent
    this.setState({ markerInfoModal: true, markerProps: event })
  }

  async onMapReady () {
    const cameras = await Axios.get(aucklandCameras, { headers: aucklandHeaders })
    const that = this
    parseString(cameras.data, (err, result) => {
      const camsData = getCamsData(result)
      that.setState({ cameras: camsData, isLoading: false })
    })
  }

  render () {
    console.log(this.state.cameras)
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <If condition={this.state.isLoading}>
            <ActivityIndicator style={{ height: '100%' }} />
          </If>
          <CameraModal
            markerProps={this.state.markerProps}
            modalVisible={this.state.markerInfoModal}
            onClose={() => this.setState({ markerInfoModal: false })}
          />
          <TrafficMap
            latLng={{ lat: -36.8485, lng: 174.7633 }}
            zoom={12}
            onMarkerClick={this.onMarkerClick}
            cameras={this.state.cameras}
            onMapReady={this.onMapReady}
            style={{ height: '100%' }}
          />
          <BackButton onPress={() => this.props.navigation.goBack()} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default TrafficCams
