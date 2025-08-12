// Main Application Controller

class App {
    constructor() {
        this.init();
    }
    
    init() {
        this.setCurrentYear();
        this.initTestimonials();
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
                excerpt: "Yuno's ability to blend complex business requirements into actionable items is truly remarkable.",
                fullText: "Yuno's ability to blend complex business requirements into actionable items for the product's team is truly remarkable. His communication skills along with his product expertise makes him a highly effective product manager.\n\nWe have worked together on two highly ambitious and successful initiatives that held a crucial role for our company wide OKRs. In both case we had a small timeframe to make it happen, so the planning beforehand was crucial.\nYuno has done an outstanding job in both cases during the discovery phase and the planning itself, making it possibly to execute successfully.\n\nI could always trust and delegate to him, I knew by a fact that he would complete his tasks meticulously and by the designed deadline.\n\nOverall I cannot recommend Yuno enough, working with him has been a pleasure and frictionless.",
                author: "Asdullah Siddique",
                position: "Engineering Manager",
                avatar: "assets/testimonials/asdullah.jpeg"
            },
            {
                excerpt: "Yuno possesses a rare blend of strategic foresight and practical know-how that makes him a formidable force in product development.",
                fullText: "I had the pleasure of working with Yuno Myung at Tomorrow University, where we collaborated closely on our core product initiatives. The quality of a product manager can significantly impact the design process, which is why I was thrilled to work alongside someone of Yuno's caliber.\n\nIn my experience working with numerous product managers, Yuno truly stands out. He possesses a rare blend of strategic foresight and practical know-how that makes him a formidable force in product development. Yuno is not only punctual and exceptionally organized, but he also has a deep technical understanding that enhances the effectiveness of his teams. His ability to articulate clear product visions and defend his strategic decisions is noteworthy. Even when facing challenges, Yuno remains open to feedback, thoughtfully considering other perspectives to achieve the best outcomes.\n\nYuno's contributions have been vital to the success of our latest product enhancements, and it's genuinely disappointing that our professional paths are diverging. Working with him has been a highlight of my career, and I enthusiastically recommend Yuno to any organization looking for a visionary product manager.",
                author: "Lilian Desvaux de Marigny",
                position: "Product Designer",
                avatar: "assets/testimonials/lilian.jpeg"
            },
            {
                excerpt: "He has the perfect balance between request and flexibility, always willing to listen to the whole team's ideas.",
                fullText: "Working with Yuno has been amazing. He's really user-centred, has great ideas and is such a joy to have him in a team.\n\nFor me, Yuno has the perfect balance between request and flexibility. You will always find an open person, that is willing to listen to the whole team's ideas or technical concerns so the product delivered is not only good but also scalable and bug-free.\n\nYuno always has a kind word and does not hesitate to give a word of support when needed or to congratulate his colleagues and team for their achievements.",
                author: "Silvia España Gil",
                position: "iOS Developer",
                avatar: "assets/testimonials/silvia.jpeg"
            },
            {
                excerpt: "He stroke me as a great PM with extraordinary sector understanding and a big advocate for better UX practices.",
                fullText: "Yuno and I worked as PMs in the same organisation at wefox.\nHe stroke me as a great PM with extraordinary sector/product understanding and a big advocate for better UX and user testing practices at our company. As a very active part of our team, he helped to shape our product culture and made everyone around him better.\nI believe Yuno is a great professional and a great personality - hands down, I've never met anyone who didn't like him.\nYuno all the best for your upcoming adventures - you will be missed!",
                author: "Lars Neusesser",
                position: "Senior Product Manager",
                avatar: "assets/testimonials/lars.jpeg"
            },
            {
                excerpt: "Working together with Yuno always felt productive, smooth and fun. I would collaborate with him again without hesitation.",
                fullText: "I had the pleasure of working with Yuno during his time at Tomorrow University. From the first interview with him it was clear that he is meticulous, has no problem thinking of creative solutions, and is able to break down complex issues in such a way that they become simple to understand.\n\nWorking together with Yuno always felt productive, smooth and fun. I would collaborate with him again without hesitation.",
                author: "Teun van Boxtel",
                position: "Full Stack Engineer",
                avatar: "assets/testimonials/teun.jpeg"
            },
            {
                excerpt: "In the end, we launched a product that blew the clients and the users away.",
                fullText: "I was part of one of Kevin's cross-functional teams and we officially collaborated on launching an iOS app together.\nHe did a lot of user research, flew out to conferences, talked with a ton of people, and always found information that we could work with.\nHis insights on the users and use cases were very helpful and he was always easy to communicate with.\nHe had a very good understanding of how to prioritise tickets, and even dismantling tickets into smaller pieces to make proper trade-offs and always reach our deadlines.\nIn the end, we launched a product that blew the clients and the users away.\n\nAs an engineer, I appreciated a competent PM like Kevin and I would love to have a chance to work with him again some day.",
                author: "Kishore Vaddadi",
                position: "Mobile Engineer",
                avatar: "assets/testimonials/kishore.jpeg"
            }
        ];
        
        this.createTestimonialCards(testimonialData);
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