import { API_URL } from "../constants";

export default async function logout() {
    const response = await fetch(API_URL + '/users/logout', {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}