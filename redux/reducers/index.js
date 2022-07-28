import {combineReducers} from 'redux';
import {userInfoReducer} from './userInfo';
import {searchInfoReducer} from './searchInfo';

export default combineReducers({
  userInfoReducer,
  searchInfoReducer,
});
