const INITIAL_TAB_INFO_STATE = {
  currentTab: "Home",
};

export const tabInfoReducer = (state = INITIAL_TAB_INFO_STATE, action) => {
  switch (action.type) {
    case 'SET_TAB_INFO':
      return {
        currentTab: action.payload,
      };
    case 'CLEAR_TAB_INFO':
      return {
        currentTab: null,
      };
    default:
      return state;
  }
};
