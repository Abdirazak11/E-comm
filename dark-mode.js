/**
 * Dark Mode Toggle - 2026 Friendly
 * Respects system preferences and saves user choice
 */

// Check for saved theme preference or default to system preference
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Apply theme to document
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0f0f' : '#ffffff');
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Initialize theme on page load
function initTheme() {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // Add theme toggle button to navbar
    addThemeToggle();
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Add theme toggle button to navbar
function addThemeToggle() {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.setAttribute('title', 'Toggle theme');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Insert before language switcher
    const langSwitcher = navRight.querySelector('.lang-switcher');
    if (langSwitcher) {
        navRight.insertBefore(themeToggle, langSwitcher);
    } else {
        navRight.appendChild(themeToggle);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

/**
 * Advanced Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing for better performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize scroll reveal
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
    initScrollReveal();
}

/**
 * Particle Background Effect (Optional - Subtle)
 */
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${(i % 2) + 1}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        hero.appendChild(particle);
        particles.push(particle);
    }
    
    // Clean up particles when hero is not visible (performance)
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            particles.forEach(particle => {
                particle.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
        });
    });
    
    heroObserver.observe(hero);
}

// Optionally enable particles (uncomment to activate)
// document.addEventListener('DOMContentLoaded', createParticles);

/**
 * 3D Card Tilt Effect
 */
function init3DCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize 3D card effects
document.addEventListener('DOMContentLoaded', init3DCards);

/**
 * Smooth Page Transitions
 */
function initPageTransitions() {
    // Add fade-in effect on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    
    // Handle internal link clicks
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize page transitions
initPageTransitions();

/**
 * Performance Monitoring (Optional)
 */
function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`🚀 Page loaded in ${loadTime}ms`);
            
            // Log Core Web Vitals if available
            if (window.PerformanceObserver) {
                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('📊 LCP:', lastEntry.renderTime || lastEntry.loadTime);
                }).observe({ entryTypes: ['largest-contentful-paint'] });
                
                // First Input Delay
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log('⚡ FID:', entry.processingStart - entry.startTime);
                    });
                }).observe({ entryTypes: ['first-input'] });
            }
        });
    }
}

// Enable performance monitoring in development
// logPerformance();

/**
 * Progressive Image Loading
 */
function initProgressiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before image enters viewport
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize progressive images
document.addEventListener('DOMContentLoaded', initProgressiveImages);

/**
 * Accessibility: Keyboard Navigation Enhancement
 */
function enhanceKeyboardNav() {
    // Add keyboard support for custom elements
    document.querySelectorAll('.slider-arrow, .slider-dot').forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', enhanceKeyboardNav);