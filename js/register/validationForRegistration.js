import { getCurrentLanguage, getTranslation } from '../baseElements/languageService.js'; // Импортируем функции для переводов

const commonPasswords = [
    "Password123!", "Qwerty123!", "12345678!", "Admin2024!", "Welcome123!",
    "Abcd1234!", "Password1!", "Sunshine2024!", "Football123!", "Monkey123!"
];

export function showError(fieldId, messageKey) {
    const fieldElement = document.getElementById(fieldId);
    if (!fieldElement) {
        console.error(`Element with id "${fieldId}" not found`);
        return false;
    }

    const inputWrapper = fieldElement.closest('.input-wrapper');
    if (!inputWrapper) {
        console.error(`Input wrapper not found for field "${fieldId}"`);
        return false;
    }

    const error = inputWrapper.querySelector('.error-message');
    if (!error) {
        console.error(`Error message element not found for field "${fieldId}"`);
        return false;
    }

    const i18nKey = `register.errors.${messageKey}`;
    error.setAttribute('data-i18n', i18nKey);
    const translatedMessage = getTranslation(i18nKey) || `Error: ${messageKey}`; // Fallback if translation is not found
    error.textContent = translatedMessage;
    error.classList.add('active');
    return false;
}

export function clearError(fieldId) {
    const fieldElement = document.getElementById(fieldId);
    if (!fieldElement) return;

    const inputWrapper = fieldElement.closest('.input-wrapper');
    if (!inputWrapper) return;

    const error = inputWrapper.querySelector('.error-message');
    if (error) {
        error.removeAttribute('data-i18n');
        error.textContent = '';
        error.classList.remove('active');
    }
}

function hasSpaces(str) {
    return /\s/.test(str);
}

function hasNumbers(str) {
    return /\d/.test(str);
}

export async function validateNickname(userData, API_URL) {
    if (!userData.nickname) {
        return showError('nickname', 'nicknameRequired');
    }

    if (hasSpaces(userData.nickname)) {
        return showError('nickname', 'noSpaces');
    }

    if (userData.nickname.length < 3 || userData.nickname.length > 20) {
        return showError('nickname', 'nicknameLength');
    }

    try {
        const response = await fetch(`${API_URL}?nickname=${userData.nickname}`);
        const existingUsers = await response.json();
        if (existingUsers.length > 0) {
            return showError('nickname', 'nicknameExists');
        }
    } catch (error) {
        console.error('Error during nickname validation:', error);
        return showError('nickname', 'nicknameCheckError');
    }

    clearError('nickname');
    return true;
}

export function validateName(userData) {
    if (!userData.name) {
        return showError('name', 'nameRequired');
    }

    if (hasSpaces(userData.name)) {
        return showError('name', 'noSpaces');
    }

    if (hasNumbers(userData.name)) {
        return showError('name', 'noNumbers');
    }

    if (userData.name.length < 2) {
        return showError('name', 'nameMinLength');
    }

    clearError('name');
    return true;
}

export function validateSecondName(userData) {
    if (userData.second_name) {
        if (hasSpaces(userData.second_name)) {
            return showError('second_name', 'noSpaces');
        }

        if (hasNumbers(userData.second_name)) {
            return showError('second_name', 'noNumbers');
        }
    }

    clearError('second_name');
    return true;
}

export function validateSurname(userData) {
    if (!userData.surname) {
        return showError('surname', 'surnameRequired');
    }

    if (hasSpaces(userData.surname)) {
        return showError('surname', 'noSpaces');
    }

    if (hasNumbers(userData.surname)) {
        return showError('surname', 'noNumbers');
    }

    if (userData.surname.length < 2) {
        return showError('surname', 'surnameMinLength');
    }

    clearError('surname');
    return true;
}

export async function validateEmail(userData, API_URL, checkUniqueness = false) {
    if (!userData.email) {
        return showError('email', 'emailRequired');
    }

    if (hasSpaces(userData.email)) {
        return showError('email', 'noSpaces');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        return showError('email', 'invalidEmail');
    }

    if (checkUniqueness) {
        try {
            const response = await fetch(`${API_URL}?email=${userData.email}`);
            const existingUsers = await response.json();
            if (existingUsers.length > 0) {
                return showError('email', 'emailExists');
            }
        } catch (error) {
            console.error('Error during email validation:', error);
            return showError('email', 'emailCheckError');
        }
    }

    clearError('email');
    return true;
}

