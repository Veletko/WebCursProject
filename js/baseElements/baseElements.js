import { initThemeToggle } from './theme.js';
import { initPreloader } from './preloader.js';
import { checkAuth } from './loginCheck.js';
import { initBurgerMenu } from './burgerMenu.js';
import { loadComponents } from './components.js';
import { initLanguageSwitchers, applyTranslations } from './languageService.js';

export async function initBaseElements() {
    await loadComponents(); 
    initThemeToggle();
    initPreloader();
    checkAuth();
    initBurgerMenu();
    initLanguageSwitchers();
    applyTranslations();
}

document.addEventListener('DOMContentLoaded', initBaseElements);