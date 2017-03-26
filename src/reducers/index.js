import { combineReducers } from 'redux';

import characters from './characters';
import comics from './comics';
import {reducer as notifications} from 'react-notification-system-redux';

export default combineReducers({
  characters,
  comics,
  notifications
});
