class ThemeManager {
    constructor() {
        this.isDarkTheme = true;
        const themeBtn = document.getElementById('darkModeBtn');
        if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());
    }
    
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.classList.toggle('light-mode');
        
        const icon = document.getElementById('darkModeIcon');
        if (icon) icon.className = this.isDarkTheme ? 'fas fa-moon' : 'fas fa-sun';
    }
}
