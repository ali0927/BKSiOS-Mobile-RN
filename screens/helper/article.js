import config from './config';
import api from './api';

export const getArticleById = id => {
  return new Promise((resolve, reject) => {
    api
      .get(config.API_BASE_URL + '/api/article/' + id)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
