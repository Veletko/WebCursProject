import { initFiltersModelWindow } from "./filterModelWindow.js";
import { initServices } from "./loadServices.js";
import { initSearch } from "./search.js";

document.addEventListener('DOMContentLoaded', () => {
    initFiltersModelWindow();
    initServices();
    initSearch();
});