/**
 * Dubai2Djib Website JavaScript
 * Modern, responsive website functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    initializeHeroWhatsApp();
    initializeAllWhatsAppLinks();
});

/**
 * Initialize WhatsApp button in hero section
 */
function initializeHeroWhatsApp() {
    const heroBtn = document.getElementById('hero-whatsapp-btn');
    if (heroBtn && typeof CONFIG !== 'undefined' && CONFIG.whatsappNumber) {
        const message = 'Hello! I am interested in your trading services between Dubai and Djibouti/USA.';
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    }
}

/**
 * Initialize all WhatsApp links
 */
function initializeAllWhatsAppLinks() {
    if (typeof CONFIG === 'undefined' || !CONFIG.whatsappNumber) return;
    
    const message = 'Hello! I am interested in your trading services between Dubai and Djibouti/USA.';
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Contact section WhatsApp
    const contactLink = document.getElementById('contact-whatsapp-link');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(whatsappURL, '_blank');
        });
    }
    
    // Footer WhatsApp
    const footerLink = document.getElementById('footer-whatsapp-link');
    if (footerLink) {
        footerLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(whatsappURL, '_blank');
        });
    }
}

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    setupSmoothScrolling();
    setupNavbarScrollEffect();
    setupScrollAnimations();
    setupContactForm();
    setupMobileMenu();
}

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Setup navbar scroll effect - changes appearance on scroll
 */
function setupNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Setup scroll-triggered animations using Intersection Observer
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        animationObserver.observe(element);
    });
}

/**
 * Setup contact form with WhatsApp integration
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

/**
 * Handle contact form submission
 * @param {Event} e - Form submission event
 */
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = getFormData();
    
    // Validate form data
    if (!validateFormData(formData)) {
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage(formData);
    
    // Open WhatsApp with the message
    openWhatsApp(whatsappMessage);
    
    // Show success feedback
    showSuccessMessage();
    
    // Reset form
    resetForm();
}

/**
 * Get form data from contact form
 * @returns {Object} Form data object
 */
function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim()
    };
}

/**
 * Validate form data
 * @param {Object} formData - Form data to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateFormData(formData) {
    // Check required fields
    if (!formData.name || !formData.email || !formData.message) {
        showErrorMessage('Please fill in all required fields.');
        return false;
    }
    
    // Validate email format
    if (!isValidEmail(formData.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    // Validate message length
    if (formData.message.length < 10) {
        showErrorMessage('Please enter a more detailed message (at least 10 characters).');
        return false;
    }
    
    return true;
}

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Create WhatsApp message from form data
 * @param {Object} formData - Form data object
 * @returns {string} Formatted WhatsApp message
 */
function createWhatsAppMessage(formData) {
    let message = '*New Inquiry from Dubai2Djib Website*\n\n';
    message += `*Name:* ${formData.name}\n`;
    message += `*Email:* ${formData.email}\n`;
    
    if (formData.phone) {
        message += `*Phone:* ${formData.phone}\n`;
    }
    
    message += `*Message:* ${formData.message}\n\n`;
    message += '_Sent via Dubai2Djib.com_';
    
    return message;
}

/**
 * Open WhatsApp with pre-filled message
 * @param {string} message - Message to send
 */
function openWhatsApp(message) {
    const whatsappNumber = CONFIG.whatsappNumber;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.location.href = whatsappURL;
}

/**
 * Show success message to user
 */
function showSuccessMessage() {
    // Create success notification
    const notification = createNotification('success', 'Message sent! Redirecting to WhatsApp...');
    showNotification(notification);
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const notification = createNotification('error', message);
    showNotification(notification);
}

/**
 * Create notification element
 * @param {string} type - Notification type (success, error, info)
 * @param {string} message - Notification message
 * @returns {HTMLElement} Notification element
 */
function createNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 5px;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;
    
    return notification;
}

/**
 * Get notification icon based on type
 * @param {string} type - Notification type
 * @returns {string} FontAwesome icon class
 */
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-bell';
    }
}

/**
 * Show notification with animation
 * @param {HTMLElement} notification - Notification element to show
 */
function showNotification(notification) {
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Reset contact form
 */
function resetForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
    }
}

/**
 * Setup mobile menu functionality
 */
function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuButton = document.querySelector('.mobile-menu');
    
    if (navMenu && mobileMenuButton) {
        const isOpen = navMenu.classList.contains('mobile-open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuButton = document.querySelector('.mobile-menu');
    
    navMenu.classList.add('mobile-open');
    mobileMenuButton.classList.add('active');
    
    // Add mobile menu styles
    navMenu.style.cssText = `
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        padding: 2rem;
        border-radius: 0 0 20px 20px;
        animation: slideDown 0.3s ease;
    `;
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuButton = document.querySelector('.mobile-menu');
    
    navMenu.classList.remove('mobile-open');
    mobileMenuButton.classList.remove('active');
    navMenu.style.cssText = '';
}

/**
 * Handle scroll-based animations for statistics
 */
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat h3');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Animate counter numbers
 * @param {HTMLElement} element - Counter element to animate
 */
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const suffix = element.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

/**
 * Setup lazy loading for images
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Setup scroll-to-top button
 */
function setupScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupCounterAnimations();
    setupLazyLoading();
    setupScrollToTop();
});

// Add CSS animations for mobile menu
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { 
            opacity: 0; 
            transform: translateY(-20px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    .mobile-menu.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.4) !important;
    }
`;
document.head.appendChild(style);
// 
function detectUserPreferences() {
    // Detect user's location and show relevant products
    const userRegion = detectRegion(); // Djibouti vs USA
    
    // Auto-translate based on browser language
    const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
    switchLanguage(browserLang);
    
    // Show personalized product recommendations
    showRegionalProducts(userRegion);
}
//voice search
function initVoiceSearch() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = currentLang === 'fr' ? 'fr-FR' : 'en-US';
        
        // Add voice search button
        const voiceBtn = document.createElement('button');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.onclick = () => recognition.start();
        
        recognition.onresult = (e) => {
            const query = e.results[0][0].transcript;
            searchProducts(query);
        };
    }
}
function initInfiniteScroll() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreProducts();
        }
    });
    
    const sentinel = document.querySelector('.products-grid-end');
    if (sentinel) observer.observe(sentinel);
}

