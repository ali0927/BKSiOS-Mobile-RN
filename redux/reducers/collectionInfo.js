const INITIAL_COLLECTION_INFO_STATE = {
  currentCollection: null,
};

export const collectionInfoReducer = (state = INITIAL_COLLECTION_INFO_STATE, action) => {
  switch (action.type) {
    case 'SET_COLLECTION_INFO':
      return {
        currentCollection: action.payload,
      };
    case 'CLEAR_SEARCH_INFO':
      return {
        searchInfo: null,
      };
    default:
      return state;
  }
};
