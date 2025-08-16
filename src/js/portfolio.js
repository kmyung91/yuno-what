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
            threshold: 0.15,
            rootMargin: '0px 0px -20px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    // Reduced delay for smoother experience
                    const baseDelay = 200; // 0.2 second base delay
                    const itemIndex = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    const staggerDelay = itemIndex * 80; // 80ms stagger between items
                    
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
                thumbnail: 'assets/projects/easypz/easypz-hero.png',
                hero: 'assets/projects/easypz/easypz-hero.gif',
                featured: true,
                tags: ['Founder', 'Product Design', 'Mobile Development'],
                year: '2022-Present',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_easypz.jpeg" class="project-logo" alt="EasyPZ Logo">
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
                                <h3>How it started</h3>
                                <p>Back in 2016, I was stuck in NYC traffic for 30 minutes, and I jumped out the bus window and ran to the nearest Subway sandwich shop because I needed to pee. It was disgusting but it was better than nothing. As I came out, I saw a guy in a wheelchair waiting his turn. The heavy lock clicking, as I squeezed past the long line of people in this tight corridor, is a sound I can still hear vividly to this day. This combined with seeing women having nowhere to pee, delivery workers being denied access by restaurants, and even my friends and family getting a UTI because they couldn't find a restroom made me realize that this is a major problem that not enough people are talking about.</p>

                                <h3>Understanding the problem</h3>
                                <p>I interviewed everyone — friends, family, strangers, and every single Tinder date (yes, really) — about their restroom experiences. The pattern was clear: in general, women consider this to be quite a frequent and significant problem. Young parents, wheelchair users, elderly, trans people, and those who are affected by IBS and other issues are hit especially hard. My research revealed a darker truth: we're losing public restrooms every year, creating an inequitable world that restricts mobility and targets marginalized groups. The burden is placed on the people and local businesses, and this is wrong. This isn't just inconvenience — it's a fundamental need not being met, and a threat to basic human dignity and civil rights.</p>

                                								<div class="project-image-carousel" data-carousel="easypz-research" style="margin: 20px 0;">
                                									<div class="carousel-container" style="height: 400px; overflow: hidden;">
                                										<div class="carousel-track">
                                											<div class="carousel-slide">
                                												<img src="assets/projects/easypz/easypz-1.png" alt="Competitive analysis whiteboard" style="width: 100%; height: 400px; object-fit: contain;">
                                											</div>
                                											<div class="carousel-slide">
                                												<img src="assets/projects/easypz/easypz-2.png" alt="Research and planning: business model, personas, sitemaps, flowcharts, mockups, data schema" style="width: 100%; height: 400px; object-fit: contain;">
                                											</div>
                                											<div class="carousel-slide">
                                												<img src="assets/projects/easypz/easypz-3.png" alt="Low fidelity sketches and wireframes" style="width: 100%; height: 400px; object-fit: contain;">
                                											</div>
                                											<div class="carousel-slide">
                                												<img src="assets/projects/easypz/easypz-4.png" alt="User journey maps and pain points analysis" style="width: 100%; height: 400px; object-fit: contain;">
                                											</div>
                                											<div class="carousel-slide">
                                												<img src="assets/projects/easypz/easypz-5.png" alt="Market research findings and opportunity mapping" style="width: 100%; height: 400px; object-fit: contain;">
                                											</div>
                                										</div>
                                										<button class="carousel-nav prev" aria-label="Previous image">❮</button>
                                										<button class="carousel-nav next" aria-label="Next image">❯</button>
                                									</div>
                                									<div class="carousel-indicators">
                                										<div class="carousel-indicator active"></div>
                                										<div class="carousel-indicator"></div>
                                										<div class="carousel-indicator"></div>
                                										<div class="carousel-indicator"></div>
                                										<div class="carousel-indicator"></div>
                                									</div>
                                								</div>

                                <h3>It was not exactly a novel idea</h3>
                                <p>This type of app has been attempted ever since the smartphone came out. But why wasn't it sticking? If looking for a restroom is cumbersome and people settle for the first option, wouldn't they be willing to use an app that saves them time and gives them more options? I realized the existing apps, and the big graveyard of similar apps, were overwhelming and failed to provide trust. To me, it was clear that men were behind these projects, and I decided to approach it with woman-first design principles. Besides a sleek and modern UI, I also implemented a mascot — the cat came from interview insights where women mentioned feeling comfortable peeing with their cats at home. I built a community-first app with gamification, reviews, and submissions, wrapped in aesthetics that create trust and delight.</p>

                                <h3>Design decisions that mattered</h3>
                                <p>Every design choice was intentional. Soft color palettes and rounded corners to reduce anxiety. Clear indicators showing if restrooms are public and if there are any barriers. Community features that let women warn each other about unsafe locations. The mascot Zima appears during loading states to provide comfort during urgent moments. I designed custom icons that are instantly recognizable even when someone is panicking. The entire UI is optimized for one-handed use because users often carry bags, push strollers, or hold children. These weren't just aesthetic choices—they were survival tools wrapped in delightful design.</p>
                                <p>Below is the evolution of the mascot, Zima, from the initial concept to the final design.</p>

                                <div class="project-image-carousel" data-carousel="easypz-mascot" style="margin: 20px 0;">
                                    <div class="carousel-container" style="height: 400px; overflow: hidden;">
                                        <div class="carousel-track">
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-1.png" alt="Zima mascot evolution 1" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-2.png" alt="Zima mascot evolution 2" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-3.png" alt="Zima mascot evolution 3" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-4.png" alt="Zima mascot evolution 4" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-5.gif" alt="Zima mascot evolution 5" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-6.png" alt="Zima mascot evolution 6" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-7.png" alt="Zima mascot evolution 7" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-8.jpg" alt="Zima mascot evolution 8" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-9.jpg" alt="Zima mascot evolution 9" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-10.gif" alt="Zima mascot evolution 10" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/easypz/easypz-mascot-11.png" alt="Zima mascot evolution 11" style="width: 100%; height: 400px; object-fit: contain;">
                                            </div>
                                        </div>
                                        <button class="carousel-nav prev" aria-label="Previous image">❮</button>
                                        <button class="carousel-nav next" aria-label="Next image">❯</button>
                                    </div>
                                    <div class="carousel-indicators">
                                        <div class="carousel-indicator active"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                    </div>
                                </div>

                                								<h3>First rocket crashed, built a second one</h3>
								<p>The idea started in 2020, found a technical cofounder in 2022, launched in 2023, then went dormant due to the unexpected departure of my co-founder. Around August 2024, I decided to use AI-driven development (aka "vibe coding") to bring it back. Learning mobile development from scratch, I rebuilt everything in React Native + TypeScript with a modern backend. The original code was messy and obsolete, so starting fresh was the only way forward. I managed to re-launch it in January 2025. As of August 2025, the iOS and Android apps are 100% vibe-coded.</p>

								<div class="project-image-carousel" data-carousel="easypz-screens" style="margin: 20px 0;">
									<div class="carousel-container" style="height: 600px; overflow: hidden;">
										<div class="carousel-track">
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-0.png" alt="EasyPZ app screens - Light and Dark mode comparison 1" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-1.png" alt="EasyPZ app screens - Light and Dark mode comparison 2" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-2.png" alt="EasyPZ app screens - Light and Dark mode comparison 3" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-3.png" alt="EasyPZ app screens - Light and Dark mode comparison 4" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-4.png" alt="EasyPZ app screens - Light and Dark mode comparison 5" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-5.png" alt="EasyPZ app screens - Light and Dark mode comparison 6" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-6.png" alt="EasyPZ app screens - Light and Dark mode comparison 7" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/easypz/easypz-screens-7.png" alt="EasyPZ app screens - Light and Dark mode comparison 8" style="width: 100%; height: 600px; object-fit: contain;">
											</div>
										</div>
										<button class="carousel-nav prev" aria-label="Previous image">❮</button>
										<button class="carousel-nav next" aria-label="Next image">❯</button>
									</div>
									<div class="carousel-indicators">
										<div class="carousel-indicator active"></div>
										<div class="carousel-indicator"></div>
										<div class="carousel-indicator"></div>
										<div class="carousel-indicator"></div>
										<div class="carousel-indicator"></div>
										<div class="carousel-indicator"></div>
										<div class="carousel-indicator"></div>
										<div class="carousel-indicator"></div>
									</div>
								</div>

								<h3>Technical execution</h3>
								<p>I recruited Batuhan Direk, who joined the project to replace my backend with a more robust and scalable one. I built with React Native + TypeScript and Expo, and Batu handled the backend with NestJS + PostgreSQL in a monorepo. Together, we implemented OAuth (Apple/Google), real-time map search, user submissions with moderation, reviews, gamification (EXP points, leveling, in-app currency), reporting, and multi-language support (EN, ES, DE, FR, KR, JP, TR). Additionally, Batu built the admin panel in SvelteKit, where we manage all the content.</p>
                                <p>Together, we launched Version 3.0.0, a major milestone for the project.</p>

								<h3>When it clicked</h3>
								<p>Festival organizers loved the concept. They shared restroom location data, we mapped it in our app, and hundreds used it at events like Karneval der Kulturen and Christopher Street Day in Berlin. Users tell me the app is "saving their lives." The numbers speak for themselves: 11.73k searches, 4,710 users, 1k MAU, and 4.8/4.6 app store ratings. The soft launch was a success, with room for improvement.</p>

                                <div class="project-image-container" style="margin: 20px 0;">
									<img src="assets/projects/easypz/easypz-reviews.png" alt="Positive user reviews and app store ratings" class="project-image" style="width: 100%;">
								</div>

								<h3>Reception and what's next</h3>
								<p>The response has been overwhelmingly positive. Users consistently praise the app's design, functionality, and impact on their daily lives. The strong app store ratings (4.8 on iOS, 4.6 on Android) reflect genuine user satisfaction. With solid foundations in place, the team is growing and a major rebrand is in the works. This project is perhaps a culmination of all my skills and experiences, and I'm proud of how far it's come.</p>
                                <p>Monetization is a work in progress, but for the time being, the app is free to download and use. Although one might find this project to be a bit niche, I believe it will change our world into a more inclusive and accessible place for everyone.</p>

								
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
                thumbnail: 'assets/projects/wefox/wefox-hero.png',
                hero: 'assets/projects/wefox/wefox-hero.gif',
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
                        <img src="assets/projects/wefox/wefox-hero.gif" alt="wefox before and after UI snapshots" class="project-showcase-image" style="width: 100%;">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Post-merger integration challenge</h3>
                                <p>I joined wefox during a pivotal moment—fresh off a $1.5 billion valuation and just one month after they launched a unified MVP following a strategic merger. The transition presented classic integration challenges: user feedback indicated confusion about feature changes, app store ratings needed improvement (starting at 2.1), and the streamlined MVP approach meant some beloved features from the legacy app were temporarily unavailable. This created an opportunity to rebuild with intention.</p>
                                
                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/wefox/wefox-1.png" alt="Before state showing fragmented user experience across platforms" class="project-image">
                                </div>

                                <h3>The platform insight</h3>
                                <p>Through user research (conducted via brokers due to insurance regulations), I identified a critical adoption barrier: customers weren't downloading our app because it only managed 1-2 of their policies. Why install dedicated software for partial coverage? The strategic opportunity was clear—transform wefox into a comprehensive platform where external insurance providers could integrate, making us the single hub for all their insurance needs.</p>

                                <h3>Navigating regulatory complexity</h3>
                                <p>Insurance operates in a heavily regulated environment where every feature requires approval from data privacy, security, legal, and compliance teams. Direct user communication required broker intermediaries, making research more complex. I coordinated across our Barcelona tech squad, sometimes working in Spanish, while managing relationships with three external design agencies to supplement our lean internal design capacity.</p>

                                <h3>Building the design foundation</h3>
                                <p>To keep development moving during early phases without designers, I jumped into Figma myself to unblock the team. Once we brought on talented designers like Carmine Mattia Scarciello, I shifted to leading the design system implementation as Product Manager. While our flagship consumer apps were already consistent, the broader ecosystem—landing pages, broker platform, internal tools—had evolved independently with fragmented experiences. I orchestrated the rollout of our first unified design system across this entire product suite, prioritizing which components to build first and ensuring coordinated delivery. This wasn't just about visual consistency; it was about creating a cohesive brand experience whether users were on our consumer app or brokers were using their dedicated platform.</p>
                                
                                <div class="project-image-gallery" style="margin: 20px 0; display: grid; grid-template-columns: auto auto; gap: 12px; justify-content: center; align-items: center;">
                                    <img src="assets/projects/wefox/wefox-design-web.gif" alt="Web design system showcase" style="height: 400px; width: auto; object-fit: contain;">
                                    <img src="assets/projects/wefox/wefox-design-mobile.gif" alt="Mobile design system showcase" style="height: 400px; width: auto; object-fit: contain;">
                                </div>

                                <h3>Delivering measurable impact</h3>
                                <p>The results exceeded expectations: we expanded platform access from 35,000 users with wefox-branded policies to the full 2+ million customer base. App store ratings improved from 2.1 to 3.6 as we addressed user feedback about functionality and information access. Most significantly, we successfully transformed wefox from an internal tool into a comprehensive platform supporting external insurance provider integrations.</p>

                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/wefox/wefox-3.png" alt="Picture of me and our entire tech department celebrating at a party in Berlin." class="project-image">
                                </div>

                                <h3>What I take with me</h3>
                                <p>Leading product at wefox taught me how to ship at scale in a heavily regulated industry while juggling multiple stakeholders across legal, privacy, and engineering. During my tenure, the company's valuation grew from $1.5B to $4.5B—while I was one of 1000+ employees contributing to this growth, I'm proud that our platform transformation played a meaningful role. I learned when to roll up my sleeves (jumping into Figma when we had no designers) and when to step back and orchestrate (coordinating the design system rollout once we had the right team). Most importantly, I discovered that transforming a 2.1-rated app into a 3.6-rated platform serving 2 million users requires equal parts strategic vision, tactical execution, and the flexibility to adapt when markets shift. These lessons continue to shape how I approach product challenges today.</p>
							</div>
							<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Aug 2021 - Oct 2023</p>
                                    
                                    <h6>THE CHALLENGE</h6>
                                    <ul>
                                        <li>Post-merger integration complexity</li>
                                        <li>2.1 app store rating to improve</li>
                                        <li>Lean design resources</li>
                                        <li>Regulated industry constraints</li>
                                    </ul>
                                    
                                    <h6>MY ROLE</h6>
                                    <ul>
                                        <li>Platform strategy & execution</li>
                                        <li>Design system implementation lead</li>
                                        <li>Cross-functional coordination</li>
                                        <li>Emergency design support</li>
                                    </ul>

                                    <h6>IMPACT</h6>
                                    <ul>
                                        <li>35K → 2M+ eligible users</li>
                                        <li>2.1 → 3.6 app store rating</li>
                                        <li>First unified design system</li>
                                        <li>External integration platform</li>
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
                thumbnail: 'assets/projects/morressier/morressier-hero.png',
                hero: 'assets/projects/morressier/morressier-hero.gif',
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
                        <img src="assets/projects/morressier/morressier-hero.gif" alt="Morressier redesigned iPad app screens" class="project-showcase-image" style="width: 100%; max-height: 450px; object-fit: contain;">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Breaking into Berlin tech</h3>
                                <p>I moved to Berlin in 2017 with one goal: break into the tech sector. Coming from a role I wasn't passionate about, I joined Morressier as employee #8, drawn to their mission of digitizing centuries-old academic poster sessions. While medical researchers had been pinning paper posters to boards since forever, Morressier envisioned a digital platform where research could be shared, discovered, and connected globally.</p>

                                <h3>Baptism by fire</h3>
                                <p>Managing 60+ medical conferences across Europe and beyond taught me to thrive in chaos. From major capitals to smaller cities, I coordinated events spanning the continent—plus international conferences in places like Tel Aviv, NYC, South Korea, and Australia. When my manager had a personal emergency at 3AM, I packed my bags and flew to NYC on 6 hours notice—in the worst seat on the plane. When submission IDs got scrambled at a major conference, I worked through the night to decode the pattern and save the event. I've debugged systems from a car driving to a Valencia beach, turning vacation into troubleshooting sessions. This wasn't just a job; it was my proving ground.</p>

                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/morressier/morressier-conference.png" alt="Conference setup showing digital poster displays" class="project-image" style="width: 100%;">
                                </div>

                                <h3>Almost Homeless, in U-Bahn stations</h3>
                                <p>While holding down Customer Success solo during my manager's paternity leave, I spent evenings studying UX/UI design. Without stable housing or WiFi, I'd camp in Berlin U-Bahn stations using their free internet until security kicked me out at closing. I channeled this design knowledge into QA'ing releases, proposing improvements, and essentially filling the PM gap in our scrappy team. The CTO noticed and offered me a Product Manager role—my first time even hearing the title. I pivoted from my designer dreams and never looked back.</p>

                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/morressier/morressier-timeline.png" alt="Journey from Customer Success to Product Management">
                                </div>

                                <h3>Redesigning for researchers</h3>
                                <p>After closing Series A, we retired the MVP iPad app built by a freelancer and created something worthy of the world's leading medical conferences. I partnered with our new design and engineering teams to build an experience that respected researchers' workflows while delighting conference attendees—some would spend hours exploring posters on our hardware setups. The positive feedback from organizers and users validated that we'd finally matched our ambitious vision with execution.</p>
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
                                    </div>
                                    <div class="carousel-indicators">
                                        <div class="carousel-indicator active"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                        <div class="carousel-indicator"></div>
                                    </div>
                                </div>

                                <h3>Building the research platform</h3>
                                <p>Beyond conferences, we developed a year-round platform where researchers could discover related work and build connections. Think ResearchGate but starting from the earliest stages of research—those poster presentations that often contain groundbreaking ideas before they hit journals. I contributed to both the platform development and the company landing page, helping communicate our vision to the academic world.</p>
                                
                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/morressier/morressier-platform.png" alt="Morressier research discovery platform interface" class="project-image" style="width: 100%;">
                                </div>

                                <h3>The results spoke for themselves</h3>
                                <p>Despite the technical hiccups and constant firefighting, the outcomes were strong: 97% user satisfaction from researchers and conference attendees, with virtually every client renewing their contracts. Conference organizers consistently praised both the technology and the on-site execution. The platform successfully scaled through Series A funding, validating that our scrappy approach was building something valuable.</p>

                                <h3>What I learned</h3>
                                <p>Morressier taught me resilience, resourcefulness, and how to transform determination into opportunity. I successfully broke into Berlin tech like I'd dreamed, evolved from Customer Success to Product Management, and helped scale a platform from 8 people to Series A. While my time there ended during a restructuring in late 2019, I'm proud of the systems I built, the chaos I navigated, and most importantly, proving to myself that career reinvention is possible with enough grit.</p>
								</div>
								<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Feb 2018 - Apr 2020</p>
                                    
                                    <h6>THE JOURNEY</h6>
                                    <ul>
                                        <li>Employee #8 at seed startup</li>
                                        <li>60+ global conferences</li>
                                        <li>Customer Success → PM</li>
                                        <li>Seed to Series A growth</li>
                                    </ul>
                                    
                                    <h6>WHAT I DELIVERED</h6>
                                    <ul>
                                        <li>iPad app redesign</li>
                                        <li>Research discovery platform</li>
                                        <li>Conference implementations</li>
                                        <li>QA & process improvements</li>
                                    </ul>

                                    <h6>PERSONAL GROWTH</h6>
                                    <ul>
                                        <li>Self-taught UX/UI design</li>
                                        <li>Discovered Product Management</li>
                                        <li>Broke into Berlin tech</li>
                                        <li>Proved career change possible</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
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
                ${project.hero ? `<div class="portfolio-hero-overlay" style="background-image: url('${project.hero}')"></div>` : ''}
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
        
        // Add hero hover effect if hero image exists
        if (project.hero) {
            this.addHeroHoverEffect(item, project);
        }
        
        return item;
    }
    
    addHeroHoverEffect(item, project) {
        const heroOverlay = item.querySelector('.portfolio-hero-overlay');
        if (!heroOverlay) return;
        
        item.addEventListener('mouseenter', () => {
            heroOverlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            heroOverlay.style.opacity = '0';
        });
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
        
        // Reset scroll position to top
        this.modalBody.scrollTop = 0;
        
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