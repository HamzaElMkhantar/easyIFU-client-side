import {
  ALL_IFUs_FAILED,
  ALL_IFUs_REQUEST,
  ALL_IFUs_RESET,
  ALL_IFUs_SUCCESS,
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
  EDIT_IFU_REQUEST,
  EDIT_IFU_SUCCESS,
  EDIT_IFU_FAILED,
  EDIT_IFU_RESET,
  GET_IFU_REQUEST,
  GET_IFU_SUCCESS,
  GET_IFU_FAILED,
  GET_IFU_RESET,
  FIND_IFUs_BY_PROJECT_REQUEST,
  FIND_IFUs_BY_PROJECT_SUCCESS,
  FIND_IFUs_BY_PROJECT_RESET,
  FIND_IFUs_BY_PROJECT_FAILED,
  CREATE_IFUs_ON_PROJECT_RESET,
  CREATE_IFUs_ON_PROJECT_SUCCESS,
  CREATE_IFUs_ON_PROJECT_REQUEST,
  CREATE_IFUs_ON_PROJECT_FAILED,
  ALL_IFU_LANGUES_REQUEST,
  ALL_IFU_LANGUES_RESET,
  ALL_IFU_LANGUES_FAILED,
  ALL_IFU_LANGUES_SUCCESS,
  FIND_RECEIVED_IFU_REQUEST,
  FIND_RECEIVED_IFU_SUCCESS,
  FIND_RECEIVED_IFU_RESET,
  FIND_RECEIVED_IFU_FAILED,
  UPDATE_IFU_REQUEST,
  UPDATE_IFU_SUCCESS,
  UPDATE_IFU_FAILED,
  UPDATE_IFU_RESET,
  FIND_ALL_IFU_REQUEST,
  FIND_ALL_IFU_SUCCESS,
  FIND_ALL_IFU_RESET,
  FIND_ALL_IFU_FAILED,
  FIND_PUBLIC_IFU_REQUEST,
  FIND_PUBLIC_IFU_SUCCESS,
  FIND_PUBLIC_IFU_RESET,
  FIND_PUBLIC_IFU_FAILED,
} from "../constants/IFUsConstants";

// Initial state for each reducer
const createIFUState = {
  ifuRequest: false,
  ifuSuccess: false,
  ifuFail: null,
  createdIfu: null,
};

const sendToApproverState = {
  approverRequest: false,
  approverSuccess: false,
  approverFail: null,
  sendToApprover: null,
};

const approveIFUState = {
  approveRequest: false,
  approveSuccess: false,
  approveFail: null,
  approvedIfu: null,
};

const sendToReleaserState = {
  releaserRequest: false,
  releaserSuccess: false,
  releaserFail: null,
  sendToRelease: null,
};

const releaseIFUState = {
  releaseIFURequest: false,
  releaseIFUSuccess: false,
  releaseIFUFail: null,
  releasedIfu: null,
};

const draftIFUState = {
  draftRequest: false,
  draftSuccess: false,
  draftFail: null,
  draftedIfu: null,
};

const approvedIFUState = {
  approvedRequest: false,
  approvedSuccess: false,
  approvedFail: null,
  approvedIfu: null,
};

const rejectedIFUState = {
  rejectedRequest: false,
  rejectedSuccess: false,
  rejectedFail: null,
  rejectedIfu: null,
};

const editIFUState = {
  editIFURequest: false,
  editIFUSuccess: false,
  editIFUFail: null,
  editIfu: null,
};

const getAllIFUs = {
    IFUsRequest: false,
    IFUsSuccess: false,
    IFUsFail: null,
    IFUsData: null
}

const getLanguesIFUs = {
  IFULanguesRequest: false,
  IFULanguesSuccess: false,
  IFULanguesFail: null,
  IFULangues: null,
}

const getOneIfu = {
  ifuRequest: false,
  ifuSuccess: false,
  ifuFail: null,
  ifuData: null,
}

const findReceivedIFUs = {
  findReceivedIFURequest: false,
  findReceivedIFUSuccess: false,
  findReceivedIFUFail: null,
  findReceivedIFUData: null,
}

// --------------------------- IFUs by projectId ---------------------------------
const createIFUsData = {
  createIFURequest: false,
  createIFUSuccess: false,
  createdIFU: null,
  createIFUFail: null,
}

const findIFUsByProjectId = {
  findIFUByProjectRequest: false,
  findIFUByProjectSuccess: false,
  findIFUByProjectFail: null,
  findIFUByProjectData: null,
}

const updateIFUState = {
  updateIFURequest: false,
  updateIFUSuccess: false,
  updateIFUFail: null,
  updateIfu: null,
}

