export default async function logout() {
    const response = await fetch('http://localhost:8000/users/logout', {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}