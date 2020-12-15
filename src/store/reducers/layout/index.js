import {
    CHANGE_SIDEBAR_TYPE,
    TOGGLE
} from '../../actionTypes';

const initialState = {
    layoutType: "vertical",
    topbarTheme: "dark",
    leftSideBarTheme: "dark",
    layoutWidth: "fluid",
    leftSideBarType: "default",
    isPreloader: false,
    is_toggle: true,
    show_rightsidebar: false,
    isMobile: false
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload.sidebarType
            };
        case TOGGLE:
            return {
                ...state,
                is_toggle: action.payload
            }
        default:
            return { ...state };
    }
}

export default layoutReducer;