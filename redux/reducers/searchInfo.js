const INITIAL_SEARCH_INFO_STATE = {
  searchInfo: null,
};

export const searchInfoReducer = (state = INITIAL_SEARCH_INFO_STATE, action) => {
  switch (action.type) {
    case 'SET_SEARCH_INFO':
      return {
        searchInfo: action.payload,
      };
    case 'CLEAR_SEARCH_INFO':
      return {
        searchInfo: null,
      };
    default:
      return state;
  }
};
