import api from './api';

export const creditPayment = info => {
  return new Promise((resolve, reject) => {
    api
      .post('/api/payment/credit', info)
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
