import axios from 'axios';
import config from './config';
import {AsyncStorage} from 'react-native';

const api = axios.create();

api.interceptors.request.use(
  request => {
    let baseURL = config.API_BASE_URL || '';
    request.url = baseURL + request.url;

    AsyncStorage.getItem('userInfo', (err, result) => {
        console.log("getItem-userInfo", result);
        let token = result ? JSON.parse(result).accessToken : "";
        request.headers = {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        };
      });
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (error && error.response && error.response.status == '401') {
      console.log('401');
      const keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
    }
    return Promise.reject(error);
  },
);

export default api;
