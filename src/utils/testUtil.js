import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { ApplicationProvider } from 'react-native-ui-kitten'
import { mapping, dark } from '@eva-design/eva'
import AppNavigator from '../Landing/AppNavigator'

export const withStoreAndUtils = element => {

  return (
    <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={dark}>
        {element}
      </ApplicationProvider>
    </Provider>
  )
}
