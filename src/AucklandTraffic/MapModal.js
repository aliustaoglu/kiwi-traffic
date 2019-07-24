import React, { useState } from 'react'
import { View, Image, Button, StyleSheet, Dimensions } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { darkColours } from '../utils/colour'

const Header = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${darkColours['color-warning-default']};
`

const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  border-radius: 4px;
  color: ${darkColours['border-info-color-4']};
  background-color: ${darkColours['color-warning-default']};
`

const MapModal = ({ modalVisible, markerProps, onClose }) => {
  const dims = Dimensions.get('screen')
  const [size, setSize] = useState({ height: 1, width: 1 })

  const ratio = (dims.width * 0.9) / size.width
  console.log(ratio)

  return (
    <Modal backdropOpacity={0.5} isVisible={modalVisible} style={{ flex: 0, width: '90%', backgroundColor: '#fff' }}>
      <View>
        <Header>
          <Title>{markerProps.name}</Title>
        </Header>
        <Image
          style={{ width: size.width * ratio, height: size.height * ratio }}
          onLoad={e => setSize({ height: e.nativeEvent.source.height, width: e.nativeEvent.source.width })}
          source={{ uri: markerProps.imageUrl }}
        />
      </View>
      <Button onPress={onClose} title='Close' />
    </Modal>
  )
}

export default MapModal
