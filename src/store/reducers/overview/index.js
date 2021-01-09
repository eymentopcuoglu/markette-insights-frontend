import {
    OVERVIEW_DATA_FETCH_REQUEST,
    OVERVIEW_DATA_FETCH_SUCCESS,
    OVERVIEW_DATA_FETCH_ERROR
} from "../../actionTypes";

const initialState = {
    isLoading: false,
    clientProducts: [],
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OVERVIEW_DATA_FETCH_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case OVERVIEW_DATA_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                clientProducts: [...action.payload]
            };
        case OVERVIEW_DATA_FETCH_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}