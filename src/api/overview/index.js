import { API_URL } from "../constants";

async function fetchPricingWithDate(clientId, date) {
    const response = await fetch(API_URL + '/application/overview?client=' + clientId + '&date=' + date.toISOString(), {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
}

export default {
    fetchPricingWithDate
}