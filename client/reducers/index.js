import { combineReducers } from 'redux';
import gameDetails from './game-details';
import gamesList from './games-list';

export default combineReducers({gameDetails, gamesList})