export function validatePhone(userData) {
    if (!userData.phone) {
        return showError('phone', 'phoneRequired');
    }

    if (hasSpaces(userData.phone)) {
        return showError('phone', 'noSpaces');
    }

    const phoneRegex = /^\+375\d{9}$/;
    if (!phoneRegex.test(userData.phone)) {
        return showError('phone', 'invalidPhone');
    }

    clearError('phone');
    return true;
}

export function validateDateOfBirth(userData) {
    if (!userData.date_of_birth) {
        return showError('date_of_birth', 'dobRequired');
    }

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateRegex.test(userData.date_of_birth)) {
        return showError('date_of_birth', 'invalidDateFormat');
    }

    const parts = userData.date_of_birth.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (day < 1 || day > 31) {
        return showError('date_of_birth', 'invalidDay');
    }
    if (month < 1 || month > 12) {
        return showError('date_of_birth', 'invalidMonth');
    }
    if (year < 1900 || year > new Date().getFullYear()) {
        return showError('date_of_birth', 'invalidYear');
    }

    const dob = new Date(year, month - 1, day);
    if (dob.getFullYear() !== year || dob.getMonth() + 1 !== month || dob.getDate() !== day) {
        return showError('date_of_birth', 'invalidDate');
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 16) {
        return showError('date_of_birth', 'minAge');
    }

    if (dob > today) {
        return showError('date_of_birth', 'futureDate');
    }

    if (age > 120) {
        return showError('date_of_birth', 'invalidDob');
    }

    clearError('date_of_birth');
    return true;
}

export function validatePassword(userData) {
    if (!userData.password) {
        return showError('password', 'passwordRequired');
    }

    if (hasSpaces(userData.password)) {
        return showError('password', 'noSpaces');
    }

    if (userData.password.length < 8 || userData.password.length > 20) {
        return showError('password', 'passwordLength');
    }

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!upperCaseRegex.test(userData.password)) {
        return showError('password', 'passwordUppercase');
    }
    if (!lowerCaseRegex.test(userData.password)) {
        return showError('password', 'passwordLowercase');
    }
    if (!digitRegex.test(userData.password)) {
        return showError('password', 'passwordDigit');
    }
    if (!specialCharRegex.test(userData.password)) {
        return showError('password', 'passwordSpecialChar');
    }

    if (commonPasswords.includes(userData.password)) {
        return showError('password', 'passwordCommon');
    }

    clearError('password');
    return true;
}

export function validatePasswordRepeat(userData) {
    if (!userData.password_repeat) {
        return showError('password_repeat', 'repeatPasswordRequired');
    }

    if (userData.password !== userData.password_repeat) {
        return showError('password_repeat', 'passwordsMismatch');
    }

    clearError('password_repeat');
    return true;
}

export function validateAgree() {
    const agreeCheckbox = document.getElementById('agree');
    if (!agreeCheckbox) {
        console.error('Agree checkbox not found');
        return false;
    }

    const error = document.querySelector('.agree-error');
    if (!error) {
        console.error('Error message element for agree checkbox not found');
        return false;
    }

    if (!agreeCheckbox.checked) {
        const i18nKey = 'register.errors.agreeRequired';
        error.setAttribute('data-i18n', i18nKey);
        const translatedMessage = getTranslation(i18nKey) || 'You must agree to the terms'; // Если перевод не найден, используем запасной текст
        error.textContent = translatedMessage;
        error.classList.add('active');
        return false;
    }

    error.removeAttribute('data-i18n');
    error.textContent = '';
    error.classList.remove('active');
    return true;
}

export async function Validation(userData, API_URL) {
    let hasError = false;

    document.querySelectorAll('.error-message, .agree-error').forEach(error => {
        error.removeAttribute('data-i18n');
        error.textContent = '';
        error.classList.remove('active');
    });

    if (!(await validateNickname(userData, API_URL))) hasError = true;
    if (!validateName(userData)) hasError = true;
    if (!validateSecondName(userData)) hasError = true;
    if (!validateSurname(userData)) hasError = true;
    if (!(await validateEmail(userData, API_URL, true))) hasError = true;
    if (!validatePhone(userData)) hasError = true;
    if (!validateDateOfBirth(userData)) hasError = true;
    if (!validatePassword(userData)) hasError = true;
    if (!validatePasswordRepeat(userData)) hasError = true;
    if (!validateAgree()) hasError = true;

    return !hasError;
}

export function generateNickname() {
    const randomLetters = () => {
        const length = Math.floor(Math.random() * 5) + 2;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
        return result;
    };

    const cleanName = randomLetters();
    
    const suffixes = ['Cool', 'Pro', 'Star', 'Master', 'Guru', ''];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNum = Math.floor(Math.random() * 90) + 10;
    
    return `${cleanName}${randomSuffix}${randomNum}`;
}