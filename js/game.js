// Cookie Empire - Ayoub & Younes 2025

class Game {
    constructor() {
        this.cookies = 0;
        this.totalCookies = 0;
        this.cookiesPerSecond = 0;
        this.totalClicks = 0;
        this.cookiesPerClick = 1;
        
        this.ui = new UI(this);
        this.cookieManager = new CookieManager(this);
        this.shop = new Shop(this);
        this.themeManager = new ThemeManager();
        this.saveManager = new SaveManager(this);
    }
    
    start() {
        this.saveManager.loadGame();
        this.setupEvents();
        this.ui.updateAll();
        this.themeManager.init();
        this.saveManager.startAutoSave();
    }
    
    setupEvents() {
        document.getElementById('mainCookie')?.addEventListener('click', (e) => this.cookieManager.click(e));
        document.getElementById('saveGame')?.addEventListener('click', (e) => { e.preventDefault(); this.saveManager.save(); });
        document.getElementById('restartGame')?.addEventListener('click', (e) => { e.preventDefault(); this.saveManager.reset(); });
        document.getElementById('darkModeBtn')?.addEventListener('click', () => this.themeManager.toggle());
    }
    
    addCookies(amount) {
        this.cookies += amount;
        this.totalCookies += amount;
        this.ui.updateCookieCount();
        this.ui.updateStats();
    }
    
    canAfford(amount) {
        return this.cookies >= amount;
    }
    
    spendCookies(amount) {
        if (this.canAfford(amount)) {
            this.cookies -= amount;
            this.ui.updateCookieCount();
            return true;
        }
        return false;
    }
}

class CookieManager {
    constructor(game) {
        this.game = game;
    }
    
    click(event) {
        this.game.addCookies(this.game.cookiesPerClick);
        this.game.totalClicks++;
        this.showEffect();
        this.game.ui.updateStats();
    }
    
    showEffect() {
        const effect = document.getElementById('clickEffect');
        if (!effect) return;
        
        effect.textContent = `+${this.game.cookiesPerClick}`;
        effect.classList.remove('animate');
        void effect.offsetWidth;
        effect.classList.add('animate');
    }
}

class UI {
    constructor(game) {
        this.game = game;
    }
    
    updateAll() {
        this.updateCookieCount();
        this.updateStats();
        this.updatePerClickValue();
        this.updatePurchasedItems();
    }
    
    updateCookieCount() {
        const el = document.getElementById('cookieCount');
        if (el) el.textContent = this.format(this.game.cookies);
    }
    
    updateStats() {
        const total = document.getElementById('totalCookies');
        const perSec = document.getElementById('cookiesPerSecond');
        const clicks = document.getElementById('totalClicks');
        
        if (total) total.textContent = this.format(this.game.totalCookies);
        if (perSec) perSec.textContent = this.format(this.game.cookiesPerSecond);
        if (clicks) clicks.textContent = this.format(this.game.totalClicks);
    }
    
    updatePerClickValue() {
        const el = document.getElementById('perClickValue');
        if (el) el.textContent = this.format(this.game.cookiesPerClick);
    }
    
    updatePurchasedItems() {
        const list = document.getElementById('purchasedItemsList');
        if (!list) return;
        
        if (!this.game.shop.purchasedItems.length) {
            list.innerHTML = '<p class="text-muted">Nog geen items gekocht...</p>';
            return;
        }
        
        list.innerHTML = this.game.shop.purchasedItems.map(item => `
            <div class="purchased-item">
                <div class="purchased-item-info">
                    <div class="purchased-item-name">${item.name}</div>
                    <div class="purchased-item-description">${item.description}</div>
                    <div class="purchased-item-production">${item.production}</div>
                </div>
                <div class="purchased-item-count">${item.count}</div>
            </div>
        `).join('');
    }
    
    format(num) {
        if (num < 1000) return num.toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        return (num / 1000000000).toFixed(1) + 'B';
    }
}

class Shop {
    constructor(game) {
        this.game = game;
        this.purchasedItems = [];
    }
    
    addItem(item) {
        const existing = this.purchasedItems.find(i => i.name === item.name);
        if (existing) {
            existing.count++;
        } else {
            this.purchasedItems.push({...item, count: 1});
        }
        this.game.ui.updatePurchasedItems();
    }
    
    buyItem(item, price) {
        if (this.game.spendCookies(price)) {
            this.addItem(item);
            return true;
        }
        return false;
    }
}

class ThemeManager {
    constructor() {
        this.isDark = true;
    }
    
    init() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') this.setLight();
        else this.setDark();
    }
    
    toggle() {
        if (this.isDark) this.setLight();
        else this.setDark();
    }
    
    setDark() {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        this.isDark = true;
        this.updateIcon();
    }
    
    setLight() {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        this.isDark = false;
        this.updateIcon();
    }
    
    updateIcon() {
        const icon = document.getElementById('darkModeIcon');
        if (icon) {
            icon.className = this.isDark ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

class SaveManager {
    constructor(game) {
        this.game = game;
        this.key = 'cookieSave';
    }
    
    save() {
        const data = {
            cookies: this.game.cookies,
            totalCookies: this.game.totalCookies,
            cookiesPerSecond: this.game.cookiesPerSecond,
            totalClicks: this.game.totalClicks,
            cookiesPerClick: this.game.cookiesPerClick,
            purchasedItems: this.game.shop.purchasedItems
        };
        localStorage.setItem(this.key, JSON.stringify(data));
    }
    
    loadGame() {
        const saved = localStorage.getItem(this.key);
        if (!saved) return;
        
        try {
            const data = JSON.parse(saved);
            this.game.cookies = data.cookies || 0;
            this.game.totalCookies = data.totalCookies || 0;
            this.game.cookiesPerSecond = data.cookiesPerSecond || 0;
            this.game.totalClicks = data.totalClicks || 0;
            this.game.cookiesPerClick = data.cookiesPerClick || 1;
            this.game.shop.purchasedItems = data.purchasedItems || [];
        } catch (e) {
            console.log('Save corrupted');
        }
    }
    
    reset() {
        localStorage.removeItem(this.key);
        this.game.cookies = 0;
        this.game.totalCookies = 0;
        this.game.cookiesPerSecond = 0;
        this.game.totalClicks = 0;
        this.game.cookiesPerClick = 1;
        this.game.shop.purchasedItems = [];
        this.game.ui.updateAll();
    }
    
    startAutoSave() {
        setInterval(() => this.save(), 10000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
    window.game.start();
});
