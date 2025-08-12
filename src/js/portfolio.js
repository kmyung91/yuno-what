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
    }
    
    loadPortfolioData() {
        // Portfolio data from the original portfolio
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
                                        <li>Kevin "Yuno" Myung - Product/Design</li>
                                        <li>Laura Angeli - Logo Design</li>
                                        <li>Batuhan Direk - Backend Architecture</li>
                                        <li>Achi - 2D Animator</li>
                                        <li>Uni So - Content Lead</li>
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
                                    <li><strong>Project Management</strong>: Executed over 60 global projects while implementing automation that maintained 97% satisfaction levels</li>
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
            }
        ];
        
        this.renderPortfolio();
    }
    
    renderPortfolio() {
        if (!this.portfolioGrid) return;
        
        this.portfolioGrid.innerHTML = '';
        
        this.portfolioData.forEach(project => {
            const item = this.createPortfolioItem(project);
            this.portfolioGrid.appendChild(item);
        });
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