import { getCurrentLanguage } from './languageService.js';

export function initFooter(placeholderId = 'footer-placeholder') {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        console.error(`Footer placeholder with ID "${placeholderId}" not found.`);
        return;
    }

    const footerHtml = `
        <div class="footer-top-container">
            <div class="footer-top-logo-container">
                <img class="footer-logo-img" src="/img/Logo_black.svg" alt="logo">
                <div class="footer-img-container">
                    <div class="footer-img">
                        <img src="/img/facebook_white.png" alt="facebook">
                    </div>
                    <div class="footer-img">
                        <img src="/img/X_white.png" alt="X">
                    </div>
                    <div class="footer-img">
                        <img src="/img/in_white.png" alt="in">
                    </div>
                    <div class="footer-img">
                        <img src="/img/instagram_white.png" alt="instagram">
                    </div>
                </div>
            </div>
            <hr class="footer-line">
            <div class="footer-links">
                <div class="footer-column">
                    <h4 data-i18n="footer.explore.title">Explore</h4>
                    <ul>
                        <li><a href="/pages/homepage.html" data-i18n="footer.explore.links.home">Home</a></li>
                        <li><a href="/pages/services.html" data-i18n="footer.explore.links.services">Services</a></li>
                        <li><a href="/pages/personalAccount.html" data-i18n="footer.explore.links.blog">Personal account</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 data-i18n="footer.contact.title">Keep in Touch</h4>
                    <ul>
                        <li>
                            <div class="footer-column-text">
                                <span data-i18n="footer.contact.address">Address:</span>
                                <span data-i18n="footer.contact.addressText">24A Kingston St, Los Vegas NC 28202, USA.</span>
                            </div>
                        </li>
                        <li>
                            <div class="footer-column-text">
                                <span data-i18n="footer.contact.mail">Mail:</span>
                                <span data-i18n="footer.contact.mailText">support@doctors.com</span>
                            </div>
                        </li>
                        <li>
                            <div class="footer-column-text">
                                <span data-i18n="footer.contact.phone">Phone:</span>
                                <span data-i18n="footer.contact.phoneText">(+22) 123 - 4567 - 900</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 data-i18n="footer.hours.title">Working Hours</h4>
                    <ul>
                        <li><span data-i18n="footer.hours.weekdays">Mon to Fri: 7am - 6pm</span></li>
                        <li><span data-i18n="footer.hours.saturday">Sat: 9am - 7pm</span></li>
                        <li><span data-i18n="footer.hours.sunday">Sun: 9am - 6pm</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-button-container">
            <p data-i18n="footer.copyright">Copyright 2021. Drafted by Victor Themes.</p>
        </div>
    `;

    placeholder.innerHTML = footerHtml;
}