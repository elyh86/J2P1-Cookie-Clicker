# Sprint 1 Planning
Younes & Ayoub - Week 1-2, Oktober 2025

## Wat gaan we doen?

We gaan de basis van Cookie Clicker maken. Focus op een werkende MVP (Minimum Viable Product) - eerst werkend maken, dan mooi maken.

### Doel van deze sprint
- Cookie klikken moet werken
- Score bijhouden
- Game opslaan en laden
- Netjes OOP gebruiken
- UI moet bruikbaar zijn

## Features

### Must Have (Sprint 1)
| Feature | Prioriteit | Assignee | Status |
|---------|-----------|----------|--------|
| Cookie klik functionaliteit | Critical | Ayoub | Todo |
| Score tracking systeem | Critical | Ayoub | Todo |
| Save/Load implementatie | Critical | Younes | Todo |
| Basis UI layout | Critical | Younes | Todo |
| OOP class structuur | Critical | Beide | Todo |

### Nice to Have (Sprint 1)
| Feature | Prioriteit | Assignee | Status |
|---------|-----------|----------|--------|
| Dark/Light mode toggle | Low | Younes | Todo |
| Click animaties | Medium | Ayoub | Todo |
| Sound effects | Low | - | Deferred |
| Achievements | Low | - | Deferred |

## Team Verdeling

### Ayoub El Makrini - Lead Developer
**Verantwoordelijkheden:**
- **CookieGame Class** - Main game controller en logic
- **Click Handling** - Cookie klik functionaliteit implementeren
- **Score System** - Tracking van cookies, clicks, en statistics
- **Animations** - Visual feedback bij user interactions
- **Testing** - Unit testing van game logic

**Deliverables:**
- Werkende CookieGame class met alle core methods
- Click event handling met visuele feedback
- Real-time score updates

### Younes El Hajri - UI/UX Developer
**Verantwoordelijkheden:**
- **SaveManager Class** - Persistence layer implementatie
- **ThemeManager Class** - Dark/Light mode systeem
- **UI Layout** - HTML structuur en Bootstrap styling
- **UX Design** - User experience en interface design
- **QA Testing** - Bug tracking en fixes

**Deliverables:**
- Werkende Save/Load functionaliteit
- Theme toggle met smooth transitions
- Responsive UI layout

## Sprint Planning

### Week 1 - Foundation

**Maandag-Dinsdag: Project Setup**
- [ ] Repository initialiseren
- [ ] Project structuur opzetten (folders, files)
- [ ] HTML skeleton met Bootstrap
- [ ] Basis CSS styling
- [ ] Git workflow afspraken

**Woensdag-Donderdag: Core Development**
- [ ] CookieGame class implementeren (Ayoub)
- [ ] Click event handling (Ayoub)
- [ ] Score tracking logic (Ayoub)
- [ ] SaveManager class (Younes)
- [ ] LocalStorage integration (Younes)

**Vrijdag: Integration**
- [ ] Save/Load koppelen aan CookieGame
- [ ] Testing van core functionaliteit
- [ ] Bug fixes
- [ ] Code review

### Week 2 - Polish & Delivery

**Maandag-Dinsdag: Enhancement**
- [ ] ThemeManager implementeren (Younes)
- [ ] Click animaties toevoegen (Ayoub)
- [ ] UI polish en styling (Younes)
- [ ] Responsive design testen

**Woensdag-Donderdag: Testing & QA**
- [ ] Comprehensive testing
- [ ] Cross-browser testing
- [ ] Bug fixing
- [ ] Performance optimization
- [ ] Code cleanup

**Vrijdag: Sprint Review**
- [ ] Final testing
- [ ] Documentation
- [ ] Sprint retrospective
- [ ] Demo preparation

## Definition of Done

### Functionele Requirements
- [ ] Cookie button is klikbaar en responsive
- [ ] Elke klik verhoogt cookie count met 1
- [ ] Score wordt real-time getoond
- [ ] Save button slaat game state op
- [ ] Load functie herstelt opgeslagen state
- [ ] Reset button werkt correct

### Technische Requirements
- [ ] Minimaal 3 classes geïmplementeerd (CookieGame, SaveManager, ThemeManager)
- [ ] Code volgt OOP principes
- [ ] Geen console errors
- [ ] LocalStorage wordt correct gebruikt
- [ ] Event listeners zijn proper attached/detached

### Quality Requirements
- [ ] Code is leesbaar en gedocumenteerd
- [ ] Geen major bugs
- [ ] UI is gebruiksvriendelijk
- [ ] Responsive op desktop
- [ ] Getest in minimaal 2 browsers

### Documentation
- [ ] README met installatie instructies
- [ ] Code comments waar nodig
- [ ] Sprint retrospective geschreven

---

## Velocity & Capacity

**Team Capacity:** 2 developers × 5 dagen × 4 uur = 40 uur
**Estimated Story Points:** 25 SP
**Buffer:** 15 uur voor onverwachte issues

### Risk Assessment
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| LocalStorage compatibility | Medium | Low | Fallback naar in-memory storage |
| Time constraints | High | Medium | Focus op MVP, defer nice-to-haves |
| Merge conflicts | Low | Medium | Frequent commits, clear ownership |
| Technical blockers | Medium | Low | Pair programming, ask for help |

---

**Start:** Week 1, Maandag  
**Einde:** Week 2, Vrijdag  
**Review:** Week 2, Vrijdag 15:00  
**Status:** Planning klaar!

