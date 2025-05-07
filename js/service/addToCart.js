
export async function addToCart() {
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