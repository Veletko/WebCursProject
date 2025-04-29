import { initFiltersModelWindow } from "./filterModelWindow.js";
import { initServices } from "./loadServices.js";

document.addEventListener('DOMContentLoaded', () => {
    initFiltersModelWindow();
    initServices();
});