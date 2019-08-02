import React from 'react'
import { requireNativeComponent, SafeAreaView } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import Axios from 'axios'
import { canterburyRoadworks } from '../api/endpoints'
import { getChristchurchRoadworks } from '../utils/dataUtil'
import ChristchurchModal from './ChristchurchModal'

const CChurchMap = requireNativeComponent('ChristchurchMapViewController')

class ChristchurchMap extends React.Component {
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
        </Layout>
      </SafeAreaView>
    )
  }
}

export default ChristchurchMap

const data = [
  {
    type: 'Feature',
    properties: {
      ClassName: 'MyworksitesEvent',
      LastEdited: '2019-07-31 22:48:15',
      Created: '2019-07-31 17:49:15',
      LocationArea: 'Men at Work Service Agreements',
      EventType: 'Scheduled Road Work',
      EventDescription: 'No Parking, Lane Width Reduction and Footpath Closed for Lifting Materials onto site',
      StartDate: '2019-07-31 06:00:00',
      EndDate: '2019-08-01 08:00:00',
      HideFromFeed: 0,
      ExternalUpdatedAt: '2019-07-31 17:48:36',
      Impact: 'Vehicle Restrictions',
      IsPinned: 0,
      PinnedSortOrder: 0,
      IsArchived: 0,
      LastEditedByID: 0,
      PinnedByID: 0,
      ID: 733859,
      RecordClassName: 'MyworksitesEvent',
      ExternalId: 'l232370',
      CompanyName: 'Men at Work Canterbury Ltd',
      Restrictions: 'Pedestrians Affected, Parking Removed, Shoulder Closure',
      TMPNumber: 'CCC-T36363',
      LastUpdatedAgo: '5 hours ago',
      StartDateNice: '31 Jul 2019 6:00am',
      EndDateNice: '1 Aug 2019 8:00am',
      LastUpdatedNice: '31 Jul 2019 5:48pm',
      UpdateDueNice: null,
      IconClass: 'i-map-tools-roadworks',
      ExpectedResolution: null,
      AdditionalFeatures: []
    },
    geometry: { type: 'Point', coordinates: [172.6210411, -43.5381198] }
  },
  {
    type: 'Feature',
    properties: {
      ClassName: 'MyworksitesEvent',
      LastEdited: '2019-07-31 22:48:16',
      Created: '2019-07-31 16:37:21',
      LocationArea: 'J001302 - TRU Service L2 L1 and Lv',
      EventType: 'Scheduled Road Work',
      EventDescription: '422 Tuam St. Shoulder Closed and footpath escort for UFB tube break out in shoulder and on footpath. ',
      StartDate: '2019-08-06 09:00:00',
      EndDate: '2019-08-06 16:00:00',
      HideFromFeed: 0,
      ExternalUpdatedAt: '2019-07-31 16:36:06',
      Impact: 'Vehicle Restrictions',
      IsPinned: 0,
      PinnedSortOrder: 0,
      IsArchived: 0,
      LastEditedByID: 0,
      PinnedByID: 0,
      ID: 733857,
      RecordClassName: 'MyworksitesEvent',
      ExternalId: 'l232320',
      CompanyName: 'Traffic R Us',
      Restrictions: 'Pedestrians Affected, Parking Removed, Shoulder Closure',
      TMPNumber: 'CCC-T37149',
      LastUpdatedAgo: '6 hours ago',
      StartDateNice: '6 Aug 2019 9:00am',
      EndDateNice: '6 Aug 2019 4:00pm',
      LastUpdatedNice: '31 Jul 2019 4:36pm',
      UpdateDueNice: null,
      IconClass: 'i-map-tools-roadworks',
      ExpectedResolution: null,
      AdditionalFeatures: []
    },
    geometry: { type: 'Point', coordinates: [172.6532333, -43.5354799] }
  }
]
