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
        this.initSectionTitleAnimations();
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
                excerpt: "He struck me as a great PM with extraordinary sector understanding and a big advocate for better UX practices.",
                fullText: "Yuno and I worked as PMs in the same organisation at wefox. He struck me as a great PM with extraordinary sector/product understanding and a big advocate for better UX and user testing practices at our company. As a very active part of our team, he helped to shape our product culture and made everyone around him better. I believe Yuno is a great professional and a great personality - hands down, I've never met anyone who didn't like him.\n\nYuno all the best for your upcoming adventures - you will be missed!",
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
        
        // LinkedIn invitation will be created only when showing more testimonials
        
        // Create modal structure
        this.createTestimonialModal();
        
        // Setup scroll animations for testimonials
        this.setupTestimonialScrollAnimations();
        
        // Replace feather icons after DOM is updated
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    renderTestimonialCards(testimonials, container) {
        testimonials.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card glass-morph';
            card.innerHTML = `
                <div class="testimonial-quote">
                    <svg class="quote-open" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p class="testimonial-excerpt">${testimonial.excerpt}</p>
                    <svg class="quote-close" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                    </svg>
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
        
        // Replace feather icons after adding cards
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
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
    
    setupTestimonialScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe all testimonial cards
        setTimeout(() => {
            document.querySelectorAll('.testimonial-card').forEach((card, index) => {
                // Add staggered delay for entrance animation
                card.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(card);
            });
        }, 100);
        
        // Store observer for later use with "show more" cards
        this.testimonialObserver = observer;
    }
    
    toggleTestimonials(container) {
        if (!this.allTestimonialsVisible) {
            // Show all testimonials
            const remainingTestimonials = this.allTestimonials.slice(this.testimonialsToShow);
            remainingTestimonials.forEach((testimonial, index) => {
                const card = document.createElement('div');
                card.className = 'testimonial-card glass-morph';
                card.innerHTML = `
                    <div class="testimonial-quote">
                        <i data-feather="quote" class="quote-mark quote-open"></i>
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
                
                // Set staggered delay for animation
                card.style.transitionDelay = `${(this.testimonialsToShow + index) * 0.1}s`;
                
                container.appendChild(card);
                
                // Add to scroll observer
                if (this.testimonialObserver) {
                    this.testimonialObserver.observe(card);
                }
            });
            
            // Add LinkedIn invitation as the final card
            this.createLinkedInInvitationCard(container);
            
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
        modal.className = 'modal testimonial-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal"></button>
                <div class="modal-body">
                    <div class="testimonial-full-author">
                        <img src="" alt="" class="testimonial-full-avatar">
                        <div class="testimonial-full-info">
                            <h3 class="testimonial-full-name"></h3>
                            <p class="testimonial-full-position"></p>
                        </div>
                    </div>
                    <div class="testimonial-quote">
                        <svg class="quote-open" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <div class="testimonial-full-text"></div>
                        <svg class="quote-close" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                        </svg>
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
    
    createLinkedInInvitationCard(container) {
        const invitationCard = document.createElement('div');
        invitationCard.className = 'testimonial-card linkedin-invitation-container';
        invitationCard.innerHTML = `
            <div class="linkedin-invitation">
                <p class="invitation-text">Have we worked together before? 👀</p>
                <a href="https://www.linkedin.com/in/kmyung91/edit/forms/recommendation/write/?profileFormEntryPoint=PROFILE_SECTION&profileUrn=urn%3Ali%3Afsd_profile%3AACoAAA0HKO8Bq3w1NnjSkZusavxTOEt9V0oyC6g&trackingId=6P4m90%2FfRlKaFe1zdboOvA%3D%3D" 
                   target="_blank" 
                   rel="noopener"
                   class="linkedin-invitation-btn">
                    Give recommendation
                </a>
            </div>
        `;
        
        // Set animation delay to appear after all testimonials
        const totalItems = this.allTestimonials.length;
        invitationCard.style.transitionDelay = `${totalItems * 0.1}s`;
        
        container.appendChild(invitationCard);
        
        // Add to scroll observer
        if (this.testimonialObserver) {
            this.testimonialObserver.observe(invitationCard);
        }
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
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe elements that should fade in
        document.querySelectorAll('.experience-item, .fade-in-element').forEach((el, index) => {
            // Add staggered delay for elements
            if (el.classList.contains('fade-in-element')) {
                el.style.transitionDelay = `${index * 0.1}s`;
            }
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
                this.openServiceModal(service);
            });
        });
        
        // Create service modal
        this.createServiceModal();
        
        // Remove the old tilt effect - service cards now use simple hover from CSS
    }
    
    
    createServiceModal() {
        const modal = document.createElement('div');
        modal.id = 'service-modal';
        modal.className = 'modal service-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="service-modal-header">
                    <button class="modal-close" aria-label="Close modal"></button>
                    <h2 class="service-modal-title"></h2>
                    <p class="service-modal-subtitle"></p>
                </div>
                <div class="modal-body">
                    <!-- Service details will be dynamically loaded -->
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeServiceModal();
        });
        
        modal.querySelector('.modal-backdrop').addEventListener('click', () => {
            this.closeServiceModal();
        });
        
        modal.querySelector('.contact-cta').addEventListener('click', () => {
            this.closeServiceModal();
            setTimeout(() => {
                this.smoothScrollTo('#contact');
                this.prefillContactForm();
            }, 300);
        });
        
        // ESC key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeServiceModal();
            }
        });
    }
    
    openServiceModal(service) {
        const modal = document.getElementById('service-modal');
        if (!modal) return;
        
        // Store the service for later use in contact form
        this.selectedService = service;
        
        const serviceData = {
            design: {
                title: 'UX/UI Design',
                subtitle: 'From wireframes to wow moments',
                content: `
                    <div class="service-section">
                        <h3>Design That Developers Actually Want to Build</h3>
                        <p>I create designs that aren't just beautiful—they're technically sound and strategically smart. Perfect for founders who need to visualize their vision, pitch to investors, or brief developers.</p>
                        <ul class="service-features">
                            <li>User research & competitive analysis</li>
                            <li>Information architecture & user flows</li>
                            <li>Wireframing & interactive prototyping</li>
                            <li>Visual design & component systems</li>
                            <li>Developer-friendly handoff documentation</li>
                            <li>Mobile-first responsive design</li>
                        </ul>
                    </div>
                    
                    <div class="service-section">
                        <h3>Investment Options</h3>
                        <div class="service-packages">
                            <div class="service-package">
                                <h4>Design Foundation</h4>
                                <div class="price">Starting at €2,000</div>
                                <p>Essential design work to get your project moving forward.</p>
                                <ul class="service-features">
                                    <li>Core wireframes & user flows</li>
                                    <li>Visual design & style direction</li>
                                    <li>Developer-ready specifications</li>
                                    <li>Mobile-first responsive design</li>
                                </ul>
                            </div>
                            <div class="service-package">
                                <h4>Complete Design System</h4>
                                <div class="price">Custom pricing</div>
                                <p>Comprehensive design solution scaled to your specific needs.</p>
                                <ul class="service-features">
                                    <li>Full user research & strategy</li>
                                    <li>High-fidelity designs & prototypes</li>
                                    <li>Reusable component library</li>
                                    <li>Developer handoff & ongoing support</li>
                                    <li>Iterative design process</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            development: {
                title: 'Development',
                subtitle: 'Code that scales with your ambitions',
                content: `
                    <div class="service-section">
                        <h3>Frontend & Mobile Specialist</h3>
                        <p>I excel at creating beautiful, fast user experiences built on strong foundations. While others focus on flashy features, I nail the core fundamentals that make apps fast, reliable, and scalable. Perfect for businesses who need polished user interfaces that work flawlessly across devices.</p>
                        <ul class="service-features">
                            <li>React Native mobile apps (iOS & Android)</li>
                            <li>Modern web frontends (React, Vue, Next.js)</li>
                            <li>E-commerce & Shopify customization</li>
                            <li>Landing pages & marketing sites</li>
                            <li>Third-party API integrations</li>
                            <li>Performance optimization & deployment</li>
                        </ul>
                    </div>
                    
                    <div class="service-section">
                        <h3>Development Options</h3>
                        <div class="service-packages">
                            <div class="service-package">
                                <h4>Web Development</h4>
                                <div class="price">Starting at €2,500</div>
                                <p>Professional websites and e-commerce that convert visitors into customers.</p>
                                <ul class="service-features">
                                    <li>Modern responsive websites</li>
                                    <li>E-commerce & Shopify setup</li>
                                    <li>Landing page optimization</li>
                                    <li>SEO & performance optimization</li>
                                    <li>Analytics & conversion tracking</li>
                                </ul>
                            </div>
                            <div class="service-package">
                                <h4>Mobile Applications</h4>
                                <div class="price">€5,000 - €25,000+</div>
                                <p>Cross-platform mobile apps from simple MVPs to full-featured applications.</p>
                                <ul class="service-features">
                                    <li>React Native for iOS & Android</li>
                                    <li>MVP apps & prototypes (€5k-10k)</li>
                                    <li>Full-featured apps (€15k-25k+)</li>
                                    <li>App store deployment & optimization</li>
                                    <li>Backend integration when needed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            product: {
                title: 'Product Management',
                subtitle: 'Your technical co-pilot from idea to launch',
                content: `
                    <div class="service-section">
                        <h3>The Rare Combo: Business Sense + Technical Expertise</h3>
                        <p>I bridge the gap between vision and execution. Perfect for startups who need someone who speaks both business and code. I've built successful products from 0 to scale—and I can do the same for you.</p>
                        <ul class="service-features">
                            <li>Product strategy & competitive positioning</li>
                            <li>User research & data-driven decisions</li>
                            <li>Technical roadmap & feasibility planning</li>
                            <li>Cross-functional team coordination</li>
                            <li>Go-to-market strategy & launch execution</li>
                            <li>Team scaling & process optimization</li>
                        </ul>
                    </div>
                    
                    <div class="service-section">
                        <h3>Partnership Models</h3>
                        <div class="service-packages">
                            <div class="service-package">
                                <h4>Strategic Consulting</h4>
                                <div class="price">€111.11/hour</div>
                                <p>Project-based product strategy and technical guidance.</p>
                                <ul class="service-features">
                                    <li>Product audits & strategic planning</li>
                                    <li>Market research & competitive analysis</li>
                                    <li>Technical roadmap development</li>
                                    <li>Team process optimization</li>
                                    <li>Go-to-market strategy</li>
                                </ul>
                            </div>
                            <div class="service-package">
                                <h4>Ongoing Partnership</h4>
                                <div class="price">€7,000-10,000/month</div>
                                <p>Turn your ideas into shipped products. Part-time embedded leadership (15-25 hours/week).</p>
                                <ul class="service-features">
                                    <li>From idea to launch execution</li>
                                    <li>Cross-functional team coordination</li>
                                    <li>Weekly planning & rapid iteration</li>
                                    <li>Technical feasibility & roadmapping</li>
                                    <li>Performance tracking & optimization</li>
                                    <li>Full-time positions from €85k+/year</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            }
        };
        
        const data = serviceData[service];
        if (!data) return;
        
        // Reset scroll position to top
        const modalBody = modal.querySelector('.modal-body');
        modalBody.scrollTop = 0;
        
        // Populate modal content
        modal.querySelector('.service-modal-title').textContent = data.title;
        modal.querySelector('.service-modal-subtitle').textContent = data.subtitle;
        modal.querySelector('.modal-body').innerHTML = data.content;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeServiceModal() {
        const modal = document.getElementById('service-modal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    prefillContactForm() {
        if (!this.selectedService) return;
        
        const serviceSelect = document.getElementById('service');
        const messageField = document.getElementById('message');
        
        if (serviceSelect) {
            serviceSelect.value = this.selectedService;
            
            // Trigger change event to update any styling
            serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        if (messageField) {
            const serviceMessages = {
                design: "Hi! I'm interested in your UX/UI design services. I'd like to discuss my project requirements and get a quote.",
                development: "Hi! I'd like to discuss a website/app development project. Let me know what information you need to get started.",
                product: "Hi! I'm looking for product management expertise. I'd love to discuss how you can help with my product strategy."
            };
            
            messageField.value = serviceMessages[this.selectedService] || "Hi! I'd like to discuss working together on my project.";
            messageField.focus();
        }
    }
    
    initSectionTitleAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    // Add delay for portfolio section title
                    if (entry.target.classList.contains('portfolio-title-delayed')) {
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, 800); // 0.8 second delay
                    } else {
                        entry.target.classList.add('animated');
                    }
                }
            });
        }, observerOptions);
        
        // Observe all section titles
        document.querySelectorAll('.section-title').forEach(title => {
            observer.observe(title);
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});