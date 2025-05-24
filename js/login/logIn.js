import {clearError, showError} from "/js/register/validationForRegistration.js"

document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.querySelector('.auth-form');
    const submitButton = document.getElementById('submit-button');
    
    if (loginForm && submitButton) {
        submitButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const nickname = document.getElementById('nickname').value;
            const password = document.getElementById('password').value;
            
            clearError('nickname');
            clearError('password');
            
            if (!nickname) {
                showError('nickname', 'Nickname is required');
                return;
            }
            
            if (!password) {
                showError('password', 'Password is required');
                return;
            }
            
            try {

                const response = await fetch(`http://localhost:3000/users?nickname=${encodeURIComponent(nickname)}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const users = await response.json();

                if (users.length !== 1) {
                    throw new Error('Invalid nickname or password');
                }
                
                const user = users[0];
                

                if (user.password !== password) {
                    throw new Error('Invalid nickname or password');
                }
                
                if (user.role === 'admin') {
                    localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    nickname: user.nickname,
                    role: user.role,
                    isAdmin: true
                        }));
                    window.location.href = '/pages/admin.html';
                } else {
                    localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    nickname: user.nickname,
                    role: user.role,
                    isAdmin: false
                        }));
                    window.location.href = '/pages/homepage.html';
                }
                
                
                
            } catch (error) {
                console.error('Login error:', error);
                showError('password', 'Invalid nickname or password');
            }
        });
    }
});