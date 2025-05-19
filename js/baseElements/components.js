import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initMobileMenu } from './mobileMenu.js';

export function loadComponents() {
    try {
        initHeader('header-placeholder');
        initMobileMenu('mobile-menu-placeholder');
        initFooter('footer-placeholder');
    } catch (error) {
        console.error('Error loading components:', error);
        document.getElementById('header-placeholder').innerHTML = '<header>Error loading header</header>';
        document.getElementById('mobile-menu-placeholder').innerHTML = '<div>Error loading mobile menu</div>';
        document.getElementById('footer-placeholder').innerHTML = '<footer>Error loading footer</footer>';
    }
}