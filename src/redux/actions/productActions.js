import axios from 'axios';
import {CREATE_PRODUCT_FAILED, 
        CREATE_PRODUCT_REQUEST, 
        CREATE_PRODUCT_RESET, 
        CREATE_PRODUCT_SUCCESS,

        PRODUCTS_FAILED, 
        PRODUCTS_REQUEST, 
        PRODUCTS_RESET, 
        PRODUCTS_SUCCESS,
        PRODUCT_BY_ID_FAILED,
        PRODUCT_BY_ID_REQUEST,
        PRODUCT_BY_ID_RESET,
        PRODUCT_BY_ID_SUCCESS} from '../constants/productConstants';

export const getProductByProjectIdAction = (projectId, companyId, createdBy, token) => async (dispatch) => {
    try {

      dispatch({ type: PRODUCTS_REQUEST });
      const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/products-company/${projectId}/${companyId}/${createdBy}`, config);
      console.log(response.data)
  
      dispatch({ 
                type: PRODUCTS_SUCCESS, 
                payload: response.data 
            });
      setTimeout(() =>{
        dispatch({ 
          type: PRODUCTS_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: PRODUCTS_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: PRODUCTS_RESET
          });
        }, 1500)
    }
};

export const createProductAction = (productData, token) => async (dispatch) => {
  try {

    console.log(productData)

    dispatch({ type: CREATE_PRODUCT_REQUEST});

    const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/create-product`, {productData}, config);

    dispatch({ 
          type: CREATE_PRODUCT_SUCCESS, 
          payload: response.data
      });
    setTimeout(() =>{
      dispatch({ 
        type: CREATE_PRODUCT_RESET
      });
    }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: CREATE_PRODUCT_FAILED, 
          payload: error?.response?.data });
      setTimeout(() =>{
        dispatch({ 
          type: CREATE_PRODUCT_RESET
        });
      }, 1500)
    }
};

export const getProductByIdAction = (productId, token) => async (dispatch) => {
  try {

    dispatch({ type: PRODUCT_BY_ID_REQUEST });
    const config = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/${productId}`, config);
console.log(response)

    dispatch({ 
              type: PRODUCT_BY_ID_SUCCESS, 
              payload: response.data 
          });
    setTimeout(() =>{
      dispatch({ 
        type: PRODUCT_BY_ID_RESET
      });
    }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: PRODUCT_BY_ID_FAILED, 
          payload: error?.response?.data });
      setTimeout(() =>{
        dispatch({ 
          type: PRODUCT_BY_ID_RESET
        });
      }, 1500)
  }
};