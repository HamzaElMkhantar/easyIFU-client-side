import {GET_COMPANY_FAILED, 
        GET_COMPANY_REQUEST, 
        GET_COMPANY_RESET, 
        GET_COMPANY_SUCCESS } from '../constants/companyConstants';

const companyInfo = {
    companyRequest : false,
    companySuccess :  false,
    companyFail : null,
    companyInfo: null
}

export const getCompanyInfoReducer = (state = companyInfo, action) => {

    switch(action.type){
        case GET_COMPANY_REQUEST:
            return {
                ...state,
                companyRequest : true,
                companySuccess :  false,
                companyFail : null,
            } ;
        case GET_COMPANY_SUCCESS :
            return {
                ...state,
                companyRequest : false,
                companySuccess : true,
                companyInfo: action.payload
            } ;
        case GET_COMPANY_FAILED :
            return {
                ...state,
                companyFail : action.payload,
                companySuccess :  false,
                companyRequest : false
            } ;
        case GET_COMPANY_RESET :
            return companyInfo;
        default :
            return state ;
    }
}
