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
                                <p>Back in 2016, I was stuck in NYC traffic for 30 minutes, and I had to quickly find the nearest available restroom at a Subway sandwich shop. It was disgusting but it was better than nothing. As I came out, I saw a guy in a wheelchair waiting his turn. The heavy lock clicking, as I squeezed past the long line of people in this tight corridor, is a sound I can still hear vividly to this day. This combined with seeing women having nowhere to pee, delivery workers being denied access by restaurants, and even my friends and family getting a UTI because they couldn't find a restroom made me realize that this is a major problem that not enough people are talking about.</p>

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

                                <h3>Competitive analysis revealed a clear opportunity</h3>
                                <p>I conducted comprehensive competitive analysis by gathering existing solutions, posting on Reddit to connect with developers who had attempted similar apps, and creating a detailed Miro board with screenshots, pros/cons, and threat assessments. The research revealed that existing apps were overwhelming, failed to provide trust, and clearly built by men without understanding women's unique needs. User interviews confirmed significantly higher enthusiasm from women, validating the target demographic. I decided to approach it with woman-first design principles, implementing features like a mascot (inspired by interview insights where women mentioned feeling comfortable with their cats at home) and community-first architecture with gamification, reviews, and submissions.</p>

                                <h3>MVP strategy: Focus on urgency, trust, and simplicity</h3>
                                <p>I identified three core user needs for the MVP: orientation (finding nearby locations), trust (safety and cleanliness indicators), and urgency-optimized UI. Rather than feature bloat, I prioritized addressing the immediate need state when someone urgently needs to find a restroom. This strategic focus guided every development decision.</p>

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

								<h3>Technical execution with lean team</h3>
								<p>I built and coordinated a lean 3-person core team plus freelancer network for rapid iteration. I recruited Batuhan Direk, who joined the project to replace my backend with a more robust and scalable one, plus a content lead to manage our growing database. I handled the React Native + TypeScript frontend and Expo deployment, while Batu built the backend with NestJS + PostgreSQL in a monorepo. Together, we implemented OAuth (Apple/Google), real-time map search, user submissions with moderation, reviews, gamification (EXP points, leveling, in-app currency), reporting, and multi-language support (EN, ES, DE, FR, KR, JP, TR). Additionally, Batu built the admin panel in SvelteKit, where we manage all the content.</p>
                                <p>Together, we launched Version 3.0.0, a major milestone for the project.</p>

								<h3>When it clicked</h3>
								<p>Festival organizers loved the concept. They shared restroom location data, we mapped it in our app, and hundreds used it at events like Karneval der Kulturen and Christopher Street Day in Berlin. Users tell me the app is "saving their lives." The numbers speak for themselves: 12k searches, 5k users, 1k MAU, and 4.8/4.6 app store ratings. The soft launch was a success, with room for improvement.</p>

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
                                        <li>Expo deployment</li>
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

                                <h3>Navigating regulatory complexity with cross-functional teams</h3>
                                <p>Insurance operates in a heavily regulated environment where every feature requires approval from data privacy, security, legal, and compliance teams. I led cross-functional product squads of ~11 people (engineers, designers, QA) across iOS, Android, and Web platforms. Direct user communication required broker intermediaries, making research more complex. I coordinated across our Barcelona tech squad, sometimes working in Spanish, while managing relationships with three external design agencies to supplement our lean internal design capacity.</p>

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

                                <h3>Learning design with limited resources</h3>
                                <p>While holding down Customer Success solo during my manager's paternity leave, I spent evenings studying UX/UI design. Without stable housing or WiFi, I'd camp in Berlin U-Bahn stations using their free internet until security kicked me out at closing. I channeled this design knowledge into QA'ing releases, proposing improvements, and essentially filling the PM gap in our scrappy team. The CTO noticed and offered me a Product Manager role—my first time even hearing the title. I pivoted from my designer dreams and never looked back.</p>

                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/morressier/morressier-timeline.png" alt="Journey from Customer Success to Product Management">
                                </div>

                                <h3>Redesigning for researchers with strategic rollout</h3>
                                <p>After closing Series A, we retired the MVP iPad app built by a freelancer and created something worthy of the world's leading medical conferences. I managed a 7-person product team (including data scientists) through the complete redesign process. We executed a low-risk soft launch strategy with established client relationships at smaller conferences, starting with EAO Congress 2019 in Lisbon where we achieved seamless deployment and proved product-market fit. The experience respected researchers' workflows while delighting conference attendees—some would spend hours exploring posters on our hardware setups. The positive feedback from organizers and users validated that we'd finally matched our ambitious vision with execution.</p>
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
            {
                id: 'tomorrow-university',
                title: 'Tomorrow University',
                description: 'Product-Led Growth for Metaverse Education Platform',
                thumbnail: 'assets/projects/tomorrow/tomorrow-hero.png',
                hero: 'assets/projects/tomorrow/tomorrow-hero.gif',
                featured: true,
                tags: ['Product Management', 'Growth', 'Apple Vision Pro'],
                year: '2023-2024',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_tou.jpeg" class="project-logo" alt="Tomorrow University Logo">
                        <h2>Tomorrow University of Applied Sciences</h2>
                        <p class="lead">Transforming closed education platform into growth engine</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">Growth</span>
                            <span class="project-tag">Apple Vision Pro</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/projects/tomorrow/tomorrow-hero.gif" alt="Tomorrow University App Interface" class="project-showcase-image" style="width: 100%;">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>The growth challenge</h3>
                                <p>Tomorrow University had ambitious metaverse education goals but faced critical growth barriers: a closed learning platform, inconsistent branding, lackluster homepage, and extremely high customer acquisition costs. The learning platform was inaccessible to prospects, creating a "black box" experience that prevented lead qualification and conversion. As sole Product Manager, I was brought in to transform this closed system into an open growth engine.</p>

                                <h3>Strategic approach: Lead-to-enrollment architecture</h3>
                                <p>I diagnosed the core issue: prospects couldn't experience the product before paying, creating massive conversion friction. My strategy focused on redesigning the entire user journey for non-paying visitors who discovered us through social media ads. The solution required rethinking platform architecture to support two user types: enrolled students and prospective leads, each with different access levels and experiences.</p>

                                <h3>Leading cross-functional delivery under pressure</h3>
                                <p>As sole PM coordinating a 7-person team (Director of Engineering, Product Designer, 3 Full-Stack Engineers, QA Engineer), I managed competing priorities while the CEO continued adding scope. When the designer was let go mid-project, I took on additional UX responsibilities to maintain momentum. I worked extremely closely with our Director of Engineering to ensure technical feasibility while pushing back on unrealistic timelines.</p>

                                <h3>Key strategic releases</h3>
                                <p>Each release targeted specific conversion barriers while building toward the complete lead-to-enrollment journey:</p>
                                
                                <div class="project-image-carousel" data-carousel="tomorrow-releases" style="margin: 20px 0;">
									<div class="carousel-container" style="height: 400px; overflow: hidden;">
										<div class="carousel-track">
											<div class="carousel-slide">
												<img src="assets/projects/tomorrow/tomorrow-releases-1.jpg" alt="Homepage transformation before and after" style="width: 100%; height: 400px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/tomorrow/tomorrow-releases-2.jpg" alt="End-to-end sales funnel flow" style="width: 100%; height: 400px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/tomorrow/tomorrow-releases-3.jpg" alt="Authentication and onboarding with Clerk SSO" style="width: 100%; height: 400px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/tomorrow/tomorrow-releases-4.jpg" alt="Community features: student directory and events" style="width: 100%; height: 400px; object-fit: contain;">
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

                                <p><strong>1. Homepage Transformation:</strong> Completely rebuilt the homepage from scratch, conducting user interviews with existing students to ensure we didn't break their expected experience while creating compelling first impressions for prospects.</p>
                                
                                <p><strong>2. End-to-End Sales Funnel:</strong> Built the complete lead-to-enrollment journey including course catalog, program discovery, application forms, checkout flow, and enrollment process. This became the company's largest feature release in its history.</p>

                                <p><strong>3. Authentication & Onboarding:</strong> Implemented Clerk-based signup flows with Google/Apple SSO to reduce registration friction and improve conversion rates.</p>

                                <p><strong>4. Community Features:</strong> Enhanced student directory with search and filtering capabilities, plus centralized events page with calendar integration to increase platform value and engagement.</p>

                                <h3>Apple Vision Pro: Strategic market response</h3>
                                <p>When Apple Vision Pro launched ahead of schedule, I recognized the media opportunity for a "metaverse university." I guided the technical approach—implementing a strategic web-view solution that met Apple's app store requirements while maximizing development efficiency. This rapid market response generated positive media coverage and positioned Tomorrow University as an early adopter in educational AR/VR.</p>

                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/tomorrow/tomorrow-visionpro.png" alt="Tomorrow University Apple Vision Pro app" class="project-image" style="width: 100%;">
                                </div>

                                <h3>Delivering major company milestone</h3>
                                <p>The results validated our strategic approach: we successfully opened the previously closed platform to prospects, created a complete sales funnel, and delivered what leadership called "the largest feature release in company history." The team achieved 2 major company OKRs, with the end-to-end sales journey becoming fully operational. Despite challenging leadership dynamics, we shipped a growth transformation that fundamentally changed how the company could acquire and convert customers.</p>

                                <h3>What I learned</h3>
                                <p>Tomorrow University taught me how to drive product-led growth in a resource-constrained environment while managing stakeholder expectations. Leading the transformation from closed platform to open growth funnel required both strategic vision and tactical execution. The experience reinforced my ability to deliver under pressure, make smart technical trade-offs, and coordinate complex feature releases as the sole PM in a fast-moving startup environment.</p>
							</div>
							<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Nov 2023 - May 2024</p>
                                    
                                    <h6>THE CHALLENGE</h6>
                                    <ul>
                                        <li>Closed platform preventing lead conversion</li>
                                        <li>Extremely high customer acquisition costs</li>
                                        <li>Inconsistent branding and poor UX</li>
                                        <li>Resource constraints and scope creep</li>
                                    </ul>
                                    
                                    <h6>MY ROLE</h6>
                                    <ul>
                                        <li>Sole Product Manager</li>
                                        <li>Growth strategy & execution</li>
                                        <li>Cross-functional team coordination</li>
                                        <li>Emergency UX support</li>
                                    </ul>

                                    <h6>IMPACT</h6>
                                    <ul>
                                        <li>Delivered largest company feature release</li>
                                        <li>Complete lead-to-enrollment journey</li>
                                        <li>Achieved 2 major company OKRs</li>
                                        <li>Apple Vision Pro early market entry</li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'feedbacker',
                title: 'Feedbacker (Fdbckr)',
                description: 'Visual Design Feedback Platform - Bootcamp Final Project',
                thumbnail: 'assets/projects/feedbacker/feedbacker-hero.jpg',
                hero: 'assets/projects/feedbacker/feedbacker-hero.gif',
                featured: false,
                tags: ['Full-Stack Development', 'Web', 'Student Project'],
                year: '2021',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_lewagon.jpeg" class="project-logo" alt="Le Wagon Logo">
                        <h2>Feedbacker: Visual Design Feedback Platform</h2>
                        <p class="lead">Full-Stack PM in action - applying product leadership while learning to code</p>
                        <div class="project-meta">
                            <span class="project-tag">Full-Stack Development</span>
                            <span class="project-tag">Web</span>
                            <span class="project-tag">Student Project</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/projects/feedbacker/feedbacker-hero.gif" alt="Feedbacker App Interface" class="project-showcase-image" style="width: 100%;">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Identifying the problem from personal experience</h3>
                                <p>During Le Wagon's intensive coding bootcamp, students pitch final project ideas and vote on which to build. I identified a frustrating communication problem I'd experienced repeatedly: giving specific feedback on visual designs. Typically, you can only comment on entire images or struggle to describe exactly which element needs work ("the cloud in the upper right needs more detail"). This creates confusion and inefficient feedback loops for designers and visual artists.</p>

                                <h3>From pitch to team leadership</h3>
                                <p>My idea was selected for development, and I found myself leading a 4-person team of coding students. Drawing on my PM experience at Morressier, I naturally took charge of organizing workloads, distributing tasks, cutting scope, and driving technical decisions. While my teammates focused on learning to code, I applied my existing product management skills to coordinate our 2-week sprint from concept to demo-ready product.</p>

                                <div class="project-image-container" style="margin: 20px 0;">
                                    <img src="assets/projects/feedbacker/feedbacker-wireframes.png" alt="Early Figma wireframes and product planning" class="project-image" style="width: 100%;">
                                </div>

                                <h3>Technical innovation: Location-based feedback</h3>
                                <p>The core technical challenge was implementing location-based commenting on images—similar to what Figma offers today, but this was 2021. Users could upload visual artwork and others could click specific points to leave contextual feedback tied to exact locations. We built this with Ruby on Rails, JavaScript for the interactive commenting system, and deployed on Heroku. The solution required careful coordinate mapping and real-time feedback display.</p>

                                <div class="project-image-carousel" data-carousel="feedbacker-features" style="margin: 20px 0;">
									<div class="carousel-container" style="height: 400px; overflow: hidden;">
										<div class="carousel-track">
											<div class="carousel-slide">
												<img src="assets/projects/feedbacker/feedbacker-discover-artworks.png" alt="Discover artworks page showing community gallery" style="width: 100%; height: 400px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/feedbacker/feedbacker-discover-artists.png" alt="Discover artists page with user profiles" style="width: 100%; height: 400px; object-fit: contain;">
											</div>
											<div class="carousel-slide">
												<img src="assets/projects/feedbacker/feedbacker-artist-profile.png" alt="Artist profile page with portfolio and feedback" style="width: 100%; height: 400px; object-fit: contain;">
											</div>
										</div>
										<button class="carousel-nav prev" aria-label="Previous image">❮</button>
										<button class="carousel-nav next" aria-label="Next image">❯</button>
									</div>
									<div class="carousel-indicators">
										<div class="carousel-indicator active"></div>
										<div class="carousel-indicator"></div>
										<div class="carousel-indicator"></div>
									</div>
								</div>

                                <h3>Project management and delivery under pressure</h3>
                                <p>I organized our 2-week timeline by breaking down the product into core user journeys: account creation, image upload, commenting system, and community discovery. I held planning meetings to discuss architecture, UI layouts, and user flows, then distributed tasks across the team. Despite typical development hiccups, we maintained momentum through clear communication and scope prioritization. The key was focusing on our core value proposition rather than feature creep.</p>

                                <h3>Demo day validation</h3>
                                <p>Initially, some classmates didn't understand the concept during development. But during our demo to 3 full batches plus staff, alumni, and external attendees, the value became immediately clear. As one attendee put it: "Ah yes, it's much better to click on the cloud and say it needs more work, rather than explaining that in a comment box." The clean, intuitive interface helped users grasp the value proposition instantly.</p>

                                <div class="embed-responsive embed-responsive-16by9" style="margin: 20px 0;">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/snYk8xveH5g?si=xkf66p0n2KcV60pz&amp;start=5724" title="Feedbacker Demo - Le Wagon Berlin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div>

                                <h3>Becoming a more technical PM</h3>
                                <p>Leading Feedbacker while learning to code was transformative for my PM career. I could finally bridge the gap between user needs and technical execution with hands-on development experience. Understanding the actual complexity of implementation made me a better PM—more realistic about timelines, better at technical trade-offs, and able to communicate more effectively with engineering teams. This foundation later proved invaluable at wefox, where I could jump into Figma when needed and make informed technical decisions.</p>

                                <h3>What I learned</h3>
                                <p>This project reinforced that great products solve real problems you've personally experienced. The most compelling pitches come from authentic pain points. Learning to code while applying PM skills taught me the importance of realistic technical scoping and clear communication with development teams. Most importantly, I gained hands-on experience that made me a more technical PM—capable of making informed trade-offs and bridging the gap between product vision and engineering reality.</p>
							</div>
							<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2 weeks (July 2021)</p>
                                    
                                    <h6>THE CHALLENGE</h6>
                                    <ul>
                                        <li>Visual feedback communication problem</li>
                                        <li>2-week sprint to working demo</li>
                                        <li>Technical complexity of location-based commenting</li>
                                        <li>Applying PM skills in development context</li>
                                    </ul>
                                    
                                    <h6>MY ROLE</h6>
                                    <ul>
                                        <li>Product vision & strategy</li>
                                        <li>Team leadership (4-person squad)</li>
                                        <li>Project management & scope prioritization</li>
                                        <li>Full-stack development</li>
                                    </ul>

                                    <h6>IMPACT</h6>
                                    <ul>
                                        <li>Selected project pitch</li>
                                        <li>Successful demo to 100+ attendees</li>
                                        <li>Team commended for rapid delivery</li>
                                        <li>Enhanced PM skills with technical depth</li>
                                    </ul>
                                    
                                    <h6>TECH STACK</h6>
                                    <ul>
                                        <li>Ruby on Rails</li>
                                        <li>JavaScript</li>
                                        <li>HTML/CSS</li>
                                        <li>Heroku</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: 'undulmood-partnership',
                title: 'Undulmood',
                description: 'Digital Solutions for Creative Industry',
                thumbnail: 'assets/projects/undulmood/undulmood-hero.png',
                hero: 'assets/projects/undulmood/undulmood-hero.gif',
                featured: false,
                tags: ['Consulting', 'E-commerce Strategy', 'Partnership'],
                year: '2020-2023',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_undulmood.svg" class="project-logo" alt="Undulmood Logo" style="filter: brightness(0) invert(1);">
                        <h2>Undulmood</h2>
                        <p class="lead">Digital solutions for creative industry - a multi-year partnership</p>
                        <div class="project-meta">
                            <span class="project-tag">Consulting</span>
                            <span class="project-tag">E-commerce Strategy</span>
                            <span class="project-tag">Partnership</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/projects/undulmood/undulmood-hero.gif" alt="Undulmood Digital Solutions Overview" class="project-showcase-image" style="width: 100%; max-height: 600px; object-fit: contain;">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>A partnership born from crisis</h3>
                                <p>In 2020, Berlin-based tattoo artist Undulmood faced an unprecedented challenge: COVID lockdowns had completely dried up his business. Like many creatives, he needed to pivot quickly. He'd been receiving requests from clients to sell art prints and had been developing this idea, but lacked the technical knowledge to execute. Operating on a tight budget during uncertain times, we began what would become a multi-year digital partnership spanning crisis response, operational optimization, and strategic growth initiatives.</p>

                                <h3>Phase 1: Crisis response and e-commerce foundation (2020)</h3>
                                <p>The immediate need was clear: establish an online sales channel quickly and affordably. After researching available solutions, I recommended Shopify for its reliability and ease of management. Beyond technical setup, I consulted on the full business model: print production logistics, warehousing solutions, delivery options, and international shipping strategies for his global client base. The focus was creating a sustainable revenue stream that could operate independently of his physical tattoo work.</p>

                                <div class="project-image-gallery" style="margin: 20px 0;">
                                    <div class="project-image-container" style="margin-bottom: 20px;">
                                        <img src="assets/projects/undulmood/undulmood-daggers.png" alt="DAGGERS collection showcasing tattoo-inspired artwork" class="project-image" style="width: 100%;">
                                    </div>
                                    <div class="project-image-container">
                                        <img src="assets/projects/undulmood/undulmood-message.png" alt="Personal message from artist to customers" class="project-image" style="width: 100%;">
                                    </div>
                                </div>

                                <h3>Phase 2: Operations optimization and workflow improvement (2021-2022)</h3>
                                <p>As his popularity grew, Undulmood faced a new problem: overwhelming inquiries that lacked sufficient context. Popular artists receive dozens of emails simply asking "how much?" without project details, creating hours of filtering and back-and-forth communication. As someone who isn't a fluent writer, this process was causing significant stress and eating into his creative time.</p>

                                <p>I designed and built a custom booking form that required visitors to provide complete project context upfront, carefully following his creative and stylistic choices—including using hanji (Korean traditional paper) as the background texture to maintain brand consistency. This zero-cost solution (using FormSubmit.co initially) dramatically reduced his administrative burden and eliminated unqualified inquiries. The impact was immediate: he went from spending hours on email clarification to receiving only serious, well-detailed requests. Eventually, seeing the value of the solution, he upgraded to Typeform as originally recommended.</p>

                                <div class="project-image-container expandable-image" style="margin: 20px 0;">
                                    <div class="expandable-image-wrapper" style="overflow: hidden; max-height: 400px; position: relative; transition: max-height 0.3s ease;">
                                        <img src="assets/projects/undulmood/undulmood-booking.png" alt="Custom booking form interface" class="project-image" style="width: 100%;">
                                        <div class="expand-overlay" style="position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); display: flex; align-items: center; justify-content: center;">
                                            <button class="expand-btn" style="background: rgba(34, 141, 255, 0.9); color: white; border: none; padding: 8px 16px; border-radius: 20px; font-size: 0.9em; cursor: pointer; backdrop-filter: blur(10px);">Show full form ↓</button>
                                        </div>
                                    </div>
                                </div>

                                <h3>Phase 3: Strategic expansion and marketplace vision (2023)</h3>
                                <p>With core operations stabilized, Undulmood approached me about a more ambitious project: MISANG, a curated marketplace for Korean artisan goods. The concept targeted affluent European and American consumers interested in authentic Korean craftsmanship—woodworkers, metalworkers, and traditional artisans creating unique gifts and home goods.</p>

                                <p>This project required genuine strategic discovery. Unlike his previous needs, this was about building a multi-vendor platform with complex categorization: products organized by type, but also by individual artisan brands. I began with systematic architecture planning, user flow mapping, and categorization strategy before moving to visual design—an approach that prioritized understanding the business requirements and user needs first.</p>
                                <div class="project-image-carousel" data-carousel="misang-concepts">
                                    <p style="text-align: center; color: #666; font-size: 0.9em; margin-bottom: 15px;"><em>Early concept exploration work - Site architecture and visual direction research</em></p>
                                    <div class="carousel-container">
                                        <div class="carousel-track">
                                            <div class="carousel-slide">
                                                <img src="assets/projects/undulmood/misang-architecture.png" alt="Site architecture, product categorization, and sitemap">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/undulmood/misang-moodboard.png" alt="Visual moodboard and brand direction">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/undulmood/misang-typography.png" alt="Typography exploration and decisions">
                                            </div>
                                            <div class="carousel-slide">
                                                <img src="assets/projects/undulmood/misang-lowfi.png" alt="Low fidelity wireframes and layout concepts">
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

                                <h3>The value of systematic process and lean execution</h3>
                                <p>My approach to MISANG balanced strategic rigor with budget realities. By focusing on understanding the business model, target market, and operational requirements first, then using lightweight design exploration before moving directly to Shopify development, we achieved strategic depth while controlling costs. This systematic-yet-lean methodology was well-received by the client, who appreciated the strategic foundation approach. Although MISANG ultimately didn't launch due to supplier sourcing challenges, the strategic foundation work demonstrated the value of thorough discovery combined with pragmatic execution.</p>

                                <h3>Becoming the trusted digital advisor</h3>
                                <p>Over three years, I evolved from crisis contractor to strategic digital partner. "For anything technical, he comes to me first," reflects the trust built through consistent delivery and strategic thinking. Each project built on previous successes: the e-commerce foundation enabled operational optimization, which then supported larger strategic initiatives.</p>

                                <h3>Measurable business impact</h3>
                                <p>The partnership delivered concrete results: the Shopify store unlocked a sustainable passive revenue stream, with Procreate brushes becoming particularly popular due to their immediate digital delivery and accessible pricing for digital artists. The booking form eliminated hours of administrative work weekly, reducing stress and allowing focus on creative work. While MISANG didn't materialize, the strategic planning process demonstrated sophisticated marketplace thinking that the client valued highly.</p>

                                <h3>What this partnership taught me</h3>
                                <p>Working with Undulmood reinforced the importance of systematic process over aesthetic output. Clients value strategic thinking and business understanding as much as technical execution. The evolution from crisis response to growth strategy showed how trusted partnerships develop through consistent delivery and genuine business impact. Most importantly, I learned that sustainable client relationships are built on solving real problems systematically, not just delivering what's asked for.</p>

                                <p>You can explore the ongoing results of this partnership at <a href="https://undulmood.com" target="_blank" rel="noopener">undulmood.com</a>, where the e-commerce foundation we built continues to generate passive income and showcase his artistic work to a global audience.</p>
							</div>
							<div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2020 - 2023</p>                                    
                                    <h6>THE CHALLENGE</h6>
                                    <ul>
                                        <li>COVID business crisis requiring immediate pivot</li>
                                        <li>Operational inefficiencies in client communication</li>
                                        <li>Ambitious marketplace strategy development</li>
                                        <li>Budget constraints throughout</li>
                                    </ul>
                                    
                                    <h6>MY ROLE</h6>
                                    <ul>
                                        <li>Strategic digital advisor</li>
                                        <li>E-commerce setup & optimization</li>
                                        <li>Business process improvement</li>
                                        <li>Marketplace concept development</li>
                                    </ul>

                                    <h6>DELIVERABLES</h6>
                                    <ul>
                                    <li>Business operations consulting</li>
                                        <li>Shopify store (prints, brushes, goods)</li>
                                        <li>Custom booking form system</li>
                                        <li>MISANG marketplace strategy & design</li>
                                    </ul>

                                    <h6>IMPACT</h6>
                                    <ul>
                                        <li>Passive revenue stream unlocked</li>
                                        <li>Eliminated several hours of weekly admin work</li>
                                        <li>Trusted long-term digital partnership</li>
                                        <li>Strategic foundation for future growth</li>
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
        
        // Initialize expandable images
        this.initExpandableImages();
        
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
    
    initExpandableImages() {
        const expandableImages = this.modalBody?.querySelectorAll('.expandable-image');
        if (!expandableImages) return;
        
        expandableImages.forEach(container => {
            const wrapper = container.querySelector('.expandable-image-wrapper');
            const button = container.querySelector('.expand-btn');
            const overlay = container.querySelector('.expand-overlay');
            
            if (!wrapper || !button || !overlay) return;
            
            let isExpanded = false;
            
            button.addEventListener('click', () => {
                if (!isExpanded) {
                    // Expand
                    wrapper.style.maxHeight = 'none';
                    button.textContent = 'Show less ↑';
                    overlay.style.display = 'none';
                    isExpanded = true;
                } else {
                    // Collapse
                    wrapper.style.maxHeight = '400px';
                    button.textContent = 'Show full form ↓';
                    overlay.style.display = 'flex';
                    isExpanded = false;
                }
            });
        });
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