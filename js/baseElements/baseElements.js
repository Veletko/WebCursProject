import { initThemeToggle } from './theme.js';
import { initPreloader } from './preloader.js';

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initThemeToggle();
});