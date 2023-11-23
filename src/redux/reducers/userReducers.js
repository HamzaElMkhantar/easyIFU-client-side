import {CREATE_USER_FAILED, 
        CREATE_USER_REQUEST, 
        CREATE_USER_RESET, 
        CREATE_USER_SUCCESS, 
        DELETE_USER_FAILED, 
        DELETE_USER_REQUEST, 
        DELETE_USER_RESET, 
        DELETE_USER_SUCCESS, 
        GET_USER_FAILED, 
        GET_USER_REQUEST, 
        GET_USER_RESET, 
        GET_USER_SUCCESS, 
        TOGGLE_STATUS_USER_FAILED, 
        TOGGLE_STATUS_USER_REQUEST, 
        TOGGLE_STATUS_USER_RESET, 
        TOGGLE_STATUS_USER_SUCCESS, 
        UPDATE_USER_FAILED, 
        UPDATE_USER_REQUEST, 
        UPDATE_USER_RESET, 
        UPDATE_USER_SUCCESS, 
        USERS_COMPANY_FAILED, 
        USERS_COMPANY_REQUEST, 
        USERS_COMPANY_RESET, 
        USERS_COMPANY_SUCCESS 
    } from "../constants/userConstants";

const usersCompany = {
    usersCompanyRequest : false,
    usersCompanySuccess :  false,
    usersCompanyFail : null,
}

const getUser = {
    userRequest : false,
    userSuccess :  false,
    userFail : null,
    user: null
}

const updateUser = {
    updateUserRequest : false,
    updateUserSuccess :  false,
    updateUserFail : null,
    updatedUser: null
}

const toggleStatusUser = {
    toggleUserRequest : false,
    toggleUserSuccess :  false,
    toggleUserFail : null,
    toggleUser: null
}

const deleteUser = {
    deleteRequest : false,
    deleteSuccess :  false,
    deleteFail : null
}

const createUser = {
    createRequest : false,
    createSuccess :  false,
    createFail : null
}


export const usersCompanyReducer = (state = usersCompany, action) => {

    switch(action.type){
        case USERS_COMPANY_REQUEST:
            return {
                ...state,
                usersCompanyRequest : true,
                usersCompanySuccess :  false,
                usersCompanyFail : null,
            } ;
        case USERS_COMPANY_SUCCESS :
            return {
                ...state,
                usersCompanyRequest : false,
                usersCompanySuccess : true,
                allUsers: action.payload
            } ;
        case USERS_COMPANY_FAILED :
            return {
                ...state,
                usersCompanyFail : action.payload,
                usersCompanySuccess :  false,
                usersCompanyRequest : false
            } ;
        case USERS_COMPANY_RESET :
            return usersCompany;
        default :
            return state ;
    }

}


export const getUserReducer = (state = getUser, action) => {

    switch(action.type){
        case GET_USER_REQUEST:
            return {
                ...state,
                userRequest : true,
                userSuccess :  false,
                userFail : null,
            } ;
        case GET_USER_SUCCESS :
            return {
                ...state,
                userRequest : false,
                userSuccess : true,
                user: action.payload
            } ;
        case GET_USER_FAILED :
            return {
                ...state,
                userFail : action.payload,
                userSuccess :  false,
                userRequest : false
            } ;
        case GET_USER_RESET :
            return getUser;
        default :
            return state ;
    }

}

export const updateUserReducer = (state = updateUser, action) => {

    switch(action.type){
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                updateUserRequest : true,
                updateUserSuccess :  false,
                updateUserFail : null,
            } ;
        case UPDATE_USER_SUCCESS :
            return {
                ...state,
                updateUserRequest : false,
                updateUserSuccess : true,
                updatedUser: action.payload
            } ;
        case UPDATE_USER_FAILED :
            return {
                ...state,
                updateUserFail : action.payload,
                updateUserSuccess :  false,
                updateUserRequest : false
            } ;
        case UPDATE_USER_RESET :
            return updateUser;
        default :
            return state ;
    }

}

export const toggleStatusUserReducer = (state = toggleStatusUser, action) => {

    switch(action.type){
        case TOGGLE_STATUS_USER_REQUEST:
            return {
                ...state,
                toggleUserRequest : true,
                toggleUserSuccess :  false,
                toggleUserFail : null,
            } ;
        case TOGGLE_STATUS_USER_SUCCESS :
            return {
                ...state,
                toggleUserRequest : false,
                toggleUserSuccess : true,
                toggledUser: action.payload
            } ;
        case TOGGLE_STATUS_USER_FAILED :
            return {
                ...state,
                toggleUserFail : action.payload,
                toggleUserSuccess :  false,
                toggleUserRequest : false
            } ;
        case TOGGLE_STATUS_USER_RESET :
            return toggleStatusUser;
        default :
            return state ;
    }

}

export const deleteUserReducer = (state = deleteUser, action) => {

    switch(action.type){
        case DELETE_USER_REQUEST:
            return {
                ...state,
                deleteUserRequest : true,
                deleteUserSuccess :  false,
                deleteUserFail : null,
            } ;
        case DELETE_USER_SUCCESS :
            return {
                ...state,
                deleteUserRequest : false,
                deleteUserSuccess : true,
            } ;
        case DELETE_USER_FAILED :
            return {
                ...state,
                deleteUserFail : action.payload,
                deleteUserSuccess :  false,
                deleteUserRequest : false
            } ;
        case DELETE_USER_RESET :
            return deleteUser;
        default :
            return state ;
    }

}

export const createUserReducer = (state = createUser, action) => {

    switch(action.type){
        case CREATE_USER_REQUEST:
            return {
                ...state,
                createUserRequest : true,
                createUserSuccess :  false,
                createUserFail : null,
            } ;
        case CREATE_USER_SUCCESS :
            return {
                ...state,
                createUserRequest : false,
                createUserSuccess : true,
            } ;
        case CREATE_USER_FAILED :
            return {
                ...state,
                createUserFail : action.payload,
                createUserSuccess :  false,
                createUserRequest : false
            } ;
        case CREATE_USER_RESET :
            return createUser;
        default :
            return state ;
    }

}