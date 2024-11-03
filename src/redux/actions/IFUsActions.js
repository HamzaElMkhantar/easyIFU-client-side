import axios from "axios";
import {
  ALL_IFUs_FAILED,
  ALL_IFUs_REQUEST,
  ALL_IFUs_RESET,
  ALL_IFUs_SUCCESS,
  GET_IFU_REQUEST,
  GET_IFU_RESET,
  GET_IFU_SUCCESS,
  GET_IFU_FAILED,
  CREATE_IFU_REQUEST,
  CREATE_IFU_SUCCESS,
  CREATE_IFU_FAILED,
  CREATE_IFU_RESET,
  SEND_TO_APPROVER_REQUEST,
  SEND_TO_APPROVER_SUCCESS,
  SEND_TO_APPROVER_FAILED,
  SEND_TO_APPROVER_RESET,
  APPROVE_IFU_REQUEST,
  APPROVE_IFU_SUCCESS,
  APPROVE_IFU_FAILED,
  APPROVE_IFU_RESET,
  SEND_TO_RELEASER_REQUEST,
  SEND_TO_RELEASER_SUCCESS,
  SEND_TO_RELEASER_FAILED,
  SEND_TO_RELEASER_RESET,
  RELEASE_IFU_REQUEST,
  RELEASE_IFU_SUCCESS,
  RELEASE_IFU_FAILED,
  RELEASE_IFU_RESET,
  DRAFT_IFU_REQUEST,
  DRAFT_IFU_SUCCESS,
  DRAFT_IFU_FAILED,
  DRAFT_IFU_RESET,
  APPROVED_IFU_REQUEST,
  APPROVED_IFU_SUCCESS,
  APPROVED_IFU_FAILED,
  APPROVED_IFU_RESET,
  REJECTED_IFU_REQUEST,
  REJECTED_IFU_SUCCESS,
  REJECTED_IFU_FAILED,
  REJECTED_IFU_RESET,
  FIND_IFUs_BY_PROJECT_REQUEST,
  FIND_IFUs_BY_PROJECT_SUCCESS,
  FIND_IFUs_BY_PROJECT_FAILED,
  FIND_IFUs_BY_PROJECT_RESET,
  CREATE_IFUs_ON_PROJECT_REQUEST,
  CREATE_IFUs_ON_PROJECT_SUCCESS,
  CREATE_IFUs_ON_PROJECT_FAILED,
  CREATE_IFUs_ON_PROJECT_RESET,
  ALL_IFU_LANGUES_REQUEST,
  ALL_IFU_LANGUES_SUCCESS,
  ALL_IFU_LANGUES_FAILED,
  ALL_IFU_LANGUES_RESET,
  FIND_RECEIVED_IFU_REQUEST,
  FIND_RECEIVED_IFU_SUCCESS,
  FIND_RECEIVED_IFU_FAILED,
  FIND_RECEIVED_IFU_RESET,
  EDIT_IFU_REQUEST,
  EDIT_IFU_SUCCESS,
  EDIT_IFU_RESET,
  EDIT_IFU_FAILED,
  UPDATE_IFU_REQUEST,
  UPDATE_IFU_SUCCESS,
  UPDATE_IFU_RESET,
  UPDATE_IFU_FAILED,
  FIND_ALL_IFU_REQUEST,
  FIND_ALL_IFU_SUCCESS,
  FIND_ALL_IFU_FAILED,
  FIND_ALL_IFU_RESET,
  FIND_PUBLIC_IFU_REQUEST,
  FIND_PUBLIC_IFU_SUCCESS,
  FIND_PUBLIC_IFU_FAILED,
  FIND_PUBLIC_IFU_RESET,
} from "../constants/IFUsConstants";

// --------------------------- IFUs by projectId ---------------------------------


