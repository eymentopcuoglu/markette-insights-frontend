export default async function login(email, password) {
    const response = await fetch('http://api.markette-insights.com/users/login', {
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
