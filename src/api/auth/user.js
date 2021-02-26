import { API_URL } from "../constants";

export default async function check() {
    const response = await fetch(API_URL + '/users/check', {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}