/* ============================================
   ECLIPSE OF WILL - MAIN SCRIPT
   Version: 2.2
   Features: Navigation, Language Switching, Animations
============================================ */

'use strict';

/**
 * MAIN INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeApplication();
    } catch (error) {
        console.error('Application initialization failed:', error);
        handleInitializationError();
    }
});

/**
 * APPLICATION INITIALIZER
 */
function initializeApplication() {
    // Set initial state
    document.body.classList.add('js-enabled');
    
    // Initialize modules
    initNavigationSystem();
    initLanguageSystem();
    initAccessibility();
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('app:initialized'));
}

/**
 * ERROR HANDLING
 */
function handleInitializationError() {
    const fallbackHTML = `
        <div class="error-fallback" style="
            text-align: center; 
            padding: 50px; 
            color: white;
            font-family: sans-serif;
        ">
            <h2>Eclipse of Will</h2>
            <p>The application encountered an error.</p>
            <button onclick="location.reload()">Reload Page</button>
        </div>
    `;
    
    document.body.innerHTML = fallbackHTML;
}

/* ============================================
   MODULE 1: NAVIGATION SYSTEM
============================================ */

const NavigationManager = {
    /**
     * Initialize navigation system
     */
    init() {
        this.bindNavigationLinks();
        this.setupPageTransitions();
    },
    
    /**
     * Bind all navigation links
     */
    bindNavigationLinks() {
        const links = document.querySelectorAll('a.card-link');
        
        links.forEach(link => {
            // Skip if already processed
            if (link.dataset.navigationBound) return;
            
            link.addEventListener('click', this.handleLinkClick.bind(this));
            link.dataset.navigationBound = 'true';
        });
    },
    
    /**
     * Handle navigation link clicks
     */
    handleLinkClick(event) {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
        
        // Skip external links
        if (this.isExternalLink(href)) return;
        
        // Prevent default for SPA-like experience
        event.preventDefault();
        
        // Determine animation type
        const isLumen = link.closest('.container-right');
        
        if (isLumen) {
            this.animateLumenTransition(href);
        } else {
            this.animateStandardTransition(href);
        }
    },
    
    /**
     * Check if link is external
     */
    isExternalLink(href) {
        if (!href) return true;
        if (href.startsWith('javascript:')) return true;
        if (href.startsWith('#')) return true;
        if (href.startsWith('mailto:')) return true;
        if (href.startsWith('tel:')) return true;
        
        try {
            const url = new URL(href, window.location.origin);
            return url.origin !== window.location.origin;
        } catch {
            return false;
        }
    },
    
    /**
     * Standard page transition animation
     */
    animateStandardTransition(href) {
        return new Promise((resolve) => {
            document.body.classList.add('page-exit');
            
            setTimeout(() => {
                window.location.href = href;
                resolve();
            }, 500);
        });
    },
    
    /**
     * Special Lumen transition animation
     */
    animateLumenTransition(href) {
        return new Promise((resolve) => {
            // Create glow effect
            const glow = document.createElement('div');
            glow.className = 'fullscreen-glow';
            glow.style.cssText = `
                position: fixed;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: radial-gradient(circle, rgba(255,215,0,0.8) 0%, transparent 70%);
                z-index: 9999;
                opacity: 0;
                animation: lumenGlow 1.2s ease-out;
            `;
            
            // Add animation keyframes
            if (!document.querySelector('#lumen-glow-animation')) {
                const style = document.createElement('style');
                style.id = 'lumen-glow-animation';
                style.textContent = `
                    @keyframes lumenGlow {
                        0% { opacity: 0; transform: scale(0.5); }
                        50% { opacity: 1; transform: scale(1.2); }
                        100% { opacity: 0; transform: scale(1.5); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(glow);
            
            setTimeout(() => {
                window.location.href = href;
                resolve();
            }, 1200);
        });
    },
    
    /**
     * Setup CSS transitions
     */
    setupPageTransitions() {
        if (!document.querySelector('#page-transitions')) {
            const style = document.createElement('style');
            style.id = 'page-transitions';
            style.textContent = `
                .page-exit {
                    animation: pageFadeOut 0.5s ease forwards;
                }
                
                @keyframes pageFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                
                .js-enabled {
                    opacity: 1;
                    transition: opacity 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

/* ============================================
   MODULE 2: LANGUAGE SYSTEM
============================================ */

const LanguageManager = {
    // Translation data
    translations: {
        en: {
            meta: {
                title: 'Eclipse of Will - Empire Profile',
                lang: 'en'
            },
            ui: {
                title: "ECLIPSE OF WILL",
                subtitle: "Select Empire",
                ariaLabel: "Choose your empire"
            },
            noctis: {
                title: "IMPERIUM NOCTIS",
                ruler: "Ruler: ",
                rulerValue: "Queen Amilla & King Rein",
                heir: "Heir: ",
                heirValue: "Freia Noctis",
                domain: "Domain: ",
                domainValue: "Realm of Shadows",
                philosophy: "Philosophy: ",
                philosophyValue: "Power through Sacrifice",
                abilities: "Signature Abilities: ",
                abilitiesValue: "Eidolon Evolution",
                description: "The empire of eternal night, where power is born from pain and shadows hold dominion over light."
            },
            lumen: {
                title: "IMPERIUM LUMEN",
                leader: "Leader: ",
                leaderValue: "The Enlightened Council",
                domain: "Domain: ",
                domainValue: "Realm of Eternal Dawn",
                philosophy: "Philosophy: ",
                philosophyValue: "Power through Enlightenment",
                abilities: "Signature Abilities: ",
                abilitiesValue: "Absolute Enlightenment, Lumen Arts",
                description: "The empire of boundless light, where true power comes from inner peace and spiritual awakening."
            }
        },
        ja: {
            meta: {
                title: '意志の蝕 - 帝国プロファイル',
                lang: 'ja'
            },
            ui: {
                title: "意志の蝕",
                subtitle: "帝国を選択",
                ariaLabel: "帝国を選択してください"
            },
            noctis: {
                title: "ノクティス帝国",
                ruler: "統治者: ",
                rulerValue: "アミラ女王＆レイン王",
                heir: "後継者: ",
                heirValue: "フレイア・ノクティス",
                domain: "領域: ",
                domainValue: "影の領域",
                philosophy: "哲学: ",
                philosophyValue: "犠牲を通じた力",
                abilities: "特有能力: ",
                abilitiesValue: "イードロン進化",
                description: "永遠の夜の帝国。苦痛から力が生まれ、影が光を支配する場所。"
            },
            lumen: {
                title: "ルーメン帝国",
                leader: "指導者: ",
                leaderValue: "啓発評議会",
                domain: "領域: ",
                domainValue: "永遠の夜明けの領域",
                philosophy: "哲学: ",
                philosophyValue: "悟りを通じた力",
                abilities: "特有能力: ",
                abilitiesValue: "絶対啓発、ルーメン術",
                description: "果てしない光の帝国。真の力は内なる平和と精神的目覚めから来る。"
            }
        }
    },
    
    // Current language
    currentLanguage: 'en',
    
    /**
     * Initialize language system
     */
    init() {
        this.detectPreferredLanguage();
        this.bindLanguageButtons();
        this.applyLanguage(this.currentLanguage);
    },
    
    /**
     * Detect user's preferred language
     */
    detectPreferredLanguage() {
        // Check localStorage
        const savedLang = localStorage.getItem('eclipse_language');
        
        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        
        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        
        // Determine language (priority: URL > localStorage > browser > default)
        if (urlLang && this.translations[urlLang]) {
            this.currentLanguage = urlLang;
        } else if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        } else if (this.translations[browserLang]) {
            this.currentLanguage = browserLang;
        } else {
            this.currentLanguage = 'en';
        }
    },
    
    /**
     * Bind language switcher buttons
     */
    bindLanguageButtons() {
        const buttons = document.querySelectorAll('.lang-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const lang = button.dataset.lang;
                
                if (this.translations[lang]) {
                    this.switchLanguage(lang);
                }
            });
        });
    },
    
    /**
     * Switch to specified language
     */
    switchLanguage(lang) {
        if (!this.translations[lang] || lang === this.currentLanguage) return;
        
        // Add fade transition
        document.body.style.opacity = '0.7';
        
        // Apply language with slight delay for smooth transition
        setTimeout(() => {
            this.applyLanguage(lang);
            document.body.style.opacity = '1';
        }, 150);
        
        // Update current language
        this.currentLanguage = lang;
        
        // Save preference
        localStorage.setItem('eclipse_language', lang);
        
        // Update URL without page reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
        
        // Dispatch event for other modules
        window.dispatchEvent(new CustomEvent('language:changed', { 
            detail: { language: lang } 
        }));
    },
    
    /**
     * Apply language to page
     */
    applyLanguage(lang) {
        const t = this.translations[lang];
        if (!t) return;
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update page title
        document.title = t.meta.title;
        
        // Update UI elements
        this.updateUIElements(t.ui);
        this.updateEmpireCards(t);
        
        // Update navigation links
        this.updateNavigationLinks(lang);
        
        // Update active button state
        this.updateLanguageButtons(lang);
    },
    
    /**
     * Update UI text elements
     */
    updateUIElements(uiText) {
        // Main title
        const title = document.querySelector('header h1');
        if (title) {
            title.textContent = uiText.title;
            title.setAttribute('aria-label', uiText.ariaLabel);
        }
        
        // Subtitle
        const subtitle = document.querySelector('.page-subtitle');
        if (subtitle) subtitle.textContent = uiText.subtitle;
    },
    
    /**
     * Update navigation links based on current language
     */
    updateNavigationLinks(lang) {
        const links = document.querySelectorAll('a.card-link');
        
        links.forEach(link => {
            const newHref = lang === 'ja' 
                ? link.dataset.jaLink 
                : link.dataset.enLink;
            
            if (newHref) {
                link.href = newHref;
                
                // Also update title attribute
                const newTitle = lang === 'ja'
                    ? link.dataset.jaTitle || '詳細を見る'
                    : link.dataset.enTitle || 'Learn more';
                
                link.title = newTitle;
            }
        });
    },
    
    /**
     * Update empire cards content
     */
    updateEmpireCards(translations) {
        // Noctis Empire
        this.updateEmpireCard('.empire-card--noctis', {
            title: translations.noctis.title,
            items: [
                { 
                    label: translations.noctis.ruler, 
                    value: translations.noctis.rulerValue 
                },
                { 
                    label: translations.noctis.heir, 
                    value: translations.noctis.heirValue 
                },
                { 
                    label: translations.noctis.domain, 
                    value: translations.noctis.domainValue 
                },
                { 
                    label: translations.noctis.philosophy, 
                    value: translations.noctis.philosophyValue 
                },
                { 
                    label: translations.noctis.abilities, 
                    value: translations.noctis.abilitiesValue 
                },
                translations.noctis.description
            ]
        });
        
        // Lumen Empire
        this.updateEmpireCard('.empire-card--lumen', {
            title: translations.lumen.title,
            items: [
                { 
                    label: translations.lumen.leader, 
                    value: translations.lumen.leaderValue 
                },
                { 
                    label: translations.lumen.domain, 
                    value: translations.lumen.domainValue 
                },
                { 
                    label: translations.lumen.philosophy, 
                    value: translations.lumen.philosophyValue 
                },
                { 
                    label: translations.lumen.abilities, 
                    value: translations.lumen.abilitiesValue 
                },
                translations.lumen.description
            ]
        });
    },
    
    /**
     * Update individual empire card
     */
    updateEmpireCard(selector, data) {
        const card = document.querySelector(selector);
        if (!card) return;
        
        // Update title
        const title = card.querySelector('h2');
        if (title) {
            title.textContent = data.title;
            title.id = selector.includes('noctis') ? 'noctis-title' : 'lumen-title';
        }
        
        // Update paragraphs
        const paragraphs = card.querySelectorAll('p');
        
        // Clear existing content
        paragraphs.forEach(p => p.textContent = '');
        
        // Fill with new content
        data.items.forEach((item, index) => {
            if (!paragraphs[index]) return;
            
            if (typeof item === 'string') {
                // Description paragraph
                paragraphs[index].textContent = item;
            } else {
                // Label-value pair
                paragraphs[index].innerHTML = `
                    <strong>${item.label}</strong>${item.value}
                `;
            }
        });
    },
    
    /**
     * Update language buttons active state
     */
    updateLanguageButtons(activeLang) {
        document.querySelectorAll('.lang-btn').forEach(button => {
            const isActive = button.dataset.lang === activeLang;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive);
        });
    },
    
    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    },
    
    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
};

