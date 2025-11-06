class Autoclicker {
    constructor(name, baseCost, baseProduction, costMultiplier = 1.5) {
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
        this.currentCost = Math.floor(this.currentCost * this.costMultiplier);
        return cost;
    }

    getProduction(upgradeMultiplier = 1) {
        return this.count * this.baseProduction * upgradeMultiplier;
    }

    reset() {
        this.count = 0;
        this.currentCost = this.baseCost;
    }
}

class Upgrade {
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

class CookieGame {
    constructor() {
        this.cookies = 0;
        this.totalCookies = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        this.cookiesPerSecond = 0;
        
        this.initializeAutoclickers();
        this.initializeUpgrades();
        this.initializeAchievements();
        
        this.cookieCountElement = null;
        this.totalCookiesElement = null;
        this.totalClicksElement = null;
        this.perClickElement = null;
        this.clickEffectElement = null;
        this.cookieButton = null;
        this.cookiesPerSecondElement = null;
        this.autoclickersListElement = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.renderSimpleStore();
        this.renderUpgrades();
        this.startAutoGeneration();
    }
    
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
            firstClick: { name: "Eerste Klik", desc: "Klik je eerste cookie", unlocked: false, requirement: () => this.totalClicks >= 1, theme: null },
            clickMaster: { name: "Klik Meester", desc: "Klik 100 keer", unlocked: false, requirement: () => this.totalClicks >= 100, theme: "blue" },
            cookieCollector: { name: "Cookie Verzamelaar", desc: "Verzamel 1000 cookies", unlocked: false, requirement: () => this.totalCookies >= 1000, theme: null },
            millionaire: { name: "Miljonair", desc: "Verzamel 1 miljoen cookies", unlocked: false, requirement: () => this.totalCookies >= 1000000, theme: "gold" },
            firstAutoclicker: { name: "Eerste Helper", desc: "Koop je eerste autoclicker", unlocked: false, requirement: () => Object.values(this.autoclickers).some(a => a.count > 0), theme: null },
            upgradeUnlocked: { name: "Verbeterd", desc: "Koop je eerste upgrade", unlocked: false, requirement: () => Object.values(this.upgrades).some(u => u.owned), theme: "purple" },
            productionKing: { name: "Productie Koning", desc: "Bereik 100 cookies/sec", unlocked: false, requirement: () => this.cookiesPerSecond >= 100, theme: "green" }
        };
        this.unlockedThemes = ['dark', 'light']; // Start themes
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
    
    clickCookie() {
        this.cookies += this.cookiesPerClick;
        this.totalCookies += this.cookiesPerClick;
        this.totalClicks += 1;
        
        this.updateDisplay();
        this.showClickEffect();
    }
    
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
    
    formatNumber(number) {
        number = Math.floor(number);
        if (number < 1000) return number.toString();
        if (number < 1000000) return Math.floor(number / 1000) + 'K';
        if (number < 1000000000) return Math.floor(number / 1000000) + 'M';
        if (number < 1000000000000) return Math.floor(number / 1000000000) + 'B';
        return Math.floor(number / 1000000000000) + 'T';
    }
    
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
        Object.values(this.achievements).forEach(a => a.unlocked = false);
        
        this.unlockedThemes = ['dark', 'light'];
        this.updateDisplay();
        this.renderSimpleStore();
        this.renderUpgrades();
    }
    
    calculateAutoclickerMultiplier() {
        let multiplier = 1;
        Object.values(this.upgrades).forEach(upgrade => {
            multiplier *= upgrade.getMultiplier();
        });
        return multiplier;
    }

    calculateTotalProduction() {
        let total = 0;
        const multiplier = this.calculateAutoclickerMultiplier();
        
        Object.values(this.autoclickers).forEach(autoclicker => {
            total += autoclicker.getProduction(multiplier);
        });
        
        return total;
    }

    // Autoclickers Store
    renderSimpleStore() {
        if (!this.autoclickersListElement) return;
        
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
    
    buyAutoclicker(autoclickerKey) {
        const autoclicker = this.autoclickers[autoclickerKey];
        if (!autoclicker || this.cookies < autoclicker.currentCost) return;
        
        this.cookies -= autoclicker.purchase();
        this.updateDisplay();
        this.renderSimpleStore();
        this.renderUpgrades();
    }
    
    updatePurchasedItems() {
        if (!this.purchasedItemsElement) return;
        
        let itemsHTML = '';
        
        const multiplier = this.calculateAutoclickerMultiplier();
        Object.values(this.autoclickers).forEach(autoclicker => {
            if (autoclicker.count > 0) {
                const production = autoclicker.getProduction(multiplier);
                itemsHTML += `
                    <div class="purchased-item mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${autoclicker.name}</strong>
                                <div class="text-muted small">+${production} cookies/sec</div>
                            </div>
                            <span class="badge bg-primary">${autoclicker.count}</span>
                        </div>
                    </div>
                `;
            }
        });
        
        Object.values(this.upgrades).forEach(upgrade => {
            if (upgrade.owned) {
                itemsHTML += `
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
        
        if (itemsHTML === '') {
            itemsHTML = '<p class="text-muted">Nog geen items gekocht...</p>';
        }
        
        this.purchasedItemsElement.innerHTML = itemsHTML;
    }
    
    startAutoGeneration() {
        setInterval(() => {
            if (this.cookiesPerSecond > 0) {
                this.cookies += this.cookiesPerSecond;
                this.totalCookies += this.cookiesPerSecond;
                this.updateDisplay();
            }
        }, 1000);
    }
    
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
        if (!upgrade || this.cookies < upgrade.cost || upgrade.owned) return;
        
        this.cookies -= upgrade.purchase();
        this.updateDisplay();
        this.renderSimpleStore();
        this.renderUpgrades();
    }
    
    checkAchievements() {
        Object.entries(this.achievements).forEach(([key, achievement]) => {
            if (!achievement.unlocked && achievement.requirement()) {
                achievement.unlocked = true;
                this.showAchievementNotification(achievement);
                
                // Unlock theme if achievement has one
                if (achievement.theme && !this.unlockedThemes.includes(achievement.theme)) {
                    this.unlockedThemes.push(achievement.theme);
                }
            }
        });
        this.updateAchievementsList();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <strong>🏆 Achievement Unlocked!</strong><br>
            ${achievement.name}<br>
            <small>${achievement.desc}</small>
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
                                <div class="text-muted small">${achievement.desc}</div>
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
