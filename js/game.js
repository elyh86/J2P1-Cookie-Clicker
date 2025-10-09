let cookieGame = null;
let themeManager = null;
let saveManager = null;

document.addEventListener('DOMContentLoaded', function() {
    cookieGame = new CookieGame();
    themeManager = new ThemeManager();
    saveManager = new SaveManager();
    
    window.cookieGame = cookieGame;
    
    const savedData = saveManager.loadGame();
    if (savedData) {
        cookieGame.loadGameData(savedData);
    }
    
    console.log('Cookie Clicker OOP game started!');
    console.log('Game Instance:', cookieGame);
    console.log('Theme Manager:', themeManager);
    console.log('Save Manager:', saveManager);
});
