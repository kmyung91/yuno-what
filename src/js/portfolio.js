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
        // Portfolio data - in production this could come from an API
        this.portfolioData = [
            {
                id: 'easypz',
                title: 'EasyPZ',
                description: 'Toilet Finder App on iOS and Android',
                thumbnail: 'assets/portfolio/easypz-thumb.jpg',
                featured: true,
                tags: ['Mobile App', 'Product Design', 'Development'],
                content: `
                    <div class="project-header">
                        <h2>EasyPZ: Toilet Finder</h2>
                        <p class="lead">Gifting Humanity the Power to Find a Restroom Within 5 Seconds</p>
                        <div class="project-meta">
                            <span class="project-tag">Mobile App</span>
                            <span class="project-tag">Product Design</span>
                            <span class="project-tag">Development</span>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>Overview</h3>
                        <p>EasyPZ is a mobile app built to make finding public restrooms as easy and stress-free as possible—especially for travelers, women, and anyone with medical needs.</p>
                        <img src="assets/portfolio/easypz-1.png" alt="EasyPZ App Screenshot">
                        <h3>The Challenge</h3>
                        <p>Despite all our technological advances, finding a clean, accessible restroom in urban environments remains a fundamental challenge that affects millions daily.</p>
                        <h3>The Solution</h3>
                        <p>A user-powered restroom finder with real-time data, focusing on accessibility and convenience. Users can locate suitable restrooms within 5 seconds, wherever they are.</p>
                    </div>
                `
            },
            // Add more projects here
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
        
        item.innerHTML = `
            <img src="${project.thumbnail}" alt="${project.title}" class="portfolio-thumbnail">
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description}</p>
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