# Sprint 2 Planning
Younes & Ayoub - Week 3-4, Oktober 2025

## Wat gaan we doen?

Nu gaan we het echte game systeem maken: autoclickers en upgrades. Dit is wat Cookie Clicker een idle game maakt!

### Doel van deze sprint
- Minimaal 8 verschillende autoclickers
- Minimaal 5 upgrades
- Auto-productie (cookies per seconde)
- Shop om dingen te kopen
- Overzicht van wat je hebt
- Game balancing (prijzen kloppen)

---

## Features

### Must Have (Sprint 2)
| Feature | Prioriteit | Assignee | Estimate | Status |
|---------|-----------|----------|----------|--------|
| Autoclicker class | Critical | Ayoub | 4h | Todo |
| 8+ Autoclicker types | Critical | Ayoub | 6h | Todo |
| Auto-productie loop | Critical | Ayoub | 3h | Todo |
| Upgrade class | Critical | Younes | 3h | Todo |
| 5+ Upgrade types | Critical | Younes | 4h | Todo |
| Shop interface | Critical | Beide | 5h | Todo |
| Purchased items UI | High | Younes | 3h | Todo |
| Game balancing | High | Beide | 4h | Todo |

### Nice to Have (Sprint 2)
| Feature | Prioriteit | Assignee | Status |
|---------|-----------|----------|--------|
| Achievements | Low | - | Deferred to Sprint 3 |
| Sound effects | Low | - | Deferred |
| Extra animations | Low | - | Deferred |

## Team Verdeling

### Ayoub El Makrini - Economy Systems
**Verantwoordelijkheden:**
- **Autoclicker Class** - Data model voor auto-productie units
- **10 Autoclicker Types** - Cursor, Oma, Boerderij, Mijn, etc.
- **Auto-Production Loop** - setInterval voor cookie generatie
- **Production Calculations** - Multipliers en totals
- **Shop Logic** - Purchase validation en cost scaling

**Deliverables:**
- Werkende Autoclicker class met alle methods
- 10 verschillende autoclicker types met unieke stats
- Auto-productie systeem (cookies per seconde)

### Younes El Hajri - Upgrade Systems & UI
**Verantwoordelijkheden:**
- **Upgrade Class** - Data model voor boosts
- **8 Upgrade Types** - Verschillende multipliers
- **Shop Interface** - UI voor autoclickers en upgrades
- **Purchased Items Panel** - Overzicht van owned items
- **UI Polish** - Styling en user feedback

**Deliverables:**
- Werkende Upgrade class
- 8 upgrades met verschillende effecten
- Complete shop interface

---

## Sprint Planning

### Week 3 - Core Development

**Maandag-Dinsdag: Foundation**
- [ ] Autoclicker class implementeren (Ayoub)
- [ ] Upgrade class implementeren (Younes)
- [ ] Basic shop HTML structure (Younes)
- [ ] Purchase logic (Ayoub)

**Woensdag-Donderdag: Content Creation**
- [ ] 10 autoclicker types configureren (Ayoub)
- [ ] 8 upgrade types configureren (Younes)
- [ ] Auto-production loop (Ayoub)
- [ ] Shop rendering logic (Younes)

**Vrijdag: Integration & Testing**
- [ ] Integreren van alle systemen
- [ ] Testing van purchase flow
- [ ] Bug fixes
- [ ] Code review

### Week 4 - Polish & Delivery

**Maandag-Dinsdag: UI & UX**
- [ ] Purchased items panel (Younes)
- [ ] Shop styling en polish (Younes)
- [ ] Visual feedback bij purchases (Ayoub)
- [ ] Number formatting voor grote getallen

**Woensdag-Donderdag: Balancing & QA**
- [ ] Game balancing - prijzen tunen (Beide)
- [ ] Game balancing - productie tunen (Beide)
- [ ] Comprehensive testing (Beide)
- [ ] Cross-browser testing
- [ ] Bug fixing

**Vrijdag: Sprint Review**
- [ ] Final testing
- [ ] Documentation updates
- [ ] Sprint retrospective
- [ ] Demo preparation

## Technical Implementation

### New Classes