export const findIFUsByProjectIdAction =
  (ifuId, companyId, createdBy, token) => async (dispatch) => {
    try {
      dispatch({ type: FIND_IFUs_BY_PROJECT_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/get-by-project/${ifuId}/${companyId}/${createdBy}`,
        config
      );
      console.log(response.data);

      dispatch({ type: FIND_IFUs_BY_PROJECT_SUCCESS, payload: response.data });
      setTimeout(() => {
        dispatch({
          type: FIND_IFUs_BY_PROJECT_RESET,
        });
      }, 1500);
    } catch (error) {
      console.error(error);
      dispatch({
        type: FIND_IFUs_BY_PROJECT_FAILED,
        payload: error?.response?.data,
      });
      setTimeout(() => {
        dispatch({
          type: FIND_IFUs_BY_PROJECT_RESET,
        });
      }, 1500);
    }
  };


// export const findOneIFUsAction =
//   ({ifuId, companyId, createdBy, token}) => async (dispatch) => {
//     try {
//       dispatch({ type: FIND_IFUs_BY_PROJECT_REQUEST });

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const [pdfDataResponse, ifuDataResponse] = await Promise.all([
//         axios.get(
//           `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/get-one-pdfData/${ifuId}/${companyId}/${createdBy}`,
//           config
//         ),
//         axios.get(
//           `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/get-one/${ifuId}/${companyId}/${createdBy}`,
//           config
//         ),
//       ]);

//       const combinedData = {
//         pdfData: pdfDataResponse.data,
//         ifuData: ifuDataResponse.data,
//       };

//       dispatch({ type: FIND_IFUs_BY_PROJECT_SUCCESS, payload: combinedData });
//       setTimeout(() => {
//         dispatch({
//           type: FIND_IFUs_BY_PROJECT_RESET,
//         });
//       }, 1500);
//     } catch (error) {
//       console.error(error);
//       dispatch({
//         type: FIND_IFUs_BY_PROJECT_FAILED,
//         payload: error?.response?.data,
//       });
//       setTimeout(() => {
//         dispatch({
//           type: FIND_IFUs_BY_PROJECT_RESET,
//         });
//       }, 1500);
//     }
//   };

export const createIFUsDataAction = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_IFUs_ON_PROJECT_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/create-ifu-data`,
      data,
      config
    );

    dispatch({ type: CREATE_IFUs_ON_PROJECT_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: CREATE_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: CREATE_IFUs_ON_PROJECT_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: CREATE_IFUs_ON_PROJECT_RESET });
    }, 1500);
  }
};

// --------------------------- IFUs by productId ---------------------------------
export const getAllIFUsAction =
  (IFUsContainerId, companyId, createdBy, queryStatus, queryLangue,  token) => async (dispatch) => {
    console.log({ IFUsContainerId, companyId, createdBy });
    try {
      dispatch({ type: ALL_IFUs_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/get-all/${IFUsContainerId}/${companyId}/${createdBy}?status=${queryStatus}&langue=${queryLangue}`,
        config
      );
      console.log(response.data);

      dispatch({ type: ALL_IFUs_SUCCESS, payload: response.data });
      setTimeout(() => {
        dispatch({
          type: ALL_IFUs_RESET,
        });
      }, 1500);
    } catch (error) {
      dispatch({
        type: ALL_IFUs_FAILED,
        payload: error?.response?.data,
      });
      setTimeout(() => {
        dispatch({
          type: ALL_IFUs_RESET,
        });
      }, 1500);
    }
  };


  export const getIFUsLanguesAction =
  (IFUsContainerId, companyId, createdBy,  token) => async (dispatch) => {
    try {
      dispatch({ type: ALL_IFU_LANGUES_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/ifu-Langues/${IFUsContainerId}/${companyId}/${createdBy}`,
        config
      );

      dispatch({ type: ALL_IFU_LANGUES_SUCCESS, payload: response.data });
      setTimeout(() => {
        dispatch({
          type: ALL_IFU_LANGUES_RESET,
        });
      }, 1500);
    } catch (error) {
      dispatch({
        type: ALL_IFU_LANGUES_FAILED,
        payload: error?.response?.data,
      });
      setTimeout(() => {
        dispatch({
          type: ALL_IFU_LANGUES_RESET,
        });
      }, 1500);
    }
  };

  export const findAllIFUsAction =
  (companyId,  token) => async (dispatch) => {
    try {
      dispatch({ type: FIND_ALL_IFU_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/find-all/${companyId}`,
        config
      );

      dispatch({ type: FIND_ALL_IFU_SUCCESS, payload: response.data });
      setTimeout(() => {
        dispatch({
          type: FIND_ALL_IFU_RESET,
        });
      }, 1500);
    } catch (error) {
      dispatch({
        type: FIND_ALL_IFU_FAILED,
        payload: error?.response?.data,
      });
      setTimeout(() => {
        dispatch({
          type: FIND_ALL_IFU_RESET,
        });
      }, 1500);
    }
  };

  export const findReceivedIFUsAction =
  (id, token) => async (dispatch) => {
    try {
      dispatch({ type: FIND_RECEIVED_IFU_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/received-ifu/${id}`,
        config
      );

      dispatch({ type: FIND_RECEIVED_IFU_SUCCESS, payload: response.data });
      setTimeout(() => {
        dispatch({
          type: FIND_RECEIVED_IFU_RESET,
        });
      }, 1500);
    } catch (error) {
      dispatch({
        type: FIND_RECEIVED_IFU_FAILED,
        payload: error?.response?.data,
      });
      setTimeout(() => {
        dispatch({
          type: FIND_RECEIVED_IFU_RESET,
        });
      }, 1500);
    }
  };

  export const getIFUAction = ({ ifuId, companyId, token }) => async (dispatch) => {
    try {
      dispatch({ type: GET_IFU_REQUEST });
  console.log({ ifuId, companyId, token })
      const config1 = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Set response type to blob for PDF data
      };
      const config2 = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      };
      const [pdfDataResponse, ifuDataResponse] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/get-one-pdfData/${ifuId}/${companyId}`,
          config1
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/get-one/${ifuId}/${companyId}`,
          config2
        ),
      ]);
  
      // Check if the PDF response is successful
      if (pdfDataResponse.status === 200) {
        // Create a URL for the Blob
        const url = URL.createObjectURL(new Blob([pdfDataResponse.data], { type: 'application/pdf' }));
  
        const combinedData = {
          pdfData: url,
          ifuData: ifuDataResponse.data,
        };

        dispatch({ type: GET_IFU_SUCCESS, payload: combinedData });
  
        setTimeout(() => {
          dispatch({ type: GET_IFU_RESET });
        }, 1500);
      } else {
        throw new Error('Failed to fetch PDF data');
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: GET_IFU_FAILED,
        payload: error?.response?.data,
      });
      setTimeout(() => {
        dispatch({ type: GET_IFU_RESET });
      }, 1500);
    }
  };

