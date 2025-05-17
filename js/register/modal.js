document.addEventListener('DOMContentLoaded', () => {
    const termsLink = document.getElementById('terms-link');
    const modal = document.getElementById('terms-modal');
    const closeModal = document.querySelector('.modal-close');
    const closeButton = document.querySelector('.modal-close-button');

    if (termsLink && modal && closeModal && closeButton) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});