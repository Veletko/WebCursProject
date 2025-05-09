import { addToCart } from "./addToCart.js";

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


  