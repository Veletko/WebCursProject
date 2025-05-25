import { getTodos } from "../baseElements/getTodos.js";
import { setupDeleteButton } from "./deleteService.js";
import { openEditModal } from "./editService.js";
import { openAddModal } from "./addService.js";
import { getCurrentLanguage,applyTranslations } from "../baseElements/languageService.js";

export let allServices = [];
export const itemsPerPage = 6;
export let currentAdminPage = 1;

export async function initAdminServices() {
    try {
        const services = await getTodos('', 'http://localhost:3000/services');
        allServices.length = 0; 
        allServices.push(...services);
        renderAdminPage(currentAdminPage);

        const addButton = document.querySelector('.filter-options .card-button');
        if (addButton) {
            addButton.addEventListener('click', () => {
                openAddModal(); 
            });
        }
        
        applyTranslations(); 
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

    currentAdminPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const servicesToShow = allServices.slice(start, end);
    const currentLang = getCurrentLanguage(); 

    const html = servicesToShow
        .map(
            (element) => `
            <div class="card" data-service-id="${element.id}">
                <img class="card-img" src="${element.image || ''}" alt="service" data-i18n="[alt]service.imageAlt">
                <h3>${element.title?.[currentLang] || element.title?.en || 'No title'}</h3>
                <p>${element.description?.[currentLang] || element.description?.en || 'No description'}</p>
                <p><span data-i18n="service.details.price"></span>${element.price || 'No price'}</p>
                <p><span data-i18n="service.details.duration"></span>${element.duration || 'No duration'} <span data-i18n="service.time.minutes"></span></p>
                <p><span data-i18n="service.details.category"></span>${element.category || 'No category'}</p>
                <button class="card-button edit-btn" data-i18n="admin.buttons.edit">Edit</button>
                <button class="card-button delete-btn" data-i18n="admin.buttons.delete">Delete</button>
            </div>
        `
        )
        .join('');
    container.innerHTML = html;

  
    applyTranslations(container);

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
    buttonPrev.setAttribute('data-i18n', 'pagination.previous'); // Добавляем атрибут перевода
    buttonPrev.classList.add('pagination-button');
    buttonPrev.disabled = currentAdminPage === 1;
    buttonPrev.addEventListener('click', () => {
        if (currentAdminPage > 1) {
            renderAdminPage(currentAdminPage - 1);
        }
    });
    paginationContainer.appendChild(buttonPrev);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentAdminPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            renderAdminPage(i);
        });
        paginationContainer.appendChild(button);
    }

    const buttonNext = document.createElement('button');
    buttonNext.textContent = 'Next Page';
    buttonNext.setAttribute('data-i18n', 'pagination.next');
    buttonNext.classList.add('pagination-button');
    buttonNext.disabled = currentAdminPage === pageCount;
    buttonNext.addEventListener('click', () => {
        if (currentAdminPage < pageCount) {
            renderAdminPage(currentAdminPage + 1);
        }
    });
    paginationContainer.appendChild(buttonNext);
    
    applyTranslations(paginationContainer);
}