export const API_URL = 'http://localhost:3000/users';


export function getUserData() {
    return {
        cart: [],
        nickname: document.getElementById('nickname').value,
        name: document.getElementById('name').value,
        second_name: document.getElementById('second_name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date_of_birth: document.getElementById('date_of_birth').value,
        password: document.getElementById('password').value,
        role: 'normal_user'
    };
}