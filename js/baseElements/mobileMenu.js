export function initMobileMenu(placeholderId = 'mobile-menu-placeholder') {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        console.error(`Mobile menu placeholder with ID "${placeholderId}" not found.`);
        return;
    }

    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const isAdmin = user.isAdmin === true;
    
    placeholder.innerHTML = `
        <div class="mobile-menu" id="mobile-menu">
            <span class="mobile-menu-close">&times;</span>
            <nav class="mobile-nav">
                <a href="/pages/login.html">Log in</a>
                <a href="/pages/homepage.html">Home</a>
                <a href="/pages/services.html">Services</a>
                ${isAdmin ? '<a href="/pages/admin.html">Admin</a>' : ''}
                <a href="/pages/personalAccount.html">Personal Account</a>
            </nav>
            <div class="mobile-menu-footer">
                <button class="visually-impaired-button">
                    <img src="/img/eye.png" alt="eye">
                    version for the visually impaired
                </button>
                <label class="theme-toggle">
                    <input type="checkbox" hidden>  
                    <img class="sun" src="/img/sun.png" alt="sun">
                    <img class="moon" src="/img/moon.png" alt="moon">
                </label>
                <div class="mobile-language-selector">
                    <input type="checkbox" id="mobile-lang-switch" class="language-checkbox" hidden>
                    <label for="mobile-lang-switch" class="language-toggle">
                      <span class="language-option ru">RU</span>
                      <span class="language-option en">EN</span>
                    </label>
                </div>
            </div>
        </div>
    `;
}