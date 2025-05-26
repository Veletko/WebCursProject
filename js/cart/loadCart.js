import { loadCleanFunction } from './cleanCart.js';
import { loadDeleteFunction } from './deleteItemFromCart.js';
import { getCurrentLanguage, applyTranslations} from '../baseElements/languageService.js';
import { deleteFromCart } from './deleteItemFromCart.js';
document.addEventListener('DOMContentLoaded', async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) {
        const container = document.querySelector('.cart-container');
        container.innerHTML = '<p class="service-title" data-i18n="cart.errorUser"></p>';
        applyTranslations();
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
            container.innerHTML = '<p class="service-title" data-i18n="cart.emptyCart"></p>';
            applyTranslations();
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
        container.innerHTML = '<p class="service-title" data-i18n="cart.errorLoad"></p>';
        applyTranslations();
    }
});

export function renderCartItems(userId, services) {
    const container = document.querySelector('.cart-container');
    container.innerHTML = '';

    const currentLang = getCurrentLanguage();

    services.forEach(service => {
        const card = document.createElement('div');
        card.classList.add('service-container');

        const serviceTitle = typeof service.title === 'object' 
            ? service.title[currentLang] || service.title.en || 'No title'
            : service.title || 'No title';

        card.innerHTML = `
            <img class="service-img" src="${service.image}" alt="${serviceTitle}" data-i18n="[alt]cart.itemAlt">
            <div class="service-info">
                <div>
                    <h2 class="service-title">${serviceTitle}</h2>
                </div>
                <div>
                    <span class="service-price"><span data-i18n="cart.priceLabel"></span> ${service.price}$</span>
                    <span class="service-duration"><span data-i18n="cart.durationLabel"></span> ${service.duration}<span data-i18n="cart.minutes"></span></span>
                </div>
            </div>
            <div class="button-container">
                <button class="card-button buy" data-i18n="cart.buyButton">Buy now</button>
                <button class="card-button delete-btn" data-i18n="cart.deleteButton">Delete item</button>
            </div>
        `;
        container.appendChild(card);

        const deleteButton = card.querySelector('.delete-btn');
        loadDeleteFunction(userId, service.id, deleteButton);

        const buyButton = card.querySelector('.buy');
        buyButton.addEventListener('click', () => {
            const orderData = {
                userId: userId,
                serviceId: service.id,
                purchaseTime: new Date().toISOString()
            };

            fetch('http://localhost:3000/orders', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Order created:', data);
                console.log(`Buying service ${service.id} for user ${userId}`);
            })
            .catch(error => {
                console.error('Error creating order:', error);
            });
            deleteFromCart(userId, service.id)
        });
    });

    const totalPrice = services.reduce((sum, c) => sum + parseFloat(c.price), 0);

    const price = document.querySelector('.price');
    price.innerHTML = `
        <p class="service-title"><span data-i18n="cart.totalPrice"></span> ${totalPrice.toFixed(2)}$</p>
    `;

    const deleteAllServices = document.querySelector('.clean-cart');
    deleteAllServices.innerHTML = `
        <button class="card-button clean-button" data-i18n="cart.cleanButton">Clean basket</button>
    `;

    const cleanButton = document.querySelector('.clean-button');
    loadCleanFunction(userId, cleanButton);

    applyTranslations();
}