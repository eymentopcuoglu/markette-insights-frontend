import { API_URL } from "../constants";

export default async function login(email, password) {
    const response = await fetch(API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
        credentials: 'include'
    });
    return await response.json();
}
