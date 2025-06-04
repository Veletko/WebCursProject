import { getUserData, API_URL } from './userData.js';
import { 
    validateEmail, 
    validateNickname, 
    validatePassword, 
    validatePasswordRepeat, 
    validatePhone, 
    validateDateOfBirth, 
    validateName, 
    validateSecondName, 
    validateSurname,
    validateAgree
} from './validationForRegistration.js';
import { updateSubmitButton } from './createNewUser.js';

export async function validateField(fieldId) {
    const validationData = {
        ...getUserData(),
        password_repeat: document.getElementById('password_repeat')?.value,
        agree: document.getElementById('agree')?.checked
    };
    
    switch(fieldId) {
        case 'email':
            await validateEmail(validationData, API_URL, false);
            break;
        case 'nickname':
            await validateNickname(validationData, API_URL);
            break;
        case 'password':
            await validatePassword(validationData);
            await validatePasswordRepeat(validationData);
            break;
        case 'password_repeat':
            await validatePasswordRepeat(validationData);
            break;
        case 'phone':
            await validatePhone(validationData);
            break;
        case 'date_of_birth':
            await validateDateOfBirth(validationData);
            break;
        case 'name':
            await validateName(validationData);
            break;
        case 'second_name':
            await validateSecondName(validationData);
            break;
        case 'surname':
            await validateSurname(validationData);
            break;
    }
    
    updateSubmitButton();
}

export function setupFieldValidation() {
    ['nickname', 'name', 'second_name', 'surname', 'email', 'phone', 
     'date_of_birth', 'password', 'password_repeat'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => validateField(id));
        }
    });

    ['email', 'nickname'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('blur', async () => {
                const validationData = {
                    ...getUserData(),
                    password_repeat: document.getElementById('password_repeat')?.value,
                    agree: document.getElementById('agree')?.checked
                };
                if (id === 'email') {
                    await validateEmail(validationData, API_URL, true);
                } else {
                    await validateNickname(validationData, API_URL);
                }
                updateSubmitButton();
            });
        }
    });
}

export function setupAgreeCheckbox() {
    const agreeCheckbox = document.getElementById('agree');
    if (agreeCheckbox) {
        agreeCheckbox.addEventListener('change', () => {
            validateAgree();
            updateSubmitButton();
        });
    }
}