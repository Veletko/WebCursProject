export async function deleteService(serviceId) {
    try {
        const response = await fetch(`http://localhost:3000/services/${serviceId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при удалении сервиса');
        }
        
        return true; 
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
}

export function setupDeleteButton(serviceId, deleteBtn) {
    deleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (confirm('Вы точно хотите удалить этот сервис?')) {
            try {
                await deleteService(serviceId);
                e.target.closest('.card').remove(); 
                alert('Сервис успешно удален');
            } catch (error) {
                alert('Не удалось удалить сервис');
            }
        }
    });
}