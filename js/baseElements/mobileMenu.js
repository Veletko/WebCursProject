import { getCurrentLanguage } from './languageService.js';

export function initMobileMenu(placeholderId = 'mobile-menu-placeholder') {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const isAdmin = user.isAdmin === true;
    const lang = getCurrentLanguage();
    
    placeholder.innerHTML = `
        <div class="mobile-menu" id="mobile-menu">
            <span class="mobile-menu-close">&times;</span>
            <nav class="mobile-nav">
                <a href="/pages/login.html" data-i18n="header.nav.login">Log in</a>
                <a href="/pages/homepage.html" data-i18n="header.nav.home">Home</a>
                <a href="/pages/services.html" data-i18n="header.nav.services">Services</a>
                ${isAdmin ? '<a href="/pages/admin.html" data-i18n="header.nav.admin">Admin</a>' : ''}
                <a href="/pages/personalAccount.html" data-i18n="header.nav.account">Personal Account</a>
            </nav>
            <div class="mobile-menu-footer">
                <button class="visually-impaired-button">
                    <img src="/img/eye.png" alt="eye">
                    <span data-i18n="common.visuallyImpaired">version for the visually impaired</span>
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
}