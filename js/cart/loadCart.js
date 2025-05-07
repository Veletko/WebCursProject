import {loadCleanFunction} from './cleanCart.js';
import { loadDeleteFunction} from "./deleteItemFromCart.js";

document.addEventListener('DOMContentLoaded', async () => {
    const userId = 1; 
    const userRes = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await userRes.json();

    if (!user.cart || user.cart.length === 0) {
      const container = document.querySelector('.cart-container');
      container.innerHTML = '';
      container. innerHTML = `
      <p class="service-title"> Ваша казина пуста </p>`
      return;
    }
    const services = await Promise.all(
        user.cart.map(id =>
            fetch(`http://localhost:3000/services/${id}`).then(res => res.json())
        )
    );
    
    renderCartItems(userId, services);
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
      <div class='button-container'>
          <button class="card-button buy">Buy now</button>
          <button class="card-button delete-btn">Delete item</button>
      </div>
    `;
    container.appendChild(card);

    const deleteButton = card.querySelector('.delete-btn');
    loadDeleteFunction(userId, service.id, deleteButton);

    const buyButton = card.querySelector('.buy');
    loadDeleteFunction(userId,service.id,buyButton);

  });
  const price = document.querySelector(".price");
  price.innerHTML = '';

  price.innerHTML = `
    <p class = "service-title">Overall prce: ${services.reduce((sum, c) => sum + c.price, 0)} $</p>
  `;

  const deleteAllServices = document.querySelector(".clean-cart")
  deleteAllServices.innerHTML = ``;

  deleteAllServices.innerHTML = `
   <button class = "card-button clean-button">Clean basket</button>
  `;
  const cleanButton = document.querySelector(".clean-button");
  loadCleanFunction(userId, cleanButton);
  
}

  