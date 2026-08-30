/**
 * EyuTheme Design System & Agent Skills Cockpit
 * Exact replication of Joelorbit/Mytheme data, architecture, and interaction states
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. THEME PRESETS (All 24 Named Presets from Joelorbit/Mytheme)
  // ---------------------------------------------------------------------------
  const themePresets = [
    { id: 'moss-stone', name: '13. Highland Moss Stone', tagline: 'Highland moss green, stone lichen & alpine fern', bgHex: '#1c211b', accentHex: '#608053', complementHex: '#b2c286', type: 'dark' },
    { id: 'indigo-velvet', name: '6. Indigo Cosmic Velvet', tagline: 'Midnight obsidian, cyber violet, neon teal & lavender velvet', bgHex: '#181826', accentHex: '#7a6cf0', complementHex: '#42b6bd', type: 'dark' },
    { id: 'eyu-dark', name: '1. Eyu Base Charcoal', tagline: 'Painted canvas texture, olive moss, golden ochre & burnt terracotta', bgHex: '#232323', accentHex: '#5a6237', complementHex: '#b48148', type: 'dark' },
    { id: 'cyber-olive', name: '2. Cyber Olive Matrix', tagline: 'Tactical dark moss, cyber lime energy & olive shadow', bgHex: '#192017', accentHex: '#728c34', complementHex: '#a4c639', type: 'dark' },
    { id: 'solar-ochre', name: '3. Solar Saharan Ochre', tagline: 'Warm umber, glowing ochre, fired copper & desert amber', bgHex: '#241c16', accentHex: '#d99b43', complementHex: '#c86341', type: 'dark' },
    { id: 'emerald-sage', name: '4. Emerald Sage Forest', tagline: 'Obsidian emerald, frost mint, pine gold & alpine sage', bgHex: '#14201c', accentHex: '#4ea082', complementHex: '#c29f53', type: 'dark' },
    { id: 'terracotta-rust', name: '5. Terracotta Fired Clay', tagline: 'Fired terracotta clay, burnt sienna, sandstone & amber', bgHex: '#261917', accentHex: '#c86341', complementHex: '#d9ab7e', type: 'dark' },
    { id: 'crimson-obsidian', name: '7. Crimson Volcanic Noir', tagline: 'Volcanic shadow, blood ruby red, warm brass & maroon glow', bgHex: '#231719', accentHex: '#d4404b', complementHex: '#d99f48', type: 'dark' },
    { id: 'monochrome-slate', name: '8. Monochrome Industrial Steel', tagline: 'Industrial graphite, platinum steel, cold chalk & slate', bgHex: '#1e2022', accentHex: '#8b949e', complementHex: '#c9d1d9', type: 'dark' },
    { id: 'amber-bronze', name: '9. Antique Amber Bronze', tagline: 'Warm antique bronze, glowing honey & sun-drenched amber', bgHex: '#241e17', accentHex: '#b8863b', complementHex: '#d9a752', type: 'dark' },
    { id: 'copper-oxide', name: '10. Verdigris Copper Oxide', tagline: 'Oxidized copper patina, teal verdigris & sandstone brass', bgHex: '#192220', accentHex: '#3da48c', complementHex: '#d4a359', type: 'dark' },
    { id: 'plum-basalt', name: '11. Imperial Plum Basalt', tagline: 'Deep imperial plum, twilight orchid & cashmere slate', bgHex: '#221822', accentHex: '#9b59b6', complementHex: '#e67e22', type: 'dark' },
    { id: 'tobacco-leather', name: '12. Cured Tobacco Leather', tagline: 'Rich cured leather, warm saddle tan & parchment bone', bgHex: '#201b17', accentHex: '#8c6239', complementHex: '#c49a6c', type: 'dark' },
    { id: 'midnight-navy', name: '14. Deep Oceanic Navy', tagline: 'Deep abyss navy, sapphire cyan & oceanic sky', bgHex: '#151c28', accentHex: '#3b82f6', complementHex: '#38bdf8', type: 'dark' },
    { id: 'raw-umber', name: '15. Earth Pigment Raw Umber', tagline: 'Earth umber pigment, roasted almond & cream silk', bgHex: '#221d19', accentHex: '#996843', complementHex: '#d49b6a', type: 'dark' },
    { id: 'burnt-sienna', name: '16. Tuscan Burnt Sienna', tagline: 'Tuscan burnt sienna, glowing terracotta & warm bisque', bgHex: '#281a17', accentHex: '#d95338', complementHex: '#e69a5c', type: 'dark' },
    { id: 'sage-titanium', name: '17. Tactical Sage Titanium', tagline: 'Titanium grey, frost sage & alpine mist', bgHex: '#1f2423', accentHex: '#648a7c', complementHex: '#a1c2b5', type: 'dark' },
    { id: 'espresso-roast', name: '18. Dark Espresso Roast', tagline: 'Dark roasted coffee bean, cocoa husk & oat cream', bgHex: '#1c1716', accentHex: '#73534c', complementHex: '#b89388', type: 'dark' },
    { id: 'dune-khaki', name: '19. Saharan Dune Khaki', tagline: 'Desert khaki dune, dry reed & warm limestone', bgHex: '#22211c', accentHex: '#948a60', complementHex: '#c9be93', type: 'dark' },
    { id: 'graphite-violet', name: '20. Deep Graphite Violet', tagline: 'Graphite shadow, deep violet amethyst & pale lilac', bgHex: '#1e1b24', accentHex: '#8868c2', complementHex: '#bf9ee0', type: 'dark' },
    { id: 'chalcedony-blue', name: '21. Nordic Chalcedony Blue', tagline: 'Nordic glacier chalcedony, arctic sky & ice pearl', bgHex: '#172026', accentHex: '#4a8bb8', complementHex: '#8dc3e6', type: 'dark' },
    { id: 'warm-basalt', name: '22. Volcanic Warm Basalt', tagline: 'Volcanic basalt, warm ash & pale alabaster', bgHex: '#222220', accentHex: '#78786a', complementHex: '#b5b5a3', type: 'dark' },
    { id: 'cypress-pine', name: '23. Alpine Cypress Pine', tagline: 'Alpine cypress pine, jade needle & pale foam', bgHex: '#18241d', accentHex: '#3f7a56', complementHex: '#7cb591', type: 'dark' },
    { id: 'eyu-light', name: '24. Eyu Ochre Canvas (Light)', tagline: 'Golden ochre warm sand canvas, terracotta accent & deep brown ink', bgHex: '#f2ece1', accentHex: '#b48148', complementHex: '#7e5026', type: 'light' }
  ];

  // ---------------------------------------------------------------------------
  // 2. SEMANTIC TOKEN GROUPS (Exact data from tokens.ts)
  // ---------------------------------------------------------------------------
  const semanticTokenGroups = [
    {
      id: 'primary',
      label: 'Primary action',
      tokens: ['--primary', '--on-primary', '--primary-container', '--on-primary-container']
    },
    {
      id: 'secondary',
      label: 'Secondary action',
      tokens: ['--secondary', '--on-secondary', '--secondary-container', '--on-secondary-container']
    },
    {
      id: 'tertiary',
      label: 'Tertiary accent',
      tokens: ['--tertiary', '--on-tertiary', '--tertiary-container', '--on-tertiary-container']
    },
    {
      id: 'surfaces',
      label: 'Surface hierarchy',
      tokens: ['--surface-lowest', '--surface-low', '--surface-default', '--surface-high', '--surface-highest']
    },
    {
      id: 'status',
      label: 'Status feedback',
      tokens: ['--status-info', '--status-success', '--status-warning', '--status-danger']
    }
  ];

  // ---------------------------------------------------------------------------
  // 3. 23 AGENT SKILLS PACK DATA
  // ---------------------------------------------------------------------------
  const skillsData = [
    // Design & Motion
    { id: 'emil-design-eng', category: 'design', name: 'emil-design-eng', desc: 'Emil Kowalski’s design engineering philosophy on UI polish, component feel, animation decisions, and compounding craft.', when: 'Activate when building or reviewing UI components, refining interaction feel, fixing motion mistakes, or elevating visual craft.' },
    { id: 'animate', category: 'design', name: 'animate', desc: 'Build an animation from scratch, choosing the correct curve, duration, GPU properties, and interruption behavior.', when: 'Activate when asked to animate UI elements, add motion, build transitions, or make components feel responsive.' },
    { id: 'apple-design', category: 'design', name: 'apple-design', desc: 'Apple interface design and fluid motion principles distilled from WWDC and translated for web and native apps.', when: 'Activate when designing fluid gestures, spatial consistency, spring physics, or Apple-grade interfaces.' },
    { id: 'review-animations', category: 'design', name: 'review-animations', desc: 'Review UI animations strictly against design engineering standards using a structured Before/After table.', when: 'Activate when reviewing pull requests, inspecting CSS/Motion animations, checking transition easings, or evaluating motion quality.' },
    { id: 'improve-animations', category: 'design', name: 'improve-animations', desc: 'Audit all animations in a codebase and generate prioritized, actionable improvement plans.', when: 'Activate when auditing existing project animations, fixing sluggish or jarring transitions, or systematically upgrading UI motion.' },
    { id: 'find-animation-opportunities', category: 'design', name: 'find-animation-opportunities', desc: 'Search UI codebases for high-value animation opportunities while identifying what should NOT animate.', when: 'Activate when evaluating a project for motion improvements, identifying missing interaction feedback, or auditing UI delight.' },
    { id: 'animation-vocabulary', category: 'design', name: 'animation-vocabulary', desc: 'Precise animation and motion vocabulary for communicating and implementing UI interactions.', when: 'Activate when describing motion intent, prompting AI agents for animations, or refining choreography terms.' },
    { id: 'animate-expo', category: 'design', name: 'animate-expo', desc: 'Build fluid animations for React Native and Expo using Reanimated, gesture handlers, and haptics.', when: 'Activate when building mobile animations, sheet interactions, gestural dismissal, or Expo transitions.' },

    // Frontend & Themes
    { id: 'eyutheme', category: 'frontend', name: 'eyutheme', desc: 'Design and implement interfaces using Joel’s EyuTheme design system, 24 luxury colorways, and semantic tokens.', when: 'Activate when applying EyuTheme tokens, the 24 luxury colorways, surface elevation hierarchy, or tactile textures.' },
    { id: 'frontend', category: 'frontend', name: 'frontend', desc: 'Frontend engineering for interaction states, component composition, accessibility, responsive layout, and client performance.', when: 'Activate when building or reviewing UI, forms, client data flows, or browser-facing behavior.' },
    { id: 'prototype', category: 'frontend', name: 'prototype', desc: 'Build multiple interactive variations of a UI component with a live switcher for rapid iteration.', when: 'Activate when prototyping UI components, exploring design variants, building interactive mockups, or comparing interaction states.' },
    { id: 'pick-ui-library', category: 'frontend', name: 'pick-ui-library', desc: 'Select trusted, battle-tested UI component libraries and headless primitives instead of hand-rolling complex widgets.', when: 'Activate when choosing a UI component library, headless primitives (Radix, Base UI, Bits UI), toast, drawer, or dialog packages.' },
    { id: 'ask-sonner', category: 'frontend', name: 'ask-sonner', desc: 'Working with Sonner toast notification library, setup, styling, recipes, and common issue fixes.', when: 'Activate when implementing toast notifications, customizing Sonner, or troubleshooting toast behavior.' },

    // Core Engineering & Systems
    { id: 'engineering', category: 'engineering', name: 'engineering', desc: 'Product discovery, requirements engineering, scope control, and project documentation.', when: 'Activate at the start of a project, feature, bug with unclear scope, or planning phase.' },
    { id: 'architecture', category: 'engineering', name: 'architecture', desc: 'System architecture, component boundaries, data flow, repository structure, and architectural decisions.', when: 'Activate when designing a subsystem, restructuring a codebase, or choosing between architectural approaches.' },
    { id: 'security', category: 'engineering', name: 'security', desc: 'Security engineering for threat modeling, trust boundaries, auth, secrets, uploads, and AI safety.', when: 'Activate when handling untrusted input, identity, permissions, sensitive data, files, tools, or security-sensitive design.' },
    { id: 'backend', category: 'engineering', name: 'backend', desc: 'Backend engineering for APIs, workers, external integrations, caching, webhooks, and payment flows.', when: 'Activate when building or changing server-side behavior or public service contracts.' },
    { id: 'database', category: 'engineering', name: 'database', desc: 'Database engineering for schemas, constraints, query performance, transactions, migrations, backups, and recovery.', when: 'Activate when changing persistence, SQL, indexes, data access, or database operations.' },
    { id: 'testing', category: 'engineering', name: 'testing', desc: 'Software testing and review for unit, integration, end-to-end, regression, failure-path, and code-quality verification.', when: 'Activate when writing tests, debugging behavior, reviewing a change, or assessing release confidence.' },
    { id: 'devops', category: 'engineering', name: 'devops', desc: 'DevOps engineering for CI/CD, containers, deployments, observability, Git workflows, and operational recovery.', when: 'Activate when shipping code, changing runtime infrastructure, or operating a service.' },
    { id: 'handoff', category: 'engineering', name: 'handoff', desc: 'Agent and session handoff protocol for transferring context, decisions, changed files, verification, and risks.', when: 'Activate when work may continue in another session, agent, branch, or environment.' },
    { id: 'skill-creator', category: 'engineering', name: 'skill-creator', desc: 'Skill authoring, packaging, evaluation, and maintenance for portable agent capabilities.', when: 'Activate when creating, revising, validating, or distributing a SKILL.md package.' },
    { id: 'write-swift', category: 'engineering', name: 'write-swift', desc: 'Modern Swift development covering value types, Swift 6 concurrency, API design, performance, and Swift Testing.', when: 'Activate when writing or reviewing Swift code, designing iOS/macOS APIs, implementing concurrency, or creating Swift test suites.' }
  ];

  // ---------------------------------------------------------------------------
  // 4. TOAST CONTROLLER (Sonner Styled as Eyu)
  // ---------------------------------------------------------------------------
  const Toaster = {
    root: null,
    init() {
      this.root = document.getElementById('eyu-toaster');
    },
    show(title, message) {
      if (!this.root) this.init();
      const el = document.createElement('div');
      el.className = 'eyu-toast';
      el.innerHTML = `
        <svg class="eyu-toast__icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <div class="eyu-toast__content">
          <span class="eyu-toast__title">${title}</span>
          ${message ? `<span class="eyu-toast__msg">${message}</span>` : ''}
        </div>
      `;
      this.root.appendChild(el);
      setTimeout(() => {
        el.classList.add('exiting');
        setTimeout(() => {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 250);
      }, 3200);
    }
  };

  // ---------------------------------------------------------------------------
  // 5. THEME & MODE STATE MANAGEMENT
  // ---------------------------------------------------------------------------
  let activeTheme = 'moss-stone';
  let activeMode = 'dark';

  function applyTheme(themeId, persist = true, mode = activeMode) {
    activeTheme = themeId;
    activeMode = mode;

    document.documentElement.dataset.theme = themeId;
    document.documentElement.dataset.mode = activeMode;
    document.documentElement.style.colorScheme = activeMode;

    if (persist) {
      localStorage.setItem('eyu-theme', themeId);
      localStorage.setItem('eyu-mode', activeMode);
    }

    // Update Topbar Select
    const select = document.getElementById('eyu-theme-picker');
    if (select && select.value !== themeId) {
      select.value = themeId;
    }

    // Update Hero Indicator
    const heroIndicator = document.getElementById('hero-theme-indicator');
    if (heroIndicator) {
      heroIndicator.textContent = `${themeId} · ${activeMode}`;
    }

    // Update Mini Swatches active state
    document.querySelectorAll('.theme-mini-swatch').forEach(swatch => {
      swatch.classList.toggle('active', swatch.dataset.themeId === themeId);
    });

    renderTokenGroups();
  }

  function toggleMode() {
    const nextMode = activeMode === 'dark' ? 'light' : 'dark';
    if (nextMode === 'light' && activeTheme === 'moss-stone') {
      applyTheme('eyu-light', true, 'light');
    } else if (nextMode === 'dark' && activeTheme === 'eyu-light') {
      applyTheme('moss-stone', true, 'dark');
    } else {
      applyTheme(activeTheme, true, nextMode);
    }
    Toaster.show('Canvas Mode Changed', `Switched to ${nextMode} mode.`);
  }

  // ---------------------------------------------------------------------------
  // 6. RENDER TOKEN GROUPS (Exact format of Section 01)
  // ---------------------------------------------------------------------------
  function renderTokenGroups() {
    const container = document.getElementById('token-groups-container');
    if (!container) return;

    container.innerHTML = semanticTokenGroups.map(group => `
      <div class="surface-card surface-card--default surface-card--pad-md surface-card--bordered token-group">
        <div class="token-group__heading">
          <span class="status__dot" style="background: var(${group.tokens[0]});"></span>
          <h3 class="heading heading-sm">${group.label}</h3>
        </div>
        <div class="token-swatches">
          ${group.tokens.map(token => `
            <div class="token-swatch">
              <span class="token-swatch__color" style="background: var(${token});"></span>
              <span class="mono-xs">${token.replace('--', '')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // ---------------------------------------------------------------------------
  // 7. RENDER MINI PALETTES (24 Themes in Section 02)
  // ---------------------------------------------------------------------------
  function renderMiniPalettes() {
    const grid = document.getElementById('theme-mini-palette-grid');
    const select = document.getElementById('eyu-theme-picker');
    if (!grid || !select) return;

    // Populate Topbar Select
    select.innerHTML = themePresets.map(p => `
      <option value="${p.id}" ${p.id === activeTheme ? 'selected' : ''}>
        ${p.name}
      </option>
    `).join('');

    select.addEventListener('change', (e) => {
      const selected = themePresets.find(p => p.id === e.target.value);
      if (selected) applyTheme(selected.id, true, selected.type);
    });

    // Populate Mini Grid
    grid.innerHTML = themePresets.map(p => `
      <div class="theme-mini-swatch ${p.id === activeTheme ? 'active' : ''}" data-theme-id="${p.id}" title="${p.name}: ${p.tagline}">
        <span class="mini-circle" style="background: ${p.accentHex};"></span>
        <span class="mono-xs" style="font-size: 0.65rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${p.id.split('-')[0]}</span>
      </div>
    `).join('');

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.theme-mini-swatch');
      if (!item) return;
      const themeId = item.dataset.themeId;
      const preset = themePresets.find(p => p.id === themeId);
      if (preset) {
        applyTheme(preset.id, true, preset.type);
        Toaster.show(`Theme: ${preset.name}`, preset.tagline);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 8. RENDER 23 SKILLS GRID (Section 04)
  // ---------------------------------------------------------------------------
  let activeSkillCategory = 'all';
  let skillSearchTerm = '';

  function renderSkillsGrid() {
    const grid = document.getElementById('skills-catalog-grid');
    if (!grid) return;

    const filtered = skillsData.filter(s => {
      const matchCat = activeSkillCategory === 'all' || s.category === activeSkillCategory;
      const matchSearch = !skillSearchTerm ||
        s.name.toLowerCase().includes(skillSearchTerm) ||
        s.desc.toLowerCase().includes(skillSearchTerm) ||
        s.when.toLowerCase().includes(skillSearchTerm);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: var(--space-6); text-align: center;" class="surface-card surface-card--default surface-card--bordered">
          <p class="body-md text-muted">No skills found matching "${skillSearchTerm}"</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(skill => `
      <section class="card">
        <header class="card__head">
          <div class="card__headline">
            <div class="cluster gap-sm items-center">
              <h3 class="card__title heading heading-sm">${skill.name}</h3>
              <span class="caption" style="color: var(--accent-strong); font-size: 0.65rem;">${skill.category}</span>
            </div>
            <p class="card__desc body-sm">${skill.desc}</p>
          </div>
        </header>
        <div class="card__body">
          <div class="field" style="background: var(--surface-low); padding: var(--space-3); border-radius: var(--radius-sm); border-left: 2px solid var(--accent);">
            <span class="mono-xs" style="color: var(--content-primary);"><strong>Scope:</strong> ${skill.when}</span>
          </div>
          <div class="cluster justify-between items-center mt-3">
            <code class="mono-xs" style="color: var(--content-muted);">SKILL.md</code>
            <button type="button" class="btn btn--outline btn--sm skill-copy-btn" data-name="${skill.name}">
              Copy install
            </button>
          </div>
        </div>
      </section>
    `).join('');

    // Attach copy button handlers
    grid.querySelectorAll('.skill-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.dataset.name;
        const cmd = `npx skills add Joelorbit/Agent-skills/${name}`;
        navigator.clipboard.writeText(cmd).then(() => {
          Toaster.show('Command Copied', cmd);
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 9. INTERACTIVE DEMOS & EMIL ANIMATION LAB
  // ---------------------------------------------------------------------------
  function initInteractions() {
    // Mode toggle button
    const modeBtn = document.getElementById('mode-toggle-btn');
    if (modeBtn) modeBtn.addEventListener('click', toggleMode);

    // Hero trigger toast
    const heroToastBtn = document.getElementById('hero-toast-btn');
    if (heroToastBtn) {
      heroToastBtn.addEventListener('click', () => {
        Toaster.show('Hardware-accelerated Toast', 'Rendered with Eyu surfaces, outlines, and Emil animation velocity physics.');
      });
    }

    // Main install copy button
    const mainCopyBtn = document.getElementById('main-copy-btn');
    if (mainCopyBtn) {
      mainCopyBtn.addEventListener('click', () => {
        const cmd = document.getElementById('main-install-cmd').innerText;
        navigator.clipboard.writeText(cmd).then(() => {
          Toaster.show('Install Command Copied', cmd);
        });
      });
    }

    // Action menu dropdown toggle
    const actionMenuBtn = document.getElementById('eyu-action-menu-btn');
    const actionMenuDropdown = document.getElementById('eyu-action-menu-dropdown');
    if (actionMenuBtn && actionMenuDropdown) {
      actionMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        actionMenuDropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        actionMenuDropdown.classList.remove('open');
      });
    }

    // Popover toggle
    const popoverBtn = document.getElementById('eyu-popover-btn');
    const popoverContent = document.getElementById('eyu-popover-content');
    if (popoverBtn && popoverContent) {
      popoverBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popoverContent.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        popoverContent.classList.remove('open');
      });
    }

    // Sheet drawer toggle
    const sheetBtn = document.getElementById('eyu-sheet-btn');
    const sheet = document.getElementById('eyu-sheet');
    const sheetClose = document.getElementById('eyu-sheet-close');
    const sheetBackdrop = document.getElementById('eyu-sheet-backdrop');
    const sheetSave = document.getElementById('sheet-save-btn');

    function openSheet() { if (sheet) sheet.classList.add('open'); }
    function closeSheet() { if (sheet) sheet.classList.remove('open'); }

    if (sheetBtn) sheetBtn.addEventListener('click', openSheet);
    if (sheetClose) sheetClose.addEventListener('click', closeSheet);
    if (sheetBackdrop) sheetBackdrop.addEventListener('click', closeSheet);
    if (sheetSave) sheetSave.addEventListener('click', () => {
      closeSheet();
      Toaster.show('Changes Saved', 'Panel data updated.');
    });

    // Combobox autocomplete search
    const combobox = document.getElementById('demo-combobox');
    if (combobox) {
      combobox.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        if (!val) return;
        const found = themePresets.find(p => p.name.toLowerCase().includes(val) || p.id.includes(val));
        if (found) {
          applyTheme(found.id, true, found.type);
        }
      });
    }

    // Motion Lab: Easing Comparator
    const btnPlayEasing = document.getElementById('btn-play-easing');
    if (btnPlayEasing) {
      btnPlayEasing.addEventListener('click', () => {
        const bad = document.getElementById('test-pill-bad');
        const good = document.getElementById('test-pill-good');
        if (bad && good) {
          bad.classList.toggle('moving');
          good.classList.toggle('moving');
        }
      });
    }

    // Motion Lab: Scale Entrance
    const btnPlayEntry = document.getElementById('btn-play-entry');
    const entryBox = document.getElementById('entry-demo-box');
    if (btnPlayEntry && entryBox) {
      btnPlayEntry.addEventListener('click', () => {
        entryBox.classList.remove('animating');
        void entryBox.offsetWidth;
        entryBox.classList.add('animating');
      });
    }

    // Motion Lab: Asymmetric Hold-to-confirm
    const holdBtn = document.getElementById('hold-confirm-btn');
    const holdLabel = document.getElementById('hold-status-label');
    let holdTimer = null;

    if (holdBtn && holdLabel) {
      holdBtn.addEventListener('mousedown', () => {
        holdLabel.innerText = 'Holding... (2s deliberate linear fill)';
        holdTimer = setTimeout(() => {
          holdLabel.innerText = 'Confirmed! Release resets in 200ms ease-out.';
          Toaster.show('Hold Confirmed', 'Asymmetric timing preserves deliberate action.');
        }, 2000);
      });
      const endHold = () => {
        clearTimeout(holdTimer);
        holdLabel.innerText = 'Hold mouse or touch on button';
      };
      holdBtn.addEventListener('mouseup', endHold);
      holdBtn.addEventListener('mouseleave', endHold);
    }

    // Prototyping Variant Switcher
    const protoTabs = document.getElementById('proto-tabs-container');
    const protoIndicator = document.getElementById('proto-tab-indicator');
    const protoText = document.getElementById('proto-preview-text');

    const variantDescriptions = {
      '1': 'Variant 1: Minimalist surface with semantic outline and compact typography.',
      '2': 'Variant 2: Dense analytical layout with key metrics and status telemetry.',
      '3': 'Variant 3: Technical command HUD with monochrome ramp and code inspect.'
    };

    if (protoTabs && protoIndicator) {
      function updateIndicator(activeBtn) {
        protoIndicator.style.transform = `translateX(${activeBtn.offsetLeft - 3}px)`;
        protoIndicator.style.width = `${activeBtn.offsetWidth}px`;
      }
      const activeBtn = protoTabs.querySelector('.proto-tab.active');
      if (activeBtn) updateIndicator(activeBtn);

      protoTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.proto-tab');
        if (!tab) return;
        protoTabs.querySelectorAll('.proto-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateIndicator(tab);
        const variant = tab.dataset.variant;
        if (protoText && variantDescriptions[variant]) {
          protoText.innerText = variantDescriptions[variant];
        }
      });
    }

    // Skill Category Filter Pills
    const filterPills = document.getElementById('skills-filter-pills');
    if (filterPills) {
      filterPills.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        filterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeSkillCategory = pill.dataset.category;
        renderSkillsGrid();
      });
    }

    // Skill Search Input
    const searchInput = document.getElementById('skills-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        skillSearchTerm = e.target.value.toLowerCase().trim();
        renderSkillsGrid();
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 10. INITIALIZATION
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    Toaster.init();
    renderMiniPalettes();
    renderSkillsGrid();
    initInteractions();

    // Read stored theme / mode
    const storedTheme = localStorage.getItem('eyu-theme') || 'moss-stone';
    const storedMode = localStorage.getItem('eyu-mode') || 'dark';
    applyTheme(storedTheme, false, storedMode);
  });

})();
