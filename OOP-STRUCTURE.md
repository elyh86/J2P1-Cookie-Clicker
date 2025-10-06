# Cookie Clicker - OOP Structure
**Made by Ayoub & Younes 2025**

## 📚 What is OOP (Object-Oriented Programming)?
OOP is een manier van programmeren waarbij we **classes** (blauwdrukken) maken die **objects** (instanties) kunnen maken. Elk object heeft **properties** (eigenschappen) en **methods** (functies).

## 🏗️ Project Structure

### 1. **CookieGame Class** (`js/CookieGame.js`)
Dit is de hoofdklasse die alle game logica bevat.

**Properties (Eigenschappen):**
- `cookies` - Huidige aantal cookies
- `totalCookies` - Totaal aantal cookies ooit gemaakt
- `totalClicks` - Aantal keer geklikt
- `cookiesPerClick` - Cookies per klik

**Methods (Functies):**
- `clickCookie()` - Voegt cookies toe bij klik
- `updateDisplay()` - Update de cijfers op scherm
- `showClickEffect()` - Toont +1 animatie
- `formatNumber()` - Maakt grote getallen mooi (1000 → 1K)

### 2. **ThemeManager Class** (`js/ThemeManager.js`)
Beheert het donkere/lichte thema.

**Properties:**
- `isDarkTheme` - Is donker thema actief?
- `themeButton` - Knop element
- `themeIcon` - Icoon element

**Methods:**
- `toggleTheme()` - Wissel tussen thema's
- `switchToLightMode()` - Ga naar licht thema
- `switchToDarkMode()` - Ga naar donker thema

### 3. **SaveManager Class** (`js/SaveManager.js`)
Beheert het opslaan en laden van de game.

**Properties:**
- `saveKey` - Sleutel voor localStorage
- `saveButton` - Opslaan knop
- `resetButton` - Reset knop

**Methods:**
- `saveGame()` - Sla game data op
- `loadGame()` - Laad game data
- `deleteGame()` - Verwijder opgeslagen data

## 🎮 How It Works

1. **Initialization**: Wanneer de pagina laadt, worden er 3 objecten gemaakt:
   ```javascript
   cookieGame = new CookieGame();      // Hoofd game object
   themeManager = new ThemeManager();  // Thema object
   saveManager = new SaveManager();    // Opslaan object
   ```

2. **Interaction**: Elke klasse beheert zijn eigen functionaliteit:
   - `CookieGame` → Klikken, tellen, weergeven
   - `ThemeManager` → Donker/licht thema
   - `SaveManager` → Opslaan/laden/resetten

3. **Communication**: De objecten communiceren via:
   - `window.cookieGame` - Globale toegang voor save manager
   - Event listeners - Voor button clicks
   - Method calls - Voor data uitwisseling

## 🔧 Benefits of This Structure

- **Organized**: Elke klasse heeft een duidelijke verantwoordelijkheid
- **Reusable**: Klassen kunnen opnieuw gebruikt worden
- **Maintainable**: Makkelijk om bugs te vinden en features toe te voegen
- **Beginner-friendly**: Simpele, duidelijke code structuur

## 🚀 Next Steps

Je kunt nu makkelijk nieuwe features toevoegen:
- Nieuwe klasse voor upgrades: `UpgradeManager`
- Nieuwe klasse voor achievements: `AchievementManager`
- Nieuwe klasse voor auto-clickers: `AutoClickerManager`

Elk met hun eigen properties en methods! 🎯
