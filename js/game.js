/**
 * Cookie Empire - Main Game JavaScript (OOP Version)
 * 
 * Dit bestand bevat de OOP structuur voor het Cookie Clicker spel.
 * Volgt OOP principes zoals vereist in de leerdoelen.
 * 
 * @author Ayoub & Younes
 * @version 2.0.0
 * @copyright 2024 Cookie Empire
 */

/**
 * Main Game Class - Beheert het hele spel
 */
class Game {
    constructor() {
        this.cookies = 0;
        this.totalCookies = 0;
        this.cookiesPerSecond = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        this.isRunning = false;
        
        // Initialiseer andere classes
        this.ui = new UI(this);
        this.cookieManager = new CookieManager(this);
        this.shop = new Shop(this);
        this.themeManager = new ThemeManager();
        
        console.log('🍪 Cookie Empire Game Class geïnitialiseerd');
    }
    
    /**
     * Start het spel
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.setupEventListeners();
        this.ui.updateAll();
        this.themeManager.initialize();
        
        console.log('✅ Cookie Empire gestart!');
    }
    
    /**
     * Zet alle event listeners op
     */
    setupEventListeners() {
        // Cookie klik event
        const mainCookie = document.getElementById('mainCookie');
        if (mainCookie) {
            mainCookie.addEventListener('click', (event) => {
                this.cookieManager.handleClick(event);
            });
        }
        
        // Settings button
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                console.log('Settings geklikt - nog niet geïmplementeerd');
            });
        }
        
        // Dark mode button
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                this.themeManager.toggle();
            });
        }
    }
    
    /**
     * Voegt cookies toe aan het totaal
     * @param {number} amount - Aantal cookies om toe te voegen
     */
    addCookies(amount) {
        this.cookies += amount;
        this.totalCookies += amount;
        this.ui.updateCookieCount();
        this.ui.updateStats();
    }
    
    /**
     * Controleert of speler genoeg cookies heeft
     * @param {number} amount - Vereiste aantal cookies
     * @returns {boolean}
     */
    canAfford(amount) {
        return this.cookies >= amount;
    }
    
    /**
     * Trekt cookies af (voor aankopen)
     * @param {number} amount - Aantal cookies om af te trekken
     * @returns {boolean} - Of de transactie succesvol was
     */
    spendCookies(amount) {
        if (this.canAfford(amount)) {
            this.cookies -= amount;
            this.ui.updateCookieCount();
            return true;
        }
        return false;
    }
}

// Wacht tot de DOM geladen is
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍪 Cookie Empire wordt geladen...');
    
    // Maak nieuwe game instantie en start
    window.game = new Game();
    window.game.start();
});

/**
 * CookieManager Class - Beheert cookie clicks en effecten
 */
class CookieManager {
    constructor(game) {
        this.game = game;
    }
    
    /**
     * Handelt cookie klik af
     * @param {Event} event - Het klik event
     */
    handleClick(event) {
        // Update game state
        this.game.addCookies(this.game.cookiesPerClick);
        this.game.totalClicks++;
        
        // Visueel effect
        this.showClickEffect(event);
        
        // Update UI
        this.game.ui.updateStats();
        
        // Log voor debugging
        console.log(`🍪 Cookie geklikt! Totaal: ${this.game.cookies}`);
    }
    
    /**
     * Toont visueel effect bij cookie klik
     * @param {Event} event - Het klik event
     */
    showClickEffect(event) {
        const clickEffect = document.getElementById('clickEffect');
        if (!clickEffect) return;
        
        // Toon de waarde die verdiend is
        clickEffect.textContent = `+${this.game.cookiesPerClick}`;
        clickEffect.classList.remove('animate');
        
        // Force reflow en start animatie
        void clickEffect.offsetWidth;
        clickEffect.classList.add('animate');
    }
}

/**
 * UI Class - Beheert alle user interface updates
 */
class UI {
    constructor(game) {
        this.game = game;
    }
    
    /**
     * Update alle UI elementen
     */
    updateAll() {
        this.updateCookieCount();
        this.updateStats();
        this.updatePerClickValue();
        this.updatePurchasedItems();
    }
    
    /**
     * Update cookie count display
     */
    updateCookieCount() {
        const cookieCount = document.getElementById('cookieCount');
        if (cookieCount) {
            cookieCount.textContent = this.formatNumber(this.game.cookies);
        }
    }
    
