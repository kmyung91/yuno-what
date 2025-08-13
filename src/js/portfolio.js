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
                        <p class="lead">Full-stack mobile application helping users locate accessible restrooms within 5 seconds</p>
                        <div class="project-meta">
                            <span class="project-tag">Founder</span>
                            <span class="project-tag">Full-Stack Development</span>
                            <span class="project-tag">React Native</span>
                            <span class="project-tag">Product Strategy</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/projects/easypz/easypz-hero.gif" alt="EasyPZ App Interface">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>The Beginning</h3>
                                <p>EasyPZ started from a simple frustration—finding a restroom in an unfamiliar city shouldn't be this hard. After countless awkward situations and rushed searches, I decided to build the solution I wished existed.</p>

                                <p>I interviewed over 100 people and discovered this wasn't just my problem. Parents with young children, people with medical conditions, travelers—everyone had a restroom horror story.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📊 CREATE: easypz-research.png → User interviews and survey insights (assets/projects/easypz/)</div>

                                <h3>Launch & The Zombie Phase</h3>
                                <p>We launched with a technical co-founder, gained some traction, and reached the app stores. But when my co-founder stepped away, EasyPZ became a zombie—functional but stagnant, slowly losing users while I focused on other projects.</p>

                                <p>For months, EasyPZ sat there, a good idea collecting digital dust.</p>

                                <h3>The AI Revival</h3>
                                <p>Everything changed when I discovered prompt engineering. Suddenly, I could rebuild what took a team months in just weeks. I didn't just revive EasyPZ—I completely reimagined it.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">⚙️ CREATE: easypz-architecture.png → Technical stack comparison (before/after) (assets/projects/easypz/)</div>

                                <h3>Where We Are Now</h3>
                                <p>The new EasyPZ is 90% better than the original—faster, more reliable, and available in 7 languages. We've hit 1,000+ monthly active users with zero marketing spend and maintain a 4.8/5 star rating.</p>

                                <p>But the real victory? I learned that sometimes the best way forward is to tear everything down and rebuild it better.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📈 CREATE: easypz-metrics.png → App store ratings and user growth charts (assets/projects/easypz/)</div>

                                <h3>Current Challenges & What's Next</h3>
                                <p>The challenge now isn't technical—it's growth. How do you scale a utility app that people use once and forget about until they desperately need it again?</p>

                                <p>I'm working on a brand refresh that transforms EasyPZ from a simple utility into something more memorable. Think retro gaming vibes with our mascot Zima leading the charge.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🎨 CREATE: easypz-branding.png → Zima mascot and brand refresh concept (assets/projects/easypz/)</div>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Sep 2022 - Present</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Product Strategy & User Research</li>
                                        <li>Full-Stack Development</li>
                                        <li>Technical Architecture</li>
                                        <li>Team Leadership</li>
                                    </ul>
                                    
                                    <h6>Key Metrics</h6>
                                    <ul>
                                        <li>1,000+ Monthly Active Users</li>
                                        <li>4.8/5 App Store Rating</li>
                                        <li>7 Languages Supported</li>
                                        <li>90% better and more optimized than v1</li>
                                        <li>Zero Marketing Spend</li>
                                    </ul>
                                    
                                    <h6>Technologies</h6>
                                    <ul>
                                        <li>React Native + TypeScript</li>
                                        <li>NestJS + PostgreSQL</li>
                                        <li>AWS Infrastructure</li>
                                        <li>Monorepo Architecture</li>
                                        <li>OAuth Integration</li>
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
                        <p class="lead">Leading complex database integrations and cross-platform redesign at Europe's insurtech unicorn</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">iOS</span>
                            <span class="project-tag">Android</span>
                            <span class="project-tag">Web</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">📱 CREATE: wefox-hero.png → App interface before/after comparison (assets/projects/wefox/)</div>
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>The Technical Challenge</h3>
                                <p>When I joined wefox, the app could only display insurance policies from wefox providers—limiting its value for customers with multiple insurers. The core challenge was architecting database integrations across external insurance providers while navigating legal, privacy, and security requirements.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🔗 CREATE: wefox-integration.png → Database integration architecture diagram (assets/projects/wefox/)</div>
                                
                                <h3>Cross-Functional Leadership</h3>
                                <p>As Product Manager for the largest tech squad at wefox (8-9 engineers across iOS, Android, and web), I coordinated between Principal Engineers, legal teams, and external partners to solve this complex integration challenge.</p>
                                
                                <p>The breakthrough required months of stakeholder alignment, security audits, and custom API development to create a unified system that could safely aggregate insurance data from any provider.</p>

                                <h3>Design System Implementation</h3>
                                <p>Simultaneously, I led the implementation of wefox's first unified design system across all platforms, working with external agencies and internal designers to establish consistent UI components and patterns.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🎨 CREATE: wefox-design-system.png → Cross-platform component library (assets/projects/wefox/)</div>
                                
                                <h3>Technical Achievement</h3>
                                <p>The successful integration expanded platform capabilities from serving 35K existing wefox customers to supporting 2M+ potential users across multiple insurance providers—a fundamental shift in the product's value proposition.</p>

                                <p>This complex technical achievement required navigating insurance industry compliance standards while maintaining security and performance across three platforms.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Aug 2021 - Oct 2023</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Cross-platform product strategy</li>
                                        <li>Technical integration leadership</li>
                                        <li>Squad management (8-9 engineers)</li>
                                        <li>Design system implementation</li>
                                    </ul>
                                    
                                    <h6>Technical Scope</h6>
                                    <ul>
                                        <li>iOS, Android, and Web platforms</li>
                                        <li>External database integrations</li>
                                        <li>Security and compliance architecture</li>
                                        <li>Cross-platform design system</li>
                                    </ul>
                                    
                                    <h6>Team Structure</h6>
                                    <ul>
                                        <li>Principal Engineers (2)</li>
                                        <li>Platform developers (iOS, Android, Web)</li>
                                        <li>QA Engineers (2)</li>
                                        <li>UX/UI Designers (3)</li>
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
                        <p class="lead">Growing with a seed-stage startup from Customer Success to Product Management</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">iOS</span>
                            <span class="project-tag">Web</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">📱 CREATE: morressier-hero.png → iPad presentation app interface (assets/projects/morressier/)</div>
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Organic Role Evolution</h3>
                                <p>I joined Morressier as one of the early hires when the product wasn't yet functional enough to meet user needs. Initially hired for Customer Success, I naturally transitioned into project management, overseeing 60+ global medical conference implementations.</p>

                                <p>During my commute, I studied UX/UI design, continuously advocating for product improvements. The CTO noticed my initiative and created a Product Manager position specifically for me—my first introduction to product management.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📈 CREATE: morressier-growth.png → Career progression timeline (assets/projects/morressier/)</div>
                                
                                <h3>iPad App Redesign</h3>
                                <p>The existing iPad presentation app had numerous bugs and UX flaws. As the internal expert having attended medical conferences in Berlin, NYC, Busan, and Lisbon, I gathered direct user feedback and led the complete app overhaul.</p>

                                <p>Working closely with our Senior Product Designer, we delivered a significantly improved conference presentation experience that conference organizers adopted across multiple global events.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🌍 CREATE: morressier-conferences.png → Global conference locations and user feedback (assets/projects/morressier/)</div>
                                
                                <h3>Research Discovery Platform</h3>
                                <p>I contributed to developing Morressier's web platform that helped medical researchers discover related work through content analysis and connection algorithms. The platform supported researchers through their pre-publication journey from early-stage conference presentations to final publication.</p>

                                <h3>Startup Growth Experience</h3>
                                <p>Working at seed-stage Morressier provided hands-on experience with multiple product aspects—from customer-facing implementations to technical product decisions. This environment taught me to wear multiple hats and adapt quickly as the company grew toward Series A.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Feb 2018 - Apr 2020</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Managed 60+ global projects</li>
                                        <li>iPad app redesign</li>
                                        <li>Research discovery platform MVP</li>
                                        <li>Landing Page Relaunch</li>
                                    </ul>
                                    
                                    <h6>Technologies</h6>
                                    <ul>
                                        <li>iOS (iPad) Development</li>
                                        <li>Machine-learning Platform</li>
                                        <li>Conference Management Tools</li>
                                        <li>Content Collection & Analysis Systems</li>

                                    </ul>
                                    
                                    <h6>Growth</h6>
                                    <p>Seed stage → Series A progression</p>
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
                        <p class="lead">Operating as sole Product Manager after team restructuring, shipping groundbreaking Vision Pro app</p>
                        <div class="project-meta">
                            <span class="project-tag">Apple Vision Pro</span>
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">Growth</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">🥽 CREATE: tou-hero.png → Vision Pro app interface mockup (assets/projects/tomorrow-university/)</div>
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Solo Product Leadership</h3>
                                <p>After the previous PM team was restructured, I operated as the sole Product Manager for Tomorrow University's platform development. Despite being promised a Head of Product role, I took ownership of the entire product strategy and execution across 7 major platform releases.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🗺 CREATE: tou-releases.png → 7 major releases timeline (assets/projects/tomorrow-university/)</div>
                                
                                <h3>Vision Pro Pioneer Launch</h3>
                                <p>When Apple surprise-launched Vision Pro earlier than expected, I quickly reallocated resources to develop Tomorrow University's metaverse app for the new platform. As the only PM with App Store release experience on the team, I led the technical and strategic decisions for this groundbreaking educational application.</p>

                                <p>The successful launch positioned Tomorrow University as a pioneer in metaverse education and generated significant media attention for the institution.</p>

                                <h3>Growth Engineering Initiatives</h3>
                                <p>I implemented comprehensive product-led growth features including Google & Apple SSO integration that reduced registration friction by 95%, and designed the first end-to-end digital sales flow enabling direct program purchases through the platform.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📊 CREATE: tou-growth.png → SSO integration and conversion flow improvements (assets/projects/tomorrow-university/)</div>
                                
                                <h3>Cross-Functional Coordination</h3>
                                <p>Working with a distributed team of 5+ engineers, designers, and stakeholders, I managed product roadmaps, feature prioritization, and release coordination across multiple platform initiatives simultaneously.</p>

                                <p>The largest platform release included a complete homepage redesign, comprehensive program catalog, and integrated checkout system—representing months of cross-team coordination and technical implementation.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>Nov 2023 - May 2024</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Solo product management leadership</li>
                                        <li>Vision Pro app development</li>
                                        <li>Growth feature implementation</li>
                                        <li>Cross-functional team coordination</li>
                                    </ul>
                                    
                                    <h6>Major Releases</h6>
                                    <ul>
                                        <li>Apple Vision Pro app (pioneering launch)</li>
                                        <li>SSO integration (95% time reduction)</li>
                                        <li>End-to-end sales platform</li>
                                        <li>Homepage and program catalog</li>
                                    </ul>
                                    
                                    <h6>Team Structure</h6>
                                    <ul>
                                        <li>Product Manager (sole)</li>
                                        <li>Engineers (5+)</li>
                                        <li>Designers & Stakeholders</li>
                                        <li>QA and DevOps support</li>
                                    </ul>
                                    
                                    <h6>Platform Focus</h6>
                                    <p>Web, Apple Vision Pro, Mobile</p>
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
                        <p class="lead">Solving client communication challenges with custom form design</p>
                        <div class="project-meta">
                            <span class="project-tag">Form Design</span>
                            <span class="project-tag">Creative Solutions</span>
                            <span class="project-tag">Custom Development</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">📋 CREATE: tattoo-booking-hero.png → Custom form interface design (assets/projects/tattoo-booking/)</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Client Challenge</h3>
                                <p>Undulmood, a high-demand traveling tattoo artist, was frustrated by clients who would DM or email with insufficient information for project discussions. This created inefficient back-and-forth communication that was eating into his creative time.</p>
                                
                                <h3>Custom Solution Approach</h3>
                                <p>Despite my recommendation to use Typeform, the client wanted to avoid operational costs. I developed a custom booking form that captured all necessary client information upfront while maintaining visual consistency with his artistic brand.</p>
                                
                                <h3>Technical Constraints & Innovation</h3>
                                <p>Working within a zero-budget constraint, I implemented a creative solution using formsubmit.co for form handling and Netlify for hosting. The form was designed to organize submissions into a clean table format delivered via email.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">⚙️ CREATE: tattoo-booking-tech.png → Technical flow diagram (Netlify + Formsubmit) (assets/projects/tattoo-booking/)</div>
                                
                                <h3>Outcome & Client Transition</h3>
                                <p>The custom form successfully filtered client inquiries and improved communication quality for several months. Eventually, as the client's business grew, he transitioned to Typeform for enhanced features—validating the original technical recommendation while proving the custom solution met immediate needs.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2021</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Client needs analysis</li>
                                        <li>Technical constraint navigation</li>
                                        <li>Custom form development</li>
                                        <li>Brand-consistent design</li>
                                    </ul>
                                    
                                    <h6>Technical Stack</h6>
                                    <ul>
                                        <li>HTML/CSS custom styling</li>
                                        <li>Responsive JavaScript</li>
                                        <li>Formsubmit.co integration</li>
                                        <li>Netlify hosting</li>
                                    </ul>
                                    
                                    <h6>Client</h6>
                                    <p>Undulmood (Freelance)</p>
                                    
                                    <h6>Constraint</h6>
                                    <p>Zero operational cost requirement</p>
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
                        <p class="lead">Leading team development and product vision at Le Wagon coding bootcamp</p>
                        <div class="project-meta">
                            <span class="project-tag">Design Leadership</span>
                            <span class="project-tag">Ruby on Rails</span>
                            <span class="project-tag">Javascript</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">📱 CREATE: feedbacker-hero.png → Main app interface showing location-based feedback (assets/projects/feedbacker/)</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Problem Identification & Product Vision</h3>
                                <p>During Le Wagon bootcamp, I identified a personal frustration with online visual design feedback—typically limited to commenting on entire images rather than specific elements. I pitched Feedbacker as a platform enabling location-specific feedback on visual artwork.</p>
                                
                                <h3>Team Leadership & Project Management</h3>
                                <p>Taking the lead on this 4-developer team project, I organized workflows to keep everyone constantly updated and contributing effectively. The project management approach ensured efficient collaboration during the intensive 2-week development sprint.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">👥 CREATE: feedbacker-team.png → Team organization and workflow process (assets/projects/feedbacker/)</div>
                                
                                <h3>Technical Implementation</h3>
                                <p>We built a full-stack Ruby on Rails application with location-based commenting functionality. Users could click on specific parts of uploaded images to add coordinate-mapped feedback, enabling precise visual communication between artists and reviewers.</p>
                                
                                <h3>Bootcamp Recognition</h3>
                                <p>Our team was highly commended for achieving exceptional development progress within the short timeframe. We were awarded the honorary "final presentation" slot, recognizing both our technical execution and project management effectiveness.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🏆 CREATE: feedbacker-presentation.png → Final bootcamp presentation slides (assets/projects/feedbacker/)</div>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2021 (2 weeks intensive)</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Product concept and vision</li>
                                        <li>Team leadership and coordination</li>
                                        <li>Project management and workflows</li>
                                        <li>Full-stack development</li>
                                    </ul>
                                    
                                    <h6>Team Structure</h6>
                                    <ul>
                                        <li>Kevin Myung (Team Lead)</li>
                                        <li>Martin Kühne</li>
                                        <li>Marnie Nyenhuis</li>
                                        <li>Laura Hauertmann</li>
                                    </ul>
                                    
                                    <h6>Technical Stack</h6>
                                    <ul>
                                        <li>Ruby on Rails (full-stack)</li>
                                        <li>JavaScript (frontend interaction)</li>
                                        <li>PostgreSQL (database)</li>
                                        <li>HTML/CSS (responsive design)</li>
                                    </ul>
                                    
                                    <h6>Recognition</h6>
                                    <p>Honorary final presentation slot</p>
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
                        <p class="lead">Digital transformation during COVID-19 pandemic for creative professionals</p>
                        <div class="project-meta">
                            <span class="project-tag">E-commerce</span>
                            <span class="project-tag">Shopify</span>
                            <span class="project-tag">Design</span>
                            <span class="project-tag">Development</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">🛍 CREATE: undulmood-store-hero.png → Shopify store homepage design (assets/projects/undulmood-store/)</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Pandemic Business Adaptation</h3>
                                <p>During 2020's lockdowns, I was approached by three Berlin-based creatives needing assistance with digitalizing their work. Undulmood, a tattoo artist, needed to establish online revenue streams while traditional tattooing was restricted.</p>
                                
                                <h3>E-commerce Strategy & Implementation</h3>
                                <p>I developed a comprehensive Shopify store featuring multiple revenue streams: original artwork sales, branded accessories, and digital brush sets for other tattoo artists. This diversified approach provided income while building his digital presence.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📋 CREATE: undulmood-products.png → Product categories and revenue streams (assets/projects/undulmood-store/)</div>
                                
                                <h3>Brand Integration & Content Collaboration</h3>
                                <p>Working closely with Undulmood, I created detailed product listings and descriptions that accurately represented his artistic style. The store design maintained visual consistency with his existing brand while optimizing for e-commerce conversion.</p>
                                
                                <h3>Creative Professional Support</h3>
                                <p>This project represented broader support for creative professionals adapting to pandemic restrictions. By enabling digital sales channels, artists could maintain income while building long-term online presence beyond the immediate crisis.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📈 CREATE: undulmood-impact.png → Pandemic business adaptation timeline (assets/projects/undulmood-store/)</div>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2020 (COVID-19 pandemic)</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>E-commerce strategy development</li>
                                        <li>Shopify store setup and customization</li>
                                        <li>Product categorization and organization</li>
                                        <li>Brand-consistent design implementation</li>
                                    </ul>
                                    
                                    <h6>Platform & Features</h6>
                                    <ul>
                                        <li>Shopify e-commerce platform</li>
                                        <li>Custom theme development</li>
                                        <li>Mobile-responsive design</li>
                                        <li>Integrated payment processing</li>
                                    </ul>
                                    
                                    <h6>Product Categories</h6>
                                    <ul>
                                        <li>Original artwork</li>
                                        <li>Branded accessories</li>
                                        <li>Digital brush sets</li>
                                        <li>Print-on-demand items</li>
                                    </ul>
                                    
                                    <h6>Client</h6>
                                    <p>Undulmood (Freelance)</p>
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
                        <p class="lead">Comprehensive responsive design system for real estate application</p>
                        <div class="project-meta">
                            <span class="project-tag">UI Design</span>
                            <span class="project-tag">UX Design</span>
                            <span class="project-tag">Responsive App</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">📱 CREATE: perfect-living-hero.png → Responsive design showcase (mobile/tablet/desktop) (assets/projects/perfect-living/)</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Mobile-First Design Methodology</h3>
                                <p>As a UX/UI design student project, Perfect Living emphasized comprehensive responsive design principles. I focused on mobile-first methodology, ensuring optimal user experience across all device types while maintaining visual consistency.</p>
                                
                                <h3>Cross-Device Design System</h3>
                                <p>The project required developing cohesive design elements—color schemes, typography, and interface patterns—that adapted seamlessly from mobile to tablet to desktop. This systematic approach ensured consistent user experience regardless of access point.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🎨 CREATE: perfect-living-system.png → Design system components and style guide (assets/projects/perfect-living/)</div>
                                
                                <h3>User Experience Focus</h3>
                                <p>The real estate application design included property browsing, advanced filtering, detailed property views, and user account management. Each feature was optimized for touch interaction on mobile while scaling appropriately for larger screens.</p>
                                
                                <h3>Design Education Foundation</h3>
                                <p>This project established fundamental skills in responsive design thinking, visual hierarchy, and user interface consistency that became essential for professional design work. The systematic approach to multi-device design informed my later product management decisions.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">🗺 CREATE: perfect-living-userflow.png → Property search user journey flow (assets/projects/perfect-living/)</div>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2019 (Student project)</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Mobile-first design strategy</li>
                                        <li>Cross-device interface adaptation</li>
                                        <li>Visual design system development</li>
                                        <li>User experience optimization</li>
                                    </ul>
                                    
                                    <h6>Design Focus</h6>
                                    <ul>
                                        <li>Responsive layout systems</li>
                                        <li>Touch-optimized interactions</li>
                                        <li>Visual hierarchy consistency</li>
                                        <li>Brand-appropriate aesthetics</li>
                                    </ul>
                                    
                                    <h6>Tools & Methods</h6>
                                    <ul>
                                        <li>Sketch (interface design)</li>
                                        <li>InVision (prototyping)</li>
                                        <li>Adobe Creative Suite</li>
                                        <li>Mobile-first methodology</li>
                                    </ul>
                                    
                                    <h6>Context</h6>
                                    <p>UX/UI Design Education</p>
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
                        <p class="lead">Comprehensive UX research and design methodology foundations</p>
                        <div class="project-meta">
                            <span class="project-tag">UX Research</span>
                            <span class="project-tag">Service Design</span>
                            <span class="project-tag">Mobile App</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1);">🔍 CREATE: inkery-hero.png → UX research process overview (assets/projects/inkery/)</div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>UX Research Foundation</h3>
                                <p>As my first major UX/UI project, Inkery established fundamental research methodologies I continue using professionally. The project focused on comprehensive user understanding, hypothesis formation, and validation processes for a tattoo appointment booking service.</p>
                                
                                <h3>Systematic Design Process</h3>
                                <p>The project required extensive market analysis, user interviews, persona development, and user journey mapping. This systematic approach taught me to ground design decisions in research rather than assumptions—a principle that informs my product management approach.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📱 CREATE: inkery-evolution.png → Design process from research to final app (assets/projects/inkery/)</div>
                                
                                <h3>Comprehensive Documentation</h3>
                                <p>The project produced over 40 design images documenting the entire process from initial research through final designs. Additionally, I created a comprehensive YouTube presentation explaining the methodology and outcomes—demonstrating early communication and presentation skills.</p>
                                
                                <h3>Career Foundation Impact</h3>
                                <p>This project established core UX principles that became essential for professional growth: user-centered thinking, iterative design processes, and research-driven decision making. These methodologies directly influenced my approach to product management and cross-functional collaboration.</p>

                                <div class="image-placeholder" style="border: 2px solid #ff4444; padding: 20px; border-radius: 8px; color: #ff4444; text-align: center; background: rgba(255, 68, 68, 0.1); margin: 20px 0;">📊 CREATE: inkery-documentation.png → 40+ design images and YouTube presentation (assets/projects/inkery/)</div>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>TIMELINE</h6>
                                    <p>2019 (Major UX project)</p>
                                    
                                    <h6>MY CONTRIBUTION</h6>
                                    <ul>
                                        <li>Comprehensive user research</li>
                                        <li>Market analysis and competitive study</li>
                                        <li>Persona and journey development</li>
                                        <li>Mobile app interface design</li>
                                    </ul>
                                    
                                    <h6>Research Methods</h6>
                                    <ul>
                                        <li>User interviews and surveys</li>
                                        <li>Hypothesis formation and testing</li>
                                        <li>Persona development</li>
                                        <li>User journey mapping</li>
                                    </ul>
                                    
                                    <h6>Deliverables</h6>
                                    <ul>
                                        <li>40+ documented design images</li>
                                        <li>Comprehensive research documentation</li>
                                        <li>YouTube methodology presentation</li>
                                        <li>Mobile app design system</li>
                                    </ul>
                                    
                                    <h6>Professional Impact</h6>
                                    <p>Established UX career foundation</p>
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
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Focus management for accessibility
        this.modalClose?.focus();
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