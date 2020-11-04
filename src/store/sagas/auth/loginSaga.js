import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_REQUEST } from "../../actionTypes";
import actions from '../../actions/index';
import api from '../../../api/index';

function* loginUser(action) {
    try {
        const payload = action.payload;
        const user = yield call(api.auth.login, payload.email, payload.password);
        yield put(actions.auth.login.loginSuccess(user));
        yield put(actions.data.initialActions.dataFetchRequest(user.clientId, user.userId));
        // const initialData = yield call(api.initial.initialFetch, user.client);
        // yield put(actions.data.dataFetchSuccess(initialData));
        payload.history.push('/dashboard');
    } catch (error) {
        yield put(actions.auth.login.loginError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* loginSaga() {
    yield all([fork(watchUserLogin)]);
}

export default loginSaga;