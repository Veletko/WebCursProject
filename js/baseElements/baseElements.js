import { initThemeToggle } from './theme.js';
import { initPreloader } from './preloader.js';
import { checkAuth } from './loginCheck.js';

export function initBaseElements() {
    initThemeToggle();
    initPreloader();
    checkAuth();
}

document.addEventListener('DOMContentLoaded', initBaseElements);