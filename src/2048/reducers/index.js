import { combineReducers } from 'redux';
import games from './games';


const version = () => process.env.REACT_APP_VERSION;

export default combineReducers({
  games,
  version,
});
