import { translations } from './translations.js';
import { renderServicesPage,currentPage } from '../services/loadServices.js';
import { renderAdminPage, currentAdminPage } from '../admin/loadServicesForAdmin.js';
let currentLanguage = localStorage.getItem('language') || 'en';

export function setLanguage(lang) {
  if (['en', 'ru'].includes(lang)) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
  }
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function applyTranslations(root = document) {
  updateLanguageSwitchers(root);
  
  root.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const text = getTranslation(key);
    
    if (text !== null) {
      if (key.startsWith('[placeholder]')) {
        const placeholderKey = key.replace('[placeholder]', '');
        const placeholderText = getTranslation(placeholderKey);
        if (placeholderText) element.placeholder = placeholderText;
      } 
      else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = text;
      } else {
        element.textContent = text;
      }
    }
  });
}

export function getTranslation(key) {
  if (!key) return null;
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    result = result?.[k];
    if (!result) return null;
  }
  
  return result?.[currentLanguage] || null;
}

function updateLanguageSwitchers(root) {
  root.querySelectorAll('.language-toggle').forEach(toggle => {
    const ruOption = toggle.querySelector('.ru');
    const enOption = toggle.querySelector('.en');
    
    if (ruOption) ruOption.classList.toggle('active', currentLanguage === 'ru');
    if (enOption) enOption.classList.toggle('active', currentLanguage === 'en');
  });
}

export function initLanguageSwitchers(root = document) {
  root.addEventListener('click', (e) => {
    if (e.target.closest('.language-toggle')) {
      const newLang = currentLanguage === 'en' ? 'ru' : 'en';
      setLanguage(newLang);
      
      const path = window.location.pathname;
      
      if (path.includes('/admin') && typeof renderAdminPage === 'function') {
        renderAdminPage(currentAdminPage);
      } 
      else if (path.includes('/services') && typeof renderServicesPage === 'function') {
        renderServicesPage(currentPage);
      }
      else if (path.includes('/cart')) {
        window.location.reload();
      }
    }
  });
}