import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import { USER_CHECK_REQUEST, USER_CHECK_SUCCESS, USER_CHECK_ERROR } from "../../actionTypes";
import actions from '../../actions/index'
import api from '../../../api/index'

function* userCheck() {
    try {
        const user = yield call(api.auth.check);
        yield put(actions.auth.user.userCheckSuccess(user));
        yield put(actions.data.initialActions.dataFetchRequest(user.clientId, user.userId));
        // const initialData = yield call(api.initial.initialFetch, user.client);
        // yield put(actions.data.dataFetchSuccess(initialData));
    } catch (error) {
        yield put(actions.auth.user.userCheckError(error));
    }
}

export function* watchUserCheck() {
    yield takeEvery(USER_CHECK_REQUEST, userCheck);
}

function* userSaga() {
    yield all([fork(watchUserCheck)]);
}

export default userSaga;