const INITIAL_LOCATION_INFO_STATE = {
  locationInfo: null,
};

export const locationInfoReducer = (
  state = INITIAL_LOCATION_INFO_STATE,
  action,
) => {
  switch (action.type) {
    case 'SET_LOCATION_INFO':
      return {
        locationInfo: action.payload,
      };
    case 'CLEAR_LOCATION_INFO':
      return {
        locationInfo: null,
      };
    default:
      return state;
  }
};
