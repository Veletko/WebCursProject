export async function addToCart() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to add items to cart');
        window.location.href = '/pages/login.html';
        return;
    }

    const serviceId = parseInt(new URLSearchParams(window.location.search).get('id'));
    const res = await fetch(`http://localhost:3000/users/${currentUser.id}`);
    const user = await res.json();
  
    if (!user.cart.includes(serviceId)) {
            user.cart.push(serviceId);
        }
    
    await fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: user.cart })
        });
        
    alert('Item added to cart!');
}