const findAlleIFUs = {
  findAllIFUsSuccess: false,
  findAllIFUsData: null,
  findAllIFUsRequest: false,
  findAllIFUsFail: null,
}

const findPublicIFU = {
  findPublicIFUSuccess: false,
  findPublicIFUData: null,
  findPublicIFURequest: false,
  findPublicIFUFail: null,
}

export const findIFUsByProjectIdReducer = (state = findIFUsByProjectId, action) => {
  switch (action.type) {
    case FIND_IFUs_BY_PROJECT_REQUEST:
      return {
        ...state,
        findIFUByProjectRequest: true,
        findIFUByProjectSuccess: false,
        findIFUByProjectFail: null,
      };
    case FIND_IFUs_BY_PROJECT_SUCCESS:
      return {
        ...state,
        findIFUByProjectRequest: false,
        findIFUByProjectSuccess: true,
        findIFUByProjectData: action.payload,
      };
    case FIND_IFUs_BY_PROJECT_FAILED:
      return {
        ...state,
        findIFUByProjectRequest: false,
        findIFUByProjectFail: action.payload,
      };
    case FIND_IFUs_BY_PROJECT_RESET:
      return findIFUsByProjectId;
    default:
      return state;
  }
};

export const createIFUsDataReducer = (state = createIFUsData, action) => {
  switch (action.type) {
    case CREATE_IFUs_ON_PROJECT_REQUEST:
      return {
        ...state,
        createIFURequest: true,
        createIFUSuccess: false,
        createIFUFail: null,
      };
    case CREATE_IFUs_ON_PROJECT_SUCCESS:
      return {
        ...state,
        createIFURequest: false,
        createIFUSuccess: true,
        createdIFU: action.payload,
      };
    case CREATE_IFUs_ON_PROJECT_FAILED:
      return {
        ...state,
        createIFURequest: false,
        createIFUFail: action.payload,
      };
    case CREATE_IFUs_ON_PROJECT_RESET:
      return createIFUsData;
    default:
      return state;
  }
};

// --------------------------- IFUs by productId ---------------------------------

export const findAllIFUsReducer = (state = findAlleIFUs, action) => {
  switch (action.type) {
    case FIND_ALL_IFU_REQUEST:
      return {
        ...state,
        findAllIFUsSuccess: false,
        findAllIFUsRequest: true,
        findAllIFUsFail: null,
      };
    case FIND_ALL_IFU_SUCCESS:
      return {
        ...state,
        findAllIFUsSuccess: true,
        findAllIFUsRequest: false,
        findAllIFUsData: action.payload,
      };
    case FIND_ALL_IFU_FAILED:
      return {
        ...state,
        findAllIFUsSuccess: false,
        findAllIFUsFail: action.payload,
      };
    case FIND_ALL_IFU_RESET:
      return findAlleIFUs;
    default:
      return state;
  }
};

export const getAllIFUReducer = (state = getAllIFUs, action) => {
  switch (action.type) {
    case ALL_IFUs_REQUEST:
      return {
        ...state,
        IFUsRequest: true,
        IFUsSuccess: false,
        IFUsFail: null,
      };
    case ALL_IFUs_SUCCESS:
      return {
        ...state,
        IFUsRequest: false,
        IFUsSuccess: true,
        IFUsData: action.payload,
      };
    case ALL_IFUs_FAILED:
      return {
        ...state,
        IFUsRequest: false,
        IFUsFail: action.payload,
      };
    case ALL_IFUs_RESET:
      return getAllIFUs;
    default:
      return state;
  }
};


export const IFUsLanguesReducer = (state = getLanguesIFUs, action) => {
  switch (action.type) {
    case ALL_IFU_LANGUES_REQUEST:
      return {
        ...state,
        IFULanguesRequest: true,
        IFULanguesSuccess: false,
        IFULanguesFail: null,
      };
    case ALL_IFU_LANGUES_SUCCESS:
      return {
        ...state,
        IFULanguesRequest: false,
        IFULanguesSuccess: true,
        IFULangues: action.payload,
      };
    case ALL_IFU_LANGUES_FAILED:
      return {
        ...state,
        IFULanguesRequest: false,
        IFULanguesFail: action.payload,
      };
    case ALL_IFU_LANGUES_RESET:
      return getLanguesIFUs;
    default:
      return state;
  }
};

