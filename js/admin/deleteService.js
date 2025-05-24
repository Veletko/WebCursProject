export async function deleteService(serviceId) {
    try {
        console.log('Начинаем удаление сервиса ID:', serviceId);
        
        const serviceIdNum = Number(serviceId);
        if (isNaN(serviceIdNum)) {
            throw new Error('Неверный ID сервиса');
        }
        
        const deleteResponse = await fetch(`http://localhost:3000/services/${serviceIdNum}`, {
            method: 'DELETE'
        });
        
        if (!deleteResponse.ok) {
            const errorText = await deleteResponse.text();
            throw new Error(`Ошибка при удалении сервиса: ${errorText}`);
        }
        

        const usersResponse = await fetch('http://localhost:3000/users');
        if (!usersResponse.ok) {
            throw new Error('Ошибка при получении пользователей');
        }
        
        const allUsers = await usersResponse.json();
        
        const usersToUpdate = allUsers.filter(user => 
            user.cart && Array.isArray(user.cart) && 
            user.cart.some(id => Number(id) === serviceIdNum)
        );
        
        
        const updatePromises = usersToUpdate.map(user => {
            const updatedCart = user.cart.filter(id => Number(id) !== serviceIdNum);
            
            return fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: updatedCart })
            }).then(res => {
                if (!res.ok) {
                    console.error(`Ошибка обновления пользователя ${user.id}`, res.status);
                    return Promise.reject(`User ${user.id} update failed`);
                }
                return res;
            });
        });
        
        await Promise.all(updatePromises);
        
        return true;
    } catch (error) {
        console.error('Полная ошибка:', error);
        throw error;
    }
}
export function setupDeleteButton(serviceId, deleteBtn) {
    const serviceIdNum = Number(serviceId);
    if (isNaN(serviceIdNum)) {
        console.error('Неверный ID сервиса:', serviceId);
        return;
    }

    deleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (confirm('Вы точно хотите удалить этот сервис?')) {
            try {
                console.log('Попытка удаления сервиса ID:', serviceIdNum);
                const success = await deleteService(serviceIdNum);
                
                if (success) {
                    const cardElement = e.target.closest('.card');
                    if (cardElement) {
                        cardElement.remove();
                    }
                    alert('Сервис успешно удален');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка при удалении: ' + error.message);
            }
        }
    });
}