import { allServices, currentPage, renderServicesPage, renderPagination } from "./loadServices.js";

export async function applyFilters() {
    const checkedBoxes = document.querySelectorAll('.filter-checkbox:checked');
    const selectedCategories = Array.from(checkedBoxes).map(checkbox => checkbox.value);

    const priceFrom = document.getElementById('price-from')?.value || '';
    const priceTo = document.getElementById('price-to')?.value || '';
    const timeFrom = document.getElementById('duration-from')?.value || '';
    const timeTo = document.getElementById('duration-to')?.value || '';

    const sortSelect = document.querySelector('.filter-options select.card-button');
    const sortOption = sortSelect ? sortSelect.value : 'Popular';

    const baseQueryParams = [];

    if (priceFrom && !isNaN(priceFrom) && priceFrom >= 0) {
        baseQueryParams.push(`price_gte=${encodeURIComponent(priceFrom)}`);
    }
    if (priceTo && !isNaN(priceTo) && priceTo >= 0) {
        baseQueryParams.push(`price_lte=${encodeURIComponent(priceTo)}`);
    }
    if (timeFrom && !isNaN(timeFrom) && timeFrom >= 0) {
        baseQueryParams.push(`duration_gte=${encodeURIComponent(timeFrom)}`);
    }
    if (timeTo && !isNaN(timeTo) && timeTo >= 0) {
        baseQueryParams.push(`duration_lte=${encodeURIComponent(timeTo)}`);
    }

    const sortParams = getSortParams(sortOption);

    try {
        const fetchPromises = [];

        if (selectedCategories.length > 0) {
            selectedCategories.forEach(category => {
                const queryParams = [...baseQueryParams, `category=${encodeURIComponent(category)}`, ...sortParams];
                const query = queryParams.join('&');
                const url = `http://localhost:3000/services?${query}`;
                fetchPromises.push(fetch(url).then(res => {
                    if (!res.ok) {
                        throw new Error(`Ошибка HTTP`);
                    }
                    return res.json();
                }));
            });
        } else {
            const queryParams = [...baseQueryParams, ...sortParams];
            const query = queryParams.join('&');
            const url = query ? `http://localhost:3000/services?${query}` : 'http://localhost:3000/services';
            fetchPromises.push(fetch(url).then(res => {
                if (!res.ok) {
                    throw new Error(`Ошибка HTTP`);
                }
                return res.json();
            }));
        }

        const results = await Promise.all(fetchPromises);
        let filteredServices = results.flat();

        if (filteredServices.length === 0) {
            const container = document.querySelector('.card-grid');
            container.innerHTML = `
                    <p class="empty-message"">Nothing found</p>
            `;
            const paginationContainer = document.querySelector('.pagination');
            paginationContainer.innerHTML = '';
            return; 
        }

        allServices.length = 0;
        filteredServices.forEach(service => allServices.push(service));

        renderServicesPage(currentPage);
        renderPagination();
    } catch (error) {
        console.error('Ошибка при применении фильтров:', error, error.stack);
    }
}

function getSortParams(option) {
    switch (option) {
        case 'Cheap':
            return ['_sort=price', '_order=asc'];
        case 'Expensive':
            return ['_sort=-price', ''];
        case 'NameAsc':
            return ['_sort=title.en', '_order=asc'];
        case 'NameDesc':
            return ['_sort=-title.en', ''];
        default:
            return []; 
    }
}
