import { API_URL } from "../constants";

async function initialFetch(clientId, userId) {
    const response = await fetch(API_URL + '/application/initial/' + clientId + '/' + userId, {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}

export default {
    initialFetch
}