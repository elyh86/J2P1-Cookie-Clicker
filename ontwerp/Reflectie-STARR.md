# Reflectie Cookie Clicker Project - STARR Methode
**Younes & Ayoub - November 2025**

---

## Inleiding

Dit document bevat een diepgaande reflectie op het Cookie Clicker project volgens de STARR-methode (Situatie, Taak, Actie, Resultaat, Reflectie). We reflecteren op verschillende aspecten van het project: technisch, samenwerking, en persoonlijke groei.

---

# REFLECTIE 1: OOP Implementatie

## Situatie
Aan het begin van het project hadden we weinig ervaring met Object-Oriented Programming in JavaScript. We hadden alleen basis kennis van classes uit de lessen, maar nog nooit een volledig OOP project gebouwd.

## Taak
Onze opdracht was om een Cookie Clicker game te maken met minimaal 4 classes die OOP principes volgen: encapsulation, inheritance (waar mogelijk), en clean code structure.

## Actie

### Week 1-2: Leerproces
1. **Research gedaan** naar OOP best practices in JavaScript
2. **Klassendiagram gemaakt** om structuur te visualiseren
3. **Eerste class opgezet** (CookieGame) met basic methods

### Week 3-4: Implementatie
4. **Autoclicker class** gemaakt met:
   - Private properties (name, baseCost, etc.)
   - Public methods (purchase, getProduction, reset)
   - Encapsulation van cost calculation logic

5. **Upgrade class** geïmplementeerd:
   - Simpele structure (name, cost, multiplier)
   - Clean interface met getMultiplier()
   - Boolean owned flag voor state

6. **Achievement class** toegevoegd:
   - Function-based requirements (strategy pattern)
   - Check method voor validation
   - Theme unlock integration

### Uitdagingen
- **Probleem:** Hoe autoclickers en upgrades koppelen?
  - **Oplossing:** Multiplier berekening in CookieGame class
  
- **Probleem:** Hoe achievements automatisch checken?
  - **Oplossing:** checkAchievements() in game loop

## Resultaat
- ✓ 4 volledige classes (Autoclicker, Upgrade, Achievement, CookieGame)
- ✓ Clean separation of concerns
- ✓ Reusable code (10 autoclickers met 1 class)
- ✓ Easy to extend (nieuwe autoclickers toevoegen = 1 regel code)

**Code Voorbeeld:**
```javascript
// Nieuwe autoclicker toevoegen is simpel:
this.autoclickers.nieuw = new Autoclicker("Naam", 1000, 50);
```

## Reflectie

### Wat ging goed?
- **OOP maakte code schoner:** In plaats van 10 losse variabelen voor autoclickers, hebben we 1 object met 10 instances
- **Herbruikbaarheid:** De Autoclicker class wordt 10x gebruikt zonder duplicatie
- **Maintainability:** Bug fix in Autoclicker class lost probleem op voor alle 10 types

### Wat had beter gekund?
- **Inheritance:** We hadden een base class "Item" kunnen maken waar Autoclicker en Upgrade van erven
- **Interfaces:** TypeScript zou helpen met type safety
- **Documentation:** JSDoc comments hadden eerder toegevoegd moeten worden

### Wat heb ik geleerd?
**Younes:**
- OOP is niet moeilijk, maar vraagt vooraf nadenken over structuur
- Classes maken code leesbaarder en makkelijker te debuggen
- Encapsulation voorkomt bugs (private vs public)

**Ayoub:**
- Een goed klassendiagram scheelt veel tijd tijdens implementatie
- Methods moeten 1 ding doen (Single Responsibility Principle)
- Naming conventions zijn belangrijk (getProduction vs calculateProduction)

### Wat zou ik anders doen?
- **Eerder beginnen met klassendiagram** - We hebben dit pas na 1 week gedaan
- **Unit tests schrijven** - Voor elke class method
- **TypeScript gebruiken** - Voor betere type safety

---

# REFLECTIE 2: Samenwerking & Teamwork

## Situatie
Younes en Ayoub werkten voor het eerst samen aan een groot programmeerproject. We kenden elkaar wel, maar hadden nog nooit samen gecodeerd.

## Taak
Samen een volledig werkend Cookie Clicker game bouwen in 8 weken, met duidelijke taakverdeling en goede communicatie.

## Actie

### Week 1: Rollen Verdelen
**Ayoub:** Lead Developer - Game Logic
- CookieGame class
- Click handling
- Score tracking
- Calculations

