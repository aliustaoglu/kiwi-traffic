import React from 'react'
import { Layout, Text } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import MapView from '../Map/MapView'
import axios from 'axios'
import { aucklandTrafficConditions, aucklandHeaders } from '../api/endpoints'
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

class AucklandTraffic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latLng: {
                lat: -36.8485,
                lng: 174.7633
            },
            data: {}
        }
        this.onMapReady = this.onMapReady.bind(this)
    }

    async onMapReady() {
        /*const xmlAkl = await axios.get(aucklandTrafficConditions, { headers: aucklandHeaders })
        const that = this
        parseString(xmlAkl.data, function(err, result) {
            const trafficData = getTrafficData(result)
            that.setState({ trafficData })
            console.log(trafficData)
            const heavy = trafficData.traffic.filter( t => t.congestion === 'Heavy' )
            console.log(JSON.stringify(heavy))
        })*/
        console.log(heavy)
    }

    async componentDidMount() {}

    render() {
        return (
            <SafeAreaView style={{ height: '100%' }}>
                <Layout style={{ height: '100%' }}>
                    <MapView polylines={{heavy}} latLng={this.state.latLng} zoom={12} onMapReady={this.onMapReady} />
                </Layout>
            </SafeAreaView>
        )
    }
}

export default AucklandTraffic

const heavy = [{"congestion":"Heavy","direction":"Southbound","endLat":"-36.8124420404881","endLon":"174.753387593331","id":"8","inOut":"In","name":"Esmonde Rd - Onewa","order":"4","startLat":"-36.7993257105436","startLon":"174.761381312133","motorway":"Northern Motorway"},{"congestion":"Heavy","direction":"Westbound","endLat":"-36.8713224404392","endLon":"174.676578010107","id":"42","inOut":"Out","name":"Great Nth Rd Waterview - Rosebank Rd","order":"4","startLat":"-36.8723077996686","startLon":"174.705082572366","motorway":"North-Western Motorway"},{"congestion":"Heavy","direction":"Northbound","endLat":"-37.0146030384381","endLon":"174.906086501113","id":"34","inOut":"In","name":"Takanini - Hill Rd","order":"1","startLat":"-37.0362261391075","startLon":"174.910031768718","motorway":"Southern Motorway"},{"congestion":"Heavy","direction":"Northbound","endLat":"-36.8529722140745","endLon":"174.755511934518","id":"13","inOut":"In","name":"Hobson St - Wellington St","order":"12","startLat":"-36.8572748102422","startLon":"174.755727388018","motorway":"Southern Motorway"},{"congestion":"Heavy","direction":"Southbound","endLat":"-36.8888446057672","endLon":"174.79721894748","id":"18","inOut":"Out","name":"Gillies Ave - Greenlane","order":"9","startLat":"-36.8723749867577","startLon":"174.774235750961","motorway":"Southern Motorway"},{"congestion":"Heavy","direction":"Southbound","endLat":"-36.9188319628015","endLon":"174.839903320045","id":"27","inOut":"Out","name":"SE Highway - Mt Wellington Hway","order":"12","startLat":"-36.9168666994736","startLon":"174.834450275095","motorway":"Southern Motorway"},{"congestion":"Heavy","direction":"Southbound","endLat":"-36.9637811787302","endLon":"174.867665846976","id":"29","inOut":"Out","name":"Princes St - East Tamaki Rd","order":"14","startLat":"-36.9391816799099","startLon":"174.853642205485","motorway":"Southern Motorway"},{"congestion":"Heavy","direction":"Southbound","endLat":"-37.0145470745826","endLon":"174.906265886251","id":"32","inOut":"Out","name":"Redoubt Rd - Hill Rd","order":"17","startLat":"-36.9919519764311","startLon":"174.887830284222","motorway":"Southern Motorway"},{"congestion":"Heavy","direction":"Northbound","endLat":"-36.92163","endLon":"174.76741","id":"58","inOut":"In","name":"20A George Bolt Mem. Dr - Queenstown Rd","order":"0","startLat":"-36.95833","startLon":"174.797783","motorway":"South-Western Motorway"},{"congestion":"Heavy","direction":"Southbound","endLat":"-36.8933506643131","endLon":"174.774478553767","id":"71","inOut":"Out","name":"SH1 - Green Ln","order":"0","startLat":"-36.8726455819804","startLon":"174.77414346424","motorway":"Route 12"}]