import {
    CHANGE_SIDEBAR_TYPE,
    TOGGLE
} from '../../actionTypes';

export const toggleSidebar = (is_toggle) => {
    return {
        type: TOGGLE,
        payload: { is_toggle }

    }
}

export const changeSidebarType = (sidebarType, isMobile) => {
    return {
        type: CHANGE_SIDEBAR_TYPE,
        payload: { sidebarType, isMobile }
    };
};

export default {
    toggleSidebar,
    changeSidebarType
}