export const findReceivedIFUsReducer = (state = findReceivedIFUs, action) => {
  switch (action.type) {
    case FIND_RECEIVED_IFU_REQUEST:
      return {
        ...state,
        findReceivedIFURequest: true,
        findReceivedIFUSuccess: false,
        findReceivedIFUFail: null,
      };
    case FIND_RECEIVED_IFU_SUCCESS:
      return {
        ...state,
        findReceivedIFURequest: false,
        findReceivedIFUSuccess: true,
        findReceivedIFUData: action.payload,
      };
    case FIND_RECEIVED_IFU_FAILED:
      return {
        ...state,
        findReceivedIFURequest: false,
        findReceivedIFUFail: action.payload,
      };
    case FIND_RECEIVED_IFU_RESET:
      return findReceivedIFUs;
    default:
      return state;
  }
};

export const getOneIFUReducer = (state = getOneIfu, action) => {
  switch (action.type) {
    case GET_IFU_REQUEST:
      return {
        ...state,
        ifuRequest: true,
        ifuSuccess: false,
        ifuFail: null,
      };
    case GET_IFU_SUCCESS:
      return {
        ...state,
        ifuRequest: false,
        ifuSuccess: true,
        ifuData: action.payload,
      };
    case GET_IFU_FAILED:
      return {
        ...state,
        ifuRequest: false,
        ifuFail: action.payload,
      };
    case GET_IFU_RESET:
      return getOneIfu;
    default:
      return state;
  }
};

// Reducer for creating an IFU
export const createIFUReducer = (state = createIFUState, action) => {
  switch (action.type) {
    case CREATE_IFU_REQUEST:
      return {
        ...state,
        ifuRequest: true,
        ifuSuccess: false,
        ifuFail: null,
      };
    case CREATE_IFU_SUCCESS:
      return {
        ...state,
        ifuRequest: false,
        ifuSuccess: true,
        createdIfu: action.payload,
      };
    case CREATE_IFU_FAILED:
      return {
        ...state,
        ifuRequest: false,
        ifuFail: action.payload,
      };
    case CREATE_IFU_RESET:
      return createIFUState;
    default:
      return state;
  }
};

// Reducer for sending IFU to approver
export const sendIFUsToApproverReducer = (state = sendToApproverState, action) => {
  switch (action.type) {
    case SEND_TO_APPROVER_REQUEST:
      return {
        ...state,
        approverRequest: true,
        approverSuccess: false,
        approverFail: null,
      };
    case SEND_TO_APPROVER_SUCCESS:
      return {
        ...state,
        approverRequest: false,
        approverSuccess: true,
        sendToApprover: action.payload,
      };
    case SEND_TO_APPROVER_FAILED:
      return {
        ...state,
        approverRequest: false,
        approverFail: action.payload,
      };
    case SEND_TO_APPROVER_RESET:
      return sendToApproverState;
    default:
      return state;
  }
};

// Reducer for approving an IFU
export const approveIFUReducer = (state = approveIFUState, action) => {
  switch (action.type) {
    case APPROVE_IFU_REQUEST:
      return {
        ...state,
        approveRequest: true,
        approveSuccess: false,
        approveFail: null,
      };
    case APPROVE_IFU_SUCCESS:
      return {
        ...state,
        approveRequest: false,
        approveSuccess: true,
        approvedIfu: action.payload,
      };
    case APPROVE_IFU_FAILED:
      return {
        ...state,
        approveRequest: false,
        approveFail: action.payload,
      };
    case APPROVE_IFU_RESET:
      return approveIFUState;
    default:
      return state;
  }
};

// Reducer for sending IFU to releaser
export const sendIFUToReleaserReducer = (state = sendToReleaserState, action) => {
  switch (action.type) {
    case SEND_TO_RELEASER_REQUEST:
      return {
        ...state,
        releaserRequest: true,
        releaserSuccess: false,
        releaserFail: null,
      };
    case SEND_TO_RELEASER_SUCCESS:
      return {
        ...state,
        releaserRequest: false,
        releaserSuccess: true,
        sendToRelease: action.payload,
      };
    case SEND_TO_RELEASER_FAILED:
      return {
        ...state,
        releaserRequest: false,
        releaserFail: action.payload,
      };
    case SEND_TO_RELEASER_RESET:
      return sendToReleaserState;
    default:
      return state;
  }
};

// Reducer for releasing an IFU
export const releaseIFUReducer = (state = releaseIFUState, action) => {
  switch (action.type) {
    case RELEASE_IFU_REQUEST:
      return {
        ...state,
        releaseIFURequest: true,
        releaseIFUSuccess: false,
        releaseIFUFail: null,
      };
    case RELEASE_IFU_SUCCESS:
      return {
        ...state,
        releaseIFURequest: false,
        releaseIFUSuccess: true,
        releasedIfu: action.payload,
      };
    case RELEASE_IFU_FAILED:
      return {
        ...state,
        releaseIFURequest: false,
        releaseIFUFail: action.payload,
      };
    case RELEASE_IFU_RESET:
      return releaseIFUState;
    default:
      return state;
  }
};

