import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

const MapModal = ({ modalVisible }) => {
  return (
    <Modal backdropOpacity={0.5} isVisible={modalVisible} style={{ flex: 0, backgroundColor: '#fff' }}>
      <View>
        <Text>Modal deneme</Text>
        <Button title='Close' />
      </View>
    </Modal>
  )
}

export default MapModal
