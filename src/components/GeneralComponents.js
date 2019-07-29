import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

const back = require('../images/back.png')

export const BackButtonContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
`

export const BackButton = ({ onPress }) => {
  return (
    <BackButtonContainer>
      <TouchableOpacity onPress={onPress}>
        <Image source={back} />
      </TouchableOpacity>
    </BackButtonContainer>
  )
}
