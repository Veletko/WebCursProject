import { getTodos } from "../baseElements/getTodos.js";

export let allServices = [];
export const itemsPerPage = 6; 
export let currentPage = 1;

export async function initServices() {
    try {
        const services = await getTodos('', 'http://localhost:3000/services');
        allServices.length = 0; 
        services.forEach(element => {
            allServices.push(element);
        });

        renderServicesPage(currentPage);
        renderPagination();
    } catch (error) {
        console.error("Ошибка при загрузке сервисов:", error);
    }
}

export function renderServicesPage(page) {
    const container = document.querySelector('.card-grid');
    container.innerHTML = '';

    currentPage = page; 
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const servicesToShow = allServices.slice(start, end);

    servicesToShow.forEach(element => {
        container.innerHTML += `
            <div class="card">
                <img src="${element.image}" alt="service">
                <h3>${element.title.en}</h3>
                <p>${element.description.en}</p>
                <p>${element.price}</p>
                <p>${element.duration}</p>
                <p>${element.category}</p>
                <button class="card-button" onclick="location.href='service.html?id=${element.id}'">Read More</button>
            </div>
        `;
    });

    renderPagination(); 
}

export function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const pageCount = Math.ceil(allServices.length / itemsPerPage);

    const buttonPrev = document.createElement('button');
    buttonPrev.textContent = "Previous Page";
    buttonPrev.classList.add('pagination-button');
    buttonPrev.disabled = currentPage === 1;
    buttonPrev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            renderServicesPage(currentPage);
        }
    });
    paginationContainer.appendChild(buttonPrev);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            renderServicesPage(i);
        });
        paginationContainer.appendChild(button);
    }

    const buttonNext = document.createElement('button');
    buttonNext.textContent = "Next Page";
    buttonNext.classList.add('pagination-button');
    buttonNext.disabled = currentPage === pageCount;
    buttonNext.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage += 1;
            renderServicesPage(currentPage);
        }
    });
    paginationContainer.appendChild(buttonNext);
}