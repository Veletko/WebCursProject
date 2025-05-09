export function initThemeToggle() {
    const themeCheckbox = document.querySelector(".theme-toggle input");
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem("theme");
        setTheme(savedTheme);
        if (themeCheckbox) {
            themeCheckbox.checked = (savedTheme === "dark");
        }
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener("change", function() {
            setTheme(this.checked ? "dark" : "light");
        });
    }

    loadTheme();
}