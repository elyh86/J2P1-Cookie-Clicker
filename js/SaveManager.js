// SaveManager Module - Handles saving and loading game data
// Made by Ayoub & Younes 2025

class SaveManager {
    // Class Properties
    constructor() {
        this.saveKey = 'cookieGame';
        this.saveButton = null;
        this.resetButton = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }
    
    // Initialize DOM Elements
    initializeElements() {
        this.saveButton = document.getElementById('saveGame');
        this.resetButton = document.getElementById('restartGame');
    }
    
    // Setup Event Listeners
    setupEventListeners() {
        if (this.saveButton) {
            this.saveButton.addEventListener('click', () => this.showSaveDialog());
        }
        
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => this.showResetDialog());
        }
    }
    
    // Save Methods
    saveGame(gameData) {
        try {
            const dataText = JSON.stringify(gameData);
            localStorage.setItem(this.saveKey, dataText);
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }
    
    loadGame() {
        try {
            const savedData = localStorage.getItem(this.saveKey);
            if (savedData) {
                return JSON.parse(savedData);
            }
            return null;
        } catch (error) {
            console.error('Failed to load game:', error);
            return null;
        }
    }
    
    deleteGame() {
        try {
            localStorage.removeItem(this.saveKey);
            return true;
        } catch (error) {
            console.error('Failed to delete game:', error);
            return false;
        }
    }
    
    // UI Dialog Methods
    showSaveDialog() {
        // This will be connected to the game instance
        if (window.cookieGame) {
            const gameData = window.cookieGame.getGameData();
            if (this.saveGame(gameData)) {
                alert('Game saved!');
            } else {
                alert('Failed to save game!');
            }
        }
    }
    
    showResetDialog() {
        if (confirm('Are you sure you want to reset your game?')) {
            if (window.cookieGame) {
                window.cookieGame.resetGame();
                this.deleteGame();
                alert('Game reset!');
            }
        }
    }
    
    // Check if save exists
    hasSavedGame() {
        return localStorage.getItem(this.saveKey) !== null;
    }
}
