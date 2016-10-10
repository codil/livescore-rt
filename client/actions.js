import axios from 'axios';

export const FETCHING_GAMES         = 'FETCHING_GAMES';
export const FETCHING_GAMES_SUCCESS = 'FETCHING_GAMES_SUCCESS';
export const FETCHING_GAMES_ERROR   = 'FETCHING_GAMES_ERROR';

export const FETCHING_GAME_DETAILS          = 'FETCHING_GAME_DETAILS';
export const FETCHING_GAME_DETAILS_SUCCESS  = 'FETCHING_GAME_DETAILS_SUCCESS';
export const FETCHING_GAME_DETAILS_ERROR    = 'FETCHING_GAME_DETAILS_ERROR';

export const SAVING_ACTION          = 'SAVING_ACTION';
export const SAVING_ACTION_SUCCESS  = 'SAVING_ACTION_SUCCESS';
export const SAVING_ACTION_ERROR    = 'SAVING_ACTION_ERROR';

export const GAME_CHANGED = 'GAME_CHANGED';

export function saveAction(gameId, action) {

  const saving = () => ({
    type: SAVING_ACTION
  });

  const success = (data) => ({
    type: SAVING_ACTION_SUCCESS,
    payload: data
  });

  let fail = (error) => ({
    type: SAVING_ACTION_ERROR,
    payload: error
  });

  return (dispatch) => {
    dispatch(saving());
    return axios.put(`/api/game/${gameId}/action`, action)
      .then(payload => dispatch(success(payload.data)))
      .catch(error => dispatch(fail(error)))
  };

}

export function gameChanged(gameDetails) {
  return {
    type: GAME_CHANGED,
    payload: gameDetails
  }
}

export function fetchGames() {

  const fetching = () => ({
    type: FETCHING_GAMES
  });

  const success = (data) => ({
    type: FETCHING_GAMES_SUCCESS,
    payload: data
  });

  const fail = (error) => ({
    type: FETCHING_GAMES_ERROR,
    payload: error
  });
  
  return (dispatch) => {
    dispatch(fetching());
    return axios.get('/api/games')
      .then(payload => dispatch(success(payload.data)))
      .catch(error => dispatch(fail(error)))
  }
}

export function fetchGameDetails(id) {

  const fetching = () => ({
    type: FETCHING_GAME_DETAILS
  });

  const success = (data) => ({
    type: FETCHING_GAME_DETAILS_SUCCESS,
    payload: data
  });

  const fail = (error) => ({
    type: FETCHING_GAME_DETAILS_ERROR,
    payload: error
  });

  return (dispatch) => {
    dispatch(fetching());
    return axios(`/api/game/${id}`)
      .then(payload => dispatch(success(payload.data)))
      .catch(error => dispatch(fail(error)))
  }
  
}