/* ============================================
   MODULE 3: ACCESSIBILITY
============================================ */

const AccessibilityManager = {
    /**
     * Initialize accessibility features
     */
    init() {
        this.setupKeyboardNavigation();
        this.addSkipLinks();
        this.enhanceFocusIndicators();
        this.setupReducedMotion();
    },
    
    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            // Tab key navigation enhancement
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },
    
    /**
     * Add skip to content links
     */
    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #764ba2;
            color: white;
            padding: 8px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content id if not present
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    },
    
    /**
     * Enhance focus indicators
     */
    enhanceFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 3px solid #764ba2 !important;
                outline-offset: 3px !important;
            }
            
            .skip-link:focus {
                top: 0 !important;
            }
        `;
        document.head.appendChild(style);
    },
    
    /**
     * Respect reduced motion preferences
     */
    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionChange = (event) => {
            if (event.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        };
        
        // Set initial state
        handleMotionChange(prefersReducedMotion);
        
        // Listen for changes
        prefersReducedMotion.addEventListener('change', handleMotionChange);
    }
};

/* ============================================
   MODULE INITIALIZERS (Public API)
============================================ */

function initNavigationSystem() {
    NavigationManager.init();
}

function initLanguageSystem() {
    LanguageManager.init();
}

function initAccessibility() {
    AccessibilityManager.init();
}

/* ============================================
   PUBLIC EXPORTS (for console debugging)
============================================ */

window.EclipseOfWill = {
    Navigation: NavigationManager,
    Language: LanguageManager,
    Accessibility: AccessibilityManager,
    
    // Utility methods
    version: '2.2',
    
    reloadTranslations() {
        LanguageManager.applyLanguage(LanguageManager.getCurrentLanguage());
    },
    
    setLanguage(lang) {
        LanguageManager.switchLanguage(lang);
    },
    
    getCurrentLanguage() {
        return LanguageManager.getCurrentLanguage();
    }
};

/* ============================================
   PERFORMANCE OPTIMIZATIONS
============================================ */

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize window events
window.addEventListener('resize', debounce(() => {
    window.dispatchEvent(new CustomEvent('app:resize'));
}, 250));

window.addEventListener('scroll', throttle(() => {
    window.dispatchEvent(new CustomEvent('app:scroll'));
}, 100));

/* ============================================
   CONSOLE WELCOME MESSAGE
============================================ */

console.log(`
╔══════════════════════════════════════════╗
║     ECLIPSE OF WILL - Initialized        ║
║     Version: 2.2                         ║
║     Type: EclipseOfWill.help() for info  ║
╚══════════════════════════════════════════╝
`);

window.EclipseOfWill.help = function() {
    console.log(`
Available commands:
• EclipseOfWill.setLanguage('en' | 'ja')
• EclipseOfWill.getCurrentLanguage()
• EclipseOfWill.reloadTranslations()
• EclipseOfWill.Navigation
• EclipseOfWill.Language
• EclipseOfWill.Accessibility
`);
};