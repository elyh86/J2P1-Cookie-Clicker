// ============================================
// GAME CLASSES
// ============================================

/**
 * Autoclicker class - Beheert een type autoclicker die automatisch cookies produceert
 * @class
 */
class Autoclicker {
    /**
     * @param {string} name - Naam van de autoclicker
     * @param {number} baseCost - Startprijs
     * @param {number} baseProduction - Cookies per seconde per autoclicker
     * @param {number} costMultiplier - Prijs stijging per aankoop (default 1.15)
     */
    constructor(name, baseCost, baseProduction, costMultiplier = 1.15) {
        this.name = name;
        this.baseCost = baseCost;
        this.baseProduction = baseProduction;
        this.costMultiplier = costMultiplier;
        this.count = 0;
        this.currentCost = baseCost;
    }

    purchase() {
        this.count++;
        const cost = this.currentCost;
        this.currentCost = Math.floor(this.currentCost * this.costMultiplier); // Prijs stijgt na elke aankoop
        return cost;
    }

    getProduction(multiplier = 1) {
        return this.count * this.baseProduction * multiplier;
    }

    reset() {
        this.count = 0;
        this.currentCost = this.baseCost;
    }
}

/**
 * Upgrade class - Beheert een upgrade die productie vermenigvuldigt
 * @class
 */
class Upgrade {
    /**
     * @param {string} name - Naam van de upgrade
     * @param {string} description - Beschrijving van het effect
     * @param {number} cost - Prijs van de upgrade
     * @param {number} multiplier - Productie multiplier (bijv. 2 = 2x sneller)
     */
    constructor(name, description, cost, multiplier) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.multiplier = multiplier;
        this.owned = false;
    }

    purchase() {
        this.owned = true;
        return this.cost;
    }

    getMultiplier() {
        return this.owned ? this.multiplier : 1;
    }

    reset() {
        this.owned = false;
    }
}

/**
 * Achievement class - Beheert een prestatie die unlocked kan worden
 * @class
 */
class Achievement {
    /**
     * @param {string} name - Naam van de achievement
     * @param {string} description - Beschrijving van de requirement
     * @param {Function} requirement - Functie die true returned als achievement behaald is
     * @param {string|null} theme - Optioneel: theme dat unlocked wordt
     */
    constructor(name, description, requirement, theme = null) {
        this.name = name;
        this.description = description;
        this.requirement = requirement;
        this.theme = theme;
        this.unlocked = false;
    }

    check() {
        if (!this.unlocked && this.requirement()) {
            this.unlocked = true;
            return true; // Achievement net behaald
        }
        return false; // Al behaald of nog niet voldaan aan requirement
    }

    reset() {
        this.unlocked = false;
    }
}

// ============================================
// MAIN GAME
// ============================================

/**
 * CookieGame class - Main game controller die alle game logica beheert
 * @class
 */
class CookieGame {
    /**
     * Initialiseert het Cookie Clicker spel
     * @constructor
     */
    constructor() {
        // Game state
        this.cookies = 0;
        this.totalCookies = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        this.cookiesPerSecond = 0;
        
        // Initialize game data
        this.initializeAutoclickers();
        this.initializeUpgrades();
        this.initializeAchievements();
        this.initializeElements();
        this.setupEventListeners();
        
        // Start game
        this.renderSimpleStore();
        this.renderUpgrades();
        this.startAutoGeneration();
    }
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    initializeAutoclickers() {
        this.autoclickers = {
            cursor: new Autoclicker("Cursor", 15, 0.1, 1.15),
            granny: new Autoclicker("Oma", 100, 1, 1.15),
            farm: new Autoclicker("Boerderij", 1100, 8, 1.15),
            mine: new Autoclicker("Mijn", 12000, 47, 1.15),
            factory: new Autoclicker("Fabriek", 130000, 260, 1.15),
            bank: new Autoclicker("Bank", 1400000, 1400, 1.15),
            temple: new Autoclicker("Tempel", 20000000, 7800, 1.15),
            wizard: new Autoclicker("Tovenaar", 330000000, 44000, 1.15),
            spaceship: new Autoclicker("Ruimteschip", 5100000000, 260000, 1.15),
            portal: new Autoclicker("Tijdportaal", 75000000000, 1600000, 1.15)
        };
    }

