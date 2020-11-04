import {
    DATA_FETCH_REQUEST,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR
} from '../../actionTypes';

const dataFetchRequest = (clientId, userId) => ({
    type: DATA_FETCH_REQUEST,
    payload: { clientId, userId }
});

const dataFetchSuccess = (data) => ({
    type: DATA_FETCH_SUCCESS,
    payload: data
});


const dataFetchError = (err) => ({
    type: DATA_FETCH_ERROR,
    payload: { err }
});


export default {
    dataFetchRequest,
    dataFetchSuccess,
    dataFetchError
}