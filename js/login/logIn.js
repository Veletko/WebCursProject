import { showError, clearError } from "../register/validationForRegistration.js"

document.addEventListener('DOMContentLoaded', () => {
    checkAdminStatus();
    
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
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nickname, password }),
                });
                
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                
                const user = await response.json();
                
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    nickname: user.nickname,
                    role: user.role
                }));
                

                updateAdminStatus(user.role === 'admin');
                
                if (user.role === 'admin') {
                    window.location.href = '/admin.html';
                } else {
                    window.location.href = 'homepage.html';
                }
            } catch (error) {
                console.error('Login error:', error);
                showError('password', 'Invalid nickname or password');
            }
        });
    }
});

function checkAdminStatus() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) return;

    try {
        const user = JSON.parse(userData);
        updateAdminStatus(user.role === 'admin');
    } catch (e) {
        console.error('Error parsing user data:', e);
    }
}


function updateAdminStatus(isAdmin) {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        adminLink.style.display = isAdmin ? 'block' : 'none';
    }
    
    if (isAdmin) {
        localStorage.setItem('isAdmin', 'true');
    } else {
        localStorage.removeItem('isAdmin');
    }
}