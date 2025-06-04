import { validateField } from './validationForPersonalAccount.js';

export function setupValidation() {
    const fields = ['nickname', 'name', 'second_name', 'surname', 'date_of_birth', 'email', 'phone'];
    
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('blur', async () => {
                await validateField(fieldId); 
            });
        }
    });
}