    initializeUpgrades() {
        this.upgrades = {
            reinforcedCursor: new Upgrade("Versterkte Cursor", "Cursors zijn 2x effectiever", 100, 2),
            grannyHelper: new Upgrade("Oma's Helper", "Oma's maken 2x meer cookies", 1000, 2),
            megaFarm: new Upgrade("Mega Boerderij", "Boerderijen zijn 2x productiever", 11000, 2),
            deepMining: new Upgrade("Diepe Mijnbouw", "Mijnen delven 2x sneller", 120000, 2),
            automation: new Upgrade("Automatisering", "Alle productie 2x sneller", 500000, 2),
            quantumChip: new Upgrade("Quantum Chip", "Alle gebouwen 3x effectiever", 5000000, 3),
            timeMachine: new Upgrade("Tijdmachine", "Productie 5x sneller", 50000000, 5),
            cosmicPower: new Upgrade("Kosmische Kracht", "Alles 10x krachtiger", 500000000, 10)
        };
    }

    initializeAchievements() {
        this.achievements = {
            firstClick: new Achievement("Eerste Klik", "Klik je eerste cookie", () => this.totalClicks >= 1),
            clickMaster: new Achievement("Klik Meester", "Klik 100 keer", () => this.totalClicks >= 100, "blue"),
            cookieCollector: new Achievement("Cookie Verzamelaar", "Verzamel 1000 cookies", () => this.totalCookies >= 1000),
            millionaire: new Achievement("Miljonair", "Verzamel 1 miljoen cookies", () => this.totalCookies >= 1000000, "gold"),
            firstAutoclicker: new Achievement("Eerste Helper", "Koop je eerste autoclicker", () => Object.values(this.autoclickers).some(a => a.count > 0)),
            upgradeUnlocked: new Achievement("Verbeterd", "Koop je eerste upgrade", () => Object.values(this.upgrades).some(u => u.owned), "purple"),
            productionKing: new Achievement("Productie Koning", "Bereik 100 cookies/sec", () => this.cookiesPerSecond >= 100, "green")
        };
        this.unlockedThemes = ['dark', 'light'];
    }

    initializeElements() {
        this.cookieCountElement = document.getElementById('cookieCount');
        this.totalCookiesElement = document.getElementById('totalCookies');
        this.totalClicksElement = document.getElementById('totalClicks');
        this.perClickElement = document.getElementById('perClickValue');
        this.clickEffectElement = document.getElementById('clickEffect');
        this.cookieButton = document.getElementById('mainCookie');
        this.cookiesPerSecondElement = document.getElementById('cookiesPerSecond');
        this.autoclickersListElement = document.getElementById('autoclickersList');
        this.upgradesListElement = document.getElementById('upgradesList');
        this.purchasedItemsElement = document.getElementById('purchasedItemsList');
    }
    
    setupEventListeners() {
        if (this.cookieButton) {
            this.cookieButton.addEventListener('click', () => this.clickCookie());
        }
    }
    
    // ============================================
    // CORE GAME LOGIC
    // ============================================
    
    clickCookie() {
        // Voeg cookies toe bij klik
        this.cookies += this.cookiesPerClick;
        this.totalCookies += this.cookiesPerClick;
        this.totalClicks++;
        this.updateDisplay();
        this.showClickEffect();
    }
    
    // ============================================
    // DISPLAY & UI
    // ============================================
    
    updateDisplay() {
        if (this.cookieCountElement) this.cookieCountElement.textContent = Math.floor(this.cookies).toLocaleString();
        if (this.totalCookiesElement) this.totalCookiesElement.textContent = this.formatNumber(this.totalCookies);
        if (this.totalClicksElement) this.totalClicksElement.textContent = this.formatNumber(this.totalClicks);
        if (this.perClickElement) this.perClickElement.textContent = this.formatNumber(this.cookiesPerClick);
        if (this.cookiesPerSecondElement) this.cookiesPerSecondElement.textContent = this.formatNumber(this.cookiesPerSecond);
        this.updatePurchasedItems();
        this.checkAchievements();
    }
    
    showClickEffect() {
        if (!this.clickEffectElement) return;
        this.clickEffectElement.textContent = '+' + this.cookiesPerClick;
        this.clickEffectElement.classList.remove('animate');
        setTimeout(() => this.clickEffectElement.classList.add('animate'), 10);
    }
    
