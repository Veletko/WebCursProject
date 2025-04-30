document.addEventListener('DOMContentLoaded', async () => {
    const userId = 1; 
    const userRes = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await userRes.json();

    if (!user.cart || user.cart.length === 0) {
        alert('Ваша корзина пуста');
        return;
    }

    const services = await Promise.all(
        user.cart.map(id =>
            fetch(`http://localhost:3000/services/${id}`).then(res => res.json())
        )
    );

    renderCartItems(services);
});
  
  function renderCartItems(services) {
    const container = document.querySelector('.cart-container');
    container.innerHTML = ''; 
  
    services.forEach(service => {
      const card = document.createElement('div');
      card.classList.add('service-container');
  
      card.innerHTML = `
        <img class="service-img" src="${service.image}" alt="service">
        <div class="service-info">
          <div>
            <h3 class="service-category">${service.category}</h3>
            <h2 class="service-title">${service.title.en}</h2>
            <p class="service-description">${service.description.en}</p>
          </div>
          <div>
            <span class="service-price">Price: ${service.price}$</span>
            <span class="service-duration">Duration: ${service.duration}min</span>
          </div>
          <button class="card-button">Buy now</button>
        </div>
      `;
  
      container.appendChild(card);
    });
  }
  