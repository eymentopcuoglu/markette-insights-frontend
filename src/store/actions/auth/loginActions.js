import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from "../../actionTypes";

const loginRequest = (email, password, history) => {
    return {
        type: LOGIN_REQUEST,
        payload: { email, password, history }
    };
};

const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: { user }
    };
};

const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: { error }
    };
};

export default {
    loginRequest,
    loginSuccess,
    loginError
};

