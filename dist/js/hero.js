// Hero Section Functionality

// Typed Text Effect
class TypedText {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.phraseIndex = 0;
        this.letterIndex = 0;
        this.isDeleting = false;
        
        this.options = {
            typeSpeed: options.typeSpeed || 50,
            deleteSpeed: options.deleteSpeed || 30,
            pauseEnd: options.pauseEnd || 2000,
            pauseStart: options.pauseStart || 500,
            ...options
        };
        
        this.type();
    }
    
    type() {
        const currentPhrase = this.phrases[this.phraseIndex];
        const currentText = currentPhrase.substring(0, this.letterIndex);
        
        this.element.textContent = currentText;
        
        if (!this.isDeleting) {
            // Typing
            if (this.letterIndex < currentPhrase.length) {
                this.letterIndex++;
                setTimeout(() => this.type(), this.options.typeSpeed);
            } else {
                // Finished typing, pause then delete
                this.isDeleting = true;
                setTimeout(() => this.type(), this.options.pauseEnd);
            }
        } else {
            // Deleting
            if (this.letterIndex > 0) {
                this.letterIndex--;
                setTimeout(() => this.type(), this.options.deleteSpeed);
            } else {
                // Finished deleting, move to next phrase
                this.isDeleting = false;
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
                setTimeout(() => this.type(), this.options.pauseStart);
            }
        }
    }
}

// Smooth Scroll
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function
        const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Initialize Hero
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typed text
    const typedElement = document.querySelector('.typed-output');
    if (typedElement) {
        const phrases = [
            '✨ Product Manager',
            '🎨 UX/UI Designer',
            '🌐 Web/Mobile Developer',
            '🧠 Entrepreneur',
            '🧩 User Researcher'
        ];
        
        new TypedText(typedElement, phrases);
    }
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.hero-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const target = ctaButton.getAttribute('data-scroll-to');
            smoothScrollTo(target);
        });
    }
    
    // Parallax effect on scroll
    const heroContent = document.querySelector('.hero-content');
    
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
});