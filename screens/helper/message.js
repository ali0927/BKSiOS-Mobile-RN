import api from './api';

const sendOnlyMail = data => {
  return new Promise((resolve, reject) => {
    api
      .post('/api/payment/sendMail', data)
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

export {sendOnlyMail};
