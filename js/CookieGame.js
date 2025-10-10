class CookieGame {
    constructor() {
        this.cookies = 0;
        this.totalCookies = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        this.cookiesPerSecond = 0;
        
        this.grannyCount = 0;
        this.grannyCost = 100;
        
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
        this.startAutoGeneration();
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
        this.cookiesPerSecond = 0;
        this.grannyCount = 0;
        this.grannyCost = 100;
        this.updateDisplay();
        this.renderSimpleStore();
    }
    
    // Super Simple Store
    renderSimpleStore() {
        if (!this.autoclickersListElement) return;
        
        this.cookiesPerSecond = this.grannyCount * 1; // 1 cookie per second per granny
        
        this.autoclickersListElement.innerHTML = `
            <div class="p-3">
                <h6>👵 Granny</h6>
                <p>Owned: ${this.grannyCount}</p>
                <p>+1 cookie/sec each</p>
                <button onclick="cookieGame.buyGranny()" class="btn btn-primary">
                    Buy for ${this.grannyCost} cookies
                </button>
            </div>
        `;
    }
    
    buyGranny() {
        if (this.cookies >= this.grannyCost) {
            this.cookies -= this.grannyCost;
            this.grannyCount++;
            this.grannyCost = Math.floor(this.grannyCost * 1.5); // Price increases
            this.updateDisplay();
            this.renderSimpleStore();
        }
    }
    
    updatePurchasedItems() {
        if (!this.purchasedItemsElement) return;
        
        if (this.grannyCount > 0) {
            this.purchasedItemsElement.innerHTML = `
                <div class="purchased-item mb-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>👵 Granny</strong>
                            <div class="text-muted small">+${this.grannyCount} cookies/sec</div>
                        </div>
                        <span class="badge bg-primary">${this.grannyCount}</span>
                    </div>
                </div>
            `;
        } else {
            this.purchasedItemsElement.innerHTML = '<p class="text-muted">Nog geen items gekocht...</p>';
        }
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
}
