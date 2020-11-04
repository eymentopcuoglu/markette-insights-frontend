import {
    SET_BREADCRUMB_ITEMS
} from '../../actionTypes';

const initialState = {
    title: "Dashboard",
    breadcrumbItems: [
        { title: "Markette", link: "#" },
        { title: "Dashboard", link: "#" }
    ]
}

const breadcrumbReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BREADCRUMB_ITEMS:
            return {
                ...state,
                title: action.payload.title,
                breadcrumbItems: action.payload.items
            };

        default:
            return state;
    }
}

export default breadcrumbReducer;