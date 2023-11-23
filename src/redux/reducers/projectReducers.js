import {ALL_PROJECTS_FAILED, 
        ALL_PROJECTS_REQUEST, 
        ALL_PROJECTS_RESET, 
        ALL_PROJECTS_SUCCESS, 
        DELETE_PROJECT_FAILED, 
        DELETE_PROJECT_REQUEST, 
        DELETE_PROJECT_RESET, 
        DELETE_PROJECT_SUCCESS, 
        GET_PROJECT_FAILED, 
        GET_PROJECT_REQUEST, 
        GET_PROJECT_RESET, 
        GET_PROJECT_SUCCESS, 
        IVD_DIAGNOSTIC_FAILED, 
        IVD_DIAGNOSTIC_REQUEST, 
        IVD_DIAGNOSTIC_RESET, 
        IVD_DIAGNOSTIC_SUCCESS, 
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
        SAFE_USE_FAILED,
        SAFE_USE_REQUEST,
        SAFE_USE_RESET,
        SAFE_USE_SUCCESS,
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
        TRANSFUSION_INFUSION_FAILED,
        TRANSFUSION_INFUSION_REQUEST,
        TRANSFUSION_INFUSION_RESET,
        TRANSFUSION_INFUSION_SUCCESS} from "../constants/projectConstants";


const getProjects = {
    getAllProjectsRequest : false,
    getAllProjectsSuccess :  false,
    getAllProjectsFail : null,
    projects: null
}

const getProject = {
    getProjectRequest : false,
    getProjectSuccess :  false,
    getProjectFail : null,
    project: null
}

const startProject = {
    startProjectRequest : false,
    startProjectSuccess :  false,
    startProjectFail : null,
    projectId: null
}

const deleteProject = {
    deleteProjectRequest : false,
    deleteProjectSuccess :  false,
    deleteProjectFail : null
}

const manufacturer = {
    manufacturerRequest : false,
    manufacturerSuccess :  false,
    manufacturerFail : null,
    projectInfo: null
}

const productInfo = {
    productRequest : false,
    productSuccess :  false,
    productFail : null,
    projectInfo: null
}

const sterility = {
    sterilityRequest : false,
    sterilitySuccess :  false,
    sterilityFail : null,
    projectInfo: null
}

const storage = {
    storageRequest : false,
    storageSuccess :  false,
    storageFail : null,
    projectInfo: null
}

const safeUse = {
    safeUseRequest : false,
    safeUseSuccess :  false,
    safeUseFail : null,
    projectInfo: null
}

const IVDDiagnostic = {
    IVDDiagnosticRequest : false,
    IVDDiagnosticSuccess :  false,
    IVDDiagnosticFail : null,
    projectInfo: null
}

const transfusionInfusion = {
    transfusionInfusionRequest : false,
    transfusionInfusionSuccess :  false,
    transfusionInfusionFail : null,
    projectInfo: null
}

const others = {
    othersRequest : false,
    othersSuccess :  false,
    othersFail : null,
    projectInfo: null
}

export const getAllProjectsReducer = (state = getProjects, action) => {

    switch(action.type){
        case ALL_PROJECTS_REQUEST:
            return {
                ...state,
                getAllProjectsRequest : true,
                getAllProjectsSuccess :  false,
                getAllProjectsFail : null,
            } ;
        case ALL_PROJECTS_SUCCESS :
            return {
                ...state,
                getAllProjectsRequest : false,
                getAllProjectsSuccess : true,
                projects: action.payload
            } ;
        case ALL_PROJECTS_FAILED :
            return {
                ...state,
                getAllProjectsFail : action.payload,
                getAllProjectsSuccess :  false,
                getAllProjectsRequest : false
            } ;
        case ALL_PROJECTS_RESET :
            return getProjects;
        default :
            return state ;
    }

}

