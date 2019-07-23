import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Image from 'react-native-fast-image'

const MapModal = ({ modalVisible, markerProps }) => {
  return (
    <Modal backdropOpacity={0.5} isVisible={modalVisible} style={{ flex: 0, backgroundColor: '#fff' }}>
      <View>
        <Text>{JSON.stringify(markerProps)}</Text>

        <Image style={{ width: 200, height: 200 }} source={{ uri: markerProps.imageUrl }} />
      </View>
    </Modal>
  )
}

export default MapModal
