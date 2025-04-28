import { getTodos } from "../baseElements/getTodos.js";

export async  function initServices (){
    try
    {
        const services = await  getTodos('', 'http://localhost:3000/services');
        let allServices = [];
        const itemsPrePage= 6;
        let currentPage = 1

        services.forEach(element => {
            allServices.push(element)
        });
        
        
        renderServicesPage(currentPage);
        renderPagination();

        function renderServicesPage(page){
            const container = document.querySelector('.card-grid');
            if (!container){
                throw Error("Элемент .card-grid не найден");
            }
            container.innerHTML = ''

            const start = (page - 1) * itemsPrePage;
            const end = start + itemsPrePage;
            const servicesToShow = allServices.slice(start, end);

            servicesToShow.forEach(element =>{
                container.innerHTML +=`
                    <div class="card">
                        <img src="${element.image}" alt="service">
                        <h3>${element.title.en}</h3>
                        <p>${element.description.en}</p>
                        <button class="card-button">Read More</button>
                    </div>
                `;
            })
        }
        function renderPagination(){
            const paginationContainer = document.querySelector('.pagination');
            paginationContainer.innerHTML = '';

            const pageCount = Math.ceil(allServices.length / itemsPrePage);
            
            const buttonPrev = document.createElement('button')
            buttonPrev.textContent = "Previous Page"
            buttonPrev.classList.add('pagination-button')
            buttonPrev.addEventListener('click', () =>{
                if (currentPage <= pageCount && currentPage !=1) {
                    currentPage -= 1;
                    renderServicesPage(currentPage);
                    renderPagination();
                }
            })
            paginationContainer.appendChild(buttonPrev);

            for(let i = 1; i <= pageCount; i++){
                const button = document.createElement('button')
                button.textContent = i;
                button.classList.add('pagination-button');
                if(i === currentPage){
                    button.classList.add('active');
                }

                button.addEventListener('click', () =>{
                    currentPage = i;
                    renderServicesPage(i);
                    renderPagination();
                })

                paginationContainer.appendChild(button);
            }
            const button = document.createElement('button')
            button.textContent = "Next Page"
            button.classList.add('pagination-button')
            button.addEventListener('click', () =>{
                if (currentPage < pageCount) {
                    currentPage += 1;
                    renderServicesPage(currentPage);
                    renderPagination();
                }
            })
            paginationContainer.appendChild(button);
        }
    }
    catch{
        console.error("Ошибка")
    }


}