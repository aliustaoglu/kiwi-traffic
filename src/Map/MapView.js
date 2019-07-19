import React from 'react'
import { requireNativeComponent, View, Text, StyleSheet } from 'react-native'

const GoogleMapAucklandView = requireNativeComponent('GoogleMapAucklandView')
class MapView extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <GoogleMapAucklandView {...this.props} style={StyleSheet.absoluteFillObject}  />
  }
}

export default MapView
