import { getTodos } from "../baseElements/getTodos.js";
import { getCurrentLanguage,applyTranslations } from "../baseElements/languageService.js";
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
    if (!container) return;
    container.innerHTML = '';
    const currentLang = getCurrentLanguage();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const servicesToShow = allServices.slice(start, end);

    servicesToShow.forEach(service => {
        const title = getLocalizedText(service.title, currentLang);
        const description = getLocalizedText(service.description, currentLang);
        
        container.innerHTML += `
            <div class="card">
                <img src="${service.image}" alt="${title}" data-i18n="[alt]service.imageAlt">
                <h3>${title}</h3>
                <p>${description}</p>
                <p><span data-i18n="service.details.price"></span>${service.price}</p>
                <p><span data-i18n="service.details.duration"></span>${service.duration} <span data-i18n="service.time.minutes"></span></p>
                <p><span data-i18n="service.details.category"></span>${service.category}</p>
                <button class="card-button" 
                        data-service-id="${service.id}" 
                        data-i18n="service.buttons.readMore"
                        onclick="location.href='service.html?id=${service.id}'">
                    Read More
                </button>
            </div>
        `;
    });

    applyTranslations(container);
    renderPagination();
}

function getLocalizedText(textObj, lang) {
    if (!textObj) return '';
    if (typeof textObj === 'string') return textObj;
    if (typeof textObj === 'object') {
        return textObj[lang] || textObj.en || '';
    }
    return '';
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