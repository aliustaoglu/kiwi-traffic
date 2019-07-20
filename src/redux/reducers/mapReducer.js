import { createAction } from 'redux-actions';
import { merge } from 'ramda';

const ACTIVITY_ACTIONS = {
  SET_PROGRESS: 'ACTIVITY.SET_PROGRESS'
};

export const setProgress = createAction(ACTIVITY_ACTIONS.SET_PROGRESS);

const initialState = {
  isProgress: false,
  heavy: true,
  moderate: true,
  free: false
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case setProgress().type:
      return merge(state, { isProgress: action.payload });
    default:
      return state;
  }
};

export default mapReducer;
