import { loadCategories } from "./loadCategories.js";
import { applyFilters} from "./applyFilters.js";

export function initFiltersModelWindow() {
    const modal = document.getElementById('filter-modal');
    const openModalBtn = document.querySelector('.filter-section .card-button:nth-child(2)');
    const closeModalBtn = document.getElementById('close-modal');
    const applyFiltersBtn = document.getElementById('apply-filters');

    openModalBtn.addEventListener('click', async () => {
        modal.classList.add('open');
        document.body.classList.add('modal-open');
        await loadCategories();
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    });

    applyFiltersBtn.addEventListener('click', () => {
        applyFilters();
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    });
}