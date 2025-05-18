export function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const basketLink = document.querySelector('.basket');

    if (basketLink) {

        basketLink.replaceWith(basketLink.cloneNode(true));
        
        if (!currentUser) {
            basketLink.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Please register or log in to use the cart.');
            });
        } else {
            basketLink.href = 'cart.html';
        }
    }
    return currentUser;
}
