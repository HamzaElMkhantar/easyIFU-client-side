import axios from "axios";


export const getCountryAction = (name, token) => async (dispatch) => {
    try {

      dispatch({ type: 'COUNTRY_REQUEST' });
      const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/country/get-all?name=${name}`, config);
      console.log(response.data)
  
      dispatch({ 
                type: 'COUNTRY_SUCCESS', 
                payload: response.data 
            });
      setTimeout(() =>{
        dispatch({ 
          type: 'COUNTRY_RESET'
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: 'COUNTRY_FAILED', 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: 'COUNTRY_RESET'
          });
        }, 1500)
    }
};