// ThemeManager Module - Handles dark/light theme switching
// Made by Ayoub & Younes 2025

class ThemeManager {
    // Class Properties
    constructor() {
        this.isDarkTheme = true;
        this.themeButton = null;
        this.themeIcon = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }
    
    // Initialize DOM Elements
    initializeElements() {
        this.themeButton = document.getElementById('darkModeBtn');
        this.themeIcon = document.getElementById('darkModeIcon');
    }

    setupEventListeners() {
        if (this.themeButton) {
            this.themeButton.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        if (this.isDarkTheme) {
            this.switchToLightMode();
        } else {
            this.switchToDarkMode();
        }
        this.updateThemeIcon();
    }
    
    switchToLightMode() {
        document.body.classList.add('light-mode');
        this.isDarkTheme = false;
    }
    
    switchToDarkMode() {
        document.body.classList.remove('light-mode');
        this.isDarkTheme = true;
    }
    
    updateThemeIcon() {
        if (this.themeIcon) {
            if (this.isDarkTheme) {
                this.themeIcon.className = 'fas fa-moon';
            } else {
                this.themeIcon.className = 'fas fa-sun';
            }
        }
    }
    
    // Get current theme state
    getCurrentTheme() {
        return this.isDarkTheme ? 'dark' : 'light';
    }
}
