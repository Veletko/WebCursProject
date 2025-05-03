import { renderCartItems } from "./loadCart.js";

export async function deleteFromCart(userId, serviceId) {
    try {
        const userRes = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await userRes.json();

        const updatedCart = user.cart.filter(id => id !== serviceId);
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
export async function loadDeleteFunction(userId, serviceId, button) {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        await deleteFromCart(userId, serviceId);
    });
}
  
