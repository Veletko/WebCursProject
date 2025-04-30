const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(`http://localhost:3000/services/${id}`)
  .then(res => res.json())
  .then(service => {
    document.querySelector('.service-title').textContent = service.title.en;
    document.querySelector('.service-description').textContent = service.description.en;
    document.querySelector('.service-category').textContent = service.category;
    document.querySelector('.service-price').textContent = "Price: "+service.price +"$";
    document.querySelector('.service-duration').textContent = "Duration: "+ service.duration + "min";
    document.querySelector('.service-img').src = service.image;
  })
  .catch(err => console.error('Ошибка при получении данных:', err));

addToCart();

async function addToCart(params) {
  const userId = 1;
  const res = await fetch('http://localhost:3000/users/1');
  const user = await res.json();
  const serviceId = parseInt(new URLSearchParams(window.location.search).get('id'));

  const cartButton = document.querySelector('.card-button:last-child');
  cartButton.addEventListener('click', async () => {
    if (!user.cart.includes(serviceId)) {
      user.cart.push(serviceId);
    }

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: user.cart })
    });
  });
}
  