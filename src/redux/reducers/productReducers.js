import {PRODUCTS_FAILED, 
        PRODUCTS_REQUEST, 
        PRODUCTS_RESET, 
        PRODUCTS_SUCCESS,

        CREATE_PRODUCT_REQUEST,
        CREATE_PRODUCT_SUCCESS,
        CREATE_PRODUCT_FAILED,
        CREATE_PRODUCT_RESET } from "../constants/productConstants";

const products = {
    productRequest: false,
    productSuccess:  false,
    productsData: null,
    productFail: null,
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