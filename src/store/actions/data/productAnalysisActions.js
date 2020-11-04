import {
    PRODUCT_ANALYSIS_DATA_FETCH_REQUEST,
    PRODUCT_ANALYSIS_DATA_FETCH_SUCCESS,
    PRODUCT_ANALYSIS_DATA_FETCH_ERROR
} from '../../actionTypes';

const productAnalysisDataFetchRequest = (product_id, startDate, endDate) => ({
    type: PRODUCT_ANALYSIS_DATA_FETCH_REQUEST,
    payload: { product_id, startDate, endDate }
});

const productAnalysisDataFetchSuccess = (data) => ({
    type: PRODUCT_ANALYSIS_DATA_FETCH_SUCCESS,
    payload: data
});


const productAnalysisDataFetchError = (err) => ({
    type: PRODUCT_ANALYSIS_DATA_FETCH_ERROR,
    payload: { err }
});


export default {
    productAnalysisDataFetchRequest,
    productAnalysisDataFetchSuccess,
    productAnalysisDataFetchError
}