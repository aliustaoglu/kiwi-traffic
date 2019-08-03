import React from 'react'
import { requireNativeComponent, SafeAreaView } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import Axios from 'axios'
import { canterburyRoadworks } from '../api/endpoints'
import { getChristchurchRoadworks } from '../utils/dataUtil'
import ChristchurchModal from './ChristchurchModal'
import { BackButton } from '../components/GeneralComponents'

const CChurchMap = requireNativeComponent('ChristchurchMapViewController')

class ChristchurchMap extends React.Component {
  static navigationOptions = () => ({ header: null })

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      roadworks: [],
      isModalVisible: false,
      modalProps: {}
    }
    this.onMapReady = this.onMapReady.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  onClose () {
    this.setState({ isModalVisible: false })
  }

  onMarkerClick (e) {
    this.setState({
      isModalVisible: true,
      modalProps: e.nativeEvent
    })
  }

  async onMapReady () {
    const roadworksRaw = await Axios.get(canterburyRoadworks)
    const roadworks = getChristchurchRoadworks(roadworksRaw.data.features)
    this.setState({ isLoading: false, roadworks })
  }

  componentDidMount () {}

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <If condition={this.state.isModalVisible}>
          <ChristchurchModal onClose={this.onClose} isModalVisible={this.state.isModalVisible} modalProps={this.state.modalProps} />
        </If>
        <Layout style={{ height: '100%' }}>
          <CChurchMap
            onMarkerClick={this.onMarkerClick}
            roadworks={this.state.roadworks}
            latLng={{ lat: -43.5321, lng: 172.6362 }}
            zoom={10}
            onMapReady={this.onMapReady}
            style={{ height: '100%' }}
          />
          <BackButton onPress={() => this.props.navigation.goBack()} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default ChristchurchMap
