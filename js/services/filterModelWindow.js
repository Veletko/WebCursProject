export function initFiltersModelWindow() {
    const modal = document.getElementById('filter-modal');
    const openModal = document.querySelector('.filter-section .card-button:nth-child(2)');
    const closeModal = document.getElementById('close-modal')

    openModal.addEventListener('click', () =>{
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    })

    closeModal.addEventListener('click', () =>{
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    })
    
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
}