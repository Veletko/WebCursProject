export function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            });
        },50);
    });

    window.addEventListener('error', () => {
        preloader.classList.add('preloader-hidden');
        preloader.remove();
    });
}