import { getUserData, API_URL } from './userData.js';
import { generatePassword } from './passwordUtils.js';
import { validateNickname, generateNickname, Validation } from './validationForRegistration.js';
import { updateSubmitButton } from './createNewUser.js';

let nicknameGenerationAttempts = 5;

export function setupGenerateNicknameHandler() {
    const generateNicknameBtn = document.querySelector('.generate-nickname');
    if (generateNicknameBtn) {
        generateNicknameBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (nicknameGenerationAttempts <= 0) {
                e.target.style.display = 'none';
                return;
            }
            
            nicknameGenerationAttempts--;
            const userData = getUserData();
            const newNickname = generateNickname(userData.name || 'user', userData.surname || 'name');
            
            if (newNickname) {
                document.getElementById('nickname').value = newNickname;
                await validateNickname({...userData, nickname: newNickname}, API_URL);
                updateSubmitButton();
            }
            
            if (nicknameGenerationAttempts <= 0) {
                e.target.style.display = 'none';
            }
        });
    }
}

export function setupGeneratePasswordHandler() {
    const generatePasswordBtn = document.querySelector('.generate-password');
    if (generatePasswordBtn) {
        generatePasswordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const password = generatePassword();
            document.getElementById('password').value = password;
            document.getElementById('password_repeat').value = password;
            updateSubmitButton();
        });
    }
}

export function setupFormSubmitHandler() {
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const validationData = {
                ...getUserData(),
                password_repeat: document.getElementById('password_repeat').value,
                agree: document.getElementById('agree')?.checked
            };
            
            if (!await Validation(validationData, API_URL)) return;
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(getUserData())
                });
                
                if (response.ok) {
                    alert('Регистрация прошла успешно!');
                    window.location.href = '/login.html';
                } else {
                    const errorData = await response.json();
                    alert(`Ошибка регистрации: ${errorData.message || 'Пожалуйста, попробуйте снова.'}`);
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
            }
        });
    }
}