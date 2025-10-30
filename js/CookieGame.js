class Autoclicker {
    constructor(name, baseCost, baseProduction, costMultiplier = 1.5) {
        this.name = name;
        this.baseCost = baseCost;
        this.baseProduction = baseProduction;
        this.costMultiplier = costMultiplier;
        this.count = 0;
        this.currentCost = baseCost;
    }

    canAfford(cookies) {
        return cookies >= this.currentCost;
    }

    purchase() {
        if (this.count === 0) {
            this.count = 1;
        } else {
            this.count++;
        }
        
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

    getCount() {
        return this.count;
    }

    getCost() {
        return this.currentCost;
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

    canAfford(cookies) {
        return cookies >= this.cost && !this.owned;
    }

    purchase() {
        if (!this.owned) {
            this.owned = true;
            return this.cost;
        }
        return 0;
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
            granny: new Autoclicker("Granny", 100, 1, 1.5)
        };
    }

    initializeUpgrades() {
        this.upgrades = {
            speedBoost: new Upgrade("Snelheids Boost", "Verdubbelt granny snelheid", 500, 2),
            superGranny: new Upgrade("Super Granny", "Granny's maken 3x meer cookies", 1000, 3),
            cookieFactory: new Upgrade("Cookie Fabriek", "Granny's maken 5x meer cookies", 2500, 5),
            magicOven: new Upgrade("Magische Oven", "Granny's maken 10x meer cookies", 5000, 10),
            timeWarp: new Upgrade("Tijd Warp", "Granny's maken 20x meer cookies", 10000, 20)
        };
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
        if (this.cookieCountElement) {
            // Show exact amount of cookies (no formatting)
            this.cookieCountElement.textContent = Math.floor(this.cookies).toLocaleString();
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
        
        if (this.cookiesPerSecondElement) {
            this.cookiesPerSecondElement.textContent = this.formatNumber(this.cookiesPerSecond);
        }
        
        this.updatePurchasedItems();
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
        // Altijd hele getallen, geen decimalen
        number = Math.floor(number);
        
        if (number < 1000) {
            return number.toString();
        }
        if (number < 1000000) {
            return Math.floor(number / 1000) + 'K';
        }
        if (number < 1000000000) {
            return Math.floor(number / 1000000) + 'M';
        }
        if (number < 1000000000000) {
            return Math.floor(number / 1000000000) + 'B';
        }
        return Math.floor(number / 1000000000000) + 'T';
    }
    
    getGameData() {
        return {
            cookies: this.cookies,
            totalCookies: this.totalCookies,
            totalClicks: this.totalClicks,
            cookiesPerClick: this.cookiesPerClick,
            autoclickers: this.autoclickers,
            upgrades: this.upgrades
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
        
        if (data.upgrades) {
            Object.keys(this.upgrades).forEach(key => {
                if (data.upgrades[key]) {
                    this.upgrades[key].owned = data.upgrades[key].owned || false;
                }
            });
        }
        
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
        
        // Reset autoclickers
        Object.values(this.autoclickers).forEach(autoclicker => {
            autoclicker.reset();
        });
        
        // Reset upgrades
        Object.values(this.upgrades).forEach(upgrade => {
            upgrade.reset();
        });
        
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
                    <p>Owned: ${autoclicker.getCount()}</p>
                    <p>+${autoclicker.baseProduction} cookie/sec each</p>
                    <button onclick="cookieGame.buyAutoclicker('${key}')" class="btn btn-primary">
                        Buy for ${autoclicker.getCost()} cookies
                    </button>
                </div>
            `;
        });
        
        this.autoclickersListElement.innerHTML = autoclickersHTML;
    }
    
    buyAutoclicker(autoclickerKey) {
        const autoclicker = this.autoclickers[autoclickerKey];
        if (!autoclicker) return;
        
        if (autoclicker.canAfford(this.cookies)) {
            const cost = autoclicker.purchase();
            this.cookies -= cost;
            this.updateDisplay();
            this.renderSimpleStore();
            this.renderUpgrades();
        }
    }
    
    updatePurchasedItems() {
        if (!this.purchasedItemsElement) return;
        
        let itemsHTML = '';
        
        // Show autoclickers
        Object.values(this.autoclickers).forEach(autoclicker => {
            if (autoclicker.getCount() > 0) {
                const multiplier = this.calculateAutoclickerMultiplier();
                const production = autoclicker.getProduction(multiplier);
                itemsHTML += `
                    <div class="purchased-item mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${autoclicker.name}</strong>
                                <div class="text-muted small">+${production} cookies/sec</div>
                            </div>
                            <span class="badge bg-primary">${autoclicker.getCount()}</span>
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
        if (!upgrade) return;
        
        if (upgrade.canAfford(this.cookies)) {
            const cost = upgrade.purchase();
            this.cookies -= cost;
            this.updateDisplay();
            this.renderSimpleStore();
            this.renderUpgrades();
        }
    }
}
