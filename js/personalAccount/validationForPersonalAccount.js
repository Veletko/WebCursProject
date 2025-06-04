import { getUserFormData, API_URL } from './userData.js';
import { 
    validateEmail, 
    validateNickname, 
    validatePhone, 
    validateDateOfBirth, 
    validateName, 
    validateSecondName, 
    validateSurname
} from '/js/register/validationForRegistration.js';

export async function validateField(fieldId) {
    const element = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    const value = element.value;
    let isValid = true;
    let errorMessage = '';

    try {
        switch (fieldId) {
            case 'email':
                isValid = await validateEmail({ email: value }, API_URL, true);
                errorMessage = isValid ? '' : 'Введите корректный email';
                break;
            case 'nickname':
                isValid = await validateNickname({ nickname: value }, API_URL);
                errorMessage = isValid ? '' : 'Никнейм недоступен или некорректен';
                break;
            case 'phone':
                isValid = await validatePhone({ phone: value });
                errorMessage = isValid ? '' : 'Введите корректный номер телефона';
                break;
            case 'date_of_birth':
                isValid = await validateDateOfBirth({ date_of_birth: value });
                errorMessage = isValid ? '' : 'Введите корректную дату рождения';
                break;
            case 'name':
                isValid = await validateName({ name: value });
                errorMessage = isValid ? '' : 'Имя должно содержать минимум 2 символа';
                break;
            case 'second_name':
                isValid = await validateSecondName({ second_name: value });
                errorMessage = isValid ? '' : 'Отчество некорректно';
                break;
            case 'surname':
                isValid = await validateSurname({ surname: value });
                errorMessage = isValid ? '' : 'Фамилия должна содержать минимум 2 символа';
                break;
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = errorMessage ? 'block' : 'none';
        }

        return isValid;
    } catch (error) {
        console.error(`Ошибка валидации поля ${fieldId}:`, error);
        if (errorElement) {
            errorElement.textContent = 'Ошибка валидации';
            errorElement.style.display = 'block';
        }
        return false;
    }
}