import { getTodos } from "../baseElements/getTodos.js";
import { setupDeleteButton } from "./deleteService.js";
import { openEditModal } from "./editService.js";
import { openAddModal } from "./addService.js";

export let allServices = [];
export const itemsPerPage = 6;
export let currentPage = 1;

export async function initAdminServices() {
    try {
        const services = await getTodos('', 'http://localhost:3000/services');
        allServices.length = 0; 
        allServices.push(...services);
        renderAdminPage(currentPage);

        const addButton = document.querySelector('.filter-options .card-button');
        if (addButton) {
            addButton.addEventListener('click', () => {
                openAddModal(); 
            });
        }
    } catch (error) {
        console.error("Error loading services:", error);
        alert(`Failed to load services: ${error.message}`);
    }
}

export function renderAdminPage(page) {
    const container = document.querySelector('.card-grid');
    if (!container) {
        console.error('Card grid container not found');
        return;
    }

    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const servicesToShow = allServices.slice(start, end);

    const html = servicesToShow
        .map(
            (element) => `
            <div class="card" data-service-id="${element.id}">
                <img class="card-img" src="${element.image || ''}" alt="service">
                <h3>${element.title?.en || 'No title'}</h3>
                <p>${element.description?.en || 'No description'}</p>
                <p>${element.price || 'No price'}</p>
                <p>${element.duration || 'No duration'}</p>
                <p>${element.category || 'No category'}</p>
                <button class="card-button edit-btn">Edit</button>
                <button class="card-button delete-btn">Delete</button>
            </div>
        `
        )
        .join('');
    container.innerHTML = html;

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        const card = button.closest('.card');
        const serviceId = card.dataset.serviceId;
        setupDeleteButton(serviceId, button);
    });

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const serviceId = card.dataset.serviceId;
            const service = allServices.find((s) => s.id == serviceId);
            if (service) {
                openEditModal(service);
            } else {
                console.error('Service not found:', serviceId);
            }
        });
    });

    renderPagination();
}

export function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) {
        console.error('Pagination container not found');
        return;
    }

    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(allServices.length / itemsPerPage);

    const buttonPrev = document.createElement('button');
    buttonPrev.textContent = 'Previous Page';
    buttonPrev.classList.add('pagination-button');
    buttonPrev.disabled = currentPage === 1;
    buttonPrev.addEventListener('click', () => {
        if (currentPage > 1) {
            renderAdminPage(currentPage - 1);
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
            renderAdminPage(i);
        });
        paginationContainer.appendChild(button);
    }

    const buttonNext = document.createElement('button');
    buttonNext.textContent = 'Next Page';
    buttonNext.classList.add('pagination-button');
    buttonNext.disabled = currentPage === pageCount;
    buttonNext.addEventListener('click', () => {
        if (currentPage < pageCount) {
            renderAdminPage(currentPage + 1);
        }
    });
    paginationContainer.appendChild(buttonNext);
}