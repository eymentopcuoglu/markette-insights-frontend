import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGOUT_REQUEST } from "../../actionTypes";
import actions from '../../actions/index';
import api from '../../../api/index';

function* logoutUser(action) {
    try {
        const payload = action.payload;
        const user = yield call(api.auth.logout);
        yield put(actions.auth.logout.logoutSuccess());
        payload.history.push('/login');
    } catch (error) {
        yield put(actions.auth.login.loginError(error));
    }
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

function* logoutSaga() {
    yield all([fork(watchUserLogout)]);
}

export default logoutSaga;