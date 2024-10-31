


const getCountry = {
    getCountryRequest: false,
    getCountrySuccess: false,
    getCountryData: null,
    getCountryFail: null,
}
export const getCountryReducer = (state = getCountry, action) => {
    switch (action.type) {
      case 'COUNTRY_REQUEST':
        return {
          ...state,
          getCountryRequest: true,
          getCountrySuccess: false,
          getCountryFail: null,
        };
      case 'COUNTRY_SUCCESS':
        return {
          ...state,
          getCountryRequest: false,
          getCountrySuccess: true,
          getCountryData: action.payload,
        };
      case 'COUNTRY_FAILED':
        return {
          ...state,
          getCountryRequest: false,
          getCountryFail: action.payload,
        };
      case 'COUNTRY_RESET':
        return getCountry;
      default:
        return state;
    }
  };