// Reducer for drafting an IFU
export const draftIFUReducer = (state = draftIFUState, action) => {
  switch (action.type) {
    case DRAFT_IFU_REQUEST:
      return {
        ...state,
        draftRequest: true,
        draftSuccess: false,
        draftFail: null,
      };
    case DRAFT_IFU_SUCCESS:
      return {
        ...state,
        draftRequest: false,
        draftSuccess: true,
        draftedIfu: action.payload,
      };
    case DRAFT_IFU_FAILED:
      return {
        ...state,
        draftRequest: false,
        draftFail: action.payload,
      };
    case DRAFT_IFU_RESET:
      return draftIFUState;
    default:
      return state;
  }
};

// Reducer for approving IFU
export const approvedIFUReducer = (state = approvedIFUState, action) => {
  switch (action.type) {
    case APPROVED_IFU_REQUEST:
      return {
        ...state,
        approvedRequest: true,
        approvedSuccess: false,
        approvedFail: null,
      };
    case APPROVED_IFU_SUCCESS:
      return {
        ...state,
        approvedRequest: false,
        approvedSuccess: true,
        approvedIfu: action.payload,
      };
    case APPROVED_IFU_FAILED:
      return {
        ...state,
        approvedRequest: false,
        approvedFail: action.payload,
      };
    case APPROVED_IFU_RESET:
      return approvedIFUState;
    default:
      return state;
  }
};

// Reducer for rejecting IFU
export const rejectedIFUReducer = (state = rejectedIFUState, action) => {
  switch (action.type) {
    case REJECTED_IFU_REQUEST:
      return {
        ...state,
        rejectedRequest: true,
        rejectedSuccess: false,
        rejectedFail: null,
      };
    case REJECTED_IFU_SUCCESS:
      return {
        ...state,
        rejectedRequest: false,
        rejectedSuccess: true,
        rejectedIfu: action.payload,
      };
    case REJECTED_IFU_FAILED:
      return {
        ...state,
        rejectedRequest: false,
        rejectedFail: action.payload,
      };
    case REJECTED_IFU_RESET:
      return rejectedIFUState;
    default:
      return state;
  }
};


export const editIFUReducer = (state = editIFUState, action) => {
  switch (action.type) {
    case EDIT_IFU_REQUEST:
      return {
        ...state,
        editIFURequest: true,
        editIFUSuccess: false,
        editIFUFail: null,
      };
    case EDIT_IFU_SUCCESS:
      return {
        ...state,
        editIFURequest: false,
        editIFUSuccess: true,
        editIfu: action.payload,
      };
    case EDIT_IFU_FAILED:
      return {
        ...state,
        editIFURequest: false,
        editIFUFail: action.payload,
      };
    case EDIT_IFU_RESET:
      return editIFUState;
    default:
      return state;
  }
};


export const updateIFUReducer = (state = updateIFUState, action) => {
  switch (action.type) {
    case UPDATE_IFU_REQUEST:
      return {
        ...state,
        updateIFURequest: true,
        updateIFUSuccess: false,
        updateIFUFail: null,
      };
    case UPDATE_IFU_SUCCESS:
      return {
        ...state,
        updateIFURequest: false,
        updateIFUSuccess: true,
        updateIfu: action.payload,
      };
    case UPDATE_IFU_FAILED:
      return {
        ...state,
        updateIFURequest: false,
        updateIFUFail: action.payload,
      };
    case UPDATE_IFU_RESET:
      return updateIFUState;
    default:
      return state;
  }
};

export const findPublicIFUReducer = (state = findPublicIFU, action) => {
  switch (action.type) {
    case FIND_PUBLIC_IFU_REQUEST:
      return {
        ...state,
        findPublicIFURequest: true,
        findPublicIFUSuccess: false,
        findPublicIFUFail: null,
      };
    case FIND_PUBLIC_IFU_SUCCESS:
      return {
        ...state,
        findPublicIFURequest: false,
        findPublicIFUSuccess: true,
        findPublicIFUData: action.payload,
      };
    case FIND_PUBLIC_IFU_FAILED:
      return {
        ...state,
        findPublicIFURequest: false,
        findPublicIFUFail: action.payload,
      };
    case FIND_PUBLIC_IFU_RESET:
      return findPublicIFU;
    default:
      return state;
  }
};