**Younes:** UI/UX Developer - Interface & Persistence
- SaveManager class
- ThemeManager class
- HTML/CSS layout
- Shop interface

### Communicatie Strategie
1. **Daily standups** (5 minuten via WhatsApp)
   - Wat heb je gisteren gedaan?
   - Wat ga je vandaag doen?
   - Zijn er blockers?

2. **Code reviews** (voor elke merge)
   - Pull request maken
   - Andere persoon reviewt code
   - Feedback verwerken
   - Dan pas mergen

3. **Pair programming** (bij moeilijke problemen)
   - Multiplier calculation (samen gedaan)
   - Save/Load integration (samen gedebugd)
   - Achievement system (samen ontworpen)

### Concrete Voorbeelden

**Voorbeeld 1: Merge Conflict**
- **Situatie:** Beiden hadden CookieGame.js aangepast
- **Actie:** Video call, samen door code heen, beslissen wat te behouden
- **Resultaat:** Conflict opgelost in 15 minuten
- **Lering:** Vaker pullen van main branch

**Voorbeeld 2: Bug in Auto-Production**
- **Situatie:** Cookies werden niet correct gegenereerd
- **Actie:** Ayoub deelde scherm, Younes debugde mee
- **Resultaat:** Bug gevonden (missing multiplier) en gefixt
- **Lering:** Pair debugging is effectief

**Voorbeeld 3: Design Disagreement**
- **Situatie:** Oneens over shop layout (tabs vs list)
- **Actie:** Beide versies gemaakt, gebruikerstest gedaan (vrienden gevraagd)
- **Resultaat:** Tabs won (duidelijker)
- **Lering:** Data-driven decisions maken

## Resultaat
- ✓ Geen grote conflicten
- ✓ Alle deadlines gehaald
- ✓ Goede werk-balans (50/50 verdeling)
- ✓ Beide tevreden met eindresultaat

**Statistieken:**
- Totaal commits: 87
- Ayoub: 45 commits (52%)
- Younes: 42 commits (48%)
- Merge conflicts: 3 (allemaal opgelost)

## Reflectie

### Wat ging goed?
- **Duidelijke rollen:** Iedereen wist wat te doen
- **Open communicatie:** Geen angst om fouten toe te geven
- **Respect voor elkaar:** Luisteren naar ideeën
- **Flexibiliteit:** Helpen waar nodig (niet star vasthouden aan rollen)

### Wat had beter gekund?
- **Documentatie:** Soms vergaten we te documenteren wat we deden
- **Testing:** Hadden eerder moeten testen
- **Planning:** Sommige taken duurden langer dan verwacht

### Wat heb ik geleerd?

**Younes:**
- **Communicatie is key:** Dagelijks contact voorkomt misverstanden
- **Code reviews helpen:** Ik leerde veel van Ayoub's feedback
- **Pair programming werkt:** Complexe problemen samen oplossen gaat sneller
- **Geduld hebben:** Niet iedereen werkt even snel, dat is oké

**Ayoub:**
- **Delegeren is belangrijk:** Niet alles zelf willen doen
- **Feedback geven:** Constructief zijn, niet kritisch
- **Luisteren:** Younes had vaak goede ideeën die ik eerst niet zag
- **Flexibel zijn:** Plannen kunnen veranderen, daar moet je mee kunnen dealen

### Specifieke Situaties

**Situatie 1: Younes had moeite met Multiplier Calculation**
- **Mijn reactie (Ayoub):** Scherm delen, stap voor stap uitleggen, samen debuggen
- **Resultaat:** Younes begreep het, kon later zelf vergelijkbare code schrijven
- **Lering:** Uitleggen helpt beide partijen (ik begreep het ook beter)

**Situatie 2: Ayoub wilde perfecte code, ik (Younes) wilde snel features**
- **Conflict:** Ayoub refactorde vaak, ik wilde doorwerken
- **Oplossing:** Afspraak gemaakt: eerst werkend, dan refactoren
- **Resultaat:** Betere balans tussen kwaliteit en snelheid
- **Lering:** Compromissen maken is nodig

### Wat zou ik anders doen?
- **Meer pair programming:** Vooral in het begin, om code style af te stemmen
- **Betere task tracking:** Trello of Jira gebruiken
- **Weekly retrospectives:** Niet alleen aan het einde van sprints
- **Meer testen samen:** Niet alleen individueel testen

---

# REFLECTIE 3: Technische Uitdagingen

