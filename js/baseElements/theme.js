export function initThemeToggle() {
    const themeCheckboxes = document.querySelectorAll(".theme-toggle input");
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        
        themeCheckboxes.forEach(checkbox => {
            checkbox.checked = (theme === "dark");
        });
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }

    themeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            setTheme(this.checked ? "dark" : "light");
        });
    });

    loadTheme();
}