const INITIAL_ITEM_INFO_STATE = {
  isMutedHome: false,
  isMutedSearch: false,
};

export const itemInfoReducer = (state = INITIAL_ITEM_INFO_STATE, action) => {
  console.log("Item Mute Actions::", action);
  switch (action.type) {
    case 'SET_ITEM_MUTE_HOME':
      return {...state, isMutedHome: action.payload};
    case 'SET_ITEM_MUTE_SEARCH':
      return {...state, isMutedSearch: action.payload};
    case 'CLEAR_ITEM_INFO':
      return {...state, isMutedHome: false, isMutedSearch: false};

    default:
      return state;
  }
};
