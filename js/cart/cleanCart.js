export async function cleanCart(userId) {
    try {
        const updatedCart = [];
        
        await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: updatedCart })
        });

    } catch (error) {
        console.error('Ошибка при удалении из корзины:', error);
        throw error; 
    }
}
export async function loadCleanFunction(userId, button) {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        await cleanCart(userId);
    });
}
  