    /**
     * Update statistieken panel
     */
    updateStats() {
        const totalCookies = document.getElementById('totalCookies');
        const cookiesPerSecond = document.getElementById('cookiesPerSecond');
        const totalClicks = document.getElementById('totalClicks');
        
        if (totalCookies) {
            totalCookies.textContent = this.formatNumber(this.game.totalCookies);
        }
        
        if (cookiesPerSecond) {
            cookiesPerSecond.textContent = this.formatNumber(this.game.cookiesPerSecond);
        }
        
        if (totalClicks) {
            totalClicks.textContent = this.formatNumber(this.game.totalClicks);
        }
    }
    
    /**
     * Update per click waarde
     */
    updatePerClickValue() {
        const perClickValue = document.getElementById('perClickValue');
        if (perClickValue) {
            perClickValue.textContent = this.formatNumber(this.game.cookiesPerClick);
        }
    }
    
    /**
     * Update gekochte items display
     */
    updatePurchasedItems() {
        const purchasedItemsList = document.getElementById('purchasedItemsList');
        if (!purchasedItemsList) return;
        
        if (!this.game.shop || this.game.shop.purchasedItems.length === 0) {
            purchasedItemsList.innerHTML = '<p class="text-muted">Nog geen items gekocht...</p>';
            return;
        }
        
        let html = '';
        this.game.shop.purchasedItems.forEach(item => {
            html += `
                <div class="purchased-item">
                    <div class="purchased-item-info">
                        <div class="purchased-item-name">${item.name}</div>
                        <div class="purchased-item-description">${item.description}</div>
                        <div class="purchased-item-production">${item.production}</div>
                    </div>
                    <div class="purchased-item-count">${item.count}</div>
                </div>
            `;
        });
        
        purchasedItemsList.innerHTML = html;
    }
    
    /**
     * Formatteert getallen voor weergave
     * @param {number} num - Het getal om te formatteren
     * @returns {string} Geformatteerd getal
     */
    formatNumber(num) {
        if (num < 1000) {
            return num.toString();
        } else if (num < 1000000) {
            return (num / 1000).toFixed(1) + 'K';
        } else if (num < 1000000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else {
            return (num / 1000000000).toFixed(1) + 'B';
        }
    }
}

/**
 * Shop Class - Beheert alle shop functionaliteit
 */
class Shop {
    constructor(game) {
        this.game = game;
        this.purchasedItems = [];
    }
    
    /**
     * Voegt een gekocht item toe aan de lijst
     * @param {Object} item - Het gekochte item
     */
    addPurchasedItem(item) {
        const existingItem = this.purchasedItems.find(i => i.name === item.name);
        
        if (existingItem) {
            existingItem.count += 1;
        } else {
            this.purchasedItems.push({
                ...item,
                count: 1
            });
        }
        
        this.game.ui.updatePurchasedItems();
    }
    
    /**
     * Koopt een item als de speler het kan betalen
     * @param {Object} item - Het item om te kopen
     * @param {number} price - De prijs van het item
     * @returns {boolean} - Of de aankoop succesvol was
     */
    buyItem(item, price) {
        if (this.game.spendCookies(price)) {
            this.addPurchasedItem(item);
            console.log(`✅ ${item.name} gekocht voor ${price} cookies!`);
            return true;
        } else {
            console.log(`❌ Niet genoeg cookies voor ${item.name} (${price} nodig)`);
            return false;
        }
    }
}

/**
 * ThemeManager Class - Beheert dark/light mode
 */
class ThemeManager {
    constructor() {
        this.isDarkMode = true; // Default dark mode
    }
    
