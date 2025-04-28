import {getTodos} from "../baseElements/getTodos.js"

export async function loadCategories() {
    try {
        const services = await getTodos('', 'http://localhost:3000/services');
        
        const container = document.querySelector('.categories-container');
        if (!container) {
            throw new Error('Элемент categories-container не найден в DOM');
        }
          
        container.innerHTML = '';

        const uniqueCategories = [...new Set(services.map(s => s.category))];
        
        uniqueCategories.forEach(category => {
            container.innerHTML += `
                <label class="filter-label">
                    <input type="checkbox" value="${category}" class="filter-checkbox">
                    ${category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
            `;
        });

    } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
    }
}