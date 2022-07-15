import api from './api';
// Collections
const getAllCollections = () => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/event/all_collections')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const getCollectionById = id => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/event/collection/' + id)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
// Events
const getLatestEventCards = () => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/event/eventcard_multi/latest')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllEventCards = () => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/event/eventcard_multi')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const getEventPrice = eventCard => {
  const addons = eventCard.addons === '' ? [] : JSON.parse(eventCard.addons);
  let addonPrice = 0;
  const len = addons.length;
  for (let i = 0; i < len; i++) {
    addonPrice += Number(addons[i].price);
  }
  return eventCard.price + addonPrice;
};

// Buy...
const buyTicket = data => {
  return new Promise((resolve, reject) => {
    api
      .post('/api/event/eventcard/buy_ticket', data)
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

const getBuyState = id => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/event/eventcard/buy_ticket/' + id)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const getEventCardById = id => {
  return new Promise((resolve, reject) => {
    api
      .get('/api/event/eventcard/' + id)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const getEventCardInCollection = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/event/in_collection/" + id)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

// Tickets
const allTickets = data => {
  console.log('Ticket is called', data);
  return new Promise((resolve, reject) => {
    api
      .get('/api/event/eventcard_multi/tickets')
      .then(response => {
        console.log('Ticket Calling Res', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log('Ticket Calling error', error);
        reject(error);
      });
  });
};
// const deleteEventCardById = (id) => {
//   return new Promise((resolve, reject) => {
//     api
//       .delete("/api/event/eventcard/" + id)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         reject(error);
//       });
//   });
// };

export {
  // createCollection,
  getAllCollections,
  // getAllAddonIcons,
  getCollectionById,
  getEventCardInCollection,
  // createEventCard,
  getEventCardById,
  getAllEventCards,
  getEventPrice,
  getLatestEventCards,
  buyTicket,
  getBuyState,
  // userTickets,
  // updateUserTickets,
  allTickets,
  // getAvailableEvents,
  // deleteEventCardById,
};