    /**
     * Initialiseert thema op basis van opgeslagen voorkeur
     */
    initialize() {
        // Check localStorage voor opgeslagen thema voorkeur
        const savedTheme = localStorage.getItem('cookieEmpireTheme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Bepaal initieel thema
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
        
        // Luister naar systeem thema wijzigingen
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('cookieEmpireTheme')) {
                if (e.matches) {
                    this.setDarkMode();
                } else {
                    this.setLightMode();
                }
            }
        });
    }
    
    /**
     * Schakelt tussen dark en light mode
     */
    toggle() {
        const darkModeBtn = document.getElementById('darkModeBtn');
        
        // Voeg animatie toe aan button
        if (darkModeBtn) {
            darkModeBtn.classList.add('theme-switching');
        }
        
        // Schakel thema
        if (this.isDarkMode) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
        
        // Verwijder animatie na voltooiing
        setTimeout(() => {
            if (darkModeBtn) {
                darkModeBtn.classList.remove('theme-switching');
            }
        }, 500);
    }
    
    /**
     * Zet dark mode aan
     */
    setDarkMode() {
        document.body.classList.remove('light-mode');
        localStorage.setItem('cookieEmpireTheme', 'dark');
        this.isDarkMode = true;
        this.updateIcon();
        console.log('🌙 Dark mode geactiveerd');
    }
    
    /**
     * Zet light mode aan
     */
    setLightMode() {
        document.body.classList.add('light-mode');
        localStorage.setItem('cookieEmpireTheme', 'light');
        this.isDarkMode = false;
        this.updateIcon();
        console.log('🌞 Light mode geactiveerd');
    }
    
    /**
     * Update het dark mode icoon
     */
    updateIcon() {
        const darkModeIcon = document.getElementById('darkModeIcon');
        if (darkModeIcon) {
            if (this.isDarkMode) {
                darkModeIcon.className = 'fas fa-moon';
                darkModeIcon.parentElement.setAttribute('aria-label', 'Schakel naar light mode');
            } else {
                darkModeIcon.className = 'fas fa-sun';
                darkModeIcon.parentElement.setAttribute('aria-label', 'Schakel naar dark mode');
            }
        }
    }
}

/**
 * Oude functies - worden vervangen door OOP classes
 */
function initializeGame() {
    // Basis game state (later wordt dit een class)
    window.gameState = {
        cookies: 0,
        totalCookies: 0,
        cookiesPerSecond: 0,
        totalClicks: 0,
        cookiesPerClick: 1,
        purchasedItems: []
    };
    
    // Gekochte items lijst begint leeg
    
    // Update de UI met initiële waarden
    updateUI();
}

/**
 * Zet alle event listeners op
 */
function setupEventListeners() {
    // Cookie klik event
    const mainCookie = document.getElementById('mainCookie');
    if (mainCookie) {
        mainCookie.addEventListener('click', handleCookieClick);
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            console.log('Settings geklikt - nog niet geïmplementeerd');
        });
    }
    
    // Dark mode button
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
}

/**
 * Initialiseert dark mode op basis van opgeslagen voorkeur
 */
function initializeDarkMode() {
    // Check localStorage voor opgeslagen thema voorkeur
    const savedTheme = localStorage.getItem('cookieEmpireTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Bepaal initieel thema
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.add('light-mode');
        updateDarkModeIcon(false);
    } else {
        updateDarkModeIcon(true);
    }
    
    // Luister naar systeem thema wijzigingen
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('cookieEmpireTheme')) {
            if (e.matches) {
                document.body.classList.remove('light-mode');
                updateDarkModeIcon(true);
            } else {
                document.body.classList.add('light-mode');
                updateDarkModeIcon(false);
            }
        }
    });
}

/**
 * Schakelt tussen dark en light mode
 */
function toggleDarkMode() {
    const body = document.body;
    const darkModeBtn = document.getElementById('darkModeBtn');
    const isDarkMode = !body.classList.contains('light-mode');
    
    // Voeg animatie toe aan button
    darkModeBtn.classList.add('theme-switching');
    
    // Schakel thema
    if (isDarkMode) {
        body.classList.add('light-mode');
        localStorage.setItem('cookieEmpireTheme', 'light');
        updateDarkModeIcon(false);
        console.log('🌞 Light mode geactiveerd');
    } else {
        body.classList.remove('light-mode');
        localStorage.setItem('cookieEmpireTheme', 'dark');
        updateDarkModeIcon(true);
        console.log('🌙 Dark mode geactiveerd');
    }
    
    // Verwijder animatie na voltooiing
    setTimeout(() => {
        darkModeBtn.classList.remove('theme-switching');
    }, 500);
}

/**
 * Update het dark mode icoon
 * @param {boolean} isDarkMode - Of dark mode actief is
 */
function updateDarkModeIcon(isDarkMode) {
    const darkModeIcon = document.getElementById('darkModeIcon');
    if (darkModeIcon) {
        if (isDarkMode) {
            darkModeIcon.className = 'fas fa-moon';
            darkModeIcon.parentElement.setAttribute('aria-label', 'Schakel naar light mode');
        } else {
            darkModeIcon.className = 'fas fa-sun';
            darkModeIcon.parentElement.setAttribute('aria-label', 'Schakel naar dark mode');
        }
    }
}

/**
 * Handelt cookie klik af
 * @param {Event} event - Het klik event
 */
