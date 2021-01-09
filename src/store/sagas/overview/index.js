import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { OVERVIEW_DATA_FETCH_REQUEST } from "../../actionTypes";
import actions from '../../actions/index';
import api from '../../../api/index';

function* fetchOverviewData(action) {
    try {
        const data = yield call(api.overview.fetchPricingWithDate, action.payload.clientId, action.payload.date);
        yield put(actions.overview.overviewDataFetchSuccess(data));
    } catch (error) {
        yield put(actions.overview.overviewDataFetchError(error));
    }
}

export function* watchOverviewDataFetch() {
    yield takeEvery(OVERVIEW_DATA_FETCH_REQUEST, fetchOverviewData);
}

function* overviewSaga() {
    yield all([fork(watchOverviewDataFetch)]);
}

export default overviewSaga;