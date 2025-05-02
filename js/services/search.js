import { allServices,currentPage,renderPagination,renderServicesPage } from "./loadServices.js";
import { getTodos } from "../baseElements/getTodos.js";
export async function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (!searchInput){
        return
    }
    searchInput.addEventListener('input',async () =>{
        try{
            const query = searchInput.value.trim();
            const url = `http://localhost:3000/services`;
      
            const services = await getTodos(query ? `q=${query}` : '', url);

            if(services.length === 0){
                return;
            }
            
            allServices.length = 0; 
            services.forEach(service => allServices.push(service)); 

            renderServicesPage(currentPage);
            renderPagination();
        }
        catch{
            console.error('ошибка');
        }
    });
}