export const getProjectReducer = (state = getProject, action) => {

    switch(action.type){
        case GET_PROJECT_REQUEST:
            return {
                ...state,
                getProjectRequest : true,
                getProjectSuccess :  false,
                getProjectFail : null,
            } ;
        case GET_PROJECT_SUCCESS :
            return {
                ...state,
                getProjectRequest : false,
                getProjectSuccess : true,
                project: action.payload
            } ;
        case GET_PROJECT_FAILED :
            return {
                ...state,
                getProjectFail : action.payload,
                getProjectSuccess :  false,
                getProjectRequest : false
            } ;
        case GET_PROJECT_RESET :
            return getProject;
        default :
            return state ;
    }

}

export const startProjectReducer = (state = startProject, action) => {

    switch(action.type){
        case START_PROJECT_REQUEST:
            return {
                ...state,
                startProjectRequest : true,
                startProjectSuccess :  false,
                startProjectFail : null,
            } ;
        case START_PROJECT_SUCCESS :
            return {
                ...state,
                startProjectRequest : false,
                startProjectSuccess : true,
                projectId: action.payload
            } ;
        case START_PROJECT_FAILED :
            return {
                ...state,
                startProjectFail : action.payload,
                startProjectSuccess :  false,
                startProjectRequest : false
            } ;
        case START_PROJECT_RESET :
            return startProject;
        default :
            return state ;
    }

}

export const deleteProjectReducer = (state = deleteProject, action) => {

    switch(action.type){
        case DELETE_PROJECT_REQUEST:
            return {
                ...state,
                deleteProjectRequest : true,
                deleteProjectSuccess :  false,
                deleteProjectFail : null,
            } ;
        case DELETE_PROJECT_SUCCESS :
            return {
                ...state,
                deleteProjectRequest : false,
                deleteProjectSuccess : true
            } ;
        case DELETE_PROJECT_FAILED :
            return {
                ...state,
                deleteProjectFail : action.payload,
                deleteProjectSuccess :  false,
                deleteProjectRequest : false
            } ;
        case DELETE_PROJECT_RESET :
            return deleteProject;
        default :
            return state ;
    }

}

export const manufacturerInformationReducer = (state = manufacturer, action) => {
    switch(action.type){
        case MANUFACTURER_INFORMATION_REQUEST:
            return {
                ...state,
                manufacturerRequest : true,
                manufacturerSuccess :  false,
                manufacturerFail : null,
            } ;
        case MANUFACTURER_INFORMATION_SUCCESS :
            return {
                ...state,
                manufacturerRequest : false,
                manufacturerSuccess : true,
                projectInfo: action.payload
            } ;
        case MANUFACTURER_INFORMATION_FAILED :
            return {
                ...state,
                manufacturerFail : action.payload,
                manufacturerSuccess :  false,
                manufacturerRequest : false
            } ;
        case MANUFACTURER_INFORMATION_RESET :
            return manufacturer;
        default :
            return state ;
    }
}

export const productInformationReducer = (state = productInfo, action) => {
    switch(action.type){
        case PRODUCT_INFORMATION_REQUEST:
            return {
                ...state,
                productRequest : true,
                productSuccess :  false,
                productFail : null,
            } ;
        case PRODUCT_INFORMATION_SUCCESS :
            return {
                ...state,
                productRequest : false,
                productSuccess : true,
                projectInfo: action.payload
            } ;
        case PRODUCT_INFORMATION_FAILED :
            return {
                ...state,
                productFail : action.payload,
                productSuccess :  false,
                productRequest : false
            } ;
        case PRODUCT_INFORMATION_RESET :
            return productInfo;
        default :
            return state ;
    }
}

export const sterilityReducer = (state = sterility, action) => {
    switch(action.type){
        case STERILITY_REQUEST:
            return {
                ...state,
                sterilityRequest : true,
                sterilitySuccess :  false,
                sterilityFail : null,
            } ;
        case STERILITY_SUCCESS :
            return {
                ...state,
                sterilityRequest : false,
                sterilitySuccess : true,
                projectInfo: action.payload
            } ;
        case STERILITY_FAILED :
            return {
                ...state,
                sterilityFail : action.payload,
                sterilitySuccess :  false,
                sterilityRequest : false
            } ;
        case STERILITY_RESET :
            return sterility;
        default :
            return state ;
    }
}

