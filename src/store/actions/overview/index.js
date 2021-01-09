import {
    OVERVIEW_DATA_FETCH_REQUEST,
    OVERVIEW_DATA_FETCH_SUCCESS,
    OVERVIEW_DATA_FETCH_ERROR
} from '../../actionTypes';

const overviewDataFetchRequest = (clientId, date) => ({
    type: OVERVIEW_DATA_FETCH_REQUEST,
    payload: { clientId, date }
});

const overviewDataFetchSuccess = (data) => ({
    type: OVERVIEW_DATA_FETCH_SUCCESS,
    payload: data
});


const overviewDataFetchError = (err) => ({
    type: OVERVIEW_DATA_FETCH_ERROR,
    payload: { err }
});


export default {
    overviewDataFetchRequest,
    overviewDataFetchSuccess,
    overviewDataFetchError
}