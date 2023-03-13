import {combineReducers} from 'redux';
import {currencyInfoReducer} from './currencyInfo';
import {locationInfoReducer} from './locationInfo';
import {searchInfoReducer} from './searchInfo';
import {userInfoReducer} from './userInfo';
import {collectionInfoReducer} from './collectionInfo';

export default combineReducers({
  userInfoReducer,
  searchInfoReducer,
  locationInfoReducer,
  currencyInfoReducer,
  collectionInfoReducer,
});
