import { USER_CHECK_REQUEST, USER_CHECK_SUCCESS, USER_CHECK_ERROR } from "../../actionTypes";

const userCheckRequest = () => {
    return {
        type: USER_CHECK_REQUEST
    };
};

const userCheckSuccess = (user) => {
    return {
        type: USER_CHECK_SUCCESS,
        payload: { user }
    };
};

const userCheckError = (error) => {
    return {
        type: USER_CHECK_ERROR,
        payload: { error }
    };
};

export default {
    userCheckRequest,
    userCheckSuccess,
    userCheckError
}