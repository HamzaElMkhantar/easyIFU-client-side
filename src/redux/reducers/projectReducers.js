import {ALL_PROJECTS_FAILED, 
        ALL_PROJECTS_REQUEST, 
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
        TRANSLATION_REPACKAGING_SUCCESS} from "../constants/projectConstants";


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

const archivedProjects = {
    getArchivedProjectsRequest : false,
    getArchivedProjectsSuccess :  false,
    archivedProjects: null,
    getArchivedProjectsFail : null,
}

const archiveToggleProject = {
    archiveToggleProjectRequest : false,
    archiveToggleProjectSuccess :  false,
    archiveToggleData: null,
    archiveToggleProjectFail : null,
}

const duplicateProject = {
    duplicateProjectRequest : false,
    duplicateProjectSuccess :  false,
    duplicateProjectFail : null,
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

const legislation = {
    legislationRequest : false,
    legislationSuccess :  false,
    legislationFail : null,
    legislationInfo: null
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

const translationAndRepackaging = {
    translationAndRepackagingRequest : false,
    translationAndRepackagingSuccess :  false,
    translationAndRepackagingFail : null,
    translationAndRepackagingInfo: null
}

const sendingProject = {
    sendingProjectRequest : false,
    sendingProjectSuccess :  false,
    sendingProjectFail : null,
    sendingProjectMessage: null
}

const roleProject = { 
    roleProjectRequest : false,
    roleProjectSuccess :  false,
    roleProjectFail : null,
    roleProjects : null
}

const releaseProject = {
    releaseProjectRequest : false,
    releaseProjectSuccess :  false,
    releaseProjectFail : null,
    releaseProjectMessage : null

}

const releasedProject = {
    releasedProjectRequest : false,
    releasedProjectSuccess :  false,
    releasedProjectFail : null,
    releasedProjects: null
}

const uploadLogo = {
    uploadLogoRequest : false,
    uploadLogoSuccess :  false,
    uploadLogoFail : null
}

const saveDocument = {
    documentRequest : false,
    documentSuccess :  false,
    documentFail : null,
    documentMessage: null
}

const documents = {
    documentsRequest : false,
    documentsSuccess :  false,
    documentsFail : null,
    documentsCompany: null
}

const deleteDocument = {
    deleteDocumentsRequest : false,
    deleteDocumentsSuccess :  false,
    deleteDocumentsFail : null,
    deleteDocumentMessage : null
}

const documentById = {
    documentByIdRequest : false,
    documentByIdSuccess :  false,
    documentByIdFail : null,
    document: null
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

export const getArchivedProjectsReducer = (state = archivedProjects, action) => {

    switch(action.type){
        case ARCHIVED_PROJECTS_REQUEST:
            return {
                ...state,
                getArchivedProjectsRequest : true,
                getArchivedProjectsSuccess :  false,
                getArchivedProjectsFail : null,
            } ;
        case ARCHIVED_PROJECTS_SUCCESS :
            return {
                ...state,
                getArchivedProjectsRequest : false,
                getArchivedProjectsSuccess : true,
                archivedProjects: action.payload
            } ;
        case ARCHIVED_PROJECTS_FAILED :
            return {
                ...state,
                getArchivedProjectsFail : action.payload,
                getArchivedProjectsSuccess :  false,
                getArchivedProjectsRequest : false
            } ;
        case ARCHIVED_PROJECTS_RESET :
            return archivedProjects;
        default :
            return state ;
    }

}

export const archivedProjectToggleReducer = (state = archiveToggleProject, action) => {

    switch(action.type){
        case TOGGLE_ARCHIVE_PROJECT_REQUEST:
            return {
                ...state,
                archiveToggleProjectRequest : true,
                archiveToggleProjectSuccess :  false,
                archiveToggleProjectFail : null,
            } ;
        case TOGGLE_ARCHIVE_PROJECT_SUCCESS :
            return {
                ...state,
                archiveToggleProjectRequest : false,
                archiveToggleProjectSuccess : true,
                archiveToggleData: action.payload
            } ;
        case TOGGLE_ARCHIVE_PROJECT_FAILED :
            return {
                ...state,
                archiveToggleProjectFail : action.payload,
                archiveToggleProjectSuccess :  false,
                archiveToggleProjectRequest : false
            } ;
        case TOGGLE_ARCHIVE_PROJECT_RESET :
            return archiveToggleProject;
        default :
            return state ;
    }

}

export const duplicateProjectReducer = (state = duplicateProject, action) => {

    switch(action.type){
        case DUPLICATE_PROJECTS_REQUEST:
            return {
                ...state,
                duplicateProjectRequest : true,
                duplicateProjectSuccess :  false,
                duplicateProjectFail : null,
            } ;
        case DUPLICATE_PROJECTS_SUCCESS :
            return {
                ...state,
                duplicateProjectRequest : false,
                duplicateProjectSuccess : true,
            } ;
        case DUPLICATE_PROJECTS_FAILED :
            return {
                ...state,
                duplicateProjectFail : action.payload,
                duplicateProjectSuccess :  false,
                duplicateProjectRequest : false
            } ;
        case DUPLICATE_PROJECTS_RESET :
            return duplicateProject;
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



export const legislationReducer = (state = legislation, action) => {
    switch(action.type){
        case LEGISLATION_REQUEST:
            return {
                ...state,
                legislationRequest : true,
                legislationSuccess :  false,
                legislationFail : null,
            } ;
        case LEGISLATION_SUCCESS :
            return {
                ...state,
                legislationRequest : false,
                legislationSuccess : true,
                legislationInfo: action.payload
            } ;
        case LEGISLATION_FAILED :
            return {
                ...state,
                legislationFail : action.payload,
                legislationSuccess :  false,
                legislationRequest : false
            } ;
        case LEGISLATION_RESET :
            return legislation;
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


export const uploadManufacturerLogoReducer = (state = uploadLogo, action) => {
    switch(action.type){
        case "UPLOAD-LOGO-REQUEST":
            return {
                ...state,
                uploadLogoRequest : true,
                uploadLogoSuccess :  false,
                uploadLogoFail : null,
            } ;
        case "UPLOAD-LOGO-SUCCESS" :
            return {
                ...state,
                uploadLogoRequest : false,
                uploadLogoSuccess : true
            } ;
        case "UPLOAD-LOGO-FAILED" :
            return {
                ...state,
                uploadLogoFail : action.payload,
                uploadLogoSuccess :  false,
                uploadLogoRequest : false
            } ;
        case "UPLOAD-LOGO-RESET" :
            return uploadLogo;
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

export const translationAndRepackagingReducer = (state = translationAndRepackaging, action) => {
    switch(action.type){
        case TRANSLATION_REPACKAGING_REQUEST:
            return {
                ...state,
                translationAndRepackagingRequest : true,
                translationAndRepackagingSuccess :  false,
                translationAndRepackagingFail : null,
            } ;
        case TRANSLATION_REPACKAGING_SUCCESS :
            return {
                ...state,
                translationAndRepackagingRequest : false,
                translationAndRepackagingSuccess : true,
                translationAndRepackagingInfo: action.payload
            } ;
        case TRANSLATION_REPACKAGING_FAILED :
            return {
                ...state,
                translationAndRepackagingFail : action.payload,
                translationAndRepackagingSuccess :  false,
                translationAndRepackagingRequest : false
            } ;
        case TRANSLATION_REPACKAGING_RESET :
            return translationAndRepackaging;
        default :
            return state ;
    }
}


export const sendingProjectToOtherRoleReducer = (state = sendingProject, action) => {
    switch(action.type){
        case SENDING_PROJECT_REQUEST:
            return {
                ...state,
                sendingProjectRequest : true,
                sendingProjectSuccess :  false,
                sendingProjectFail : null,
            } ;
        case SENDING_PROJECT_SUCCESS :
            return {
                ...state,
                sendingProjectRequest : false,
                sendingProjectSuccess : true,
                sendingProjectMessage : action.payload
            } ;
        case SENDING_PROJECT_FAILED :
            return {
                ...state,
                sendingProjectFail : action.payload,
                sendingProjectSuccess :  false,
                sendingProjectRequest : false
            } ;
        case SENDING_PROJECT_RESET :
            return sendingProject;
        default :
            return state ;
    }
}

export const ProjectByRoleIdReducer = (state = roleProject, action) => {
    switch(action.type){
        case ROLE_PROJECT_REQUEST:
            return {
                ...state,
                roleProjectRequest : true,
                roleProjectSuccess :  false,
                roleProjectFail : null,
            } ;
        case ROLE_PROJECT_SUCCESS :
            return {
                ...state,
                roleProjectRequest : false,
                roleProjectSuccess : true,
                roleProjects : action.payload
            } ;
        case ROLE_PROJECT_FAILED :
            return {
                ...state,
                roleProjectFail : action.payload,
                roleProjectSuccess :  false,
                roleProjectRequest : false
            } ;
        case ROLE_PROJECT_RESET :
            return roleProject;
        default :
            return state ;
    }
}


export const ReleasedProjectReducer = (state = releasedProject, action) => {
    switch(action.type){
        case RELEASED_PROJECT_REQUEST:
            return {
                ...state,
                releasedProjectRequest : true,
                releasedProjectSuccess :  false,
                releasedProjectFail : null,
            } ;
        case RELEASED_PROJECT_SUCCESS :
            return {
                ...state,
                releasedProjectRequest : false,
                releasedProjectSuccess : true,
                releasedProjects: action.payload
            } ;
        case RELEASED_PROJECT_FAILED :
            return {
                ...state,
                releasedProjectFail : action.payload,
                releasedProjectSuccess :  false,
                releasedProjectRequest : false
            } ;
        case RELEASED_PROJECT_RESET :
            return releasedProject;
        default :
            return state ;
    }
}

export const ReleaseTheProjectReducer = (state = releaseProject, action) => {
    switch(action.type){
        case RELEASE_PROJECT_REQUEST:
            return {
                ...state,
                releaseProjectRequest : true,
                releaseProjectSuccess :  false,
                releaseProjectFail : null,
            } ;
        case RELEASE_PROJECT_SUCCESS :
            return {
                ...state,
                releaseProjectRequest : false,
                releaseProjectSuccess : true,
                releaseProjectMessage: action.payload
            } ;
        case RELEASE_PROJECT_FAILED :
            return {
                ...state,
                releaseProjectFail : action.payload,
                releaseProjectSuccess :  false,
                releaseProjectRequest : false
            } ;
        case RELEASE_PROJECT_RESET :
            return releaseProject;
        default :
            return state ;
    }
}


export const saveDocumentReducer = (state = saveDocument, action) => {
    switch(action.type){
        case DOCUMENT_REQUEST:
            return {
                ...state,
                documentRequest : true,
                documentSuccess :  false,
                documentFail : null,
            } ;
        case DOCUMENT_SUCCESS :
            return {
                ...state,
                documentRequest : false,
                documentSuccess : true,
                documentMessage: action.payload
            } ;
        case DOCUMENT_FAILED :
            return {
                ...state,
                documentFail : action.payload,
                documentSuccess :  false,
                documentRequest : false
            } ;
        case DOCUMENT_RESET :
            return saveDocument;
        default :
            return state ;
    }
}

export const documentsReducer = (state = documents, action) => {
    switch(action.type){
        case DOCUMENTS_REQUEST:
            return {
                ...state,
                documentsRequest : true,
                documentsSuccess :  false,
                documentsFail : null,
            } ;
        case DOCUMENTS_SUCCESS :
            return {
                ...state,
                documentsRequest : false,
                documentsSuccess : true,
                documentsCompany: action.payload
            } ;
        case DOCUMENTS_FAILED :
            return {
                ...state,
                documentsFail : action.payload,
                documentsSuccess :  false,
                documentsRequest : false
            } ;
        case DOCUMENTS_RESET :
            return documents;
        default :
            return state ;
    }
}


export const deleteDocumentReducer = (state = deleteDocument, action) => {
    switch(action.type){
        case DELETE_DOCUMENTS_REQUEST:
            return {
                ...state,
                deleteDocumentsRequest : true,
                deleteDocumentsSuccess :  false,
                deleteDocumentsFail : null,
            } ;
        case DELETE_DOCUMENTS_SUCCESS :
            return {
                ...state,
                deleteDocumentsRequest : false,
                deleteDocumentsSuccess : true,
                deleteDocumentMessage: action.payload
            } ;
        case DELETE_DOCUMENTS_FAILED :
            return {
                ...state,
                deleteDocumentsFail : action.payload,
                deleteDocumentsSuccess :  false,
                deleteDocumentsRequest : false
            } ;
        case DELETE_DOCUMENTS_RESET :
            return deleteDocument;
        default :
            return state ;
    }
}


export const documentByIdReducer = (state = documentById, action) => {
    switch(action.type){
        case GET_DOCUMENT_REQUEST:
            return {
                ...state,
                documentByIdRequest : true,
                documentByIdSuccess :  false,
                documentByIdFail : null,
            } ;
        case GET_DOCUMENT_SUCCESS :
            return {
                ...state,
                documentByIdRequest : false,
                documentByIdSuccess : true,
                document: action.payload
            } ;
        case GET_DOCUMENT_FAILED :
            return {
                ...state,
                documentByIdFail : action.payload,
                documentByIdSuccess :  false,
                documentByIdRequest : false
            } ;
        case GET_DOCUMENT_RESET :
            return documentById;
        default :
            return state ;
    }
}