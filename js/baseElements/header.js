export function initHeader(placeholderId = 'header-placeholder') {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        console.error(`Header placeholder with ID "${placeholderId}" not found.`);
        return;
    }

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    const headerHtml = `
        <div class="header-logo-container">
            <img src="/img/Logo.svg" alt="logo" class="logo logo-light">
            <img src="/img/Logo_black.svg" alt="logo" class="logo logo-dark">
            <div class="header-img-container">
                <img src="/img/phone.png" alt="phone">
                <p>Call Us - (+22) 123 456 7890</p>
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
                version for the visually impaired
            </button>
            <div class="language-selector element">
                <input type="checkbox" id="lang-switch" class="language-checkbox" hidden>
                <label for="lang-switch" class="language-toggle">
                    <span class="language-option ru">RU</span>
                    <span class="language-option en">EN</span>
                </label>
            </div>
            <nav>
                <a href="/pages/login.html">Log in</a>
                <a href="/pages/homepage.html">Home</a>
                <a href="/pages/services.html">Services</a>
                ${isAdmin ? '<a href="/pages/admin.html" id="admin-link">Admin</a>' : ''}
                <a href="/pages/personalAccount.html">Personal Account</a>
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