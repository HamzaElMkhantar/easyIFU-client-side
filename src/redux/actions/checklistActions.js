import axios from "axios";
import {
  GET_CHECKLIST_FAILED,
  GET_CHECKLIST_REQUEST,
  GET_CHECKLIST_RESET,
  GET_CHECKLIST_SUCCESS,
} from "../constants/checklistConstant";
 
export const findCompanyChecklistAction = (companyId, token) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHECKLIST_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/checkList/retrieve/${companyId}`,
      config
    );

    dispatch({
      type: GET_CHECKLIST_SUCCESS,
      payload: response.data,
    });
    setTimeout(() => {
      dispatch({
        type: GET_CHECKLIST_RESET,
      });
    }, 1500);
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_CHECKLIST_FAILED,
      payload: error?.response?.data,
    });

    setTimeout(() => {
      dispatch({
        type: GET_CHECKLIST_RESET,
      });
    }, 1500);
  }
};
