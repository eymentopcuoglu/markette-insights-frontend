import { all } from 'redux-saga/effects';
import authSaga from './auth/index';
import dataSaga from "./data/index";
import layoutSaga from './layout/index';

export default function* rootSaga() {
    yield all([
        authSaga(),
        dataSaga(),
        layoutSaga()
    ]);
}