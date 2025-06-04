import { fetchUserData, getUserFormData, API_URL } from './userData.js';
import { validateField } from './validationForPersonalAccount.js';

const changedFieldsTracker = new Set();

document.addEventListener('DOMContentLoaded', async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser?.id) {
        window.location.href = '/pages/login.html';
        return;
    }

    try {
        const userData = await fetchUserData(currentUser.id);
        window.originalData = { ...userData };
        populateForm(userData);
        setupValidation();
        setupEventListeners();
        await updateSaveButtonState();
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        alert('Не удалось загрузить данные пользователя');
    }
});

function populateForm(data) {
    ['nickname', 'name', 'second_name', 'surname', 'date_of_birth', 'email', 'phone'].forEach(id => {
        const element = document.getElementById(id);
        const errorElement = document.getElementById(`${id}-error`);
        if (element) {
            element.value = data[id] || '';
        }
        if (errorElement) {
            errorElement.textContent = ''; 
            errorElement.style.display = 'none';
        }
    });
}

function setupValidation() {
    const fields = ['nickname', 'name', 'second_name', 'surname', 'email', 'phone', 'date_of_birth'];

    fields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', async () => {
                if (element.value !== (window.originalData[id] || '')) {
                    changedFieldsTracker.add(id);
                } else {
                    changedFieldsTracker.delete(id);
                }
                const isValid = await validateField(id);
                console.log(`Input validation for ${id}: ${isValid}, value: ${element.value}`);
                await updateSaveButtonState();
            });

            element.addEventListener('blur', async () => {
                if (element.value !== (window.originalData[id] || '')) {
                    changedFieldsTracker.add(id);
                } else {
                    changedFieldsTracker.delete(id);
                }
                const isValid = await validateField(id);
                console.log(`Blur validation for ${id}: ${isValid}, value: ${element.value}`);
                await updateSaveButtonState();
            });
        }
    });
}

async function updateSaveButtonState() {
    const saveBtn = document.getElementById('save-changes');
    const hasChangesFlag = hasChanges();
    let hasErrors = false;

    for (const fieldId of changedFieldsTracker) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement && errorElement.textContent.trim() !== '') {
            hasErrors = true;
            console.log(`Error found in ${fieldId}: ${errorElement.textContent}`);
        }
    }

    console.log(`Save button state: hasChanges=${hasChangesFlag}, hasErrors=${hasErrors}, changedFields=${[...changedFieldsTracker]}`);
    saveBtn.disabled = !hasChangesFlag || hasErrors;
}

function setupEventListeners() {
    const saveChangesBtn = document.getElementById('save-changes');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const logoutButton = document.getElementById('logout-button');

    saveChangesBtn.addEventListener('click', async () => {
        let valid = true;

        for (const fieldId of changedFieldsTracker) {
            const fieldValid = await validateField(fieldId);
            console.log(`Save validation for ${fieldId}: ${fieldValid}`);
            if (!fieldValid) valid = false;
        }

        if (!valid) {
            alert('Исправьте ошибки в измененных полях');
            return;
        }

        const changedFields = getChangedFields();
        if (Object.keys(changedFields).length === 0) {
            alert('Нет изменений для сохранения');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${JSON.parse(localStorage.getItem('currentUser')).id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(changedFields)
            });

            if (!response.ok) throw new Error('Failed to save changes');

            const updatedUser = await response.json();
            window.originalData = { ...updatedUser };
            changedFieldsTracker.clear();
            saveChangesBtn.disabled = true;
            alert('Изменения сохранены успешно!');
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            alert('Ошибка при сохранении изменений');
        }
    });

    changePasswordBtn.addEventListener('click', () => {
        alert('Ссылка для смены пароля отправлена на ваш email');
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/pages/login.html';
    });
}

function getChangedFields() {
    const currentData = getUserFormData();
    const changedFields = {};

    for (const key in currentData) {
        if (currentData[key] !== (window.originalData[key] || '')) {
            changedFields[key] = currentData[key];
        }
    }

    return changedFields;
}

function hasChanges() {
    return Object.keys(getChangedFields()).length > 0;
}