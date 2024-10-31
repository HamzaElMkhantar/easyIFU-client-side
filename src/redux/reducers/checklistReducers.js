import {
  GET_CHECKLIST_FAILED,
  GET_CHECKLIST_REQUEST,
  GET_CHECKLIST_RESET,
  GET_CHECKLIST_SUCCESS,
} from "../constants/checklistConstant";

const findCompanyChecklist = {
  findCompanyChecklistRequest: false,
  findCompanyChecklistSuccess: false,
  findCompanyChecklistFail: null,
  companyChecklist: null,
};
export const findCompanyChecklistReducer = (
  state = findCompanyChecklist,
  action
) => {
  switch (action.type) {
    case GET_CHECKLIST_REQUEST:
      return {
        ...state,
        findCompanyChecklistRequest: true,
        findCompanyChecklistSuccess: false,
        findCompanyChecklistFail: null,
      };
    case GET_CHECKLIST_SUCCESS:
      return {
        ...state,
        findCompanyChecklistRequest: false,
        findCompanyChecklistSuccess: true,
        companyChecklist: action.payload,
      };
    case GET_CHECKLIST_FAILED:
      return {
        ...state,
        findCompanyChecklistRequest: false,
        findCompanyChecklistFail: action.payload,
        findCompanyChecklistSuccess: false,
      };
    case GET_CHECKLIST_RESET:
      return findCompanyChecklist;
    default:
      return state;
  }
};

