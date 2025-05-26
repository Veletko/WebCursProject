import { getCurrentLanguage } from './languageService.js';

export function initHeader(placeholderId = 'header-placeholder') {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const isAdmin = user.isAdmin === true;
    const lang = getCurrentLanguage();
    
    const headerHtml = `
        <div class="header-logo-container">
            <img src="/img/Logo.svg" alt="logo" class="logo logo-light">
            <img src="/img/Logo_black.svg" alt="logo" class="logo logo-dark">
            <div class="header-img-container">
                <img src="/img/phone.png" alt="phone">
                <p data-i18n="common.phoneText">Call Us - (+22) 123 456 7890</p>
            </div>
        </div>
        <div class="header-auth-buttons">
            <label class="theme-toggle element">
                <input type="checkbox" hidden>  
                <img class="sun" src="/img/sun.png" alt="sun">
                <img class="moon" src="/img/moon.png" alt="moon">
            </label>
            <button class="visually-impaired-button element">
                <img src="/img/eye.png" alt="eye">
                <span data-i18n="common.visuallyImpaired"></span>
            </button>
            <div class="language-selector element">
                <input type="checkbox" id="lang-switch" class="language-checkbox" hidden>
                <label for="lang-switch" class="language-toggle">
                    <span class="language-option ru ${lang === 'ru' ? 'active' : ''}">RU</span>
                    <span class="language-option en ${lang === 'en' ? 'active' : ''}">EN</span>
                </label>
            </div>
            <nav>
                <a href="/pages/login.html" data-i18n="header.nav.login">Log in</a>
                <a href="/pages/homepage.html" data-i18n="header.nav.home">Home</a>
                <a href="/pages/services.html" data-i18n="header.nav.services">Services</a>
                ${isAdmin ? '<a href="/pages/admin.html" id="admin-link" data-i18n="header.nav.admin">Admin</a>' : ''}
                <a href="/pages/personalAccount.html" data-i18n="header.nav.account">Personal Account</a>
            </nav>
            <button class="burger-menu">
                <span></span>
            </button>
            <a href="./cart.html" id="basket-link">
                <img class="basket" src="/img/basket.png" alt="basket">
            </a>
        </div>
    `;

    placeholder.innerHTML = headerHtml;
}