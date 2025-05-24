import { fetchUserData, getUserFormData, API_URL } from './userData.js';
import { validateAllFields, validateField } from './validationForPersonalAccount.js';


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
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        alert('Не удалось загрузить данные пользователя');
    }
});

function populateForm(data) {
    ['nickname', 'name', 'second_name', 'surname', 'date_of_birth', 'email', 'phone'].forEach(id => {
        document.getElementById(id).value = data[id] || '';
    });
}


function setupValidation() {
    ['nickname', 'name', 'second_name', 'surname', 'email', 'phone', 'date_of_birth'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => {
                validateField(id);
                document.getElementById('save-changes').disabled = !hasChanges(); 
            });
            element.addEventListener('blur', () => validateField(id));
        }
    });
}

function setupEventListeners() {
    const saveChangesBtn = document.getElementById('save-changes');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const logoutButton = document.getElementById('logout-button');

    saveChangesBtn.addEventListener('click', async () => {
        const changedFields = getChangedFields();

        if (Object.keys(changedFields).length === 0) {
            alert('Нет изменений для сохранения');
            return;
        }

        let valid = true;
        for (const key of Object.keys(changedFields)) {
            const fieldValid = validateField(key);
            if (!fieldValid) valid = false;
        }

        if (!valid) return;

        try {
            const response = await fetch(`${API_URL}/${JSON.parse(localStorage.getItem('currentUser')).id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(changedFields)
            });

            if (!response.ok) throw new Error('Failed to save changes');

            const updatedUser = await response.json();
            window.originalData = { ...updatedUser };
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
        if (currentData[key] !== window.originalData[key]) {
            changedFields[key] = currentData[key];
        }
    }

    return changedFields;
}


function hasChanges() {
    return Object.keys(getChangedFields()).length > 0;
}
