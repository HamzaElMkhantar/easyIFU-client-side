import {PRODUCTS_FAILED, 
        PRODUCTS_REQUEST, 
        PRODUCTS_RESET, 
        PRODUCTS_SUCCESS,

        CREATE_PRODUCT_REQUEST,
        CREATE_PRODUCT_SUCCESS,
        CREATE_PRODUCT_FAILED,
        CREATE_PRODUCT_RESET, 
        PRODUCT_BY_ID_REQUEST,
        PRODUCT_BY_ID_SUCCESS,
        PRODUCT_BY_ID_FAILED,
        PRODUCT_BY_ID_RESET} from "../constants/productConstants";

const products = {
    productRequest: false,
    productSuccess:  false,
    productsData: null,
    productFail: null,
}


const productById = {
    productByIdRequest: false,
    productByIdSuccess:  false,
    productByIdData: null,
    productByIdFail: null,
}

const createProduct = {
    createProductRequest: false,
    createProductSuccess:  false,
    createdProduct: null,
    createProductFail: null,
}

export const getProductByProjectIdReducer = (state = products, action) => {

    switch(action.type){
        case PRODUCTS_REQUEST:
            return {
                ...state,
                productRequest: true,
                productSuccess:  false,
                productFail: null,
            } ;
        case PRODUCTS_SUCCESS :
            return {
                ...state,
                productRequest: false,
                productSuccess: true,
                productsData: action.payload
            } ;
        case PRODUCTS_FAILED :
            return {
                ...state,
                productFail: action.payload,
                productSuccess:  false,
                productRequest: false
            } ;
        case PRODUCTS_RESET :
            return products;
        default :
            return state ;
    }
}

export const getProductByIdReducer = (state = productById, action) => {

    switch(action.type){
        case PRODUCT_BY_ID_REQUEST:
            return {
                ...state,
                productByIdRequest: true,
                productByIdSuccess:  false,
                productByIdFail: null,
            } ;
        case PRODUCT_BY_ID_SUCCESS :
            return {
                ...state,
                productByIdRequest: false,
                productByIdSuccess: true,
                productByIdData: action.payload
            } ;
        case PRODUCT_BY_ID_FAILED :
            return {
                ...state,
                productByIdFail: action.payload,
                productByIdSuccess:  false,
                productByIdRequest: false
            } ;
        case PRODUCT_BY_ID_RESET :
            return productById;
        default :
            return state ;
    }
}

export const createProductReducer = (state = createProduct, action) => {

    switch(action.type){
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                createProductRequest: true,
                createProductSuccess:  false,
                createProductFail: null,
            } ;
        case CREATE_PRODUCT_SUCCESS :
            return {
                ...state,
                createProductRequest: false,
                createProductSuccess: true,
                createdProduct: action.payload
            } ;
        case CREATE_PRODUCT_FAILED :
            return {
                ...state,
                createProductFail: action.payload,
                createProductSuccess:  false,
                createProductRequest: false
            } ;
        case CREATE_PRODUCT_RESET :
            return createProduct;
        default :
            return state ;
    }
}