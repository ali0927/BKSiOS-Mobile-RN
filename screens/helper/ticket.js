const mintTicket = data => {
  return new Promise((resolve, reject) => {
    api
      .post('/api/btickets/mint', data)
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

export {mintTicket};
