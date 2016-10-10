
import { FETCHING_GAME_DETAILS, FETCHING_GAME_DETAILS_SUCCESS, FETCHING_GAME_DETAILS_ERROR,
  SAVING_ACTION_SUCCESS, SAVING_ACTION_ERROR, GAME_CHANGED } from '../actions';

const initialState = {
  isFetching: false,
  isActionSaved: false,
  data: null,
  errorFetching: null,
  errorSavingAction: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_GAME_DETAILS:
      state = Object.assign({}, initialState, { isFetching: true });
      break;
    case FETCHING_GAME_DETAILS_SUCCESS:
    case GAME_CHANGED:
      state = Object.assign({}, state, { isFetching: false, data: action.payload });
      break;
    case FETCHING_GAME_DETAILS_ERROR:
      state = Object.assign({}, state, { isFetching: false, errorFetching: 'Error while getting game details'});
      break;
    case SAVING_ACTION_SUCCESS:
      state = Object.assign({}, state, { isActionSaved: true });
      break;
    case SAVING_ACTION_ERROR:
      state = Object.assign({}, state, { isActionSaved: false, errorSavingAction: 'Error while saving action' });
      break;
  }
  return state;
}