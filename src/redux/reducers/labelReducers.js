import {ALL_LABELS_FAILED, 
        ALL_LABELS_REQUEST, 
        ALL_LABELS_RESET, 
        ALL_LABELS_SUCCESS,
        APPROVED_LABEL_FAILED,
        APPROVED_LABEL_REQUEST,
        APPROVED_LABEL_RESET,
        APPROVED_LABEL_SUCCESS,
        APPROVE_LABEL_FAILED,
        APPROVE_LABEL_REQUEST,
        APPROVE_LABEL_RESET,
        APPROVE_LABEL_SUCCESS,
        CREATE_LABEL_FAILED,
        CREATE_LABEL_REQUEST,
        CREATE_LABEL_RESET,
        CREATE_LABEL_SUCCESS,
        DRAFT_LABEL_FAILED,
        DRAFT_LABEL_REQUEST,
        DRAFT_LABEL_RESET,
        DRAFT_LABEL_SUCCESS,
        GET_LABEL_FAILED,
        GET_LABEL_REQUEST,
        GET_LABEL_RESET,
        GET_LABEL_SUCCESS,
        REJECTED_LABEL_FAILED,
        REJECTED_LABEL_REQUEST,
        REJECTED_LABEL_RESET,
        REJECTED_LABEL_SUCCESS,
        RELEASE_LABEL_FAILED,
        RELEASE_LABEL_REQUEST,
        RELEASE_LABEL_RESET,
        RELEASE_LABEL_SUCCESS,
        SEND_TO_APPROVER_FAILED,
        SEND_TO_APPROVER_REQUEST,
        SEND_TO_APPROVER_RESET,
        SEND_TO_APPROVER_SUCCESS,
        SEND_TO_RELEASER_FAILED,
        SEND_TO_RELEASER_REQUEST,
        SEND_TO_RELEASER_RESET,
        SEND_TO_RELEASER_SUCCESS} from "../constants/labelConstants";

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

const sendToApprover = {
    sendToApproverRequest : false,
    sendToApproverSuccess :  false,
    sendToApproverMessage : null,
    sendToApproverFail : null,
}

const approveLabel = {
    approveLabelRequest : false,
    approveLabelSuccess :  false,
    approveLabelMessage : null,
    approveLabelFail : null,
}

const sendToReleaser = {
    sendToReleaserRequest : false,
    sendToReleaserSuccess :  false,
    sendToReleaserMessage : null,
    sendToReleaserFail : null,
}

const releaseLabel = {
    releaseLabelRequest : false,
    releaseLabelSuccess :  false,
    releaseLabelMessage : null,
    releaseLabelFail : null,
}


const draftLabels = {
    draftLabelsRequest : false,
    draftLabelsSuccess :  false,
    draftLabels : null,
    draftLabelsFail : null,
}

const approvedLabels = {
    approvedLabelsRequest : false,
    approvedLabelsSuccess :  false,
    approvedLabels : null,
    approvedLabelsFail : null,
}

const rejectedLabels = {
    rejectedLabelsRequest : false,
    rejectedLabelsSuccess :  false,
    rejectedLabels : null,
    rejectedLabelsFail : null,
}


export const drafLabelsReducer = (state = draftLabels, action) => {

    switch(action.type){
        case DRAFT_LABEL_REQUEST:
            return {
                ...state,
                draftLabelsRequest : true,
                draftLabelsSuccess :  false,
                draftLabelsFail : null,
            } ;
        case DRAFT_LABEL_SUCCESS :
            return {
                ...state,
                draftLabelsRequest : false,
                draftLabelsSuccess : true,
                draftLabels: action.payload
            } ;
        case DRAFT_LABEL_FAILED :
            return {
                ...state,
                draftLabelsFail : action.payload,
                draftLabelsSuccess :  false,
                draftLabelsRequest : false
            } ;
        case DRAFT_LABEL_RESET :
            return draftLabels;
        default :
            return state ;
    }

}

export const approvedLabelsReducer = (state = approvedLabels, action) => {

    switch(action.type){
        case APPROVED_LABEL_REQUEST:
            return {
                ...state,
                approvedLabelsRequest : true,
                approvedLabelsSuccess :  false,
                approvedLabelsFail : null,
            } ;
        case APPROVED_LABEL_SUCCESS :
            return {
                ...state,
                approvedLabelsRequest : false,
                approvedLabelsSuccess : true,
                approvedLabel: action.payload
            } ;
        case APPROVED_LABEL_FAILED :
            return {
                ...state,
                approvedLabelsFail : action.payload,
                approvedLabelsSuccess :  false,
                approvedLabelsRequest : false
            } ;
        case APPROVED_LABEL_RESET :
            return approvedLabels;
        default :
            return state ;
    }

}

