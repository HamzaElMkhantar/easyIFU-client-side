import { COMPANIES_SUPPER_ADMIN_FAILED, COMPANIES_SUPPER_ADMIN_REQUEST, 
        COMPANIES_SUPPER_ADMIN_RESET, 
        COMPANIES_SUPPER_ADMIN_SUCCESS, 
        CONTACTS_SUPPER_ADMIN_FAILED,
        CONTACTS_SUPPER_ADMIN_REQUEST, 
        CONTACTS_SUPPER_ADMIN_RESET, 
        CONTACTS_SUPPER_ADMIN_SUCCESS,
        DELETE_COMPANY_SUPPER_ADMIN_FAILED,
        DELETE_COMPANY_SUPPER_ADMIN_REQUEST,
        DELETE_COMPANY_SUPPER_ADMIN_RESET,
        DELETE_COMPANY_SUPPER_ADMIN_SUCCESS,
        DELETE_CONTACT_SUPPER_ADMIN_FAILED,
        DELETE_CONTACT_SUPPER_ADMIN_REQUEST,
        DELETE_CONTACT_SUPPER_ADMIN_RESET,
        DELETE_CONTACT_SUPPER_ADMIN_SUCCESS,
        GET_COMPANY_SUPPER_ADMIN_FAILED,
        GET_COMPANY_SUPPER_ADMIN_REQUEST,
        GET_COMPANY_SUPPER_ADMIN_RESET,
        GET_COMPANY_SUPPER_ADMIN_SUCCESS,
        GET_CONTACT_SUPPER_ADMIN_FAILED,
        GET_CONTACT_SUPPER_ADMIN_REQUEST,
        GET_CONTACT_SUPPER_ADMIN_RESET,
        GET_CONTACT_SUPPER_ADMIN_SUCCESS,
        PERMISSION_COMPANY_SUPPER_ADMIN_FAILED,
        PERMISSION_COMPANY_SUPPER_ADMIN_REQUEST,
        PERMISSION_COMPANY_SUPPER_ADMIN_RESET,
        PERMISSION_COMPANY_SUPPER_ADMIN_SUCCESS,
        PROJECTS_SUPPER_ADMIN_FAILED,
        PROJECTS_SUPPER_ADMIN_REQUEST,
        PROJECTS_SUPPER_ADMIN_RESET,
        PROJECTS_SUPPER_ADMIN_SUCCESS,
        USERS_SUPPER_ADMIN_FAILED,
        USERS_SUPPER_ADMIN_REQUEST,
        USERS_SUPPER_ADMIN_RESET,
        USERS_SUPPER_ADMIN_SUCCESS} from "../constants/supperAdminConstants";

const contacts = {
    contactsRequest : false,
    contactsSuccess : false,
    contactsFail : null,
    AllContacts: null
}

const contactById = {
    contactByIdRequest : false,
    contactByIdSuccess :  false,
    contactByIdFail : null,
    contactByIdInfo : null
}

const deleteContact = {
    contactDeleteRequest : false,
    contactDeleteSuccess :  false,
    contactDeleteFail : null,
    contactDelete: null
}

const companies = {
    companiesRequest : false,
    companiesSuccess :  false,
    companiesFail : null,
    allCompanies: null
}

const companyById = {
    companyByIdRequest : false,
    companyByIdSuccess :  false,
    companyByIdFail : null,
    companyById: null
}

const deleteCompany = {
    companyDeleteRequest : true,
    companyDeleteSuccess :  false,
    companyDeleteFail : null,
    companyDelete: null
}

const users = {
    usersRequest : false,
    usersSuccess :  false,
    usersFail : null,
    users: null
}

const projects = {
    projectsRequest : false,
    projectsSuccess :  false,
    projectsFail : null,
    projects: null
}

// contact reducers
export const contactsReducer = (state = contacts, action) => {
    switch(action.type){
        case CONTACTS_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                contactsRequest : true,
                contactsSuccess :  false,
                contactsFail : null,
            } ;
        case CONTACTS_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                contactsRequest : false,
                contactsSuccess : true,
                AllContacts: action.payload
            } ;
        case CONTACTS_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                contactsFail : action.payload,
                contactsSuccess :  false,
                contactsRequest : false
            } ;
        case CONTACTS_SUPPER_ADMIN_RESET :
            return contacts;
        default :
            return state ;
    }

}

export const contactByIdReducer = (state = contactById, action) => {
    switch(action.type){
        case GET_CONTACT_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                contactByIdRequest : true,
                contactByIdSuccess :  false,
                contactByIdFail : null,
            } ;
        case GET_CONTACT_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                contactByIdRequest : false,
                contactByIdSuccess : true,
                contactByIdInfo: action.payload
            } ;
        case GET_CONTACT_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                contactByIdFail : action.payload,
                contactByIdSuccess :  false,
                contactByIdRequest : false
            } ;
        case GET_CONTACT_SUPPER_ADMIN_RESET :
            return contactById;
        default :
            return state ;
    }

}

