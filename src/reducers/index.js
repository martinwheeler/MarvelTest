import { combineReducers } from 'redux';

import characters from './characters';
import comics from './comics';

export default combineReducers({
  characters,
  comics,
});
