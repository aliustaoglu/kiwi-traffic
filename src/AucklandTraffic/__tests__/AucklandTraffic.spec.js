import React from 'react'
import { View, Text, YellowBox } from 'react-native'
import { render } from '@testing-library/react-native'
import AucklandTraffic from '../AucklandTraffic'
import { withStoreAndUtils } from '../../utils/testUtil'
import { createStackNavigator, createAppContainer } from 'react-navigation'

YellowBox.ignoreWarnings = true

const StackNavigator = createStackNavigator(
  {
    AucklandTraffic: {
      screen: AucklandTraffic
    }
  },
  {
    initialRouteName: 'AucklandTraffic'
  }
)

const Auckland = createAppContainer(StackNavigator)

describe('Auckland Traffic tests', () => {
  it('should render Auckland Traffic page', () => {
    const wrapper = render(withStoreAndUtils(<View />))

    // console.log(wrapper.getByTestId('a').children.length)
  })
})
