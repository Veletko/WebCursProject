export const API_URL = 'http://localhost:3000/users';

export function getUserFormData() {
    return {
        nickname: document.getElementById('nickname').value,
        name: document.getElementById('name').value,
        second_name: document.getElementById('second_name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date_of_birth: document.getElementById('date_of_birth').value
    };
}

export async function fetchUserData(userId) {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user data');
    return await response.json();
}