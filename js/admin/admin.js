import { initAdminSearch } from "./adminSearch.js";
import { initAdminServices } from "./loadServicesForAdmin.js";


document.addEventListener('DOMContentLoaded', () => {
    initAdminServices();
    initAdminSearch();
});