function handleCookieClick(event) {
    // Update game state
    window.gameState.cookies += window.gameState.cookiesPerClick;
    window.gameState.totalCookies += window.gameState.cookiesPerClick;
    window.gameState.totalClicks++;
    
    // Visueel effect
    showClickEffect(event);
    
    // Update UI
    updateUI();
    
    // Log voor debugging
    console.log(`🍪 Cookie geklikt! Totaal: ${window.gameState.cookies}`);
}

/**
 * Toont visueel effect bij cookie klik
 * @param {Event} event - Het klik event
 */
function showClickEffect(event) {
    const clickEffect = document.getElementById('clickEffect');
    if (!clickEffect) return;
    
    // Toon de waarde die verdiend is
    clickEffect.textContent = `+${window.gameState.cookiesPerClick}`;
    clickEffect.classList.remove('animate');
    
    // Force reflow en start animatie
    void clickEffect.offsetWidth;
    clickEffect.classList.add('animate');
}

/**
 * Update alle UI elementen
 */
function updateUI() {
    // Update cookie count
    const cookieCount = document.getElementById('cookieCount');
    if (cookieCount) {
        cookieCount.textContent = formatNumber(window.gameState.cookies);
    }
    
    // Update statistieken
    updateStats();
    
    // Update per click waarde
    const perClickValue = document.getElementById('perClickValue');
    if (perClickValue) {
        perClickValue.textContent = formatNumber(window.gameState.cookiesPerClick);
    }
    
    // Update gekochte items
    updatePurchasedItemsDisplay();
}

/**
 * Update statistieken panel
 */
function updateStats() {
    const totalCookies = document.getElementById('totalCookies');
    const cookiesPerSecond = document.getElementById('cookiesPerSecond');
    const totalClicks = document.getElementById('totalClicks');
    
    if (totalCookies) {
        totalCookies.textContent = formatNumber(window.gameState.totalCookies);
    }
    
    if (cookiesPerSecond) {
        cookiesPerSecond.textContent = formatNumber(window.gameState.cookiesPerSecond);
    }
    
    if (totalClicks) {
        totalClicks.textContent = formatNumber(window.gameState.totalClicks);
    }
}

/**
 * Formatteert getallen voor weergave
 * @param {number} num - Het getal om te formatteren
 * @returns {string} Geformatteerd getal
 */
function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num < 1000000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else {
        return (num / 1000000000).toFixed(1) + 'B';
    }
}

/**
 * Placeholder functies voor toekomstige features
 */

function saveGame() {
    console.log('💾 Spel opslaan...');
}

function loadGame() {
    console.log('📂 Spel laden...');
}

function initializeShop() {
    console.log('🏪 Shop initialiseren...');
}

function updateAutoClickers() {
    console.log('🤖 Auto-clickers updaten...');
}

function checkAchievements() {
    console.log('🏆 Achievements checken...');
}

function triggerSpecialEvent() {
    console.log('✨ Special event triggeren...');
}


/**
 * Voegt een gekocht item toe aan de lijst
 * @param {Object} item - Het gekochte item
 */
function addPurchasedItem(item) {
    const existingItem = window.gameState.purchasedItems.find(i => i.name === item.name);
    
    if (existingItem) {
        existingItem.count += 1;
    } else {
        window.gameState.purchasedItems.push({
            ...item,
            count: 1
        });
    }
    
    updatePurchasedItemsDisplay();
}

/**
 * Update de weergave van gekochte items
 */
function updatePurchasedItemsDisplay() {
    const purchasedItemsList = document.getElementById('purchasedItemsList');
    if (!purchasedItemsList) return;
    
    if (window.gameState.purchasedItems.length === 0) {
        purchasedItemsList.innerHTML = '<p class="text-muted">Nog geen items gekocht...</p>';
        return;
    }
    
    let html = '';
    window.gameState.purchasedItems.forEach(item => {
        html += `
            <div class="purchased-item">
                <div class="purchased-item-info">
                    <div class="purchased-item-name">${item.name}</div>
                    <div class="purchased-item-description">${item.description}</div>
                    <div class="purchased-item-production">${item.production}</div>
                </div>
                <div class="purchased-item-count">${item.count}</div>
            </div>
        `;
    });
    
    purchasedItemsList.innerHTML = html;
}

// ✅ Alle functionaliteit is nu omgezet naar OOP classes!
// Game, CookieManager, UI, Shop, en ThemeManager classes bevatten alle logica.
