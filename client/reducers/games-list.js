
import { FETCHING_GAMES, FETCHING_GAMES_SUCCESS, FETCHING_GAMES_ERROR } from '../actions';

const initialState = {
  isFetching: false,
  items: [],
  error: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case FETCHING_GAMES:
      state = Object.assign({}, state, { isFetching: true });
      break;
    case FETCHING_GAMES_SUCCESS:
      state = Object.assign({}, state, { isFetching: false, items: action.payload });
      break;
    case FETCHING_GAMES_ERROR:
      state = Object.assign({}, state, { isFetching: false, error: 'Error getting game details' });
      break;
  }
  return state;
}