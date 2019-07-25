import React from 'react'
import { requireNativeComponent, Text } from 'react-native'
import { Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'

const TreisMap = requireNativeComponent('TreisMapViewController')

class Treis extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <TreisMap style={{ height: '100%' }} latLng={{ lat: -38.6857, lng: 176.0702 }} zoom={7} />
        </Layout>
      </SafeAreaView>
    )
  }
}

export default Treis
