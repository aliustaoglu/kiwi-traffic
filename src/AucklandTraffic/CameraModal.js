import React, { useState } from 'react'
import { Button, Layout as View } from 'react-native-ui-kitten'
import { Image, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import { Header, SubTitle, Title } from '../components/ModalComponents'

const CameraModal = ({ markerProps, onClose }) => {
  const dims = Dimensions.get('screen')
  const [size, setSize] = useState({ height: 1, width: 1 })

  let dateStr = new Date().toISOString().substr(0, 16) // cache no longer than for 1 min
  const onImageLoad = e => {
    setSize({ height: e.nativeEvent.source.height, width: e.nativeEvent.source.width })
  }

  // Scaled width and height
  const width = dims.width * 0.9
  const height = (dims.width * 0.9 * size.height) / size.width
  return (
    <Modal
      swipeDirection='down'
      onSwipeComplete={onClose}
      backdropOpacity={0.5}
      isVisible
      style={{ flex: 0, width: '90%', backgroundColor: '#fff' }}
    >
      <View>
        <Header>
          <Title>{markerProps.name}</Title>
        </Header>
        <View>
          <SubTitle>{markerProps.description}</SubTitle>
        </View>
        <Image style={{ width, height }} onLoad={onImageLoad} source={{ uri: markerProps.imageUrl + '?' + dateStr }} />
        <Button style={{ margin: 8 }} onPress={onClose}>
          Close
        </Button>
      </View>
    </Modal>
  )
}

export default CameraModal
