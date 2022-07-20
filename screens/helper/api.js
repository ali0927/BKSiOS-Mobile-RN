import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from './config';
const api = axios.create();

api.interceptors.request.use(async request => {
  let baseURL = config.API_BASE_URL || '';
  request.url = baseURL + request.url;
  // const userInfo = useSelector(state => state.userInfoReducer).userInfo;
  // console.log("Userinfo ---->", userInfo);

  const result = await AsyncStorage.getItem('userInfo');
  console.log('getItem-userInfo', JSON.parse(result)?.accessToken, request.url);
  let token = result ? JSON.parse(result).accessToken : '';
  request.headers = {
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
  };
  console.log("Request", request);
  return request;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error && error.response && error.response.status == '401') {
      console.log('401');
      // const keys = await AsyncStorage.getAllKeys();
      // await AsyncStorage.multiRemove(keys);
    }
    return Promise.reject(error);
  },
);

export default api;
