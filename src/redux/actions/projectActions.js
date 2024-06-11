import axios from 'axios';
import { ALL_PROJECTS_FAILED, ALL_PROJECTS_REQUEST, 
            ALL_PROJECTS_RESET, 
            ALL_PROJECTS_SUCCESS, 
            ARCHIVED_PROJECTS_FAILED, 
            ARCHIVED_PROJECTS_REQUEST, 
            ARCHIVED_PROJECTS_RESET, 
            ARCHIVED_PROJECTS_SUCCESS, 
            DELETE_DOCUMENTS_FAILED, 
            DELETE_DOCUMENTS_REQUEST, 
            DELETE_DOCUMENTS_RESET, 
            DELETE_DOCUMENTS_SUCCESS, 
            DELETE_PROJECT_FAILED, 
            DELETE_PROJECT_REQUEST, 
            DELETE_PROJECT_RESET, 
            DELETE_PROJECT_SUCCESS, 
            DOCUMENTS_FAILED, 
            DOCUMENTS_REQUEST, 
            DOCUMENTS_RESET, 
            DOCUMENTS_SUCCESS, 
            DOCUMENT_FAILED, 
            DOCUMENT_REQUEST, 
            DOCUMENT_RESET, 
            DOCUMENT_SUCCESS, 
            DUPLICATE_PROJECTS_FAILED, 
            DUPLICATE_PROJECTS_REQUEST, 
            DUPLICATE_PROJECTS_RESET, 
            DUPLICATE_PROJECTS_SUCCESS, 
            GET_DOCUMENT_FAILED, 
            GET_DOCUMENT_REQUEST, 
            GET_DOCUMENT_RESET, 
            GET_DOCUMENT_SUCCESS, 
            GET_PROJECT_FAILED, 
            GET_PROJECT_REQUEST, 
            GET_PROJECT_RESET, 
            GET_PROJECT_SUCCESS, 
            IVD_DIAGNOSTIC_FAILED, 
            IVD_DIAGNOSTIC_REQUEST, 
            IVD_DIAGNOSTIC_RESET, 
            IVD_DIAGNOSTIC_SUCCESS, 
            LEGISLATION_FAILED, 
            LEGISLATION_REQUEST, 
            LEGISLATION_RESET, 
            LEGISLATION_SUCCESS, 
            MANUFACTURER_INFORMATION_FAILED, 
            MANUFACTURER_INFORMATION_REQUEST,
            MANUFACTURER_INFORMATION_RESET,
            MANUFACTURER_INFORMATION_SUCCESS,
            OTHERS_FAILED,
            OTHERS_REQUEST,
            OTHERS_RESET,
            OTHERS_SUCCESS,
            PRODUCT_INFORMATION_FAILED,
            PRODUCT_INFORMATION_REQUEST,
            PRODUCT_INFORMATION_RESET,
            PRODUCT_INFORMATION_SUCCESS,
            PRODUCT_INTEDED_PURPOSE_FAILED,
            PRODUCT_INTEDED_PURPOSE_REQUEST,
            PRODUCT_INTEDED_PURPOSE_RESET,
            PRODUCT_INTEDED_PURPOSE_SUCCESS,
            RELEASED_PROJECT_FAILED,
            RELEASED_PROJECT_REQUEST,
            RELEASED_PROJECT_RESET,
            RELEASED_PROJECT_SUCCESS,
            RELEASE_PROJECT_FAILED,
            RELEASE_PROJECT_REQUEST,
            RELEASE_PROJECT_RESET,
            RELEASE_PROJECT_SUCCESS,
            ROLE_PROJECT_FAILED,
            ROLE_PROJECT_REQUEST,
            ROLE_PROJECT_RESET,
            ROLE_PROJECT_SUCCESS,
            SAFE_USE_FAILED,
            SAFE_USE_REQUEST,
            SAFE_USE_RESET,
            SAFE_USE_SUCCESS,
            SENDING_PROJECT_FAILED,
            SENDING_PROJECT_REQUEST,
            SENDING_PROJECT_RESET,
            SENDING_PROJECT_SUCCESS,
            START_PROJECT_FAILED, 
            START_PROJECT_REQUEST, 
            START_PROJECT_RESET, 
            START_PROJECT_SUCCESS, 
            STERILITY_FAILED, 
            STERILITY_REQUEST,
            STERILITY_RESET,
            STERILITY_SUCCESS,
            STORAGE_FAILED,
            STORAGE_REQUEST,
            STORAGE_RESET,
            STORAGE_SUCCESS,
            TOGGLE_ARCHIVE_PROJECT_FAILED,
            TOGGLE_ARCHIVE_PROJECT_REQUEST,
            TOGGLE_ARCHIVE_PROJECT_RESET,
            TOGGLE_ARCHIVE_PROJECT_SUCCESS,
            TRANSFUSION_INFUSION_FAILED,
            TRANSFUSION_INFUSION_REQUEST,
            TRANSFUSION_INFUSION_RESET,
            TRANSFUSION_INFUSION_SUCCESS,
            TRANSLATION_REPACKAGING_FAILED,
            TRANSLATION_REPACKAGING_REQUEST,
            TRANSLATION_REPACKAGING_RESET,
            TRANSLATION_REPACKAGING_SUCCESS} from '../constants/projectConstants';

