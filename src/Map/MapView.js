import React from 'react'
import { requireNativeComponent } from 'react-native'

const GoogleMapAucklandView = requireNativeComponent('GoogleMapAucklandView')
class MapView extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <GoogleMapAucklandView {...this.props} style={this.props.style} />
  }
}

export default MapView