export const storageReducer = (state = storage, action) => {
    switch(action.type){
        case STORAGE_REQUEST:
            return {
                ...state,
                storageRequest : true,
                storageSuccess :  false,
                storageFail : null,
            } ;
        case STORAGE_SUCCESS :
            return {
                ...state,
                storageRequest : false,
                storageSuccess : true,
                projectInfo: action.payload
            } ;
        case STORAGE_FAILED :
            return {
                ...state,
                storageFail : action.payload,
                storageSuccess :  false,
                storageRequest : false
            } ;
        case STORAGE_RESET :
            return storage;
        default :
            return state ;
    }
}

export const safeUseReducer = (state = safeUse, action) => {
    switch(action.type){
        case SAFE_USE_REQUEST:
            return {
                ...state,
                safeUseRequest : true,
                safeUseSuccess :  false,
                safeUseFail : null,
            } ;
        case SAFE_USE_SUCCESS :
            return {
                ...state,
                safeUseRequest : false,
                safeUseSuccess : true,
                projectInfo: action.payload
            } ;
        case SAFE_USE_FAILED :
            return {
                ...state,
                safeUseFail : action.payload,
                safeUseSuccess :  false,
                safeUseRequest : false
            } ;
        case SAFE_USE_RESET :
            return safeUse;
        default :
            return state ;
    }
}


export const IVDDiagnosticReducer = (state = IVDDiagnostic, action) => {
    switch(action.type){
        case IVD_DIAGNOSTIC_REQUEST:
            return {
                ...state,
                IVDDiagnosticRequest : true,
                IVDDiagnosticSuccess :  false,
                IVDDiagnosticFail : null,
            } ;
        case IVD_DIAGNOSTIC_SUCCESS :
            return {
                ...state,
                IVDDiagnosticRequest : false,
                IVDDiagnosticSuccess : true,
                projectInfo: action.payload
            } ;
        case IVD_DIAGNOSTIC_FAILED :
            return {
                ...state,
                IVDDiagnosticFail : action.payload,
                IVDDiagnosticSuccess :  false,
                IVDDiagnosticRequest : false
            } ;
        case IVD_DIAGNOSTIC_RESET :
            return IVDDiagnostic;
        default :
            return state ;
    }
}


export const transfusionInfusionReducer = (state = transfusionInfusion, action) => {
    switch(action.type){
        case TRANSFUSION_INFUSION_REQUEST:
            return {
                ...state,
                transfusionInfusionRequest : true,
                transfusionInfusionSuccess :  false,
                transfusionInfusionFail : null,
            } ;
        case TRANSFUSION_INFUSION_SUCCESS :
            return {
                ...state,
                transfusionInfusionRequest : false,
                transfusionInfusionSuccess : true,
                projectInfo: action.payload
            } ;
        case TRANSFUSION_INFUSION_FAILED :
            return {
                ...state,
                transfusionInfusionFail : action.payload,
                transfusionInfusionSuccess :  false,
                transfusionInfusionRequest : false
            } ;
        case TRANSFUSION_INFUSION_RESET :
            return transfusionInfusion;
        default :
            return state ;
    }
}


export const othersReducer = (state = others, action) => {
    switch(action.type){
        case OTHERS_REQUEST:
            return {
                ...state,
                othersRequest : true,
                othersSuccess :  false,
                othersFail : null,
            } ;
        case OTHERS_SUCCESS :
            return {
                ...state,
                othersRequest : false,
                othersSuccess : true,
                projectInfo: action.payload
            } ;
        case OTHERS_FAILED :
            return {
                ...state,
                othersFail : action.payload,
                othersSuccess :  false,
                othersRequest : false
            } ;
        case OTHERS_RESET :
            return others;
        default :
            return state ;
    }
}