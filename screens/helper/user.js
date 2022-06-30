import api from './api';

const getAllUserAvatars = () => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/user/all_useravatars')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllUserBackgrounds = () => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/user/all_userbackgrounds')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export {getAllUserAvatars, getAllUserBackgrounds};
