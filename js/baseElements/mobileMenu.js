import { getCurrentLanguage } from './languageService.js';
import { checkAuth } from './loginCheck.js'; 

export function initMobileMenu(placeholderId = 'mobile-menu-placeholder') {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const isAdmin = user.isAdmin === true;
    const lang = getCurrentLanguage();
    
    placeholder.innerHTML = `
        <div class="mobile-menu" id="mobile-menu">
            <span class="mobile-menu-close">×</span>
            <nav class="mobile-nav">
                <a href="/pages/login.html" data-i18n="header.nav.login">Log in</a>
                <a href="/pages/homepage.html" data-i18n="header.nav.home">Home</a>
                <a href="/pages/services.html" data-i18n="header.nav.services">Services</a>
                ${isAdmin ? '<a href="/pages/admin.html" data-i18n="header.nav.admin">Admin</a>' : ''}
                <a href="/pages/personalAccount.html" id="mobile-account-link" data-i18n="header.nav.account">Personal Account</a>
            </nav>
            <div class="mobile-menu-footer">
                <button class="visually-impaired-button">
                    <img src="/img/eye.png" alt="eye">
                </button>
                <label class="theme-toggle">
                    <input type="checkbox" hidden>  
                    <img class="sun" src="/img/sun.png" alt="sun">
                    <img class="moon" src="/img/moon.png" alt="moon">
                </label>
                <div class="mobile-language-selector">
                    <input type="checkbox" id="mobile-lang-switch" class="language-checkbox" hidden>
                    <label for="mobile-lang-switch" class="language-toggle">
                        <span class="language-option ru ${lang === 'ru' ? 'active' : ''}">RU</span>
                        <span class="language-option en ${lang === 'en' ? 'active' : ''}">EN</span>
                    </label>
                </div>
            </div>
        </div>
    `;

    const currentUser = checkAuth(); 
    console.log(currentUser)
    const mobileAccountLink = document.getElementById('mobile-account-link');
    
    if (mobileAccountLink) {
        mobileAccountLink.replaceWith(mobileAccountLink.cloneNode(true));
        const newMobileAccountLink = document.getElementById('mobile-account-link'); 

        if (!currentUser) {
            newMobileAccountLink.addEventListener('click', (e) => {
                e.preventDefault();
                alert(lang === 'ru' ? 'Пожалуйста, зарегистрируйтесь или войдите, чтобы открыть личный кабинет.' : 'Please register or log in to access your personal account.');
                window.location.href = '/pages/login.html';
            });
        } else {
            newMobileAccountLink.href = '/pages/personalAccount.html'; 
        }
    }
}