import { navigate } from 'react-router-dom';

export const getAllProjectsAction = (companyId, createdBy, token) => async (dispatch) => {
    try {
        dispatch({ 
            type: ALL_PROJECTS_REQUEST
        });

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/project/project-company/${companyId}/${createdBy}`, config);

        dispatch({ 
            type: ALL_PROJECTS_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: ALL_PROJECTS_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: ALL_PROJECTS_FAILED, 
            payload: error?.response?.data 
        });

        setTimeout(() =>{
            dispatch({ 
            type: ALL_PROJECTS_RESET
            });
        }, 1500)
        }
};

export const getArchivedProjectsAction = (companyId, token) => async (dispatch) => {
  try {
  
      dispatch({ 
          type: ARCHIVED_PROJECTS_REQUEST
      });

      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/project/project-archived/${companyId}`, config);

      dispatch({ 
          type: ARCHIVED_PROJECTS_SUCCESS, 
          payload: response.data
      });
      setTimeout(() =>{
      dispatch({ 
          type: ARCHIVED_PROJECTS_RESET
      });
      }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: ARCHIVED_PROJECTS_FAILED, 
          payload: error?.response?.data 
      });

      setTimeout(() =>{
          dispatch({ 
          type: ARCHIVED_PROJECTS_RESET
          });
      }, 1500)
      }
};

export const archivedProjectToggleAction = (projectId, token) => async (dispatch) => {
  try {
    console.log(projectId, token)
      dispatch({ 
          type: TOGGLE_ARCHIVE_PROJECT_REQUEST
      });

      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/project/archive-toggle/${projectId}`, config);

      dispatch({ 
          type: TOGGLE_ARCHIVE_PROJECT_SUCCESS, 
          payload: response.data
      });
      setTimeout(() =>{
      dispatch({ 
          type: TOGGLE_ARCHIVE_PROJECT_RESET
      });
      }, 1500)
  } catch (error) {
      console.error(error);
      dispatch({
          type: TOGGLE_ARCHIVE_PROJECT_FAILED, 
          payload: error?.response?.data 
      });

      setTimeout(() =>{
          dispatch({ 
          type: TOGGLE_ARCHIVE_PROJECT_RESET
          });
      }, 1500)
      }
};

export const duplicateLabelAction = (labelId, token) => async (dispatch) => {
  try {

    console.log("duplicate labelId : ",labelId)
   
      dispatch({ 
          type: DUPLICATE_PROJECTS_REQUEST
      });

      const config = {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/duplicate-label`, {labelId}, config);

      console.log("duplicate response : ", response)
      dispatch({ 
          type: DUPLICATE_PROJECTS_SUCCESS, 
          payload: response.data
      });
      setTimeout(() =>{
      dispatch({ 
          type: DUPLICATE_PROJECTS_RESET
      });
      }, 1500)
  } catch (error) {
      console.log(error);
      dispatch({
          type: DUPLICATE_PROJECTS_FAILED, 
          payload: error?.response?.data 
      });

      setTimeout(() =>{
          dispatch({ 
          type: DUPLICATE_PROJECTS_RESET
          });
      }, 1500)
      }
};

