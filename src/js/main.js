// Main Application Controller

class App {
    constructor() {
        this.init();
    }
    
    init() {
        this.setCurrentYear();
        this.initTestimonials();
        this.initExperiences();
        this.initContactForm();
        this.initScrollEffects();
        this.initServiceButtons();
    }
    
    setCurrentYear() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    initTestimonials() {
        const testimonialData = [
            {
                text: "Yuno is an exceptional product manager who consistently delivers results. His ability to bridge design and development makes him invaluable to any team.",
                author: "Alexandra Smith",
                position: "CEO, Tech Startup",
                avatar: "assets/testimonials/alexandra.jpg"
            },
            {
                text: "Working with Yuno was a game-changer for our project. His UX expertise and technical knowledge helped us create something truly special.",
                author: "Michael Chen",
                position: "CTO, SaaS Company",
                avatar: "assets/testimonials/michael.jpg"
            },
            {
                text: "Yuno's attention to detail and user-centric approach transformed our app. The results exceeded all our expectations.",
                author: "Sarah Johnson",
                position: "Head of Product, E-commerce",
                avatar: "assets/testimonials/sarah.jpg"
            }
        ];
        
        this.createTestimonialSlider(testimonialData);
    }
    
    createTestimonialSlider(testimonials) {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;
        
        // Create testimonial items
        testimonials.forEach((testimonial, index) => {
            const item = document.createElement('div');
            item.className = `testimonial-item ${index === 0 ? 'active' : ''}`;
            item.innerHTML = `
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <img src="${testimonial.avatar}" alt="${testimonial.author}" class="testimonial-avatar">
                    <div class="testimonial-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            `;
            slider.appendChild(item);
        });
        
        // Auto-rotate testimonials
        let currentIndex = 0;
        setInterval(() => {
            const items = slider.querySelectorAll('.testimonial-item');
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 5000);
    }
    
    initExperiences() {
        const experienceData = [
            {
                title: "Senior Product Manager",
                company: "Wefox",
                period: "2023 - Present",
                description: "Leading product strategy for digital insurance platform, managing cross-functional teams to deliver user-centric solutions."
            },
            {
                title: "UX/UI Designer & Developer",
                company: "Freelance",
                period: "2021 - 2023",
                description: "Designed and developed digital products for startups and established companies, specializing in user experience optimization."
            },
            {
                title: "Product Designer",
                company: "Stealth Startup",
                period: "2020 - 2021",
                description: "Led design efforts for innovative fintech product, from concept to launch, focusing on user research and interface design."
            }
        ];
        
        this.createExperienceTimeline(experienceData);
    }
    
    createExperienceTimeline(experiences) {
        const timeline = document.querySelector('.experience-timeline');
        if (!timeline) return;
        
        experiences.forEach(experience => {
            const item = document.createElement('div');
            item.className = 'experience-item';
            item.innerHTML = `
                <h3>${experience.title}</h3>
                <h4>${experience.company}</h4>
                <p class="experience-period">${experience.period}</p>
                <p>${experience.description}</p>
            `;
            timeline.appendChild(item);
        });
    }
    
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // In production, replace with actual form handler
                await this.simulateFormSubmission(formData);
                
                // Success
                submitBtn.textContent = 'Message Sent!';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
                
            } catch (error) {
                // Error
                submitBtn.textContent = 'Error - Try Again';
                console.error('Form submission error:', error);
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
    
    async simulateFormSubmission(formData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate
                    resolve();
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }
    
    initScrollEffects() {
        // Smooth scroll for internal links
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-scroll-to]')) {
                e.preventDefault();
                const target = e.target.getAttribute('data-scroll-to');
                this.smoothScrollTo(target);
            }
        });
        
        // Fade in elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should fade in
        document.querySelectorAll('.service-card, .experience-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;
        
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    initServiceButtons() {
        const serviceButtons = document.querySelectorAll('.service-cta');
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const service = e.target.getAttribute('data-service');
                this.openContactModal(service);
            });
        });
    }
    
    openContactModal(service) {
        // Pre-fill contact form or show service-specific message
        const messageField = document.getElementById('message');
        if (messageField) {
            const serviceMessages = {
                design: "Hi! I'm interested in your UX/UI design services...",
                development: "Hi! I'd like to discuss a development project...",
                product: "Hi! I'm looking for product management expertise..."
            };
            
            messageField.value = serviceMessages[service] || "Hi! I'd like to discuss working together...";
        }
        
        // Scroll to contact form
        this.smoothScrollTo('#contact');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    
    // Note: Fluid simulation is initialized separately in fluid-simulation.js
});