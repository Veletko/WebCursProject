import { initCommentsSwiper } from './swiper.js';
import { initThemeToggle } from '../theme.js';
import { initPreloader } from '../preloader.js';

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCommentsSwiper();
    initThemeToggle();
});