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
                fullText: "Yuno's ability to blend complex business requirements into actionable items for the product's team is truly remarkable. His communication skills along with his product expertise makes him a highly effective product manager.\n\nWe have worked together on two highly ambitious and successful initiatives that held a crucial role for our company wide OKRs. In both case we had a small timeframe to make it happen, so the planning beforehand was crucial. Yuno has done an outstanding job in both cases during the discovery phase and the planning itself, making it possibly to execute successfully.\n\nI could always trust and delegate to him, I knew by a fact that he would complete his tasks meticulously and by the designed deadline.\n\nOverall I cannot recommend Yuno enough, working with him has been a pleasure and frictionless.",
                author: "Asdullah Siddique",
                position: "Director of Engineering",
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
                excerpt: "During his journey in our company, I met a motivated person, always willing to learn and help, with excellent skills.",
                fullText: "I'm the Lead Engineer of the WefoxApp, and I've been working with Yuno since he was in Wefox. During his journey in our company, I met a motivated person, always willing to learn and help, with excellent skills, open to changes and new ideas, getting into the details of the functionality we had to develop, taking care of the quality of the documentation he does...\n\nHe will likely succeed at any company he goes to.",
                author: "Alfonso Matos",
                position: "Lead Engineer",
                avatar: "assets/testimonials/alfonso.jpeg"
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
                fullText: "Yuno and I worked as PMs in the same organisation at wefox. He stroke me as a great PM with extraordinary sector/product understanding and a big advocate for better UX and user testing practices at our company. As a very active part of our team, he helped to shape our product culture and made everyone around him better. I believe Yuno is a great professional and a great personality - hands down, I've never met anyone who didn't like him.\n\nYuno all the best for your upcoming adventures - you will be missed!",
                author: "Lars Neusesser",
                position: "Senior Product Manager",
                avatar: "assets/testimonials/lars.jpeg"
            },
            {
                excerpt: "His commitment to finding the best approach to enhance product offerings for the end-user is admirable.",
                fullText: "I had the pleasure of collaborating with Yuno during our time at Tomorrow University, although not directly in the same team. However, every interaction with Yuno was nothing short of exceptional. He possesses an impressive ability to listen attentively and ask the pertinent questions necessary to understand the heart of any problem at hand.\n\nWhat truly sets Yuno apart is his commitment to finding the best approach to enhance product offerings for the end-user. His dedication to understanding user needs and translating them into actionable strategies is admirable. His collaborative spirit and keen analytical skills make him an invaluable asset to any product development team.\n\nHis contributions undoubtedly lead to the creation of better, user-centric products. It was a privilege to have had the opportunity to collaborate with Yuno.",
                author: "Maria Alejandra Rivero Morros",
                position: "Admission Manager",
                avatar: "assets/testimonials/maria.jpeg"
            },
            {
                excerpt: "Working together with Yuno always felt productive, smooth and fun. I would collaborate with him again without hesitation.",
                fullText: "I had the pleasure of working with Yuno during his time at Tomorrow University. From the first interview with him it was clear that he is meticulous, has no problem thinking of creative solutions, and is able to break down complex issues in such a way that they become simple to understand.\n\nWorking together with Yuno always felt productive, smooth and fun. I would collaborate with him again without hesitation.",
                author: "Teun van Boxtel",
                position: "Full Stack Engineer",
                avatar: "assets/testimonials/teun.jpeg"
            },
            {
                excerpt: "He's super organized and has an excellent eye for detail. It was quite impressive to see him building and improving processes from the ground.",
                fullText: "I had the great pleasure to work with Yuno at Tomorrow University. From day 1 he showed interest in getting to know all people, current workflows and finding areas for improvement.\n\nHe is super organized and has an excellent eye for detail. It was quite impressive to see him building and improving processes from the ground. Even though we were part of different teams (Product x Marketing), he actively collaborated with other teams and was a real joy to work with.\n\nYuno's greatest asset for me is his personality, he is super funny, friendly and has this ability to remain calm under the storm. I will miss working with him and would do it again any day of the week. Any company that hires Yuno is lucky to have him",
                author: "Beatriz Freire",
                position: "CRM Manager",
                avatar: "assets/testimonials/beatriz.jpeg"
            },
            {
                excerpt: "Agile and innovative Product Manager",
                fullText: "Agile and innovative Product Manager",
                author: "Alexander Manuel Sumolang",
                position: "Full Stack Developer",
                avatar: "assets/testimonials/alexander.jpeg"
            },
            {
                excerpt: "Yuno is definitely a person, who you want to have in the team. He's professional, smart, caring, fun and supportive.",
                fullText: "Yuno is definitely a person, who you want to have in the team. He's professional, smart, caring, fun and supportive, but most importantly he has a good heart ❤️",
                author: "Jiri Jan",
                position: "Content Creator",
                avatar: "assets/testimonials/jiri.jpeg"
            },
            {
                excerpt: "Kevin can be valuable to any company that needs people have many qualities and skills, and who are committed, dedicated, organized, constantly learning and great team players.",
                fullText: "After showing great promise in his Customer Success role, Kevin joined my team taking an entry-level Product Management position. He was dedicated and reliable, and was always learning and growing. Kevin built good working relationships with his stakeholders, got to know our customers and users, and was able to manage his responsibilities. In the almost two years he was part of our team, Kevin was key in shaping the company culture we're proud of today.\n\nKevin can be valuable to any company that needs people have many qualities and skills, and who are committed, dedicated, organized, constantly learning and great team players.",
                author: "Rino Montiel",
                position: "CTO",
                avatar: "assets/testimonials/rino.jpeg"
            },
            {
                excerpt: "In the end, we launched a product that blew the clients and the users away.",
                fullText: "I was part of one of Kevin's cross-functional teams and we officially collaborated on launching an iOS app together. He did a lot of user research, flew out to conferences, talked with a ton of people, and always found information that we could work with. His insights on the users and use cases were very helpful and he was always easy to communicate with. He had a very good understanding of how to prioritise tickets, and even dismantling tickets into smaller pieces to make proper trade-offs and always reach our deadlines. In the end, we launched a product that blew the clients and the users away.\n\nAs an engineer, I appreciated a competent PM like Kevin and I would love to have a chance to work with him again some day.",
                author: "Kishore Vaddadi",
                position: "Mobile Engineer",
                avatar: "assets/testimonials/kishore.jpeg"
            },
            {
                excerpt: "He is both very intuitive and technically skilled, with a great perception between effort and necessity in terms of ticket prioritisation.",
                fullText: "Have the pleasure of working with Kevin as my team's Product Manager; he is both very intuitive and technically skilled, with a great perception between effort and necessity in terms of ticket prioritisation and implementation. Kevin's engaging personality, excellent communication and dedication to the projects he's involved in definitely makes it easier to navigate through the day-to-day work flow.\n\nOverall, he is also a very nice presence and person to be around, extremely respectful and joyful, without a doubt a key player in creating a healthy office environment. I'm sure he'll continue to impress and grow in his professional life, and I would most definitely work with him again.",
                author: "Sara Dias",
                position: "Analytics Engineer",
                avatar: "assets/testimonials/sara.jpeg"
            },
            {
                excerpt: "I have seen him be super reliable, passionate, committed to the company's success, and honestly be one of the most helpful people I know.",
                fullText: "I have worked with Kevin, but in a different team. I have however seen him be super reliable, passionate, committed to the company's success, and honestly be one of the most helpful people I know. His reliability, in particular, made him a core asset in the company. He's also always up for learning something new, which is how he got to the role of product. His insight on the users has been great and I think the company we worked at owes him a great deal of their success.\n\nThe team he worked in was extremely successful and is one of the core products of the company. Given the opportunity, I'd work with him again.",
                author: "Paula Babbicola",
                position: "Backend Developer",
                avatar: "assets/testimonials/paula.jpeg"
            },
            {
                excerpt: "Kevin played a key role in making our culture what it is today. He gets along with everyone and genuinely cares about his team.",
                fullText: "Kevin has been part of our team for almost 2 years. He started out in Customer Success, and we soon saw his potential to have a greater impact in Product Management. In his first role he showed how resilient he is and how important it is for him to empathise with our users. Even when times got stressful, his teammates would often describe him as helpful, friendly, and reliable.\n\nHis close contact with our users, his know-how regarding UX and his ability to understand technical issues very quickly gave him a very strong basis to go into Product Management, and his will to learn made the transition incredibly smooth - it's clear that PM is the perfect match for him. Kevin is passionate about our purpose, very curious, and takes pride in a job well done. This combination makes him a pleasure to work with, as he is constantly looking for projects through which he will develop his skills while getting us closer to our mission.\n\nKevin played a key role in making our culture what it is today. He gets along with everyone and genuinely cares about his team, so he is constantly looking for ways in which he can be helpful - whether inside or outside the office. I'd love to have the chance to work with Kevin again!",
                author: "Alexandra Ríos González",
                position: "HR / People Manager",
                avatar: "assets/testimonials/alexandra.jpeg"
            }
        ];
        
        this.createTestimonialCards(testimonialData);
    }
    
    createTestimonialCards(testimonials) {
        const container = document.querySelector('.testimonials-slider');
        if (!container) return;
        
        // Store all testimonials and setup show more functionality
        this.allTestimonials = testimonials;
        this.testimonialsToShow = 6;
        this.allTestimonialsVisible = false;
        
        // Clear existing content and setup
        container.innerHTML = '';
        container.className = 'testimonials-grid';
        
        // Render initial testimonials (first 6)
        this.renderTestimonialCards(testimonials.slice(0, this.testimonialsToShow), container);
        
        // Create show more button if there are more testimonials
        if (testimonials.length > this.testimonialsToShow) {
            this.createTestimonialShowMoreButton(container);
        }
        
        // Create LinkedIn recommendation invitation
        this.createLinkedInInvitation(container);
        
        // Create modal structure
        this.createTestimonialModal();
    }
    
    renderTestimonialCards(testimonials, container) {
        testimonials.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card glass-morph';
            card.innerHTML = `
                <div class="testimonial-quote">
                    <div class="quote-mark">"</div>
                    <p class="testimonial-excerpt">${testimonial.excerpt}</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.avatar}" alt="${testimonial.author}" class="testimonial-avatar">
                    <div class="testimonial-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
                <button class="testimonial-read-more">Read Full Testimonial</button>
            `;
            
            // Add click handler for modal
            card.addEventListener('click', () => {
                this.openTestimonialModal(testimonial);
            });
            
            container.appendChild(card);
        });
    }
    
    createTestimonialShowMoreButton(container) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'testimonial-show-more-container';
        
        this.testimonialShowMoreButton = document.createElement('button');
        this.testimonialShowMoreButton.className = 'testimonial-show-more-btn';
        this.testimonialShowMoreButton.textContent = `Show ${this.allTestimonials.length - this.testimonialsToShow} more testimonials`;
        
        this.testimonialShowMoreButton.addEventListener('click', () => {
            this.toggleTestimonials(container);
        });
        
        buttonContainer.appendChild(this.testimonialShowMoreButton);
        container.parentElement.appendChild(buttonContainer);
    }
    
    toggleTestimonials(container) {
        if (!this.allTestimonialsVisible) {
            // Show all testimonials
            const remainingTestimonials = this.allTestimonials.slice(this.testimonialsToShow);
            remainingTestimonials.forEach((testimonial, index) => {
                const card = document.createElement('div');
                card.className = 'testimonial-card glass-morph';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.innerHTML = `
                    <div class="testimonial-quote">
                        <div class="quote-mark">"</div>
                        <p class="testimonial-excerpt">${testimonial.excerpt}</p>
                    </div>
                    <div class="testimonial-author">
                        <img src="${testimonial.avatar}" alt="${testimonial.author}" class="testimonial-avatar">
                        <div class="testimonial-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.position}</p>
                        </div>
                    </div>
                    <button class="testimonial-read-more">Read Full Testimonial</button>
                `;
                
                // Add click handler
                card.addEventListener('click', () => {
                    this.openTestimonialModal(testimonial);
                });
                
                container.appendChild(card);
                
                // Animate in
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 * (index + 1));
            });
            
            this.testimonialShowMoreButton.textContent = 'Show less';
            this.allTestimonialsVisible = true;
        } else {
            // Hide extra testimonials
            const allCards = container.querySelectorAll('.testimonial-card');
            for (let i = allCards.length - 1; i >= this.testimonialsToShow; i--) {
                allCards[i].remove();
            }
            
            this.testimonialShowMoreButton.textContent = `Show ${this.allTestimonials.length - this.testimonialsToShow} more testimonials`;
            this.allTestimonialsVisible = false;
        }
    }
    
    createTestimonialModal() {
        const modal = document.createElement('div');
        modal.id = 'testimonial-modal';
        modal.className = 'testimonial-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content testimonial-modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-body">
                    <div class="testimonial-full-author">
                        <img src="" alt="" class="testimonial-full-avatar">
                        <div class="testimonial-full-info">
                            <h3 class="testimonial-full-name"></h3>
                            <p class="testimonial-full-position"></p>
                        </div>
                    </div>
                    <div class="testimonial-full-quote">
                        <div class="quote-mark large">"</div>
                        <div class="testimonial-full-text"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeTestimonialModal();
        });
        
        modal.querySelector('.modal-backdrop').addEventListener('click', () => {
            this.closeTestimonialModal();
        });
        
        // ESC key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeTestimonialModal();
            }
        });
    }
    
    openTestimonialModal(testimonial) {
        const modal = document.getElementById('testimonial-modal');
        if (!modal) return;
        
        // Populate modal content
        modal.querySelector('.testimonial-full-text').textContent = testimonial.fullText;
        modal.querySelector('.testimonial-full-avatar').src = testimonial.avatar;
        modal.querySelector('.testimonial-full-avatar').alt = testimonial.author;
        modal.querySelector('.testimonial-full-name').textContent = testimonial.author;
        modal.querySelector('.testimonial-full-position').textContent = testimonial.position;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeTestimonialModal() {
        const modal = document.getElementById('testimonial-modal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    createLinkedInInvitation(container) {
        const invitationContainer = document.createElement('div');
        invitationContainer.className = 'linkedin-invitation-container';
        invitationContainer.innerHTML = `
            <div class="linkedin-invitation">
                <p class="invitation-text">Have we worked together before? 👀</p>
                <a href="https://www.linkedin.com/in/kmyung91/edit/forms/recommendation/write/?profileFormEntryPoint=PROFILE_SECTION&profileUrn=urn%3Ali%3Afsd_profile%3AACoAAA0HKO8Bq3w1NnjSkZusavxTOEt9V0oyC6g&trackingId=6P4m90%2FfRlKaFe1zdboOvA%3D%3D" 
                   target="_blank" 
                   rel="noopener"
                   class="linkedin-invitation-btn">
                    Give recommendation
                </a>
                <p class="continue-reading-text">...or continue reading</p>
            </div>
        `;
        
        container.parentElement.appendChild(invitationContainer);
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
});