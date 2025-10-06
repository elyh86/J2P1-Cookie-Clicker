// CookieGame Class - Main game logic
// Made by Ayoub & Younes 2025

class CookieGame {
    // Class Properties (Blueprint)
    constructor() {
        // Game Stats
        this.cookies = 0;
        this.totalCookies = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        
        // Game Elements
        this.cookieCountElement = null;
        this.totalCookiesElement = null;
        this.totalClicksElement = null;
        this.perClickElement = null;
        this.clickEffectElement = null;
        this.cookieButton = null;
        
        // Initialize the game
        this.initializeElements();
        this.setupEventListeners();
    }
    
    // Initialize DOM Elements
    initializeElements() {
        this.cookieCountElement = document.getElementById('cookieCount');
        this.totalCookiesElement = document.getElementById('totalCookies');
        this.totalClicksElement = document.getElementById('totalClicks');
        this.perClickElement = document.getElementById('perClickValue');
        this.clickEffectElement = document.getElementById('clickEffect');
        this.cookieButton = document.getElementById('mainCookie');
    }
    
    // Setup Event Listeners
    setupEventListeners() {
        if (this.cookieButton) {
            this.cookieButton.addEventListener('click', () => this.clickCookie());
        }
    }
    
    // Main Game Methods
    clickCookie() {
        this.cookies += this.cookiesPerClick;
        this.totalCookies += this.cookiesPerClick;
        this.totalClicks += 1;
        
        this.updateDisplay();
        this.showClickEffect();
    }
    
    updateDisplay() {
        if (this.cookieCountElement) {
            this.cookieCountElement.textContent = this.formatNumber(this.cookies);
        }
        
        if (this.totalCookiesElement) {
            this.totalCookiesElement.textContent = this.formatNumber(this.totalCookies);
        }
        
        if (this.totalClicksElement) {
            this.totalClicksElement.textContent = this.formatNumber(this.totalClicks);
        }
        
        if (this.perClickElement) {
            this.perClickElement.textContent = this.formatNumber(this.cookiesPerClick);
        }
    }
    
    showClickEffect() {
        if (this.clickEffectElement) {
            this.clickEffectElement.textContent = '+' + this.cookiesPerClick;
            this.clickEffectElement.classList.remove('animate');
            
            setTimeout(() => {
                this.clickEffectElement.classList.add('animate');
            }, 10);
        }
    }
    
    formatNumber(number) {
        if (number < 1000) {
            return number.toString();
        }
        if (number < 1000000) {
            return Math.floor(number / 1000) + 'K';
        }
        if (number < 1000000000) {
            return Math.floor(number / 1000000) + 'M';
        }
        return Math.floor(number / 1000000000) + 'B';
    }
    
    // Game State Methods
    getGameData() {
        return {
            cookies: this.cookies,
            totalCookies: this.totalCookies,
            totalClicks: this.totalClicks,
            cookiesPerClick: this.cookiesPerClick
        };
    }
    
    loadGameData(data) {
        this.cookies = data.cookies || 0;
        this.totalCookies = data.totalCookies || 0;
        this.totalClicks = data.totalClicks || 0;
        this.cookiesPerClick = data.cookiesPerClick || 1;
        this.updateDisplay();
    }
    
    resetGame() {
        this.cookies = 0;
        this.totalCookies = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        this.updateDisplay();
    }
}
