const INITIAL_CURRENCY_INFO_STATE = {
  rateTry: 1,
  rateGbp: 1,
  rateUsd: 1,
};

export const currencyInfoReducer = (
  state = INITIAL_CURRENCY_INFO_STATE,
  action,
) => {
  switch (action.type) {
    case 'SET_RATE_TRY':
      return {
        ...state,
        rateTry: action.payload,
      };
    case 'SET_RATE_GBP':
      return {
        ...state,
        rateGbp: action.payload,
      };
    case 'SET_RATE_USD':
      return {
        ...state,
        rateUsd: action.payload,
      };
    default:
      return state;
  }
};
