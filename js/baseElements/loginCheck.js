export function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
}