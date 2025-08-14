// Portfolio Section with URL-based Project Routing

class PortfolioManager {
    constructor() {
        this.portfolioData = [];
        this.modal = document.getElementById('project-modal');
        this.modalBody = this.modal?.querySelector('.modal-body');
        this.modalClose = this.modal?.querySelector('.modal-close');
        this.modalBackdrop = this.modal?.querySelector('.modal-backdrop');
        this.portfolioGrid = document.querySelector('.portfolio-grid');
        
        this.init();
    }
    
    init() {
        this.loadPortfolioData();
        this.setupEventListeners();
        this.handleInitialRoute();
        this.setupScrollAnimations();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    // Add delay for portfolio items to let story finish first
                    const baseDelay = 800; // 0.8 second base delay
                    const itemIndex = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    const staggerDelay = itemIndex * 100; // 100ms stagger between items
                    
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, baseDelay + staggerDelay);
                }
            });
        }, observerOptions);
        
        // Observe all portfolio items
        setTimeout(() => {
            document.querySelectorAll('.portfolio-item').forEach((item, index) => {
                // Remove the CSS transition delay since we're handling timing in JS
                item.style.transitionDelay = '0s';
                observer.observe(item);
            });
            
            // Setup 3D tilt effect for portfolio items
            this.initPortfolioTilt();
        }, 100);
    }
    
    initPortfolioTilt() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            this.addTiltEffect(item);
        });
    }
    
    initPortfolioTiltForNewItems() {
        const allItems = document.querySelectorAll('.portfolio-item');
        // Apply tilt effect only to new items (after projectsToShow)
        for (let i = this.projectsToShow; i < allItems.length; i++) {
            this.addTiltEffect(allItems[i]);
        }
    }
    
    addTiltEffect(item) {
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'none';
        });
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Normalize coordinates to -1 to 1
            const normalX = (x - centerX) / centerX;
            const normalY = (y - centerY) / centerY;
            
            // Clamp the values to prevent extreme tilts at edges
            const clampedX = Math.max(-0.8, Math.min(0.8, normalX));
            const clampedY = Math.max(-0.8, Math.min(0.8, normalY));
            
            const rotateX = -clampedY * 8;
            const rotateY = -clampedX * 8;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.005)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transition = 'transform 0.3s ease, opacity 0.8s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    }
    
    loadPortfolioData() {
        // Complete portfolio data from original portfolio - all 9 projects
        this.portfolioData = [
            {
                id: 'easypz',
                title: 'EasyPZ',
                description: 'Toilet Finder App on iOS and Android',
                thumbnail: 'assets/portfolio-8.jpg',
                featured: true,
                tags: ['Founder', 'Product Design', 'Mobile Development'],
                year: '2022-Present',
                content: `
                    <div class="project-header">
                        <img src="assets/portfolio-8-logo.png" class="project-logo" alt="EasyPZ Logo">
                        <h2>EasyPZ: Restroom Finder App</h2>
                        <p class="lead">When nature calls, be ready for it</p>
                        <div class="project-meta">
                            <span class="project-tag">Founder</span>
                            <span class="project-tag">Product Design</span>
                            <span class="project-tag">Mobile Development</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/projects/easypz/easypz-hero.gif" alt="EasyPZ App Interface">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Problem and approach</h3>
                                <p>Parents, travelers, and people with medical needs shared the same frustration: finding a clean, accessible restroom quickly. I designed EasyPZ to minimize decision time and get users to a restroom in a few taps.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/easypz/easypz-research.png — interview highlights, critical moments, pain/need grid</div>

                                								<h3>Rebuild for performance</h3>
								<p>I rebuilt the app with React Native + TypeScript on a modern backend, improving stability and time‑to‑first‑result, and simplifying the codebase for faster iteration.</p>

								<div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/easypz/easypz-architecture-before-after.png — simplified v2 architecture vs v1</div>

								<div class="project-image-container" style="margin: 20px 0;">
									<img src="assets/projects/easypz/easypz-reviews.png" alt="EasyPZ app store reviews and ratings" class="project-image" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
								</div>

                                <h3>Brand identity</h3>
                                <p>A calm, friendly identity helps users under stress. The Zima mascot, clear color system, and clean maps keep focus on task completion.</p>

                                								<div class="project-image-container" style="margin: 20px 0;">
                                									<img src="assets/projects/easypz/easypz-branding.png" alt="EasyPZ brand identity showing logo, color palette, and Zima mascot" class="project-image" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                								</div>

								<h3>What I did</h3>
								<ul>
									<li>Rebuilt v2 and released v3; designed end‑to‑end UX/UI and brand (including mascot Zima)</li>
									<li>Defined product strategy, user journeys, and specs; coordinated backend work with Batuhan Direk (admin panel by Batuhan)</li>
									<li>Implemented map search, restroom submissions and reviews with moderation workflows</li>
									<li>Integrated Apple/Google OAuth and streamlined first‑run experience</li>
									<li>Localized the app and crafted a calm, task‑focused visual system</li>
								</ul>

								<h3>Key outcomes</h3>
								<ul>
									<li>App available in EN, ES, DE, FR, KR, JP</li>
									<li>Partnership presence at Karneval der Kulturen and Christopher Street Day (Berlin)</li>
									<li>Organic growth with zero paid marketing</li>
									<li>Consistently strong store ratings</li>
								</ul>

								<h3>Technical highlights</h3>
								<ul>
									<li>React Native + TypeScript; NestJS + PostgreSQL; monorepo</li>
									<li>OAuth (Apple/Google); map search; submissions & moderation (coord. with Batuhan)</li>
									<li>Admin panel built by Batuhan (SvelteKit)</li>
								</ul>
							</div>
							<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Sep 2022 – Present</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Product research & strategy</li>
                                        <li>Full‑stack development</li>
                                        <li>Technical architecture</li>
                                        <li>Brand & UI</li>
                                    </ul>
                                    
                                    <h6>Technologies</h6>
                                    <ul>
                                        <li>React Native + TypeScript</li>
                                        <li>NestJS + PostgreSQL</li>
                                        <li>AWS</li>
                                        <li>Monorepo</li>
                                    </ul>
                                    
                                    <h6>DOWNLOAD</h6>
                                    <div class="store-badges">
                                        <a href="https://apps.apple.com/us/app/easypz-toilet-finder/id6740248448" target="_blank">
                                            <img src="assets/store-ios.png" alt="Download on App Store" class="store-badge">
                                        </a>
                                        <a href="https://play.google.com/store/apps/details?id=app.easypz" target="_blank">
                                            <img src="assets/store-android.png" alt="Get it on Google Play" class="store-badge">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'wefox',
                title: 'wefox',
                description: 'Insurtech application on iOS, Android, and Web',
                thumbnail: 'assets/portfolio-7.jpg',
                featured: true,
                tags: ['Product Management', 'iOS', 'Android', 'Web'],
                year: '2021-2023',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_wefox.jpeg" class="project-logo" alt="wefox Logo">
                        <h2>wefox</h2>
                        <p class="lead">Leading the Re-Branding of wefox's Flagship Application</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">iOS</span>
                            <span class="project-tag">Android</span>
                            <span class="project-tag">Web</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/projects/wefox/wefox-hero.gif" alt="wefox before and after UI snapshots" class="project-showcase-image" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Unlocking access via integrations</h3>
                                <p>I led the initiative to support external insurance policies in the app, coordinating legal, privacy, and platform teams to design a compliant, secure integration approach.</p>
                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/wefox/wefox-platform.png" alt="wefox integration platform architecture" class="project-image" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                </div>

                                <h3>Design system across platforms</h3>
                                <p>In parallel, I drove the first unified design system for iOS, Android, and Web—reducing design drift and aligning UX across product lines.</p>
                                <div class="project-image-container" style="margin: 20px 0;">
                                	<img src="assets/projects/wefox/wefox-design-system.gif" alt="wefox design system components and design tokens" class="project-image" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                </div>

                                								<h3>Impact</h3>
								<ul>
									<li>Expanded eligibility from a limited subset to the full customer base through external policy support</li>
									<li>Material store‑rating improvement during my tenure</li>
									<li>Consistent cross‑platform UX via a shared design system</li>
								</ul>

								<h3>What I did</h3>
								<ul>
									<li>Defined integration strategy under legal/privacy/security constraints</li>
									<li>Coordinated iOS, Android, and Web squads with Principal Engineers, QA, and design</li>
									<li>Drove the rollout of a unified cross‑platform design system</li>
									<li>Aligned stakeholders and release timelines across platforms</li>
								</ul>

								<h3>Key outcomes</h3>
								<ul>
									<li>Eligibility expanded from ~35k to ~2M users in DE (during my tenure)</li>
									<li>Store rating improved from 2.1 to 3.6 in DE (during my tenure)</li>
									<li>Introduced a shared component library to reduce design/engineering drift</li>
								</ul>

								<h3>Technical highlights</h3>
								<ul>
									<li>External policy integrations; security/compliance reviews; API orchestration</li>
									<li>Cross‑platform design tokens/components across iOS/Android/Web</li>
								</ul>
							</div>
							<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Aug 2021 - Oct 2023</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Integration strategy & execution</li>
                                        <li>Design system leadership</li>
                                        <li>Squad coordination</li>
                                        <li>Stakeholder alignment</li>
                                    </ul>
                                    
                                    <h6>Technical Scope</h6>
                                    <ul>
                                        <li>External data integrations</li>
                                        <li>Security & compliance</li>
                                        <li>Platform consistency</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'morressier',
                title: 'Morressier',
                description: 'iPad/Web Apps for Medical Research',
                thumbnail: 'assets/portfolio-4.png',
                featured: true,
                tags: ['Product Management', 'iOS', 'Web'],
                year: '2018-2020',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_morressier.jpeg" class="project-logo" alt="Morressier Logo">
                        <h2>Morressier</h2>
                        <p class="lead">Seed to Series A: How I Became a Product Manager</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">iOS</span>
                            <span class="project-tag">Web</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/projects/morressier/morressier-hero.png" alt="Morressier redesigned iPad app screens" class="project-showcase-image" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Role evolution</h3>
                                <p>I joined early, managed 60+ conference implementations, and transitioned into Product Management by advocating UX/UI improvements grounded in user feedback.</p>
                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/morressier/morressier-timeline.png" alt="Morressier role progression timeline" class="project-image" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                </div>

                                <h3>iPad app redesign</h3>
                                <p>Partnered with design and engineering to redesign the on‑site presentation app for global medical conferences, improving reliability and presenter workflows.</p>
                                <div class="project-image-carousel" data-carousel="morressier-ipad">
                                    <div class="carousel-container">
                                        <div class="carousel-track">
                                            <div class="carousel-slide">
                                                <img src="assets/projects/morressier/morressier-ipad-1.png" alt="Morressier iPad app redesign screen 1">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/morressier/morressier-ipad-2.png" alt="Morressier iPad app redesign screen 2">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/morressier/morressier-ipad-3.png" alt="Morressier iPad app redesign screen 3">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/morressier/morressier-ipad-4.gif" alt="Morressier iPad app redesign screen 4">
                                            </div>
                                        </div>
                                        <button class="carousel-nav prev" aria-label="Previous image">❮</button>
                                        <button class="carousel-nav next" aria-label="Next image">❯</button>
                                        <div class="carousel-indicators">
                                            <div class="carousel-indicator active"></div>
                                            <div class="carousel-indicator"></div>
                                            <div class="carousel-indicator"></div>
                                            <div class="carousel-indicator"></div>
                                        </div>
                                    </div>
                                </div>

                                <h3>Research discovery platform</h3>
                                <p>Contributed to a web platform to help researchers discover related work and build connections from early‑stage presentations to publication.</p>
                                <div class="project-image-gallery single-image">
                                    <img src="assets/projects/morressier/morressier-platform.png" alt="Morressier research discovery platform interface">
                                </div>

                                									<h3>Feedback</h3>
									<p>Consistently positive organizer feedback across events validated the direction.</p>

									<h3>What I did</h3>
									<ul>
										<li>Managed 60+ conference implementations as an early hire (8th employee)</li>
										<li>Redesigned the on‑site iPad presentation app for medical conferences</li>
										<li>Partnered with design/engineering to improve reliability and presenter workflows</li>
										<li>Contributed to the research discovery platform and the company landing page</li>
									</ul>

									<h3>Key outcomes</h3>
									<ul>
										<li>Deployed at medical conferences worldwide; improved on‑site presenter experience</li>
										<li>Consistent organizer satisfaction across events</li>
									</ul>

									<h3>Technical highlights</h3>
									<ul>
										<li>iPad presentation app; on‑site constraints; reliability improvements</li>
										<li>ML‑assisted discovery: extracted metadata from PDFs to relate similar research</li>
									</ul>
								</div>
								<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Feb 2018 - Apr 2020</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>60+ global implementations</li>
                                        <li>Conference iPad app redesign</li>
                                        <li>Research discovery platform</li>
                                        <li>Landing page relaunch</li>
                                    </ul>
                                    
                                    <h6>Focus</h6>
                                    <ul>
                                        <li>iOS reliability & UX</li>
                                        <li>Search/discovery</li>
                                        <li>On‑site workflows</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'tomorrow-university',
                title: 'Tomorrow University',
                description: 'The Metaverse University of the Future',
                thumbnail: 'assets/portfolio-9.png',
                featured: true,
                tags: ['Apple Vision Pro', 'Product Management', 'Growth'],
                year: '2023-2024',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_tou.jpeg" class="project-logo" alt="Tomorrow University Logo">
                        <h2>Tomorrow University</h2>
                        <p class="lead">Solo Product Management across multiple platform releases, including an early Apple Vision Pro app</p>
                        <div class="project-meta">
                            <span class="project-tag">Apple Vision Pro</span>
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">Growth</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1);">ADD: assets/projects/tomorrow-university/tou-hero.png — highlights of homepage/catalog/checkout</div>
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                									<h3>Scope and ownership</h3>
									<p>After a team restructure, I operated as the sole PM and shipped multiple releases: a modern homepage, public program catalog, streamlined application/checkout, and an Apple Vision Pro app (media coverage available on request).</p>

									<h3>Reducing friction and opening access</h3>
									<p>I implemented Google & Apple SSO and shaped the end‑to‑end self‑service flow so prospective learners could explore, apply, and enroll directly.</p>

									<div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/tomorrow-university/tou-growth.png — SSO flows & simplified onboarding</div>

									<h3>What I did</h3>
									<ul>
										<li>Sole PM: roadmap, requirements, and release coordination</li>
										<li>Implemented Google & Apple SSO; opened up public browsing of programs</li>
										<li>Designed the first end‑to‑end digital sales journey (application → checkout → enrollment)</li>
										<li>Launched an Apple Vision Pro app and supported marketing/press coordination</li>
									</ul>

									<h3>Key outcomes</h3>
									<ul>
										<li>Significantly reduced signup/onboarding time</li>
										<li>Enabled direct course purchases via Shopify integration</li>
										<li>Modernized the top of funnel (homepage, program catalog) for prospective learners</li>
									</ul>

																	<h3>Technical highlights</h3>
								<ul>
									<li>Clerk SSO; program catalog; application & checkout; Shopify integration</li>
									<li>Web app experience delivered on Apple Vision Pro</li>
								</ul>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Nov 2023 - May 2024</p>

                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Solo PM execution</li>
                                        <li>SSO + self‑service enrollment</li>
                                        <li>Vision Pro app (early launch)</li>
                                        <li>Release management</li>
                                    </ul>

                                    <h6>Major releases</h6>
                                    <ul>
                                        <li>Homepage and catalog</li>
                                        <li>SSO integration</li>
                                        <li>Application → checkout</li>
                                        <li>Vision Pro app</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'tattoo-booking',
                title: 'Tattoo Booking Form',
                description: 'Custom-Designed Appointment Form',
                thumbnail: 'assets/portfolio-6.jpg',
                featured: false,
                tags: ['Form Design', 'Custom Development'],
                year: '2021',
                content: `
                    <div class="project-header">
                        <h2>Tattoo Booking Form</h2>
                        <p class="lead">Custom intake form that improved pre‑project clarity for a traveling tattoo artist</p>
                        <div class="project-meta">
                            <span class="project-tag">Form Design</span>
                            <span class="project-tag">Custom Development</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1);">ADD: assets/projects/tattoo-booking/tattoo-booking-hero.png — final form UI</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Context</h3>
                                <p>DMs and emails lacked critical details, causing back‑and‑forth. I designed a form that gathered the essentials up front while matching the artist’s brand.</p>

                                <h3>Zero‑ops implementation</h3>
                                <p>To keep this free to run, I used formsubmit.co for submissions and Netlify for hosting. Submissions arrived formatted for quick triage.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/tattoo-booking/tattoo-booking-flow.png — Netlify + Formsubmit diagram</div>

                                <h3>Outcome</h3>
                                <p>The form reduced friction and improved intake quality. As the business grew, the client later moved to Typeform for advanced features.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2021</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Requirements & UX</li>
                                        <li>Form development</li>
                                        <li>Brand‑consistent UI</li>
                                        <li>Zero‑ops delivery</li>
                                    </ul>
                                    
                                    <h6>Stack</h6>
                                    <ul>
                                        <li>HTML/CSS + JS</li>
                                        <li>Formsubmit.co</li>
                                        <li>Netlify</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'feedbacker',
                title: 'Feedbacker',
                description: 'Visual Art Feedback Sharing Platform',
                thumbnail: 'assets/portfolio-5.jpg',
                featured: false,
                tags: ['Design Leadership', 'Ruby on Rails', 'Javascript'],
                year: '2021',
                content: `
                    <div class="project-header">
                        <h2>Feedbacker</h2>
                        <p class="lead">Location‑based visual feedback for artwork—built in a 2‑week bootcamp sprint</p>
                        <div class="project-meta">
                            <span class="project-tag">Design Leadership</span>
                            <span class="project-tag">Ruby on Rails</span>
                            <span class="project-tag">Javascript</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1);">ADD: assets/projects/feedbacker/feedbacker-hero.png — final screens with pin‑based comments</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Problem</h3>
                                <p>Online feedback on visuals is often vague. We built coordinate‑mapped comments so reviewers could leave precise, contextual feedback.</p>

                                <h3>Build</h3>
                                <p>Full‑stack Rails app with image uploads and click‑to‑comment overlays. I led scoping, design, and coordination to ship within 2 weeks.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/feedbacker/feedbacker-workflow.png — flows for upload, annotate, review</div>

                                									<h3>Result</h3>
									<p>Delivered a working MVP and final presentation; recognized internally for scope achieved within the sprint.</p>

									<h6>Proof</h6>
									<p>Screenshots and screen recordings available.</p>
								</div>
								<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2021 (2 weeks intensive)</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Concept & UX</li>
                                        <li>Team leadership</li>
                                        <li>Full‑stack build</li>
                                    </ul>
                                    
                                    <h6>Stack</h6>
                                    <ul>
                                        <li>Ruby on Rails</li>
                                        <li>JavaScript</li>
                                        <li>PostgreSQL</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'undulmood-store',
                title: 'Undulmood Store',
                description: 'Shopify-Powered Online Store for Local Tattoist',
                thumbnail: 'assets/portfolio-3.jpg',
                featured: false,
                tags: ['E-commerce', 'Shopify', 'Design', 'Development'],
                year: '2020',
                content: `
                    <div class="project-header">
                        <h2>Undulmood Store</h2>
                        <p class="lead">Shopify store enabling multiple revenue streams during lockdowns</p>
                        <div class="project-meta">
                            <span class="project-tag">E-commerce</span>
                            <span class="project-tag">Shopify</span>
                            <span class="project-tag">Design</span>
                            <span class="project-tag">Development</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1);">ADD: assets/projects/undulmood-store/undulmood-hero.png — storefront and product grids</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Objective</h3>
                                <p>Build an online presence and diversify income across original artwork, accessories, and digital brush sets.</p>

                                <h3>Implementation</h3>
                                <p>Custom theme tweaks, product taxonomy, and brand‑consistent visuals to showcase the artist’s work and streamline checkout.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/undulmood-store/undulmood-products.png — categories and example PDP</div>

                                									<h3>Outcome</h3>
									<p>Launched a functional store that supported sales while studios were closed; foundation for longer‑term digital presence.</p>

									<h6>Results</h6>
									<ul>
										<li>Generated a few thousand EUR in sales; enabled passive income via digital goods</li>
										<li>Store remains active</li>
									</ul>
								</div>
								<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2020</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Store design & setup</li>
                                        <li>Product taxonomy & content</li>
                                        <li>Brand‑consistent UI</li>
                                    </ul>

                                    <h6>Platform</h6>
                                    <ul>
                                        <li>Shopify</li>
                                        <li>Custom theme</li>
                                        <li>Payments & shipping</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'perfect-living',
                title: 'Perfect Living',
                description: 'Responsive Designs of a Real Estate App',
                thumbnail: 'assets/portfolio-2.jpg',
                featured: false,
                tags: ['UI Design', 'UX Design', 'Responsive App'],
                year: '2019',
                content: `
                    <div class="project-header">
                        <h2>Perfect Living</h2>
                        <p class="lead">Mobile‑first responsive design for a real estate application</p>
                        <div class="project-meta">
                            <span class="project-tag">UI Design</span>
                            <span class="project-tag">UX Design</span>
                            <span class="project-tag">Responsive App</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1);">ADD: assets/projects/perfect-living/perfect-living-hero.png — mobile, tablet, desktop layouts</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Focus</h3>
                                <p>Established a responsive system: color/typography, components, and patterns that scale cleanly across devices.</p>

                                <h3>Key screens</h3>
                                <p>Property search, filters, listing details, saved items, and account—optimized for touch and readability.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/perfect-living/perfect-living-system.png — grid, spacing, and component variants</div>

                                <h3>Takeaway</h3>
                                <p>Foundational exercise in responsive design and visual hierarchy that informs later product work.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2019 (Student project)</p>

                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Mobile‑first strategy</li>
                                        <li>Component library</li>
                                        <li>Cross‑device adaptation</li>
                                    </ul>

                                    <h6>Tools</h6>
                                    <ul>
                                        <li>Sketch</li>
                                        <li>InVision</li>
                                        <li>Adobe Suite</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'inkery',
                title: 'Inkery',
                description: 'Mobile Designs of a Tattoo Appointment Booking Service',
                thumbnail: 'assets/portfolio-1.jpg',
                featured: false,
                tags: ['UX Research', 'Service Design', 'Mobile App'],
                year: '2019',
                content: `
                    <div class="project-header">
                        <h2>Inkery</h2>
                        <p class="lead">UX research and service design for tattoo appointment booking</p>
                        <div class="project-meta">
                            <span class="project-tag">UX Research</span>
                            <span class="project-tag">Service Design</span>
                            <span class="project-tag">Mobile App</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1);">ADD: assets/projects/inkery/inkery-hero.png — research→flows→UI overview</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Research foundation</h3>
                                <p>Market analysis, interviews, personas, and journeys framed hypotheses for booking flows and communication clarity.</p>

                                <h3>Design process</h3>
                                <p>Iterative wireframes to high‑fidelity designs across onboarding, browsing, artist selection, and inquiry.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255,68,68,0.1); margin: 20px 0;">ADD: assets/projects/inkery/inkery-documentation.png — selected artifacts (personas, journeys, final UI)</div>

                                <h3>Takeaway</h3>
                                <p>Established UX habits I still use: research‑driven decisions, crisp flows, and testable assumptions.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2019</p>

                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>User research & synthesis</li>
                                        <li>Flows & IA</li>
                                        <li>Mobile UI</li>
                                    </ul>

                                    <h6>Deliverables</h6>
                                    <ul>
                                        <li>Research summary</li>
                                        <li>Personas & journeys</li>
                                        <li>Design system & screens</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        ];
        
        this.renderPortfolio();
    }
    
    renderPortfolio() {
        if (!this.portfolioGrid) return;
        
        this.portfolioGrid.innerHTML = '';
        
        // Set up show more functionality
        this.projectsToShow = 3; // Show 3 initially (top featured projects)
        this.allProjectsVisible = false;
        
        // Render initial projects (first 3)
        this.portfolioData.slice(0, this.projectsToShow).forEach((project, index) => {
            const item = this.createPortfolioItem(project);
            this.portfolioGrid.appendChild(item);
        });
        
        // Create show more button if there are more projects
        if (this.portfolioData.length > this.projectsToShow) {
            this.createPortfolioShowMoreButton();
        }
    }
    
    createPortfolioItem(project) {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.dataset.projectId = project.id;
        
        const tagsHtml = project.tags.map(tag => 
            `<span class="portfolio-tag">${tag}</span>`
        ).join('');
        
        item.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.thumbnail}" alt="${project.title}" class="portfolio-thumbnail">
                <div class="portfolio-year">${project.year}</div>
            </div>
            <div class="portfolio-content">
                <div class="portfolio-header">
                    <div class="portfolio-tags">${tagsHtml}</div>
                </div>
                <p class="portfolio-description">${project.description}</p>
                <div class="portfolio-cta">View Project →</div>
            </div>
        `;
        
        item.addEventListener('click', () => this.openProject(project.id));
        
        return item;
    }
    
    createPortfolioShowMoreButton() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'portfolio-show-more-container';
        
        this.portfolioShowMoreButton = document.createElement('button');
        this.portfolioShowMoreButton.className = 'portfolio-show-more-btn';
        this.portfolioShowMoreButton.textContent = `Show ${this.portfolioData.length - this.projectsToShow} more projects`;
        
        this.portfolioShowMoreButton.addEventListener('click', () => {
            this.togglePortfolioProjects();
        });
        
        buttonContainer.appendChild(this.portfolioShowMoreButton);
        this.portfolioGrid.parentElement.appendChild(buttonContainer);
    }
    
    togglePortfolioProjects() {
        if (!this.allProjectsVisible) {
            // Show all projects
            this.portfolioData.slice(this.projectsToShow).forEach((project, index) => {
                const item = this.createPortfolioItem(project);
                
                // Set staggered delay for animation
                item.style.transitionDelay = `${(this.projectsToShow + index) * 0.1}s`;
                
                this.portfolioGrid.appendChild(item);
            });
            
            // Setup scroll animations for new items
            this.setupNewPortfolioAnimations();
            
            // Add disclaimer when all projects are shown
            this.createPortfolioDisclaimer();
            
            this.portfolioShowMoreButton.textContent = 'Show less';
            this.allProjectsVisible = true;
        } else {
            // Hide extra projects
            const allItems = this.portfolioGrid.querySelectorAll('.portfolio-item');
            for (let i = allItems.length - 1; i >= this.projectsToShow; i--) {
                allItems[i].remove();
            }
            
            // Remove disclaimer when hiding projects
            this.removePortfolioDisclaimer();
            
            this.portfolioShowMoreButton.textContent = `Show ${this.portfolioData.length - this.projectsToShow} more projects`;
            this.allProjectsVisible = false;
        }
    }
    
    setupNewPortfolioAnimations() {
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
        
        // Observe only the new portfolio items (after projectsToShow)
        const allItems = document.querySelectorAll('.portfolio-item');
        for (let i = this.projectsToShow; i < allItems.length; i++) {
            observer.observe(allItems[i]);
        }
        
        // Apply tilt effect to the new items
        this.initPortfolioTiltForNewItems();
    }
    
    createPortfolioDisclaimer() {
        const disclaimerContainer = document.createElement('div');
        disclaimerContainer.className = 'portfolio-disclaimer-container';
        disclaimerContainer.innerHTML = `
            <div class="portfolio-disclaimer">
                <p class="disclaimer-text">* Additional projects not shown publicly due to confidentiality agreements</p>
            </div>
        `;
        
        // Add fade-in animation delay
        disclaimerContainer.style.opacity = '0';
        disclaimerContainer.style.transform = 'translateY(20px)';
        disclaimerContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const buttonContainer = document.querySelector('.portfolio-show-more-container');
        buttonContainer.insertAdjacentElement('beforebegin', disclaimerContainer);
        
        // Animate in
        setTimeout(() => {
            disclaimerContainer.style.opacity = '1';
            disclaimerContainer.style.transform = 'translateY(0)';
        }, 300);
    }
    
    removePortfolioDisclaimer() {
        const disclaimer = document.querySelector('.portfolio-disclaimer-container');
        if (disclaimer) {
            disclaimer.remove();
        }
    }
    
    setupEventListeners() {
        // Close modal
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modalBackdrop) {
            this.modalBackdrop.addEventListener('click', () => this.closeModal());
        }
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });
        
        // Browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.handleInitialRoute();
        });
    }
    
    openProject(projectId) {
        const project = this.portfolioData.find(p => p.id === projectId);
        if (!project) return;
        
        // Update URL without page reload
        const newUrl = `${window.location.pathname}#project/${projectId}`;
        window.history.pushState({ projectId }, '', newUrl);
        
        // Display project in modal
        this.showProjectModal(project);
    }
    
    showProjectModal(project) {
        if (!this.modal || !this.modalBody) return;
        
        // Set modal content
        this.modalBody.innerHTML = project.content;
        
        // Initialize carousels in the modal
        this.initCarousels();
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Focus management for accessibility
        this.modalClose?.focus();
    }
    
    initCarousels() {
        const carousels = this.modalBody?.querySelectorAll('[data-carousel]');
        if (!carousels) return;
        
        carousels.forEach(carousel => {
            this.setupCarousel(carousel);
        });
    }
    
    setupCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        if (!track || !slides.length) return;
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        const updateCarousel = () => {
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update navigation buttons
            if (prevBtn) prevBtn.disabled = currentSlide === 0;
            if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
        };
        
        const goToSlide = (slideIndex) => {
            currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
            updateCarousel();
        };
        
        // Navigation button events
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }
        
        // Indicator events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToSlide(currentSlide + 1);
            }
        });
        
        // Make carousel focusable for keyboard navigation
        carousel.setAttribute('tabindex', '0');
        
        // Initial setup
        updateCarousel();
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Update URL to remove project hash
        const baseUrl = window.location.pathname;
        window.history.pushState({}, '', baseUrl);
    }
    
    handleInitialRoute() {
        // Check if URL contains a project ID
        const hash = window.location.hash;
        const projectMatch = hash.match(/#project\/(.+)/);
        
        if (projectMatch) {
            const projectId = projectMatch[1];
            const project = this.portfolioData.find(p => p.id === projectId);
            
            if (project) {
                // Small delay to ensure DOM is ready
                setTimeout(() => this.showProjectModal(project), 100);
            }
        } else {
            // Close modal if open
            this.closeModal();
        }
    }
    
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
});