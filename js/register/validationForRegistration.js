const commonPasswords = [
    "Password123!", "Qwerty123!", "12345678!", "Admin2024!", "Welcome123!",
    "Abcd1234!", "Password1!", "Sunshine2024!", "Football123!", "Monkey123!"
];

export function showError(fieldId, message) {
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

    error.textContent = message;
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
        return showError('nickname', 'Nickname is required');
    }

    if (hasSpaces(userData.nickname)) {
        return showError('nickname', 'Nickname cannot contain spaces');
    }

    if (userData.nickname.length < 3 || userData.nickname.length > 20) {
        return showError('nickname', 'Nickname must be 3-20 characters long');
    }

    try {
        const response = await fetch(`${API_URL}?nickname=${userData.nickname}`);
        const existingUsers = await response.json();
        if (existingUsers.length > 0) {
            return showError('nickname', 'Nickname already exists');
        }
    } catch (error) {
        console.error('Error during nickname validation:', error);
        return showError('nickname', 'Error checking nickname uniqueness');
    }

    clearError('nickname');
    return true;
}

export function validateName(userData) {
    if (!userData.name) {
        return showError('name', 'Name is required');
    }

    if (hasSpaces(userData.name)) {
        return showError('name', 'Name cannot contain spaces');
    }

    if (hasNumbers(userData.name)) {
        return showError('name', 'Name cannot contain numbers');
    }

    if (userData.name.length < 2) {
        return showError('name', 'Name must be at least 2 characters long');
    }

    clearError('name');
    return true;
}

export function validateSecondName(userData) {
    if (userData.second_name) {
        if (hasSpaces(userData.second_name)) {
            return showError('second_name', 'Second name cannot contain spaces');
        }

        if (hasNumbers(userData.second_name)) {
            return showError('second_name', 'Second name cannot contain numbers');
        }
    }

    clearError('second_name');
    return true;
}

export function validateSurname(userData) {
    if (!userData.surname) {
        return showError('surname', 'Surname is required');
    }

    if (hasSpaces(userData.surname)) {
        return showError('surname', 'Surname cannot contain spaces');
    }

    if (hasNumbers(userData.surname)) {
        return showError('surname', 'Surname cannot contain numbers');
    }

    if (userData.surname.length < 2) {
        return showError('surname', 'Surname must be at least 2 characters long');
    }

    clearError('surname');
    return true;
}

export async function validateEmail(userData, API_URL, checkUniqueness = false) {
    if (!userData.email) {
        return showError('email', 'Email is required');
    }

    if (hasSpaces(userData.email)) {
        return showError('email', 'Email cannot contain spaces');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        return showError('email', 'Invalid email format');
    }

    if (checkUniqueness) {
        try {
            const response = await fetch(`${API_URL}?email=${userData.email}`);
            const existingUsers = await response.json();
            if (existingUsers.length > 0) {
                return showError('email', 'Email already exists');
            }
        } catch (error) {
            console.error('Error during email validation:', error);
            return showError('email', 'Error checking email uniqueness');
        }
    }

    clearError('email');
    return true;
}

export function validatePhone(userData) {
    if (!userData.phone) {
        return showError('phone', 'Phone is required');
    }

    if (hasSpaces(userData.phone)) {
        return showError('phone', 'Phone cannot contain spaces');
    }

    const phoneRegex = /^\+375\d{9}$/;
    if (!phoneRegex.test(userData.phone)) {
        return showError('phone', 'Phone must be a Belarus number (e.g., +375291234567)');
    }

    clearError('phone');
    return true;
}

export function validateDateOfBirth(userData) {
    if (!userData.date_of_birth) {
        return showError('date_of_birth', 'Date of birth is required');
    }

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateRegex.test(userData.date_of_birth)) {
        return showError('date_of_birth', 'Invalid date format (дд.мм.гггг required)');
    }

    const parts = userData.date_of_birth.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (day < 1 || day > 31) {
        return showError('date_of_birth', 'Invalid day (1-31)');
    }
    if (month < 1 || month > 12) {
        return showError('date_of_birth', 'Invalid month (1-12)');
    }
    if (year < 1900 || year > new Date().getFullYear()) {
        return showError('date_of_birth', 'Invalid year');
    }

    const dob = new Date(year, month - 1, day);
    if (dob.getFullYear() !== year || dob.getMonth() + 1 !== month || dob.getDate() !== day) {
        return showError('date_of_birth', 'Invalid date (not a real calendar date)');
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 16) {
        return showError('date_of_birth', 'You must be at least 16 years old');
    }

    if (dob > today) {
        return showError('date_of_birth', 'Date of birth cannot be in the future');
    }

    if (age > 120) {
        return showError('date_of_birth', 'Please enter a valid date of birth');
    }

    clearError('date_of_birth');
    return true;
}

export function validatePassword(userData) {
    if (!userData.password) {
        return showError('password', 'Password is required');
    }

    if (hasSpaces(userData.password)) {
        return showError('password', 'Password cannot contain spaces');
    }

    if (userData.password.length < 8 || userData.password.length > 20) {
        return showError('password', 'Password must be 8-20 characters long');
    }

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!upperCaseRegex.test(userData.password)) {
        return showError('password', 'Password must contain at least one uppercase letter');
    }
    if (!lowerCaseRegex.test(userData.password)) {
        return showError('password', 'Password must contain at least one lowercase letter');
    }
    if (!digitRegex.test(userData.password)) {
        return showError('password', 'Password must contain at least one digit');
    }
    if (!specialCharRegex.test(userData.password)) {
        return showError('password', 'Password must contain at least one special character');
    }

    if (commonPasswords.includes(userData.password)) {
        return showError('password', 'Password is too common');
    }

    clearError('password');
    return true;
}

export function validatePasswordRepeat(userData) {
    if (!userData.password_repeat) {
        return showError('password_repeat', 'Please repeat your password');
    }

    if (userData.password !== userData.password_repeat) {
        return showError('password_repeat', 'Passwords do not match');
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
        error.textContent = 'You must agree to the terms';
        error.classList.add('active');
        return false;
    }

    error.textContent = '';
    error.classList.remove('active');
    return true;
}

export async function Validation(userData, API_URL) {
    let hasError = false;

    document.querySelectorAll('.error-message, .agree-error').forEach(error => {
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