// Action to create an IFU
export const createIFUAction = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/create`,
      data,
      config
    );

    dispatch({ type: CREATE_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: CREATE_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: CREATE_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: CREATE_IFU_RESET });
    }, 1500);
  }
};


// Action to send IFU to approver
export const sendToApproverAction = (data) => async (dispatch) => {
  try {

    dispatch({ type: SEND_TO_APPROVER_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/to-approver`,
      data,
      config
    );
    console.log(response.data);

    dispatch({ type: SEND_TO_APPROVER_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: SEND_TO_APPROVER_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: SEND_TO_APPROVER_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: SEND_TO_APPROVER_RESET });
    }, 1500);
  }
};

// Action to approve IFU
export const approveIFUAction = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/approve`,
      data,
      config
    );

    dispatch({ type: APPROVE_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: APPROVE_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: APPROVE_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: APPROVE_IFU_RESET });
    }, 1500);
  }
};

// Action to send IFU to releaser
export const sendToReleaserAction = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: SEND_TO_RELEASER_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/to-publisher`,
      data,
      config
    );

    dispatch({ type: SEND_TO_RELEASER_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: SEND_TO_RELEASER_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: SEND_TO_RELEASER_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: SEND_TO_RELEASER_RESET });
    }, 1500);
  }
};

// Action to release IFU
export const releaseIFUAction = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: RELEASE_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/publish`,
      data,
      config
    );

    dispatch({ type: RELEASE_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: RELEASE_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: RELEASE_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: RELEASE_IFU_RESET });
    }, 1500);
  }
};

// Action to draft IFU
export const draftIFUAction = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: DRAFT_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/draft`,
      data,
      config
    );

    dispatch({ type: DRAFT_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: DRAFT_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: DRAFT_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: DRAFT_IFU_RESET });
    }, 1500);
  }
};

// Action to mark IFU as approved
export const approvedIFUAction = (ifuId, token) => async (dispatch) => {
  try {
    dispatch({ type: APPROVED_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/approved/${ifuId}`,
      {},
      config
    );

    dispatch({ type: APPROVED_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: APPROVED_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: APPROVED_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: APPROVED_IFU_RESET });
    }, 1500);
  }
};

// Action to mark IFU as rejected
export const rejectedIFUAction = (ifuId, token) => async (dispatch) => {
  try {
    dispatch({ type: REJECTED_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/rejected/${ifuId}`,
      {},
      config
    );

    dispatch({ type: REJECTED_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: REJECTED_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: REJECTED_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: REJECTED_IFU_RESET });
    }, 1500);
  }
};

export const editIFUAction = (data, token) => async (dispatch) => {
  console.log({data})
  try {
    dispatch({ type: EDIT_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/edit-ifu`,
      data,
      config
    );
    console.log({payload: response.data})

    dispatch({ type: EDIT_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: EDIT_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: EDIT_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: EDIT_IFU_RESET });
    }, 1500);
  }
};

export const updateIFUAction = (data, token) => async (dispatch) => {
  try {

    console.log({data})
    dispatch({ type: UPDATE_IFU_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/update`,
      data,
      config
    );
    console.log({payload: response.data})

    dispatch({ type: UPDATE_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: UPDATE_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: UPDATE_IFU_RESET });
    }, 1500);
  }
};

export const findPublicIFUAction = (ifuId) => async (dispatch) => {
  try {


    dispatch({ type: FIND_PUBLIC_IFU_REQUEST });
    const config = {
      headers: {
        'Accept': 'application/json',
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/ifu/find-public-ifu/${ifuId}`,
      config
    );
    console.log({payload: response.data})

    dispatch({ type: FIND_PUBLIC_IFU_SUCCESS, payload: response.data });
    setTimeout(() => {
      dispatch({ type: FIND_PUBLIC_IFU_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: FIND_PUBLIC_IFU_FAILED,
      payload: error?.response?.data,
    });
    setTimeout(() => {
      dispatch({ type: FIND_PUBLIC_IFU_RESET });
    }, 1500);
  }
};