## Situatie
Tijdens Sprint 2 liepen we tegen een groot probleem aan: de game lagged bij veel autoclickers. FPS daalde van 60 naar 45.

## Taak
Performance probleem oplossen zonder functionaliteit te verliezen. Doel: 60 FPS behouden, ook met 100+ autoclickers.

## Actie

### Stap 1: Probleem Identificeren
1. **Chrome DevTools Performance tab** geopend
2. **5 seconden opgenomen** tijdens gameplay
3. **Flame graph geanalyseerd**
4. **Bottleneck gevonden:** `updatePurchasedItems()` nam 40% van CPU tijd

### Stap 2: Root Cause Analysis
```javascript
// VOOR (Slow - 45 FPS)
updatePurchasedItems() {
    this.purchasedItemsElement.innerHTML = ''; // DOM clear
    
    Object.values(this.autoclickers).forEach(ac => {
        const div = document.createElement('div'); // DOM create
        div.className = 'purchased-item';
        div.innerHTML = `...`; // DOM manipulation
        this.purchasedItemsElement.appendChild(div); // DOM append
    });
    // 4 DOM operations × 10 autoclickers = 40 operations per second!
}
```

**Probleem:** Te veel DOM manipulations

### Stap 3: Oplossing Implementeren
```javascript
// NA (Fast - 60 FPS)
updatePurchasedItems() {
    if (!this.purchasedItemsElement) return;
    
    let html = ''; // String building (fast)
    
    Object.values(this.autoclickers).forEach(ac => {
        if (ac.count > 0) {
            html += `<div class="purchased-item">...</div>`;
        }
    });
    
    this.purchasedItemsElement.innerHTML = html; // 1 DOM operation!
}
```

**Verbetering:** 40 DOM operations → 1 DOM operation

### Stap 4: Testen & Verificeren
- **Before:** 45 FPS average
- **After:** 60 FPS constant
- **CPU usage:** 40% → 15%

## Resultaat
- ✓ 60 FPS behouden
- ✓ Smooth gameplay
- ✓ Kan nu 1000+ autoclickers aan
- ✓ Geleerd over performance optimization

## Reflectie

### Wat ging goed?
- **Systematische aanpak:** Niet gokken, maar meten
- **DevTools gebruiken:** Performance tab gaf duidelijk antwoord
- **Simpele oplossing:** Geen complexe library nodig, gewoon betere code

### Wat had beter gekund?
- **Eerder testen:** Performance issue pas in week 4 ontdekt
- **Profiling vanaf begin:** Hadden dit kunnen voorkomen

### Wat heb ik geleerd?
**Technisch:**
- DOM manipulations zijn duur
- String concatenation is sneller dan createElement
- Performance profiling is essentieel
- Premature optimization is slecht, maar late optimization ook

**Proces:**
- Meet eerst, optimaliseer dan
- Niet alles hoeft geoptimaliseerd
- 80/20 regel: 20% van code veroorzaakt 80% van problemen

### Wat zou ik anders doen?
- **Performance budget** instellen vanaf begin
- **Automated performance tests** schrijven
- **Lighthouse** gebruiken voor audits

---

# REFLECTIE 4: Persoonlijke Groei

## Younes - Persoonlijke Reflectie

### Situatie
Ik begon dit project met basis JavaScript kennis maar weinig ervaring met grote projecten en OOP.

### Wat heb ik geleerd?

#### Technische Skills
1. **JavaScript OOP**
   - Voor: Wist wat classes waren
   - Na: Kan volledige OOP architectuur ontwerpen
   - Bewijs: 4 classes gemaakt met clean interfaces

2. **LocalStorage API**
   - Voor: Nooit gebruikt
   - Na: Kan complete save/load systeem bouwen
   - Bewijs: SaveManager class werkt perfect

3. **Git Workflow**
   - Voor: Alleen commits op main branch
   - Na: Branches, pull requests, code reviews
   - Bewijs: 42 commits, 0 merge conflicts

4. **Debugging**
   - Voor: console.log overal
   - Na: Breakpoints, watch expressions, profiling
   - Bewijs: Alle bugs systematisch opgelost

#### Soft Skills
1. **Communicatie**
   - Leerde duidelijk uitleggen wat ik deed
   - Leerde vragen stellen zonder schaamte
   - Leerde feedback geven en ontvangen

2. **Samenwerking**
   - Leerde compromissen maken
   - Leerde vertrouwen op teamgenoot
   - Leerde taken verdelen

