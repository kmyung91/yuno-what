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
                        <h2>EasyPZ: Toilet Finder</h2>
                        <p class="lead">Gifting Humanity the Power to Find a Restroom Within 5 Seconds</p>
                        <div class="project-meta">
                            <span class="project-tag">Mobile App</span>
                            <span class="project-tag">Product Design</span>
                            <span class="project-tag">Development</span>
                            <span class="project-tag">Founder</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="https://easypz.app/images/problem.gif" class="img-fluid mb-4" alt="EasyPZ Problem">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>EasyPZ is a mobile app built to make finding public restrooms as easy and stress-free as possible—especially for travelers, women, and anyone with medical needs. It offers real-time, user-powered restroom data, with a core focus on accessibility and convenience.</p>
                                <p>Our mission is simple but impactful: help anyone locate a suitable restroom within 5 seconds, wherever they are in the world.</p>
                                
                                <h3>The Challenge</h3>
                                <p>The idea for EasyPZ emerged from personal frustration during decades of global travel, where finding clean, safe restrooms often proved unnecessarily difficult. To validate this wasn't just my problem, I conducted interviews with over 100 diverse individuals across different demographics.</p>
                                
                                <h3>Brand Identity</h3>
                                <div class="text-center my-4">
                                    <img src="assets/portfolio-8-branding.png" class="img-fluid" alt="EasyPZ Branding">
                                </div>
                                <p>The EasyPZ logo is a swirl of water inside a location pin, which was a brilliant concept created by talented brand designer Laura Angeli. For the color palette, I drew inspiration from <em>Zima Blue</em> (Netflix's <em>Love, Death + Robots</em>)—a shade that symbolizes water, cleanliness, and tranquility.</p>
                                
                                <h3>Technical Stack</h3>
                                <ul>
                                    <li><strong>Backend</strong>: NestJS (TypeScript) with PostgreSQL and MikroORM</li>
                                    <li><strong>Mobile App</strong>: React Native (Expo) for iOS & Android</li>
                                    <li><strong>Admin Panel</strong>: SvelteKit + TypeScript + DaisyUI</li>
                                    <li><strong>Authentication</strong>: Google & Apple OAuth integration</li>
                                    <li><strong>Localization</strong>: Available in 7 languages</li>
                                </ul>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>Team</h6>
                                    <ul>
                                        <li>Yuno - Product/Design/Development</li>
                                        <li>Laura Angeli - Logo Design</li>
                                        <li>Batuhan Direk - Backend Architecture</li>
                                    </ul>
                                    
                                    <h6>Website</h6>
                                    <p><a href="https://easypz.app" target="_blank">easypz.app</a></p>
                                    
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
                        <p class="lead">Comprehensive redesign of flagship insurtech app valued at $4.5B</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">iOS</span>
                            <span class="project-tag">Android</span>
                            <span class="project-tag">Web</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/portfolio-7-3.gif" class="img-fluid mb-4" alt="wefox App Demo">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>Wefox is an insurance technology (insurtech) platform valued at $4.5B that connects insurance companies, brokers, businesses, and customers to provide digital insurance solutions. As Product Manager, I led the comprehensive redesign of their flagship applications across iOS, Android, and Web platforms.</p>
                                
                                <h3>Key Achievements</h3>
                                <ul>
                                    <li><strong>Rating Improvement</strong>: Increased app ratings from 2.1 to 3.6 (71% improvement) over a 2-year period</li>
                                    <li><strong>User Base Expansion</strong>: Expanded potential user base from 35K to 2M+ customers</li>
                                    <li><strong>Team Leadership</strong>: Led the largest tech squad at wefox (8-9 members across web, iOS, Android, and QA)</li>
                                    <li><strong>Cross-functional Initiative</strong>: Overcame data privacy and technical integration challenges to create a unified system displaying insurance policies from any provider</li>
                                </ul>
                                
                                <h3>The Challenge</h3>
                                <p>The original wefox app suffered from poor user ratings and limited functionality. Users struggled with complex workflows and the app could only display wefox-specific insurance products, limiting its utility for customers with multiple insurance providers.</p>
                                
                                <h3>The Solution</h3>
                                <p>I championed a cross-functional initiative that involved collaborating with legal teams and external partners to create a unified system. This breakthrough allowed the app to display insurance policies from any provider, significantly increasing its value proposition and contributing to the company's growth from $1.5B to $4.5B valuation.</p>
                                
                                <h3>Technical Approach</h3>
                                <p>Working closely with engineering teams across multiple platforms, we implemented a robust architecture that could handle complex data integration while maintaining security and compliance standards required for the insurance industry.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>My Role</h6>
                                    <p>Product Manager (iOS, Android, Web)</p>
                                    
                                    <h6>Team Size</h6>
                                    <p>8-9 members (largest tech squad at wefox)</p>
                                    
                                    <h6>Duration</h6>
                                    <p>Aug 2021 - Oct 2023</p>
                                    
                                    <h6>Key Metrics</h6>
                                    <ul>
                                        <li>71% rating improvement</li>
                                        <li>2M+ potential user base</li>
                                        <li>$4.5B company valuation</li>
                                    </ul>
                                    
                                    <h6>Recognition</h6>
                                    <p>Consistently received executive recognition as the highest-performing product team</p>
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
                        <p class="lead">Machine learning-powered platform for medical research collaboration</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">Machine Learning</span>
                            <span class="project-tag">Medical Research</span>
                            <span class="project-tag">iPad</span>
                        </div>
                    </div>
                    
                    <div class="project-showcase">
                        <img src="assets/portfolio-4-0.png" class="img-fluid mb-4" alt="Morressier Platform">
                    </div>

                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>Morressier is a platform that supports the entire pre-publishing journey for medical researchers, from supporting them at conferences where research is shared in its earliest stages. The platform helps them connect with others in the same field, present their work at conferences, among other workflows that facilitate their publication journey.</p>
                                
                                <h3>Key Achievements</h3>
                                <ul>
                                    <li><strong>Machine Learning Platform</strong>: Spearheaded the creation of a machine learning-powered platform that digitized early-stage medical research</li>
                                    <li><strong>Research Connections</strong>: Created connections between distinct research pieces to enhance discovery and collaboration</li>
                                    <li><strong>iPad Presentation App</strong>: Conceptualized and rolled out an iPad presentation app for global medical conferences</li>
                                    <li><strong>Client Satisfaction</strong>: Achieved 99% client satisfaction for the conference presentation system</li>
                                    <li><strong>Project Management</strong>: Executed over 60 global projects while implementing automation that maintained 97% user satisfaction levels</li>
                                </ul>
                                
                                <h3>The Challenge</h3>
                                <p>Medical researchers working on early-stage research often struggle to discover related work and connect with peers in their field. Traditional conference presentations were static and didn't facilitate meaningful discovery or collaboration.</p>
                                
                                <h3>The Solution</h3>
                                <p>I led the development of a comprehensive platform that used machine learning to analyze PDF content and automatically connect related medical research across databases. This was complemented by an intuitive iPad app that revolutionized how researchers present and discover work at medical conferences.</p>
                                
                                <h3>Technical Innovation</h3>
                                <p>The platform incorporated advanced PDF content analysis and machine learning algorithms to identify patterns and connections across vast amounts of medical research data. This enabled researchers to discover relevant work they might have otherwise missed and fostered collaboration across different medical specialties.</p>
                                
                                <h3>Impact</h3>
                                <p>The platform transformed how medical researchers interact with early-stage research, making it significantly easier to discover relevant work and connect with peers. The iPad presentation app became a standard tool at major medical conferences worldwide.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>My Roles</h6>
                                    <ul>
                                        <li>Product Manager (iOS, Search) - Feb 2019 to Apr 2020</li>
                                        <li>Project Manager / Customer Success - Feb 2018 to Feb 2019</li>
                                    </ul>
                                    
                                    <h6>Key Metrics</h6>
                                    <ul>
                                        <li>99% client satisfaction</li>
                                        <li>97% user satisfaction</li>
                                        <li>60+ global projects</li>
                                        <li>80% workload reduction through automation</li>
                                    </ul>
                                    
                                    <h6>Technologies</h6>
                                    <ul>
                                        <li>Machine Learning (PDF Analysis)</li>
                                        <li>iOS Development</li>
                                        <li>Search Algorithms</li>
                                        <li>Data Processing</li>
                                    </ul>
                                    
                                    <h6>Location</h6>
                                    <p>Berlin, DE</p>
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
                tags: ['Product Management', 'Apple Vision Pro', 'Growth'],
                year: '2023-2024',
                content: `
                    <div class="project-header">
                        <img src="assets/companylogos/logo_tou.jpeg" class="project-logo" alt="Tomorrow University Logo">
                        <h2>Tomorrow University</h2>
                        <p class="lead">The Metaverse University of the Future</p>
                        <div class="project-meta">
                            <span class="project-tag">Product Management</span>
                            <span class="project-tag">Apple Vision Pro</span>
                            <span class="project-tag">Growth</span>
                        </div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>Tomorrow University of Applied Sciences is an official German state-recognized university, dedicated to empowering the next generation of leaders & change makers through its academic offering via the metaverse.</p>
                                
                                <h3>Product-Led Growth</h3>
                                <p>As the sole Product Manager, I spearheaded product-led growth initiatives with a cross-functional team of 5+ engineers, designers, and stakeholders across 7 major platform releases.</p>
                                
                                <h3>Key Achievements</h3>
                                <ul>
                                    <li>Pioneered the university's first Apple Vision Pro app, adapting to the device's surprise early launch</li>
                                    <li>Integrated Google & Apple SSO capabilities that reduced registration time by 95%</li>
                                    <li>Spearheaded the largest platform release with end-to-end sales flow and comprehensive homepage</li>
                                    <li>Created the first direct digital revenue channel and decreased administrative overhead by 20%</li>
                                </ul>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>Role</h6>
                                    <p>Product Manager</p>
                                    
                                    <h6>Duration</h6>
                                    <p>Nov 2023 - May 2024</p>
                                    
                                    <h6>Team</h6>
                                    <ul>
                                        <li>5+ Engineers</li>
                                        <li>Product Manager (me)</li>
                                        <li>Designers & Stakeholders</li>
                                    </ul>
                                    
                                    <h6>Major Releases</h6>
                                    <p>7 platform releases including Apple Vision Pro app</p>
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
                tags: ['Design', 'Development', 'Form Design'],
                year: '2021',
                content: `
                    <div class="project-header">
                        <h2>Tattoo Booking Form</h2>
                        <p class="lead">Custom-Designed Appointment Form</p>
                        <div class="project-meta">
                            <span class="project-tag">Design</span>
                            <span class="project-tag">Development</span>
                            <span class="project-tag">Form Design</span>
                        </div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>Created a custom booking form solution for Undulmood, a high-demand tattoo artist who needed an efficient way to manage appointment requests.</p>
                                
                                <h3>Solution</h3>
                                <p>Developed a streamlined booking form that captures all necessary client information while maintaining an aesthetic that matches the artist's brand.</p>
                                
                                <h3>Technical Implementation</h3>
                                <ul>
                                    <li>Free hosting solution using formsubmit.co and Netlify</li>
                                    <li>Custom CSS styling to match brand aesthetic</li>
                                    <li>Responsive design for mobile and desktop</li>
                                    <li>Later transitioned to Typeform for enhanced functionality</li>
                                </ul>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>Client</h6>
                                    <p>Undulmood</p>
                                    
                                    <h6>Type</h6>
                                    <p>Freelance Project</p>
                                    
                                    <h6>Technologies</h6>
                                    <ul>
                                        <li>HTML/CSS</li>
                                        <li>JavaScript</li>
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
                tags: ['Development', 'Ruby on Rails', 'Team Project'],
                year: '2021',
                content: `
                    <div class="project-header">
                        <h2>Feedbacker</h2>
                        <p class="lead">Visual Art Feedback Sharing Platform</p>
                        <div class="project-meta">
                            <span class="project-tag">Development</span>
                            <span class="project-tag">Ruby on Rails</span>
                            <span class="project-tag">Team Project</span>
                        </div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>Final project for Le Wagon coding bootcamp - a visual feedback platform that allows artists to share their work and receive location-based comments from the community.</p>
                                
                                <h3>Features</h3>
                                <ul>
                                    <li>Upload and share visual artwork</li>
                                    <li>Location-based commenting system</li>
                                    <li>Community feedback and collaboration</li>
                                    <li>User profiles and artwork galleries</li>
                                </ul>
                                
                                <h3>Development Process</h3>
                                <p>Built by a team of 4 developers in just 2 weeks during the intensive coding bootcamp. The project showcased our learning of full-stack development with Ruby on Rails.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>Context</h6>
                                    <p>Le Wagon Bootcamp Final Project</p>
                                    
                                    <h6>Team</h6>
                                    <p>4 Developers</p>
                                    
                                    <h6>Duration</h6>
                                    <p>2 weeks</p>
                                    
                                    <h6>Technologies</h6>
                                    <ul>
                                        <li>Ruby on Rails</li>
                                        <li>JavaScript</li>
                                        <li>HTML/CSS</li>
                                        <li>PostgreSQL</li>
                                    </ul>
                                    
                                    <h6>Status</h6>
                                    <p>Discontinued after bootcamp</p>
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
                tags: ['E-commerce', 'Shopify', 'Design'],
                year: '2020',
                content: `
                    <div class="project-header">
                        <h2>Undulmood Store</h2>
                        <p class="lead">Shopify-Powered Online Store for Local Tattoist</p>
                        <div class="project-meta">
                            <span class="project-tag">E-commerce</span>
                            <span class="project-tag">Shopify</span>
                            <span class="project-tag">Design</span>
                        </div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>During the COVID-19 pandemic, helped a local tattoo artist establish an online presence through a custom Shopify store to continue their business during lockdowns.</p>
                                
                                <h3>Solution</h3>
                                <p>Created a comprehensive e-commerce platform featuring multiple product categories including original artwork, accessories, and digital brush sets for other artists.</p>
                                
                                <h3>Features</h3>
                                <ul>
                                    <li>Product categorization for artwork, accessories, and digital products</li>
                                    <li>Custom Shopify theme customization</li>
                                    <li>Brand-consistent visual design</li>
                                    <li>Mobile-responsive layout</li>
                                    <li>Integrated payment processing</li>
                                </ul>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>Context</h6>
                                    <p>COVID-19 Pandemic Freelance Project</p>
                                    
                                    <h6>Platform</h6>
                                    <p>Shopify</p>
                                    
                                    <h6>Services</h6>
                                    <ul>
                                        <li>Store Setup</li>
                                        <li>Theme Customization</li>
                                        <li>Product Organization</li>
                                        <li>Content Collaboration</li>
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
                tags: ['UX Design', 'Mobile App', 'Responsive'],
                year: '2019',
                content: `
                    <div class="project-header">
                        <h2>Perfect Living</h2>
                        <p class="lead">Responsive Designs of a Real Estate App</p>
                        <div class="project-meta">
                            <span class="project-tag">UX Design</span>
                            <span class="project-tag">Mobile App</span>
                            <span class="project-tag">Responsive</span>
                        </div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>Student project focused on creating responsive designs for a real estate application, emphasizing mobile-first design principles and cross-device consistency.</p>
                                
                                <h3>Design Approach</h3>
                                <ul>
                                    <li>Mobile-first responsive design methodology</li>
                                    <li>Tablet and desktop adaptations</li>
                                    <li>Consistent color scheme and typography</li>
                                    <li>Focus on user experience and visual hierarchy</li>
                                </ul>
                                
                                <h3>Key Features</h3>
                                <p>The design included property browsing, filtering capabilities, detailed property views, and user account management, all optimized for different screen sizes.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>Context</h6>
                                    <p>UX/UI Design Student Project</p>
                                    
                                    <h6>Focus</h6>
                                    <ul>
                                        <li>Mobile-first Design</li>
                                        <li>Responsive Layouts</li>
                                        <li>Visual Design</li>
                                        <li>User Experience</li>
                                    </ul>
                                    
                                    <h6>Tools</h6>
                                    <ul>
                                        <li>Sketch</li>
                                        <li>InVision</li>
                                        <li>Adobe Creative Suite</li>
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
                tags: ['UX Research', 'Mobile App', 'Service Design'],
                year: '2019',
                content: `
                    <div class="project-header">
                        <h2>Inkery</h2>
                        <p class="lead">Mobile Designs of a Tattoo Appointment Booking Service</p>
                        <div class="project-meta">
                            <span class="project-tag">UX Research</span>
                            <span class="project-tag">Mobile App</span>
                            <span class="project-tag">Service Design</span>
                        </div>
                    </div>
                    
                    <div class="project-content">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Overview</h3>
                                <p>First major UX/UI design project focusing on comprehensive user research and mobile app design for a tattoo appointment booking service. This project laid the foundation for my professional design career.</p>
                                
                                <h3>Research & Process</h3>
                                <ul>
                                    <li>Extensive market analysis and user research</li>
                                    <li>Hypothesis formation and validation methodology</li>
                                    <li>User journey mapping and persona development</li>
                                    <li>Iterative design process with user feedback</li>
                                </ul>
                                
                                <h3>Documentation</h3>
                                <p>The project includes over 40 design images documenting the entire process from research to final designs, plus a comprehensive YouTube video presentation explaining the methodology and outcomes.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="project-sidebar">
                                    <h6>Context</h6>
                                    <p>First Major UX/UI Project</p>
                                    
                                    <h6>Focus Areas</h6>
                                    <ul>
                                        <li>UX Research Methods</li>
                                        <li>User Understanding</li>
                                        <li>Mobile App Design</li>
                                        <li>Service Design</li>
                                    </ul>
                                    
                                    <h6>Deliverables</h6>
                                    <ul>
                                        <li>40+ Design Images</li>
                                        <li>Research Documentation</li>
                                        <li>YouTube Presentation</li>
                                        <li>Design System</li>
                                    </ul>
                                    
                                    <h6>Impact</h6>
                                    <p>Foundation for professional UX/UI career</p>
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