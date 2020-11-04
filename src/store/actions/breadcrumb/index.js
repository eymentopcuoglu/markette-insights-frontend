import {
    SET_BREADCRUMB_ITEMS
} from '../../actionTypes';

const setBreadcrumbItems = (title, items) => ({
    type: SET_BREADCRUMB_ITEMS,
    payload: {
        title: title,
        items: items
    }
});

export default {
    setBreadcrumbItems
}