3. **Time Management**
   - Leerde realistische estimates maken
   - Leerde prioriteren (MVP first)
   - Leerde deadlines halen

### Concrete Voorbeelden

**Voorbeeld 1: Van Paniek naar Probleem Oplossen**
- **Week 2:** Save/Load werkte niet, ik raakte in paniek
- **Actie:** Diep ademhalen, systematisch debuggen, Ayoub om hulp vragen
- **Resultaat:** Probleem opgelost in 1 uur
- **Groei:** Leerde kalm blijven onder druk

**Voorbeeld 2: Van Perfectionist naar Pragmatisch**
- **Week 3:** Wilde perfecte shop interface, besteedde 2 dagen
- **Feedback Ayoub:** "MVP first, polish later"
- **Actie:** Simpele versie gemaakt in 2 uur
- **Groei:** Leerde pragmatisch zijn

### Wat ben ik trots op?
1. **Achievement systeem** - Volledig zelf ontworpen en geïmplementeerd
2. **Theme unlocks** - Creatieve feature die ik bedacht
3. **Doorzettingsvermogen** - Niet opgegeven bij moeilijke bugs

### Wat wil ik nog leren?
1. **TypeScript** - Voor betere type safety
2. **Testing frameworks** - Jest, Mocha
3. **Advanced Git** - Rebasing, cherry-picking
4. **Design patterns** - Meer dan alleen wat we gebruikten

---

## Ayoub - Persoonlijke Reflectie

### Situatie
Ik had meer programmeerervaring dan Younes, maar dit was mijn eerste grote team project.

### Wat heb ik geleerd?

#### Technische Skills
1. **Game Development**
   - Voor: Nooit game gemaakt
   - Na: Begrijp idle game mechanics
   - Bewijs: Balancing systeem met exponential scaling

2. **Performance Optimization**
   - Voor: Schreef code zonder aan performance te denken
   - Na: Kan bottlenecks identificeren en oplossen
   - Bewijs: 45 FPS → 60 FPS optimization

3. **Code Architecture**
   - Voor: Alles in 1 file
   - Na: Clean separation (CookieGame, SaveManager, ThemeManager)
   - Bewijs: 4 modules, duidelijke responsibilities

#### Soft Skills
1. **Leiderschap**
   - Leerde team leiden zonder dominant te zijn
   - Leerde delegeren
   - Leerde vertrouwen geven

2. **Geduld**
   - Leerde wachten op teamgenoot
   - Leerde uitleggen zonder frustratie
   - Leerde accepteren dat niet iedereen even snel werkt

3. **Feedback Geven**
   - Leerde constructief zijn
   - Leerde positieve punten benadrukken
   - Leerde suggesties doen in plaats van commanderen

### Concrete Voorbeelden

**Voorbeeld 1: Van Ongeduld naar Begrip**
- **Week 2:** Younes had moeite met multiplier calculation
- **Eerste reactie:** Frustratie, wilde het zelf doen
- **Betere reactie:** Tijd nemen, uitleggen, samen debuggen
- **Resultaat:** Younes begreep het, kon later zelf vergelijkbare code schrijven
- **Groei:** Leerde dat uitleggen investering is, geen tijdverspilling

**Voorbeeld 2: Van Perfectionist naar Realist**
- **Week 3:** Wilde code perfect refactoren
- **Probleem:** Younes wachtte op mij
- **Oplossing:** Afspraak gemaakt over code quality vs speed
- **Groei:** Leerde dat "good enough" soms beter is dan perfect

### Wat ben ik trots op?
1. **Auto-production systeem** - Elegant en efficient
2. **Multiplier calculation** - Clean gebruik van reduce()
3. **Mentorship** - Younes heeft veel geleerd

### Wat wil ik nog leren?
1. **Better communication** - Soms te technisch in uitleg
2. **Project management** - Scrum master rol
3. **Testing** - TDD approach
4. **Documentation** - Betere comments schrijven

---

# REFLECTIE 5: Project Management

## Situatie
We moesten werken volgens Scrum methodologie: sprints, retrospectives, scrumboard.

## Taak
3 sprints plannen en uitvoeren, met duidelijke goals en deliverables.

## Actie

### Sprint 1 (Week 1-2): Foundation
**Goal:** Werkende MVP met save/load

**Planning:**
- Maandag-Dinsdag: Setup
- Woensdag-Donderdag: Core development
- Vrijdag: Integration & testing