export const getProjectAction = (projectId, token) => async (dispatch) => {
    try {

    
        dispatch({ 
            type: GET_PROJECT_REQUEST
        });

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/label/${projectId}`, config);
      console.log(response.data)
        dispatch({ 
            type: GET_PROJECT_SUCCESS, 
            payload: response.data
        });
        setTimeout(() =>{
        dispatch({ 
            type: GET_PROJECT_RESET
        });
        }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_PROJECT_FAILED, 
            payload: error?.response?.data 
        });

        setTimeout(() =>{
            dispatch({ 
            type: GET_PROJECT_RESET
            });
        }, 1500)
        }
    };

export const startProjectAction = (projectData, token) => async (dispatch) => {
    try {
  
      dispatch({ type: START_PROJECT_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/project/create-project`, {projectData}, config);
  
      dispatch({ 
            type: START_PROJECT_SUCCESS, 
            payload: response.data.projectId
        });
      setTimeout(() =>{
        dispatch({ 
          type: START_PROJECT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: START_PROJECT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: START_PROJECT_RESET
          });
        }, 1500)
      }
  };

  export const deleteProjectAction = (projectId, token) => async (dispatch) => {
    try {

        console.log(projectId)
  
      dispatch({ type: DELETE_PROJECT_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/project/delete-project/${projectId}`, config);
  
      dispatch({ 
            type: DELETE_PROJECT_SUCCESS, 
            payload: response.data
        });
      setTimeout(() =>{
        dispatch({ 
          type: DELETE_PROJECT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DELETE_PROJECT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: DELETE_PROJECT_RESET
          });
        }, 1500)
      }
  };

  export const manufacturerInformationAction = (manufacturerData, token) => async (dispatch) => {
    try {
  
      dispatch({ type: MANUFACTURER_INFORMATION_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/manufacturer-information`, manufacturerData, config);
  
      dispatch({ 
            type: MANUFACTURER_INFORMATION_SUCCESS, 
            payload: response.data
        });
      setTimeout(() =>{
        dispatch({ 
          type: MANUFACTURER_INFORMATION_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: MANUFACTURER_INFORMATION_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: MANUFACTURER_INFORMATION_RESET
          });
        }, 1500)
      }
  };

  export const legislationAction = (formData, token) => async (dispatch) => {
    try {
  
      dispatch({ type: LEGISLATION_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/legislation`, formData, config);
  
      dispatch({ 
            type: LEGISLATION_SUCCESS, 
            payload: response.data
        });
      setTimeout(() =>{
        dispatch({ 
          type: LEGISLATION_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: LEGISLATION_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: LEGISLATION_RESET
          });
        }, 1500)
      }
  };

  export const productInformationAction = (productInfoData, token) => async (dispatch) => {
    try {
  
      dispatch({type: PRODUCT_INFORMATION_REQUEST});


        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        };
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/product-information`, productInfoData, config);
      console.log(response.data)
      dispatch({ 
            type: PRODUCT_INFORMATION_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: PRODUCT_INFORMATION_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: PRODUCT_INFORMATION_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: PRODUCT_INFORMATION_RESET
          });
        }, 1500)
      }
  };

  export const intendedPurposeAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({type: PRODUCT_INTEDED_PURPOSE_REQUEST});


        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/intended-purpose`, data, config);

      dispatch({ 
            type: PRODUCT_INTEDED_PURPOSE_SUCCESS,
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: PRODUCT_INTEDED_PURPOSE_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: PRODUCT_INTEDED_PURPOSE_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: PRODUCT_INTEDED_PURPOSE_RESET
          });
        }, 1500)
      }
  };

  export const uploadManufacturerLogoAction = (formDATA, token) => async (dispatch) => {
    try {
  
      dispatch({ type: "UPLOAD-LOGO-REQUEST" }) ;

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        };
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/project/upload-manufacturerLogo`, formDATA, config);
  
      dispatch({ 
            type: "UPLOAD-LOGO-SUCCESS", 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: "UPLOAD-LOGO-RESET"
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: "UPLOAD-LOGO-FAILED", 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: "UPLOAD-LOGO-RESET"
          });
        }, 1500)
      }
  };

  export const sterilityAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: STERILITY_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/sterility`, data, config);
  
      dispatch({ 
            type: STERILITY_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: STERILITY_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: STERILITY_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: STERILITY_RESET
          });
        }, 1500)
      }
  };

  export const storageAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: STORAGE_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/storage`, data, config);
  
      dispatch({ 
            type: STORAGE_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: STORAGE_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: STORAGE_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: STORAGE_RESET
          });
        }, 1500)
      }
  };

  export const safeUseAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: SAFE_USE_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/safeUse`, data, config);
  
      dispatch({ 
            type: SAFE_USE_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: SAFE_USE_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: SAFE_USE_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: SAFE_USE_RESET
          });
        }, 1500)
      }
  };

  export const IVDDiagnosticAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: IVD_DIAGNOSTIC_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/IVD-diagnostic`, data, config);
  
      dispatch({ 
            type: IVD_DIAGNOSTIC_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: IVD_DIAGNOSTIC_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: IVD_DIAGNOSTIC_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: IVD_DIAGNOSTIC_RESET
          });
        }, 1500)
      }
  };

  export const transfusionInfusionAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: TRANSFUSION_INFUSION_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/transfusion-infusion`, data, config);
      console.log(response)
  
      dispatch({ 
            type: TRANSFUSION_INFUSION_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: TRANSFUSION_INFUSION_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: TRANSFUSION_INFUSION_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: TRANSFUSION_INFUSION_RESET
          });
        }, 1500)
      }
  };

  export const othersAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: OTHERS_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/others`, data, config);
  
      dispatch({ 
            type: OTHERS_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: OTHERS_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: OTHERS_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: OTHERS_RESET
          });
        }, 1500)
      }
  };

  export const translationAndRepackagingAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: TRANSLATION_REPACKAGING_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/product/translation-repackaging`, data, config);
  
      dispatch({ 
            type: TRANSLATION_REPACKAGING_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: TRANSLATION_REPACKAGING_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: TRANSLATION_REPACKAGING_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: TRANSLATION_REPACKAGING_RESET
          });
        }, 1500)
      }
  };

  export const sendingProjectToOtherRoleAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: SENDING_PROJECT_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/label/sent-to-approver`, data, config);

      dispatch({ 
            type: SENDING_PROJECT_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: SENDING_PROJECT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: SENDING_PROJECT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: SENDING_PROJECT_RESET
          });
        }, 1500)
      }
  };

  export const ProjectByRoleIdAction = (roleId, token) => async (dispatch) => {
    try {
  
      dispatch({ type: ROLE_PROJECT_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/project/project-by-role/${roleId}`, config);
  
      dispatch({ 
            type: ROLE_PROJECT_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: ROLE_PROJECT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: ROLE_PROJECT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: ROLE_PROJECT_RESET
          });
        }, 1500)
      }
  };
  export const releasedProjectAction = ({companyId, productId, createdBy}, token) => async (dispatch) => {
    try {
  
      dispatch({ type: RELEASED_PROJECT_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/project/released-project/${companyId}/${productId}/${createdBy}`, config);
  console.log(response.data)
      dispatch({ 
            type: RELEASED_PROJECT_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: RELEASED_PROJECT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: RELEASED_PROJECT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: RELEASED_PROJECT_RESET
          });
        }, 1500)
      }
  };

  export const ReleaseTheProjectAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: RELEASE_PROJECT_REQUEST});

      const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/project/release-the-project`, data, config);
  
      dispatch({ 
            type: RELEASE_PROJECT_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: RELEASE_PROJECT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: RELEASE_PROJECT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: RELEASE_PROJECT_RESET
          });
        }, 1500)
      }
  };

  export const saveDocumentAction = (data, token) => async (dispatch) => {
    try {
  
      dispatch({ type: DOCUMENT_REQUEST});

      const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/project/upload-document`, data, config);
    console.log(response)
      dispatch({ 
            type: DOCUMENT_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: DOCUMENT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DOCUMENT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: DOCUMENT_RESET
          });
        }, 1500)
      }
  };

  export const documentsAction = (companyId, token) => async (dispatch) => {
    try {
  
      dispatch({ type: DOCUMENTS_REQUEST});

      const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/project/documents-company/${companyId}`, config);
    console.log(response)
      dispatch({ 
            type: DOCUMENTS_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: DOCUMENTS_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DOCUMENTS_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: DOCUMENTS_RESET
          });
        }, 1500)
      }
  };

  export const deleteDocumentsAction = (documentId, token) => async (dispatch) => {
    try {
  
      dispatch({ type: DELETE_DOCUMENTS_REQUEST});

      const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/project/document-delete/${documentId}`, config);
    console.log(response)
      dispatch({ 
            type: DELETE_DOCUMENTS_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: DELETE_DOCUMENTS_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: DELETE_DOCUMENTS_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: DELETE_DOCUMENTS_RESET
          });
        }, 1500)
      }
  };

  export const documentByIdAction = (documentId, token) => async (dispatch) => {
    try {
  
      dispatch({ type: GET_DOCUMENT_REQUEST});

      const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
  
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/project/document-by-id/${documentId}`, config);
    console.log(response)
      dispatch({ 
            type: GET_DOCUMENT_SUCCESS, 
            payload: response.data
        });

      setTimeout(() =>{
        dispatch({ 
          type: GET_DOCUMENT_RESET
        });
      }, 1500)
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_DOCUMENT_FAILED, 
            payload: error?.response?.data });
        setTimeout(() =>{
          dispatch({ 
            type: GET_DOCUMENT_RESET
          });
        }, 1500)
      }
  };