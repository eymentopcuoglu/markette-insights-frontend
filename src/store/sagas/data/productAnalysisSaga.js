import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { PRODUCT_ANALYSIS_DATA_FETCH_REQUEST } from "../../actionTypes";
import actions from '../../actions/index';
import api from '../../../api/index';
import moment from "moment";

function* fetchProductAnalysisData(action) {
    try {
        const data = yield call(api.productAnalysis.productAnalysisFetch, action.payload.product_id,
            moment(action.payload.startDate).startOf('day').toDate(),
            moment(action.payload.endDate).endOf('day').toDate());
        yield put(actions.data.productAnalysisActions.productAnalysisDataFetchSuccess(data));
    } catch (error) {
        yield put(actions.data.productAnalysisActions.productAnalysisDataFetchError(error));
    }
}

export function* watchProductAnalysisDataFetch() {
    yield takeEvery(PRODUCT_ANALYSIS_DATA_FETCH_REQUEST, fetchProductAnalysisData);
}

function* productAnalysisSaga() {
    yield all([fork(watchProductAnalysisDataFetch)]);
}

export default productAnalysisSaga;