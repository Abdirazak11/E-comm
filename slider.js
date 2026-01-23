/**
 * Dubai2Djib Image Slider
 * Auto-sliding hero section with manual controls
 */

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let slideInterval;

/**
 * Show specific slide
 * @param {number} n - Slide index
 */
function showSlide(n) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calculate current slide (loop around if needed)
    currentSlide = (n + slides.length) % slides.length;
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Change slide by offset
 * @param {number} n - Offset (+1 for next, -1 for previous)
 */
function changeSlide(n) {
    showSlide(currentSlide + n);
    resetInterval();
}

/**
 * Go to specific slide
 * @param {number} n - Slide index
 */
function goToSlide(n) {
    showSlide(n);
    resetInterval();
}

/**
 * Reset auto-play interval
 */
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

/**
 * Initialize slider
 */
function initSlider() {
    // Start auto-play
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            resetInterval();
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}