    formatNumber(num) {
        num = Math.floor(num);
        if (num < 1000) return num.toString();
        if (num < 1000000) return Math.floor(num / 1000) + 'K';
        if (num < 1000000000) return Math.floor(num / 1000000) + 'M';
        if (num < 1000000000000) return Math.floor(num / 1000000000) + 'B';
        return Math.floor(num / 1000000000000) + 'T';
    }
    
    // ============================================
    // SAVE / LOAD / RESET
    // ============================================
    
    getGameData() {
        return {
            cookies: this.cookies,
            totalCookies: this.totalCookies,
            totalClicks: this.totalClicks,
            cookiesPerClick: this.cookiesPerClick,
            autoclickers: this.autoclickers,
            upgrades: this.upgrades,
            achievements: this.achievements,
            unlockedThemes: this.unlockedThemes
        };
    }
    
    loadGameData(data) {
        this.cookies = data.cookies || 0;
        this.totalCookies = data.totalCookies || 0;
        this.totalClicks = data.totalClicks || 0;
        this.cookiesPerClick = data.cookiesPerClick || 1;
        
        if (data.autoclickers) {
            Object.keys(this.autoclickers).forEach(key => {
                if (data.autoclickers[key]) {
                    this.autoclickers[key].count = data.autoclickers[key].count || 0;
                    this.autoclickers[key].currentCost = data.autoclickers[key].currentCost || this.autoclickers[key].baseCost;
                }
            });
        }
        
        if (data.upgrades) Object.keys(this.upgrades).forEach(key => {
            if (data.upgrades[key]) this.upgrades[key].owned = data.upgrades[key].owned || false;
        });
        
        if (data.achievements) Object.keys(this.achievements).forEach(key => {
            if (data.achievements[key]) this.achievements[key].unlocked = data.achievements[key].unlocked || false;
        });
        
        if (data.unlockedThemes) this.unlockedThemes = data.unlockedThemes;
        
        this.updateDisplay();
        this.renderSimpleStore();
        this.renderUpgrades();
    }
    
    resetGame() {
        this.cookies = 0;
        this.totalCookies = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        this.cookiesPerSecond = 0;
        
        Object.values(this.autoclickers).forEach(a => a.reset());
        Object.values(this.upgrades).forEach(u => u.reset());
        Object.values(this.achievements).forEach(a => a.reset());
        
        this.unlockedThemes = ['dark', 'light'];
        this.updateDisplay();
        this.renderSimpleStore();
        this.renderUpgrades();
    }
    
    // ============================================
    // CALCULATIONS
    // ============================================
    
    calculateMultiplier() {
        // Bereken totale multiplier van alle upgrades
        return Object.values(this.upgrades).reduce((mult, upgrade) => mult * upgrade.getMultiplier(), 1);
    }

    calculateTotalProduction() {
        // Bereken totale cookies per seconde
        const multiplier = this.calculateMultiplier();
        return Object.values(this.autoclickers).reduce((total, ac) => total + ac.getProduction(multiplier), 0);
    }

    // ============================================
    // AUTOCLICKERS
    // ============================================
    
    renderSimpleStore() {
        if (!this.autoclickersListElement) return;
        
        // Update productie en render autoclickers
        this.cookiesPerSecond = this.calculateTotalProduction();
        
        let autoclickersHTML = '';
        
        Object.entries(this.autoclickers).forEach(([key, autoclicker]) => {
            autoclickersHTML += `
                <div class="p-3 border-bottom">
                    <h6>${autoclicker.name}</h6>
                    <p>Owned: ${autoclicker.count}</p>
                    <p>+${autoclicker.baseProduction} cookie/sec each</p>
                    <button onclick="cookieGame.buyAutoclicker('${key}')" class="btn btn-primary">
                        Buy for ${autoclicker.currentCost} cookies
                    </button>
                </div>
            `;
        });
        
        this.autoclickersListElement.innerHTML = autoclickersHTML;
    }
    
    buyAutoclicker(key) {
        const ac = this.autoclickers[key];
        if (!ac || this.cookies < ac.currentCost) return; // Check of aankoop mogelijk is
        
        this.cookies -= ac.purchase();
        this.updateDisplay();
        this.renderSimpleStore();
        this.renderUpgrades();
    }
    
