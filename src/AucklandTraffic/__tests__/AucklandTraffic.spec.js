import React from 'react'
import { render } from '@testing-library/react-native'
import AucklandTraffic from '../AucklandTraffic'
import { withStoreAndUtils, withTestNavigator } from '../../utils/testUtil'

describe('Auckland Traffic tests', () => {
  it('should render Auckland Traffic page', () => {
    const Auckland = withTestNavigator(AucklandTraffic)
    const wrapper = render(withStoreAndUtils(<Auckland />))
    const layout = wrapper.getByTestId('testAucklandTrafficSafeAreaView')
    const legend = wrapper.getByTestId('testMapLegendContainer')
    expect(layout).toBeTruthy()
    expect(legend).toBeTruthy()
  })
})
