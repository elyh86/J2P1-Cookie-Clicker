# Sprint 3 Planning
Younes & Ayoub - Week 5, November 2025

## Wat gaan we doen?

De laatste sprint! We gaan polish toevoegen, extra features implementeren en alles klaar maken voor oplevering. Focus op kwaliteit en documentatie.

### Doel van deze sprint
- Achievement systeem met unlocks
- Volledige documentatie
- Acceptatietesten uitvoeren
- Cross-browser testing
- Performance optimalisatie
- Project opleveren

---

## Features

### Must Have (Sprint 3)
| Feature | Prioriteit | Assignee | Estimate | Status |
|---------|-----------|----------|----------|--------|
| Achievement systeem | High | Younes | 5h | Done |
| Theme unlocks | High | Younes | 2h | Done |
| Acceptatietesten | Critical | Beide | 6h | Done |
| Klassendiagram | Critical | Ayoub | 3h | Done |
| Activiteitendiagram | Critical | Younes | 3h | Done |
| Cross-browser testing | High | Beide | 3h | Done |
| Performance optimalisatie | Medium | Ayoub | 2h | Done |

### Documentation (Sprint 3)
| Document | Assignee | Status |
|----------|----------|--------|
| Acceptatietesten.md | Beide | Done |
| Klassendiagram.md | Ayoub | Done |
| Activiteitendiagram.md | Younes | Done |
| Eisen-Checklist.md | Younes | Done |
| ACHIEVEMENT_SYSTEM.md | Ayoub | Done |

## Team Verdeling

### Ayoub El Makrini - Testing & Documentation
**Verantwoordelijkheden:**
- Performance optimalisatie
- Klassendiagram documenteren
- Acceptatietesten uitvoeren (Test 1, 3, 5, 7, 9, 11)
- Bug fixes
- Code review

**Deliverables:**
- Klassendiagram.md compleet
- 6 acceptatietesten uitgevoerd
- Performance geoptimaliseerd

### Younes El Hajri - Achievements & Documentation
**Verantwoordelijkheden:**
- Achievement systeem implementeren
- Theme unlock systeem
- Activiteitendiagram documenteren
- Acceptatietesten uitvoeren (Test 2, 4, 6, 8, 10, 12)
- Documentatie finaliseren

**Deliverables:**
- 7 achievements met notificaties
- 4 unlockable themes
- Activiteitendiagram.md compleet
- 6 acceptatietesten uitgevoerd

---

## Sprint Planning

### Week 5 - Final Sprint

**Maandag: Features**
- Achievement class (Younes)
- Theme unlock logic (Younes)
- Integration testing
- Performance profiling (Ayoub)

**Dinsdag: Polish & Testing**
- Achievement notifications (Younes)
- UI polish (Beide)
- Bug fixes (Beide)
- Code review

**Woensdag: Documentation**
- Klassendiagram maken (Ayoub)
- Activiteitendiagram maken (Younes)
- Code comments toevoegen (Beide)
- README updaten

**Donderdag: Acceptatietesten**
- Tests 1-6 uitvoeren (Ayoub)
- Tests 7-12 uitvoeren (Younes)
- Test log invullen
- Bug fixes indien nodig

**Vrijdag: Oplevering**
- Final testing (Beide)
- Cross-browser validation
- Documentation review
- Sprint retrospective
- Project opleveren

## Technical Implementation

### New Features

**Achievement System**
- 7 achievements met unlock conditions
- Achievement notifications
- 4 unlockable themes (blue, gold, purple, green)
- Persistent storage van achievements
- UI lijst van unlocked achievements

### Modified Classes

**CookieGame Updates**
- `initializeAchievements()` - Create achievement instances
- `checkAchievements()` - Validate unlock conditions
- `unlockTheme(themeName)` - Unlock nieuwe themes
- `showAchievementNotification()` - Display popup

**SaveManager Updates**
- Save achievements state
- Save unlocked themes
- Load achievement progress

## Definition of Done

### Functionele Requirements
- 7 achievements kunnen unlocked worden
- Achievement notificaties verschijnen
- 4 themes kunnen unlocked worden
- Alle 12 acceptatietesten geslaagd

### Technische Requirements
- Geen console errors
- Performance blijft 60 FPS
- Cross-browser compatible (Chrome, Firefox, Edge)
- Save/Load werkt met nieuwe data
- Code is gedocumenteerd

### Quality Requirements
- Alle bugs opgelost
- UI is gepolished
- Game balancing is goed
- Responsive op alle devices
- Documentatie is compleet

### Documentation
- Klassendiagram compleet met UML
- Activiteitendiagram toont alle flows
- 12 acceptatietesten gedocumenteerd
- Eisen-checklist 100% compleet
- Sprint retrospective geschreven

---

## Velocity & Capacity

**Team Capacity:** 2 developers × 5 dagen × 4 uur = 40 uur  
**Estimated Story Points:** 24 SP  
**Previous Velocity:** 32 SP  
**Focus:** Quality over quantity

### Risk Assessment
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Time pressure voor oplevering | High | Medium | Prioriteer must-haves |
| Documentation takes longer | Medium | High | Start vroeg, parallel werken |
| Last-minute bugs | Medium | Low | Daily testing |
| Achievement complexity | Low | Low | Keep it simple |

---

## Game Content Plan

### Achievements (7 Total)
1. **Eerste Klik** - Klik je eerste cookie
2. **Klik Meester** - Klik 100 keer
3. **Cookie Verzamelaar** - Verzamel 1,000 cookies
4. **Miljonair** - Verzamel 1,000,000 cookies
5. **Eerste Helper** - Koop je eerste autoclicker
6. **Verbeterd** - Koop je eerste upgrade
7. **Productie Koning** - Bereik 100 cookies/sec

### Unlockable Themes
1. **Blue Theme** - Unlock bij 1,000 cookies
2. **Gold Theme** - Unlock bij 100,000 cookies
3. **Purple Theme** - Unlock bij 10 autoclickers
4. **Green Theme** - Unlock bij 5 upgrades

---

**Start:** Week 5, Maandag  
**Einde:** Week 5, Vrijdag  
**Review:** Week 5, Vrijdag 16:00  
**Oplevering:** Week 5, Vrijdag 17:00  
**Status:** Planning klaar!
