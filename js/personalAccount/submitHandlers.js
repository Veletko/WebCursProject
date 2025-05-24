export async function handleSaveChanges() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser?.id) {
        alert('Ошибка: пользователь не авторизован');
        return;
    }

    const updatedData = {
        nickname: document.getElementById('nickname').value,
        name: document.getElementById('name').value,
        second_name: document.getElementById('second_name').value,
        surname: document.getElementById('surname').value,
        date_of_birth: document.getElementById('date_of_birth').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        const response = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при сохранении данных');
        }

        const updatedUser = await response.json();
        updateUserData(updatedUser);
        window.originalData = { ...updatedUser };
        document.getElementById('save-changes').disabled = true;
        alert('Изменения успешно сохранены!');
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert(`Ошибка: ${error.message}`);
    }
}