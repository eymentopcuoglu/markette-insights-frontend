import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { DATA_FETCH_REQUEST } from "../../actionTypes";
import actions from '../../actions/index';
import api from '../../../api/index';

function* getData(action) {
    try {
        const initialData = yield call(api.initial.initialFetch, action.payload.clientId, action.payload.userId);
        yield put(actions.data.initialActions.dataFetchSuccess(initialData));
    } catch (error) {
        yield put(actions.data.initialActions.dataFetchError(error));
    }
}

export function* watchDataFetch() {
    yield takeEvery(DATA_FETCH_REQUEST, getData);
}

function* dataSaga() {
    yield all([fork(watchDataFetch)]);
}

export default dataSaga;