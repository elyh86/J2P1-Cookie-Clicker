// Cookie Clicker Game - OOP Version
// Made by Ayoub & Younes 2025

// Global Game Instances
let cookieGame = null;
let themeManager = null;
let saveManager = null;

// Initialize Game - This runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create Game Instances (Objects from our Classes)
    cookieGame = new CookieGame();
    themeManager = new ThemeManager();
    saveManager = new SaveManager();
    
    // Make cookieGame available globally for save manager
    window.cookieGame = cookieGame;
    
    // Load any saved game data
    const savedData = saveManager.loadGame();
    if (savedData) {
        cookieGame.loadGameData(savedData);
    }
    
    console.log('Cookie Clicker OOP game started!');
    console.log('Game Instance:', cookieGame);
    console.log('Theme Manager:', themeManager);
    console.log('Save Manager:', saveManager);
});
