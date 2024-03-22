import {ALL_LABELS_FAILED, 
        ALL_LABELS_REQUEST, 
        ALL_LABELS_RESET, 
        ALL_LABELS_SUCCESS,
        CREATE_LABEL_FAILED,
        CREATE_LABEL_REQUEST,
        CREATE_LABEL_RESET,
        CREATE_LABEL_SUCCESS,
        GET_LABEL_FAILED,
        GET_LABEL_REQUEST,
        GET_LABEL_RESET,
        GET_LABEL_SUCCESS} from "../constants/labelConstants";

const labels = {
    labelRequest: false,
    labelSuccess:  false,
    labelsData: null,
    labelFail: null,
}

const getLabel = {
    getLabelRequest: false,
    getLabelSuccess:  false,
    label: null,
    getLabelFail: null,
}

const createLabel = {
    createLabelRequest : false,
    createLabelSuccess :  false,
    label: null,
    createLabelFail : null,
}

export const getAllLabelsReducer = (state = labels, action) => {

    switch(action.type){
        case ALL_LABELS_REQUEST:
            return {
                ...state,
                labelRequest : true,
                labelSuccess :  false,
                labelFail : null,
            } ;
        case ALL_LABELS_SUCCESS :
            return {
                ...state,
                labelRequest : false,
                labelSuccess : true,
                labelsData: action.payload
            } ;
        case ALL_LABELS_FAILED :
            return {
                ...state,
                labelFail : action.payload,
                labelSuccess :  false,
                labelRequest : false
            } ;
        case ALL_LABELS_RESET :
            return labels;
        default :
            return state ;
    }

}

export const getLabelReducer = (state = getLabel, action) => {

    switch(action.type){
        case GET_LABEL_REQUEST:
            return {
                ...state,
                getLabelRequest : true,
                getLabelSuccess :  false,
                getLabelFail : null,
            } ;
        case GET_LABEL_SUCCESS :
            return {
                ...state,
                getLabelRequest : false,
                getLabelSuccess : true,
                label: action.payload
            } ;
        case GET_LABEL_FAILED :
            return {
                ...state,
                getLabelFail : action.payload,
                getLabelSuccess :  false,
                getLabelRequest : false
            } ;
        case GET_LABEL_RESET :
            return getLabel;
        default :
            return state ;
    }

}

export const createLabelReducer = (state = createLabel, action) => {

    switch(action.type){
        case CREATE_LABEL_REQUEST:
            return {
                ...state,
                createLabelRequest : true,
                createLabelSuccess :  false,
                createLabelFail : null,
            } ;
        case CREATE_LABEL_SUCCESS :
            return {
                ...state,
                createLabelRequest : false,
                createLabelSuccess : true,
                label: action.payload
            } ;
        case CREATE_LABEL_FAILED :
            return {
                ...state,
                createLabelFail : action.payload,
                createLabelSuccess :  false,
                createLabelRequest : false
            } ;
        case CREATE_LABEL_RESET :
            return createLabel;
        default :
            return state ;
    }

}