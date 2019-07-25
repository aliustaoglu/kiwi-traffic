import React, { useState } from 'react'
import { View, Image, Button, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { darkColours, darkBasic } from '../utils/colour'

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
  color: ${darkColours['border-info-color-4']};
  background-color: ${darkColours['color-warning-default']};
`

const SubTitle = styled(Title)`
  font-size: 12px;
  font-weight: 400;
  background-color: ${darkBasic['color-warning-100']};
`

const CameraModal = ({ modalVisible, markerProps, onClose }) => {
  const dims = Dimensions.get('screen')
  const [size, setSize] = useState({ height: 1, width: 1 })

  let dateStr = ''
  const onImageLoad = e => {
      setSize({ height: e.nativeEvent.source.height, width: e.nativeEvent.source.width })   
      dateStr = new Date().toISOString().substr(0, 16) // cache no longer than for 1 min
  }

  // Scaled width and height
  const width = dims.width * 0.9
  const height = (dims.width * 0.9 * size.height) / size.width
  return (
    <Modal swipeDirection='down' onSwipeComplete={onClose} backdropOpacity={0.5} isVisible={modalVisible} style={{ flex: 0, width: '90%', backgroundColor: '#fff' }}>
      <View>
        <Header>
          <Title>{markerProps.name}</Title>
        </Header>
        <View>
          <SubTitle>{markerProps.description}</SubTitle>
        </View>
        <Image style={{ width, height  }} onLoad={onImageLoad} source={{ uri: markerProps.imageUrl + '?' + dateStr }} />
      </View>
      <Button onPress={onClose} title='Close' />
    </Modal>
  )
}

export default CameraModal
