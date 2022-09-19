import {combineReducers} from 'redux';
import {locationInfoReducer} from './locationInfo';
import {searchInfoReducer} from './searchInfo';
import {userInfoReducer} from './userInfo';

export default combineReducers({
  userInfoReducer,
  searchInfoReducer,
  locationInfoReducer,
});
