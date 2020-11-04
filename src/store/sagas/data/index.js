import { all } from 'redux-saga/effects'
import initialDataSaga from "./initialDataSaga";
import productAnalysisSaga from "./productAnalysisSaga";

export default function* dataSaga() {
    yield all([
        initialDataSaga(),
        productAnalysisSaga()
    ]);
}