    updatePurchasedItems() {
        if (!this.purchasedItemsElement) return;
        
        const multiplier = this.calculateMultiplier();
        let html = '';
        
        Object.values(this.autoclickers).forEach(ac => {
            if (ac.count > 0) {
                html += `
                    <div class="purchased-item mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${ac.name}</strong>
                                <div class="text-muted small">+${ac.getProduction(multiplier)} cookies/sec</div>
                            </div>
                            <span class="badge bg-primary">${ac.count}</span>
                        </div>
                    </div>
                `;
            }
        });
        
        Object.values(this.upgrades).forEach(upgrade => {
            if (upgrade.owned) {
                html += `
                    <div class="purchased-item mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${upgrade.name}</strong>
                                <div class="text-muted small">${upgrade.description}</div>
                            </div>
                            <span class="badge bg-success">Owned</span>
                        </div>
                    </div>
                `;
            }
        });
        
        this.purchasedItemsElement.innerHTML = html || '<p class="text-muted">Nog geen items gekocht...</p>';
    }
    
    startAutoGeneration() {
        // Genereer cookies elke seconde op basis van autoclickers
        setInterval(() => {
            if (this.cookiesPerSecond > 0) {
                this.cookies += this.cookiesPerSecond;
                this.totalCookies += this.cookiesPerSecond;
                this.updateDisplay();
            }
        }, 1000);
    }
    
    // ============================================
    // UPGRADES
    // ============================================
    
    renderUpgrades() {
        if (!this.upgradesListElement) return;
        
        let upgradesHTML = '';
        
        Object.entries(this.upgrades).forEach(([key, upgrade]) => {
            if (!upgrade.owned) {
                upgradesHTML += `
                    <div class="p-3 border-bottom">
                        <h6>${upgrade.name}</h6>
                        <p class="small text-muted">${upgrade.description}</p>
                        <button onclick="cookieGame.buyUpgrade('${key}')" class="btn btn-primary">
                            Buy for ${upgrade.cost} cookies
                        </button>
                    </div>
                `;
            } else {
                upgradesHTML += `
                    <div class="p-3 border-bottom bg-light">
                        <h6>${upgrade.name}</h6>
                        <p class="small text-success">Gekocht!</p>
                    </div>
                `;
            }
        });
        
        if (upgradesHTML === '') {
            upgradesHTML = '<div class="p-3"><p class="text-muted">Alle upgrades gekocht!</p></div>';
        }
        
        this.upgradesListElement.innerHTML = upgradesHTML;
    }
    
    buyUpgrade(upgradeKey) {
        const upgrade = this.upgrades[upgradeKey];
        if (!upgrade || this.cookies < upgrade.cost || upgrade.owned) return; // Check of aankoop mogelijk is
        
        this.cookies -= upgrade.purchase();
        this.updateDisplay();
        this.renderSimpleStore(); // Update productie met nieuwe multiplier
        this.renderUpgrades();
    }
    
    // ============================================
    // ACHIEVEMENTS
    // ============================================
    
    checkAchievements() {
        Object.values(this.achievements).forEach(achievement => {
            if (achievement.check()) {
                this.showAchievementNotification(achievement);
                
                // Unlock theme als achievement er een heeft
                if (achievement.theme && !this.unlockedThemes.includes(achievement.theme)) {
                    this.unlockedThemes.push(achievement.theme);
                }
            }
        });
        this.updateAchievementsList();
    }

    showAchievementNotification(achievement) {
        // Toon achievement popup voor 3 seconden
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <strong>🏆 Achievement Unlocked!</strong><br>
            ${achievement.name}<br>
            <small>${achievement.description}</small>
            ${achievement.theme ? `<br><small>🎨 Theme "${achievement.theme}" unlocked!</small>` : ''}
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    updateAchievementsList() {
        const achievementsElement = document.getElementById('achievementsList');
        if (!achievementsElement) return;
        
        let html = '';
        const unlockedAchievements = Object.values(this.achievements).filter(a => a.unlocked);
        
        if (unlockedAchievements.length === 0) {
            html = '<p class="text-muted">Nog geen prestaties behaald...</p>';
        } else {
            unlockedAchievements.forEach(achievement => {
                html += `
                    <div class="achievement-item mb-2">
                        <div class="d-flex align-items-center">
                            <span class="me-2">🏆</span>
                            <div>
                                <strong>${achievement.name}</strong>
                                <div class="text-muted small">${achievement.description}</div>
                                ${achievement.theme ? `<span class="badge bg-info mt-1">${achievement.theme} theme</span>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        achievementsElement.innerHTML = html;
    }

}
