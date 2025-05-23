import { loadCleanFunction } from './cleanCart.js';
import { loadDeleteFunction } from './deleteItemFromCart.js';

document.addEventListener('DOMContentLoaded', async () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) {
        const container = document.querySelector('.cart-container');
        container.innerHTML = '<p class="service-title">Ошибка: пользователь не найден</p>';
        return;
    }
    const userId = currentUser.id;

    try {
        const userRes = await fetch(`http://localhost:3000/users/${userId}`);
        if (!userRes.ok) {
            throw new Error('Пользователь не найден на сервере');
        }
        const user = await userRes.json();

        if (!user.cart || user.cart.length === 0) {
            const container = document.querySelector('.cart-container');
            container.innerHTML = '<p class="service-title">Ваша корзина пуста</p>';
            return;
        }

        const services = await Promise.all(
            user.cart.map(id =>
                fetch(`http://localhost:3000/services/${id}`).then(res => {
                    if (!res.ok) throw new Error(`Service ${id} not found`);
                    return res.json();
                })
            )
        );

        renderCartItems(user.id, services);
    } catch (error) {
        console.error('Error fetching user or services:', error);
        const container = document.querySelector('.cart-container');
        container.innerHTML = '<p class="service-title">Ошибка загрузки корзины</p>';
    }
});

export function renderCartItems(userId, services) {
    const container = document.querySelector('.cart-container');
    container.innerHTML = '';

    services.forEach(service => {
        const card = document.createElement('div');
        card.classList.add('service-container');

        card.innerHTML = `
            <img class="service-img" src="${service.image}" alt="service">
            <div class="service-info">
                <div>
                    <h2 class="service-title">${service.title.en}</h2>
                </div>
                <div>
                    <span class="service-price">Price: ${service.price}$</span>
                    <span class="service-duration">Duration: ${service.duration}min</span>
                </div>
            </div>
            <div class="button-container">
                <button class="card-button buy">Buy now</button>
                <button class="card-button delete-btn">Delete item</button>
            </div>
        `;
        container.appendChild(card);

        const deleteButton = card.querySelector('.delete-btn');
        loadDeleteFunction(userId, service.id, deleteButton);

        const buyButton = card.querySelector('.buy');
        buyButton.addEventListener('click', () => {
            console.log(`Buying service ${service.id} for user ${userId}`);
        });
    });

    const totalPrice = services.reduce((sum, c) => sum + parseFloat(c.price), 0);

    const price = document.querySelector('.price');
    price.innerHTML = `
        <p class="service-title">Overall price: ${totalPrice.toFixed(2)}$</p>
    `;

    const deleteAllServices = document.querySelector('.clean-cart');
    deleteAllServices.innerHTML = `
        <button class="card-button clean-button">Clean basket</button>
    `;

    const cleanButton = document.querySelector('.clean-button');
    loadCleanFunction(userId, cleanButton);
}