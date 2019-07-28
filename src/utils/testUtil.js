import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { ApplicationProvider } from 'react-native-ui-kitten'
import { mapping, dark } from '@eva-design/eva'
import { createStackNavigator, createAppContainer } from 'react-navigation'

export const withStoreAndUtils = element => {
  return (
    <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={dark}>
        {element}
      </ApplicationProvider>
    </Provider>
  )
}

export const withTestNavigator = (component) => {
  const StackNavigator = createStackNavigator(
    {
      MockNavigation: {
        screen: component
      }
    },
    {
      initialRouteName: 'MockNavigation'
    }
  )

  return createAppContainer(StackNavigator)
}
