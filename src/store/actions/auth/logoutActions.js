import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../actionTypes";

const logoutRequest = (history) => {
    return {
        type: LOGOUT_REQUEST,
        payload: { history }
    };
};

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export default {
    logoutRequest,
    logoutSuccess
};