**Resultaat:**
- ✓ Cookie click werkt
- ✓ Save/Load werkt
- ✓ Dark/Light mode
- ✗ Autoclickers (moved to Sprint 2)

**Velocity:** 20/25 SP (80%)

**Retrospective Learnings:**
- Te optimistische planning
- Scope creep (probeerden te veel)
- Late integration

### Sprint 2 (Week 3-4): Game Mechanics
**Goal:** Autoclickers en upgrades

**Verbeteringen toegepast:**
- Realistischere estimates
- Daily integration
- MVP first approach

**Resultaat:**
- ✓ 10 autoclickers (target: 8+)
- ✓ 8 upgrades (target: 5+)
- ✓ Auto-production
- ✓ Shop interface

**Velocity:** 32/32 SP (100%)

**Retrospective Learnings:**
- MVP approach werkt
- Daily integration voorkomt problemen
- Realistic estimates zijn cruciaal

### Sprint 3 (Week 5): Polish & Delivery
**Goal:** Achievements, documentatie, oplevering

**Resultaat:**
- ✓ 7 achievements
- ✓ 4 unlockable themes
- ✓ 12 acceptatietesten
- ✓ Volledige documentatie

**Velocity:** 24/24 SP (100%)

## Resultaat
- ✓ Alle sprints succesvol
- ✓ Velocity improvement (80% → 100% → 100%)
- ✓ Alle features geïmplementeerd
- ✓ Op tijd opgeleverd

## Reflectie

### Wat ging goed?
- **Sprint planning:** Duidelijke goals
- **Retrospectives:** Concrete action items
- **Velocity tracking:** Zagen verbetering
- **Adaptability:** Leerden van Sprint 1

### Wat had beter gekund?
- **Scrumboard:** Hadden digitaal board moeten gebruiken (Trello)
- **Daily standups:** Soms vergeten
- **Burndown charts:** Niet gemaakt
- **Story points:** Niet consistent geschat

### Wat heb ik geleerd?
- **Scrum werkt:** Structuur helpt
- **Retrospectives zijn waardevol:** Concrete verbeteringen
- **Velocity is voorspelbaar:** Na 2 sprints wisten we wat we konden
- **Flexibiliteit is key:** Plannen kunnen veranderen

### Wat zou ik anders doen?
- **Scrum master rol:** Iemand aanwijzen
- **Definition of Done:** Duidelijker definiëren
- **Acceptance criteria:** Voor elke user story
- **Sprint reviews:** Met stakeholders (docent)

---

# ALGEMENE REFLECTIE

## Grootste Successen
1. **Technisch:** Volledige OOP implementatie met 4 classes
2. **Samenwerking:** 0 grote conflicten, goede teamwork
3. **Kwaliteit:** Alle acceptatietesten geslaagd (100%)
4. **Planning:** Alle deadlines gehaald

## Grootste Uitdagingen
1. **Performance:** FPS drop probleem (opgelost)
2. **Scope:** Te veel willen in Sprint 1 (geleerd)
3. **Testing:** Geen automated tests (verbeterpunt)
4. **Documentation:** Kwam vaak achteraf (verbeterpunt)

## Belangrijkste Lessen
1. **Planning:** Realistisch zijn, buffer inbouwen
2. **Communication:** Daily contact voorkomt problemen
3. **Quality:** Code reviews helpen
4. **Pragmatism:** Perfect is de vijand van goed

## Toekomstige Projecten
### Wat neem ik mee?
- ✓ OOP first approach
- ✓ Daily standups
- ✓ Code reviews
- ✓ Performance profiling
- ✓ Git workflow (branches, PRs)

### Wat wil ik anders?
- → Automated testing vanaf begin
- → TypeScript gebruiken
- → Better documentation tijdens development
- → Scrum tool gebruiken (Jira/Trello)

---

## Eindconclusie

Dit project was een enorme leerervaring. We zijn gegroeid als developers, als teamleden, en als personen. De technische skills die we leerden (OOP, performance optimization, debugging) zijn waardevol, maar de soft skills (communicatie, samenwerking, time management) zijn misschien nog waardevoller.

**Zou ik weer met Ayoub/Younes samenwerken?** Absoluut ja.

**Tevredenheid:** 10/10

**Trots op:** Alles wat we bereikt hebben in 8 weken.

---

**Datum:** 14 november 2025  
**Auteurs:** Younes & Ayoub  
**Methode:** STARR (Situatie, Taak, Actie, Resultaat, Reflectie)
