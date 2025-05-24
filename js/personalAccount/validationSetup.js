import { validateField } from './validationForPersonalAccount.js';

export function setupValidation() {
    const fields = ['nickname', 'name', 'second_name', 'surname', 'date_of_birth', 'email', 'phone'];
    
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('blur', () => validateField(fieldId, element.value));
        }
    });
}

export async function validateAllFields() {
    const fields = ['nickname', 'name', 'second_name', 'surname', 'date_of_birth', 'email', 'phone'];
    let isValid = true;
    
    for (const fieldId of fields) {
        const element = document.getElementById(fieldId);
        if (element) {
            const fieldValid = await validateField(fieldId, element.value);
            if (!fieldValid) {
                isValid = false;
            }
        }
    }
    
    return isValid;
}