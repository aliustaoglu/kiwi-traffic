import React from 'react'
import { requireNativeComponent, View, Text, StyleSheet } from 'react-native'

const GoogleMapView = requireNativeComponent('GoogleMapView')
class MapView extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <GoogleMapView style={StyleSheet.absoluteFillObject} />
  }
}

export default MapView
