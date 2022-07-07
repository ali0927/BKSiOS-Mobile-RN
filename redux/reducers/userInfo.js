const INITIAL_USER_INFO_STATE = {
  userInfo: null,
};

export const userInfoReducer = (state = INITIAL_USER_INFO_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        userInfo: action.payload,
      };
    case 'CLEAR_USER_INFO':
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};
