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
    const formData = getUserFormData();
    
    switch(fieldId) {
        case 'email':
            await validateEmail({...formData, email: document.getElementById('email').value}, API_URL, true);
            break;
        case 'nickname':
            await validateNickname({...formData, nickname: document.getElementById('nickname').value}, API_URL);
            break;
        case 'phone':
            await validatePhone({...formData, phone: document.getElementById('phone').value});
            break;
        case 'date_of_birth':
            await validateDateOfBirth({...formData, date_of_birth: document.getElementById('date_of_birth').value});
            break;
        case 'name':
            await validateName({...formData, name: document.getElementById('name').value});
            break;
        case 'second_name':
            await validateSecondName({...formData, second_name: document.getElementById('second_name').value});
            break;
        case 'surname':
            await validateSurname({...formData, surname: document.getElementById('surname').value});
            break;
    }
}

export async function validateAllFields() {
    const formData = getUserFormData();
    const validationData = {
        ...formData,
    };
    

    const validations = await Promise.all([
        validateNickname(validationData, API_URL),
        validateName(validationData),
        validateSurname(validationData),
        validateEmail(validationData, API_URL, true),
        validatePhone(validationData),
        validateDateOfBirth(validationData)
    ]);
    
    return validations.every(valid => valid);
}