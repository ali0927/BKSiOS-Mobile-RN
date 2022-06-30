import api from './api';

const changeAvatar = data => {
  return new Promise((resolve, reject) => {
    api
      .post('/api/user/change_avatar', data)
      .then(response => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
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

export {changeAvatar, getAllUserAvatars, getAllUserBackgrounds};
