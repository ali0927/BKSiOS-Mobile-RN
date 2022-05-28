import api from "./api";

const getAllCollections = () => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/event/all_collections")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  const getLatestEventCards = () => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/event/eventcard_multi/latest")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  const getAllEventCards = () => {
    return new Promise((resolve, reject) => {
      api
        .get("/api/event/eventcard_multi")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
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
    // getCollectionById,
    // getEventCardInCollection,
    // createEventCard,
    // getEventCardById,
    getAllEventCards,
    getLatestEventCards,
    // buyTicket,
    // userTickets,
    // updateUserTickets,
    // allTickets,
    // getAvailableEvents,
    // deleteEventCardById,
  };