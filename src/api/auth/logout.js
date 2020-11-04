export default async function logout() {
    const response = await fetch('http://api.markette-insights.com/users/logout', {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}