export const deleteContactReducer = (state = deleteContact, action) => {
    switch(action.type){
        case DELETE_CONTACT_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                contactDeleteRequest : true,
                contactDeleteSuccess :  false,
                contactDeleteFail : null,
            } ;
        case DELETE_CONTACT_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                contactDeleteRequest : false,
                contactDeleteSuccess : true,
                contactDelete: action.payload
            } ;
        case DELETE_CONTACT_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                contactDeleteFail : action.payload,
                contactDeleteSuccess :  false,
                contactDeleteRequest : false
            } ;
        case DELETE_CONTACT_SUPPER_ADMIN_RESET :
            return deleteContact;
        default :
            return state ;
    }

}

// company reducers
export const companiesReducer = (state = companies, action) => {
    switch(action.type){
        case COMPANIES_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                companiesRequest : true,
                companiesSuccess :  false,
                companiesFail : null,
            } ;
        case COMPANIES_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                companiesRequest : false,
                companiesSuccess : true,
                allCompanies: action.payload
            } ;
        case COMPANIES_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                companiesFail : action.payload,
                companiesSuccess :  false,
                companiesRequest : false
            } ;
        case COMPANIES_SUPPER_ADMIN_RESET :
            return companies;
        default :
            return state ;
    }

}


export const companyByIdReducer = (state = companyById, action) => {
    switch(action.type){
        case GET_COMPANY_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                companyByIdRequest : true,
                companyByIdSuccess :  false,
                companyByIdFail : null,
            } ;
        case GET_COMPANY_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                companyByIdRequest : false,
                companyByIdSuccess : true,
                companyById: action.payload
            } ;
        case GET_COMPANY_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                companyByIdFail : action.payload,
                companyByIdSuccess :  false,
                companyByIdRequest : false
            } ;
        case GET_COMPANY_SUPPER_ADMIN_RESET :
            return companyById;
        default :
            return state ;
    }

}

const changeCompanyPermission = {
    changeCompanyPermissionRequest : false,
    changeCompanyPermissionSuccess :  false,
    changeCompanyPermissionFail : null,
    changeCompanyPermissionMessage: null
}

export const changeCompanyPermissionReducer = (state = changeCompanyPermission, action) => {
    switch(action.type){
        case PERMISSION_COMPANY_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                changeCompanyPermissionRequest : true,
                changeCompanyPermissionSuccess :  false,
                changeCompanyPermissionFail : null,
            } ;
        case PERMISSION_COMPANY_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                changeCompanyPermissionRequest : false,
                changeCompanyPermissionSuccess : true,
                changeCompanyPermissionMessage: action.payload
            } ;
        case PERMISSION_COMPANY_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                changeCompanyPermissionFail : action.payload,
                changeCompanyPermissionSuccess :  false,
                changeCompanyPermissionRequest : false
            } ;
        case PERMISSION_COMPANY_SUPPER_ADMIN_RESET :
            return changeCompanyPermission;
        default :
            return state ;
    }

}



export const deleteCompanyReducer = (state = deleteCompany, action) => {
    switch(action.type){
        case DELETE_COMPANY_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                companyDeleteRequest : true,
                companyDeleteSuccess :  false,
                companyDeleteFail : null,
            } ;
        case DELETE_COMPANY_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                companyDeleteRequest : false,
                companyDeleteSuccess : true,
                companyDelete: action.payload
            } ;
        case DELETE_COMPANY_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                companyDeleteFail : action.payload,
                companyDeleteSuccess :  false,
                companyDeleteRequest : false
            } ;
        case DELETE_COMPANY_SUPPER_ADMIN_RESET :
            return deleteCompany;
        default :
            return state ;
    }

}


// user reducers
export const usersReducer = (state = users, action) => {
    switch(action.type){
        case USERS_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                usersRequest : true,
                usersSuccess :  false,
                usersFail : null,
            } ;
        case USERS_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                usersRequest : false,
                usersSuccess : true,
                allUsers: action.payload
            } ;
        case USERS_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                usersFail : action.payload,
                usersSuccess :  false,
                usersRequest : false
            } ;
        case USERS_SUPPER_ADMIN_RESET :
            return users;
        default :
            return state ;
    }

}
// project reducers
export const projectsReducer = (state = projects, action) => {
    switch(action.type){
        case PROJECTS_SUPPER_ADMIN_REQUEST:
            return {
                ...state,
                projectsRequest : true,
                projectsSuccess :  false,
                projectsFail : null,
            } ;
        case PROJECTS_SUPPER_ADMIN_SUCCESS :
            return {
                ...state,
                projectsRequest : false,
                projectsSuccess : true,
                allProjects: action.payload
            } ;
        case PROJECTS_SUPPER_ADMIN_FAILED :
            return {
                ...state,
                projectsFail : action.payload,
                projectsSuccess :  false,
                projectsRequest : false
            } ;
        case PROJECTS_SUPPER_ADMIN_RESET :
            return projects;
        default :
            return projects ;
    }

}