export const rejectedLabelsReducer = (state = rejectedLabels, action) => {

    switch(action.type){
        case REJECTED_LABEL_REQUEST:
            return {
                ...state,
                rejectedLabelsRequest : true,
                rejectedLabelsSuccess :  false,
                rejectedLabelsFail : null,
            } ;
        case REJECTED_LABEL_SUCCESS :
            return {
                ...state,
                rejectedLabelsRequest : false,
                rejectedLabelsSuccess : true,
                rejectedLabel: action.payload
            } ;
        case REJECTED_LABEL_FAILED :
            return {
                ...state,
                rejectedLabelsFail : action.payload,
                rejectedLabelsSuccess :  false,
                rejectedLabelsRequest : false
            } ;
        case REJECTED_LABEL_RESET :
            return rejectedLabels;
        default :
            return state ;
    }

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

export const sendToApproverReducer = (state = sendToApprover, action) => {

    switch(action.type){
        case SEND_TO_APPROVER_REQUEST:
            return {
                ...state,
                sendToApproverRequest : true,
                sendToApproverSuccess :  false,
                sendToApproverFail : null,
            } ;
        case SEND_TO_APPROVER_SUCCESS :
            return {
                ...state,
                sendToApproverRequest : false,
                sendToApproverSuccess : true,
                sendToApproverMessage: action.payload
            } ;
        case SEND_TO_APPROVER_FAILED :
            return {
                ...state,
                sendToApproverFail : action.payload,
                sendToApproverSuccess :  false,
                sendToApproverRequest : false
            } ;
        case SEND_TO_APPROVER_RESET :
            return sendToApprover;
        default :
            return state ;
    }

}

export const approveLabelReducer = (state = approveLabel, action) => {

    switch(action.type){
        case APPROVE_LABEL_REQUEST:
            return {
                ...state,
                approveLabelRequest : true,
                approveLabelSuccess :  false,
                approveLabelFail : null,
            } ;
        case APPROVE_LABEL_SUCCESS :
            return {
                ...state,
                approveLabelRequest : false,
                approveLabelSuccess : true,
                approveLabelMessage: action.payload
            } ;
        case APPROVE_LABEL_FAILED :
            return {
                ...state,
                approveLabelFail : action.payload,
                approveLabelSuccess :  false,
                approveLabelRequest : false
            } ;
        case APPROVE_LABEL_RESET :
            return approveLabel;
        default :
            return state ;
    }

}

export const sendToReleaserReducer = (state = sendToReleaser, action) => {

    switch(action.type){
        case SEND_TO_RELEASER_REQUEST:
            return {
                ...state,
                sendToReleaserRequest : true,
                sendToReleaserSuccess :  false,
                sendToReleaserFail : null,
            } ;
        case SEND_TO_RELEASER_SUCCESS :
            return {
                ...state,
                sendToReleaserRequest : false,
                sendToReleaserSuccess : true,
                sendToReleaserMessage: action.payload
            } ;
        case SEND_TO_RELEASER_FAILED :
            return {
                ...state,
                sendToReleaserFail : action.payload,
                sendToReleaserSuccess :  false,
                sendToReleaserRequest : false
            } ;
        case SEND_TO_RELEASER_RESET :
            return sendToReleaser;
        default :
            return state ;
    }

}

export const releaseLabelReducer = (state = releaseLabel, action) => {

    switch(action.type){
        case RELEASE_LABEL_REQUEST:
            return {
                ...state,
                releaseLabelRequest : true,
                releaseLabelSuccess :  false,
                releaseLabelFail : null,
            } ;
        case RELEASE_LABEL_SUCCESS :
            return {
                ...state,
                releaseLabelRequest : false,
                releaseLabelSuccess : true,
                releaseLabelMessage: action.payload
            } ;
        case RELEASE_LABEL_FAILED :
            return {
                ...state,
                releaseLabelFail : action.payload,
                releaseLabelSuccess :  false,
                releaseLabelRequest : false
            } ;
        case RELEASE_LABEL_RESET :
            return releaseLabel;
        default :
            return state ;
    }
}