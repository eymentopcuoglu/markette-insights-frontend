import {
    SET_FILTERS
} from '../../actionTypes';

const setFilter = (filters) => ({
    type: SET_FILTERS,
    payload: filters
});

export default {
    setFilter
}