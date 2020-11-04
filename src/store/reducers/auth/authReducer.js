import {
    USER_CHECK_REQUEST,
    USER_CHECK_SUCCESS,
    USER_CHECK_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGOUT_SUCCESS, LOGIN_REQUEST, LOGOUT_REQUEST
} from "../../actionTypes";

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_CHECK_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case USER_CHECK_SUCCESS:
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user
            };
        case USER_CHECK_ERROR:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null
            }
        default:
            return state;
    }
}