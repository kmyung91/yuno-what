// Story Section Scroll Animations

class StoryAnimations {
    constructor() {
        this.video = document.querySelector('.story-video');
        this.revealElements = document.querySelectorAll('.reveal-text');
        this.fadeRevealElements = document.querySelectorAll('.fade-reveal');
        this.storySection = document.querySelector('.story-section');
        
        this.init();
    }
    
    init() {
        if (!this.storySection) return;
        
        this.setupVideoAnimation();
        this.setupTextReveals();
        this.setupFadeRevealAnimations();
    }
    
    setupVideoAnimation() {
        if (!this.video) return;
        
        // Create observer for video fade in/out
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.video.classList.add('visible');
                    // Start playing when visible
                    this.video.play().catch(() => {
                        // Handle autoplay restrictions
                        console.log('Video autoplay blocked');
                    });
                } else {
                    this.video.classList.remove('visible');
                    this.video.pause();
                }
            });
        }, {
            threshold: 0.1
        });
        
        videoObserver.observe(this.storySection);
    }
    
    setupTextReveals() {
        if (!this.revealElements.length) return;
        
        // Create observer for text reveals
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Calculate visibility based on position in viewport
                    const rect = entry.boundingClientRect;
                    const windowHeight = window.innerHeight;
                    const elementCenter = rect.top + rect.height / 2;
                    const windowCenter = windowHeight / 2;
                    const distance = Math.abs(elementCenter - windowCenter);
                    const maxDistance = windowHeight / 2;
                    
                    // Add active class when element is near center of viewport
                    if (distance < maxDistance * 0.3) {
                        entry.target.classList.add('active');
                    } else {
                        entry.target.classList.remove('active');
                    }
                }
            });
        }, {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-20% 0px -20% 0px' // Focus on center of viewport
        });
        
        // Observe all reveal elements
        this.revealElements.forEach(el => {
            revealObserver.observe(el);
        });
        
        // Also handle scroll for smooth opacity transitions
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateTextOpacity();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll);
    }
    
    updateTextOpacity() {
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;
        
        this.revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - windowCenter);
            const maxDistance = windowHeight / 3;
            
            // Calculate opacity based on distance from center
            let opacity = 1 - (distance / maxDistance);
            opacity = Math.max(0.2, Math.min(1, opacity));
            
            // Apply smooth transition
            element.style.opacity = opacity;
        });
    }
    
    setupFadeRevealAnimations() {
        // Check if browser supports animation-timeline
        const supportsAnimationTimeline = CSS.supports('animation-timeline', 'view()');
        
        if (supportsAnimationTimeline) {
            // Modern browsers will use CSS animations
            return;
        }
        
        // Safari fallback - handle all animated elements
        const allAnimatedElements = document.querySelectorAll('.fade-reveal, .story-text span, .story-heading');
        
        if (!allAnimatedElements.length) return;
        
        // Create observer for fade reveal elements
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class with a slight delay based on element index
                    const allElements = Array.from(allAnimatedElements);
                    const index = allElements.indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); // 100ms delay between each element
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-10% 0px -10% 0px'
        });
        
        // Observe all animated elements
        allAnimatedElements.forEach(el => {
            fadeObserver.observe(el);
        });
        
        // Also handle video visibility
        if (this.video) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.video.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            videoObserver.observe(this.video);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new StoryAnimations();
});