import { setupPasswordVisibility } from './passwordUtils.js';
import { 
    setupGenerateNicknameHandler, 
    setupGeneratePasswordHandler, 
    setupFormSubmitHandler 
} from './formHandlers.js';
import { 
    setupFieldValidation, 
    setupAgreeCheckbox 
} from './fieldValidation.js';
import { Validation } from './validationForRegistration.js'; 
import { API_URL, getUserData } from './userData.js'; 

document.addEventListener('DOMContentLoaded', () => {
    setupPasswordVisibility();
    setupGenerateNicknameHandler();
    setupGeneratePasswordHandler();
    setupFieldValidation();
    setupAgreeCheckbox();
    setupFormSubmitHandler();
    updateSubmitButton();
});

export async function updateSubmitButton() {
    const submitButton = document.getElementById('submit-button');
    if (!submitButton) return;
    
    const validationData = {
        ...getUserData(),
        password_repeat: document.getElementById('password_repeat').value,
        agree: document.getElementById('agree')?.checked
    };
    
    const isValid = await Validation(validationData, API_URL);
    submitButton.disabled = !isValid;
}