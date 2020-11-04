import { all } from 'redux-saga/effects'
import loginSaga from "./loginSaga";
import logoutSaga from "./logoutSaga";
import userSaga from "./userSaga";

export default function* authSaga() {
    yield all([
        loginSaga(),
        logoutSaga(),
        userSaga()
    ]);
}