import {GET_COMPANY_FAILED, 
        GET_COMPANY_REQUEST, 
        GET_COMPANY_RESET, 
        GET_COMPANY_SUCCESS, 
        PAYMENT_COMPANY_FAILED, 
        PAYMENT_COMPANY_REQUEST, 
        PAYMENT_COMPANY_RESET, 
        PAYMENT_COMPANY_SUCCESS, 
        PRICES_COMPANY_FAILED, 
        PRICES_COMPANY_REQUEST, 
        PRICES_COMPANY_RESET, 
        PRICES_COMPANY_SUCCESS, 
        UPDATE_COMPANY_FAILED, 
        UPDATE_COMPANY_REQUEST,
        UPDATE_COMPANY_RESET,
        UPDATE_COMPANY_SUCCESS} from '../constants/companyConstants';

const companyInfo = {
    companyRequest : false,
    companySuccess :  false,
    companyFail : null,
    companyInfo: null
}
const updatedCompanyInfo = {
    updatedCompanyRequest : false,
    updatedCompanySuccess : false,
    updatedCompanyFail : null,
    updatedCompanyInfo: null
}

const paymentCompany = {
    paymentCompanyRequest : false,
    paymentCompanySuccess :  false,
    paymentCompanyFail : null,
    paymentCompanyInfo: null
}

const pricesCompany = {
    pricesCompanyRequest : false,
    pricesCompanySuccess :  false,
    pricesCompanyFail : null,
    pricesCompany: null
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
export const updateCompanyInfoReducer = (state = updatedCompanyInfo, action) => {

    switch(action.type){
        case UPDATE_COMPANY_REQUEST:
            return {
                ...state,
                updatedCompanyRequest : true,
                updatedCompanySuccess :  false,
                updatedCompanyFail : null,
            } ;
        case UPDATE_COMPANY_SUCCESS:
            return {
                ...state,
                updatedCompanyRequest : false,
                updatedCompanySuccess : true,
                updatedCompanyInfo: action.payload
            } ;
        case UPDATE_COMPANY_FAILED:
            return {
                ...state,
                updatedCompanyFail : action.payload,
                updatedCompanySuccess :  false,
                updatedCompanyRequest : false
            } ;
        case UPDATE_COMPANY_RESET:
            return updatedCompanyInfo;
        default :
            return state ;
    }
}

export const paymentCompanyReducer = (state = paymentCompany, action) => {

    switch(action.type){
        case PAYMENT_COMPANY_REQUEST:
            return {
                ...state,
                paymentCompanyRequest : true,
                paymentCompanySuccess :  false,
                paymentCompanyFail : null,
            } ;
        case PAYMENT_COMPANY_SUCCESS:
            return {
                ...state,
                paymentCompanyRequest : false,
                paymentCompanySuccess : true,
                paymentCompanyInfo: action.payload
            } ;
        case PAYMENT_COMPANY_FAILED:
            return {
                ...state,
                paymentCompanyFail : action.payload,
                paymentCompanySuccess :  false,
                paymentCompanyRequest : false
            } ;
        case PAYMENT_COMPANY_RESET:
            return paymentCompany;
        default :
            return state ;
    }
}


export const paymentPricesCompanyReducer = (state = pricesCompany, action) => {

    switch(action.type){
        case PRICES_COMPANY_REQUEST:
            return {
                ...state,
                pricesCompanyRequest : true,
                pricesCompanySuccess :  false,
                pricesCompanyFail : null,
            } ;
        case PRICES_COMPANY_SUCCESS:
            return {
                ...state,
                pricesCompanyRequest : false,
                pricesCompanySuccess : true,
                pricesCompany: action.payload
            } ;
        case PRICES_COMPANY_FAILED:
            return {
                ...state,
                pricesCompanyFail : action.payload,
                pricesCompanySuccess :  false,
                pricesCompanyRequest : false
            } ;
        case PRICES_COMPANY_RESET:
            return pricesCompany;
        default :
            return state ;
    }
}