**Autoclicker Class**
```javascript
class Autoclicker {
  constructor(name, baseCost, baseProduction, costMultiplier)
  canAfford(cookies)
  purchase()
  getProduction(upgradeMultiplier)
  reset()
}
```

**Upgrade Class**
```javascript
class Upgrade {
  constructor(name, description, cost, multiplier)
  canAfford(cookies)
  purchase()
  getMultiplier()
  reset()
}
```

### Modified Classes

**CookieGame Updates**
- `initializeAutoclickers()` - Create 10 autoclicker instances
- `initializeUpgrades()` - Create 8 upgrade instances
- `buyAutoclicker(key)` - Purchase logic
- `buyUpgrade(key)` - Purchase logic
- `calculateTotalProduction()` - Sum all production
- `startAutoGeneration()` - setInterval loop

### File Structure
```
js/
├── cookieGame.js      (Updated)
├── autoclicker.js     (New)
├── upgrade.js         (New)
├── saveManager.js     (Updated for new data)
└── themeManager.js    (No changes)
```

## Definition of Done

### Functionele Requirements
- [ ] Minimaal 8 autoclicker types beschikbaar
- [ ] Elke autoclicker heeft unieke prijs en productie
- [ ] Auto-productie werkt (cookies per seconde)
- [ ] Minimaal 5 upgrades beschikbaar
- [ ] Upgrades verhogen productie met multiplier
- [ ] Shop toont alle autoclickers en upgrades
- [ ] Purchase buttons werken correct
- [ ] Purchased items panel toont owned items
- [ ] Cookies per second wordt correct berekend

### Technische Requirements
- [ ] Autoclicker class volledig geïmplementeerd
- [ ] Upgrade class volledig geïmplementeerd
- [ ] Auto-production loop draait elke seconde
- [ ] Save/Load werkt met nieuwe data structures
- [ ] Geen console errors
- [ ] Performance blijft goed (60 FPS)

### Quality Requirements
- [ ] Code is leesbaar en gedocumenteerd
- [ ] Geen major bugs
- [ ] UI is intuïtief
- [ ] Game balancing is redelijk
- [ ] Getest in minimaal 2 browsers

### Documentation
- [ ] Klassendiagram updated
- [ ] Code comments toegevoegd
- [ ] Sprint retrospective geschreven

---

## Velocity & Capacity

**Team Capacity:** 2 developers × 5 dagen × 4 uur = 40 uur  
**Estimated Story Points:** 32 SP  
**Previous Velocity:** 20 SP  
**Stretch Goal:** 35 SP

### Risk Assessment
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Complexity underestimated | High | Medium | Break down into smaller tasks |
| Game balancing takes long | Medium | High | Use formulas, iterate quickly |
| Integration issues | Medium | Low | Daily integration |
| Performance issues | Medium | Low | Profile early, optimize if needed |

---

## Game Content Plan

### Autoclickers (10 Types)
1. **Cursor** - 15 cookies, 0.1/sec
2. **Oma** - 100 cookies, 1/sec
3. **Boerderij** - 1.1K cookies, 8/sec
4. **Mijn** - 12K cookies, 47/sec
5. **Fabriek** - 130K cookies, 260/sec
6. **Bank** - 1.4M cookies, 1.4K/sec
7. **Tempel** - 20M cookies, 7.8K/sec
8. **Tovenaar** - 330M cookies, 44K/sec
9. **Ruimteschip** - 5.1B cookies, 260K/sec
10. **Tijdportaal** - 75B cookies, 1.6M/sec

### Upgrades (8 Types)
1. **Versterkte Cursor** - 100 cookies, 2× multiplier
2. **Oma's Helper** - 1K cookies, 2× multiplier
3. **Mega Boerderij** - 11K cookies, 2× multiplier
4. **Diepe Mijnbouw** - 120K cookies, 2× multiplier
5. **Automatisering** - 500K cookies, 2× multiplier
6. **Quantum Chip** - 5M cookies, 3× multiplier
7. **Tijdmachine** - 50M cookies, 5× multiplier
8. **Kosmische Kracht** - 500M cookies, 10× multiplier

---

**Start:** Week 3, Maandag  
**Einde:** Week 4, Vrijdag  
**Review:** Week 4, Vrijdag 15:00  
**Status:** Planning klaar!

