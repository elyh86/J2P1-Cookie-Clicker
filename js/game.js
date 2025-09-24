/**
 * Cookie Empire - Main Game JavaScript
 * 
 * Dit bestand bevat de basis structuur voor het Cookie Clicker spel.
 * Volgt OOP principes zoals vereist in de leerdoelen.
 * 
 * @author Ayoub & Younes
 * @version 1.0.0
 * @copyright 2024 Cookie Empire
 */

// Wacht tot de DOM geladen is
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍪 Cookie Empire wordt geladen...');
    
    // Basis game initialisatie
    initializeGame();
    
    // Event listeners toevoegen
    setupEventListeners();
    
    // Dark mode initialisatie
    initializeDarkMode();
    
    console.log('✅ Cookie Empire succesvol geladen!');
});

/**
 * Initialiseert het spel met basis waarden
 */
function initializeGame() {
    // Basis game state (later wordt dit een class)
    window.gameState = {
        cookies: 0,
        totalCookies: 0,
        cookiesPerSecond: 0,
        totalClicks: 0,
        cookiesPerClick: 1
    };
    
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
