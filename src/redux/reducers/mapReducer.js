import { createAction } from 'redux-actions'
import { merge } from 'ramda'

const MAP_ACTIONS = {
  SET_PROGRESS: 'MAP.SET_PROGRESS',
  SET_SHOW_INFO: 'SET_SHOW_INFO',
  SET_SHOW_HEAVY: 'MAP.SET_SHOW_HEAVY',
  SET_SHOW_MODERATE: 'MAP.SET_SHOW_MODERATE',
  SET_SHOW_FREE: 'MAP.SET_SHOW_FREE',
  SET_SHOW_CAMERA: 'MAP.SET_SHOW_CAMERA'
}

export const setProgress = createAction(MAP_ACTIONS.SET_PROGRESS)
export const setShowInfo = createAction(MAP_ACTIONS.SET_SHOW_INFO)
export const setShowHeavy = createAction(MAP_ACTIONS.SET_SHOW_HEAVY)
export const setShowModerate = createAction(MAP_ACTIONS.SET_SHOW_MODERATE)
export const setShowFree = createAction(MAP_ACTIONS.SET_SHOW_FREE)
export const setShowCamera = createAction(MAP_ACTIONS.SET_SHOW_CAMERA)

const initialState = {
  isProgress: false,
  showInfo: true,
  showHeavy: true,
  showModerate: true,
  showFree: false,
  showCamera: true
}

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case setProgress().type:
      return merge(state, { isProgress: action.payload })
    case setShowHeavy().type:
      return merge(state, { showHeavy: action.payload })
    case setShowModerate().type:
      return merge(state, { showModerate: action.payload })
    case setShowFree().type:
      return merge(state, { showFree: action.payload })
    case setShowInfo().type:
      return merge(state, { showInfo: action.payload })
    case setShowCamera().type:
      return merge(state, { showCamera: action.payload })
    default:
      return state
  }
}

export default mapReducer
