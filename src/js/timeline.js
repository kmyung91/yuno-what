// Timeline Section with Experience and Education Data

class TimelineManager {
    constructor() {
        this.timelineData = [];
        this.timelineContainer = document.querySelector('.experience-timeline');
        this.showMoreButton = null;
        this.itemsToShow = 5;
        this.allItemsVisible = false;
        this.init();
    }
    
    init() {
        this.loadTimelineData();
        this.renderTimeline();
        this.setupScrollAnimations();
    }
    
    setupScrollAnimations() {
        // Blue highlight effect observer
        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        // Entrance animation observer
        const entranceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all timeline items
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach((item, index) => {
                // Add staggered delay for entrance animation
                item.style.transitionDelay = `${index * 0.1}s`;
                highlightObserver.observe(item);
                entranceObserver.observe(item);
            });
        }, 100);
    }
    
    loadTimelineData() {
        // Complete timeline data including education and professional experience
        // Sorted in reverse chronological order (most recent first)
        this.timelineData = [
            {
                id: 'freelance-consultant',
                type: 'work',
                title: 'Full‑Stack Product Specialist',
                organization: 'Freelance',
                period: 'Nov 2023 - Present',
                location: 'Berlin, DE',
                description: 'Design, build, and ship end‑to‑end solutions—from UX/UI to web/mobile and product systems.',
                achievements: [
                    'Custom websites and portfolios for professionals and businesses',
                    'Automation and internal tools to streamline operations',
                    'Shopify storefronts and brand‑consistent UI',
                    'Speaking and strategic consulting on product delivery',
                ],
                logo: 'assets/profile.png',
                highlight: true
            },
            {
                id: 'lewagon-data-2025',
                type: 'education',
                title: 'Data Analytics Bootcamp',
                organization: 'Le Wagon',
                period: 'Jun 2025 - Aug 2025',
                location: 'Berlin, DE (Remote)',
                description: 'Intensive 9-week bootcamp covering Python, SQL, Machine Learning, and Data Visualization',
                achievements: [
                    'Mastered Python programming for data analysis and automation',
                    'Built automated dashboards and data pipelines using modern ELT tools',
                    'Developed expertise in SQL for data warehousing and transformation',
                    'Created interactive visualizations and business intelligence reports'
                ],
                logo: 'assets/companylogos/logo_lewagon.jpeg'
            },
            {
                id: 'tomorrow-university',
                type: 'work',
                title: 'Product Manager (Apple Vision Pro, UX, Growth)',
                organization: 'Tomorrow University',
                period: 'Nov 2023 - May 2024',
                location: 'Berlin, DE (Remote)',
                description: 'Operated as the sole PM shipping multiple releases, including an early Apple Vision Pro app.',
                achievements: [
                    'Launched a public homepage, catalog, and self‑service enrollment flow',
                    'Implemented Google & Apple SSO to reduce registration friction',
                    'Coordinated design, engineering, and QA through several releases',
                    'Early Apple Vision Pro app with media coverage (available on request)'
                ],
                logo: 'assets/companylogos/logo_tou.jpeg'
            },
            {
                id: 'stealth-startup',
                type: 'venture',
                title: 'Co-Founder / AI Integration Lead',
                organization: 'Stealth Startup (Part-time)',
                period: 'Jul 2023 - Jan 2024',
                location: 'Berlin, DE (Remote)',
                description: 'Part-time side project developing AI content generation system. Built Python scripts to orchestrate multiple AI services for automated video production.',
                achievements: [
                    'Created Python automation scripts integrating ChatGPT, MidJourney, and ElevenLabs APIs',
                    'Built end-to-end pipeline transforming text scripts into complete videos',
                    'Validated early AI orchestration concepts before widespread adoption'
                ],
                logo: 'assets/companylogos/logo_stealth.jpeg'
            },
            {
                id: 'easypz-founder',
                type: 'venture',
                title: 'Founder',
                organization: 'EasyPZ',
                period: 'Sep 2022 - Present',
                location: 'Berlin, DE / New York, NY',
                description: 'Created a free-to-use mobile app that helps people locate nearby restrooms quickly and confidently.',
                					achievements: [
						'Rebuilt v2 & v3 with React Native + TypeScript and a modern backend',
						'Improved stability and time-to-first-result; streamlined onboarding',
						'Multilingual support (EN, ES, DE, FR, KR, JP, TR) with a calm, task-focused UI',
						'Partnership presence at Karneval der Kulturen and Christopher Street Day (Berlin)',
						'Organic growth with zero paid marketing',
						'Consistently strong store ratings'
					],
                logo: 'assets/companylogos/logo_easypz.jpeg'
            },
            {
                id: 'wefox-pm',
                type: 'work',
                title: 'Product Manager (iOS, Android, Web)',
                organization: 'wefox',
                period: 'Aug 2021 - Oct 2023',
                location: 'Berlin, DE (Remote)',
                description: 'Led external policy integrations and a unified cross-platform design system for the flagship app.',
                					achievements: [
						'Defined integration approach to support external insurance policies under legal and privacy constraints',
						'Drove a shared design system across iOS, Android, and Web for consistent UX',
						'Led platform expansion that opened access to 2M+ users—a 57x increase from the original 35K user base',
						'Store rating improved from 2.1 to 3.6 in DE (during my tenure)'
					],
                logo: 'assets/companylogos/logo_wefox.jpeg'
            },
            {
                id: 'speaker-mentor',
                type: 'volunteer',
                title: 'Speaker / Mentor',
                organization: 'Yuno',
                period: 'Aug 2021 - Present',
                location: 'Berlin, DE (Remote)',
                description: 'Talks on product management and mentoring for early‑career designers and PMs.',
                achievements: [
                    'Delivered engaging presentations to 100+ students during Le Wagon\'s career week',
                    'Mentored graduates transitioning into PM roles',
                    'Teaching Assistant for CSS concepts (Jul 2021)'
                ],
                logo: 'assets/profile.png'
            },
            {
                id: 'lewagon-bootcamp',
                type: 'education',
                title: 'Web Development Bootcamp',
                organization: 'Le Wagon',
                period: 'Jul 2021',
                location: 'Berlin, DE',
                description: 'Intensive 9-week coding bootcamp covering full-stack web development, Ruby on Rails, JavaScript, and modern web technologies.',
                achievements: [
                    'Built full-stack web applications using Ruby on Rails and modern JavaScript',
                    'Mastered Object-Oriented Programming and Model-View-Controller design patterns',
                    'Developed collaborative coding skills through pair programming and Git workflows',
                    'Created responsive web interfaces with HTML5, CSS3, and Bootstrap framework'
                ],
                logo: 'assets/companylogos/logo_lewagon.jpeg'
            },
            {
                id: 'morressier-pm',
                type: 'work',
                title: 'Product Manager (iOS, Search)',
                organization: 'Morressier',
                period: 'Feb 2019 - Apr 2020',
                location: 'Berlin, DE',
                description: 'Product management across an on‑site conference iPad app and research discovery experiences.',
                achievements: [
                    'Redesigned iPad presentation app for conferences in Berlin, NYC, Busan, and Lisbon',
                    'Contributed to the web platform for content discovery and researcher connections',
                    'Consistently positive organizer feedback on on‑site experience'
                ],
                logo: 'assets/companylogos/logo_morressier.jpeg'
            },
            {
                id: 'morressier-pm-customer',
                type: 'work',
                title: 'Project Manager / Customer Success Manager',
                organization: 'Morressier',
                period: 'Feb 2018 - Feb 2019',
                location: 'Berlin, DE',
                description: 'Managed global conference implementations while advocating UX/UI improvements based on field feedback.',
                achievements: [
                    'Executed over 60 global projects end‑to‑end',
                    'Implemented automation reducing workload through scalable playbooks'
                ],
                logo: 'assets/companylogos/logo_morressier.jpeg'
            },
            {
                id: 'homify-pm',
                type: 'work',
                title: 'Project Manager',
                organization: 'homify',
                period: 'Nov 2017 - Feb 2018',
                location: 'Berlin, DE',
                description: 'Analyzed user behavior across international markets to improve platform engagement.',
                achievements: [
                    'Conducted comprehensive analysis across 15+ international markets',
                    'Achieved 17% decrease in project cancellations through targeted solutions'
                ],
                logo: 'assets/companylogos/logo_homify.jpeg'
            },
            {
                id: 'risk-strategies',
                type: 'work',
                title: 'Associate Account Manager',
                organization: 'Risk Strategies Company',
                period: 'Jan 2016 - Feb 2017',
                location: 'Teaneck, NJ',
                description: 'Consulted B2B clients on optimizing insurance coverage through risk analysis.',
                achievements: [
                    'Consulted B2B clients on optimizing insurance coverage by analyzing operational risks',
                    'Analyzed over 5 million historical data entries for comprehensive risk assessments'
                ],
                logo: 'assets/companylogos/logo_rsc.jpeg'
            },
            {
                id: 'northeastern-bsba',
                type: 'education',
                title: 'Bachelor of Science in Business Administration',
                organization: 'Northeastern University',
                period: 'Sep 2010 - Jan 2015',
                location: 'Boston, MA',
                description: 'Bachelor\'s degree in Business Administration with focus on marketing and international business.',
                achievements: [
                    'Completed cooperative education program with hands-on industry experience',
                    'Specialized in marketing strategy and international business practices',
                    'Developed analytical and strategic thinking skills through case-based learning',
                    'Graduated from AACSB-accredited business program with global perspective'
                ],
                logo: 'assets/companylogos/logo_neu.jpeg'
            },
            {
                id: 'john-hancock',
                type: 'work',
                title: 'Marketing Intern',
                organization: 'John Hancock Life Insurance Company',
                period: 'Jul 2012 - Dec 2012',
                location: 'Boston, MA',
                description: 'Assisted in marketing campaigns and financial report compilation.',
                achievements: [
                    'Assisted in marketing campaigns through analysis and brochure design',
                    'Compiled monthly financial reports'
                ],
                logo: 'assets/companylogos/logo_johnhancock.jpeg'
            }
        ];
    }
    
    renderTimeline() {
        if (!this.timelineContainer) return;
        
        this.timelineContainer.innerHTML = '';
        
        // Render initial items (first 5)
        this.timelineData.slice(0, this.itemsToShow).forEach((item, index) => {
            const timelineItem = this.createTimelineItem(item, index);
            this.timelineContainer.appendChild(timelineItem);
        });
        
        // Create show more button if there are more items
        if (this.timelineData.length > this.itemsToShow) {
            this.createShowMoreButton();
        }
    }
    
    createShowMoreButton() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'timeline-show-more-container';
        
        this.showMoreButton = document.createElement('button');
        this.showMoreButton.className = 'timeline-show-more-btn';
        this.showMoreButton.textContent = `Show ${this.timelineData.length - this.itemsToShow} more experiences`;
        
        this.showMoreButton.addEventListener('click', () => {
            this.toggleTimelineItems();
        });
        
        buttonContainer.appendChild(this.showMoreButton);
        this.timelineContainer.parentElement.appendChild(buttonContainer);
    }
    
    toggleTimelineItems() {
        if (!this.allItemsVisible) {
            // Show all items
            this.timelineData.slice(this.itemsToShow).forEach((item, index) => {
                const timelineItem = this.createTimelineItem(item);
                // Set up for scroll animation instead of immediate animation
                timelineItem.style.transitionDelay = `${(this.itemsToShow + index) * 0.1}s`;
                this.timelineContainer.appendChild(timelineItem);
            });
            
            // Setup observers for new items
            this.setupNewItemObservers();
            
            this.showMoreButton.textContent = 'Show less';
            this.allItemsVisible = true;
        } else {
            // Hide extra items
            const allItems = this.timelineContainer.querySelectorAll('.timeline-item');
            for (let i = allItems.length - 1; i >= this.itemsToShow; i--) {
                allItems[i].remove();
            }
            
            this.showMoreButton.textContent = `Show ${this.timelineData.length - this.itemsToShow} more experiences`;
            this.allItemsVisible = false;
        }
    }
    
    setupNewItemObservers() {
        // Blue highlight effect observer
        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        // Entrance animation observer
        const entranceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe only the new timeline items (after itemsToShow)
        const allItems = document.querySelectorAll('.timeline-item');
        for (let i = this.itemsToShow; i < allItems.length; i++) {
            highlightObserver.observe(allItems[i]);
            entranceObserver.observe(allItems[i]);
        }
    }
    
    createTimelineItem(item) {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${item.type} ${item.highlight ? 'highlight' : ''}`;
        
        const achievementsHtml = item.achievements ? 
            `<ul class="timeline-achievements">
                ${item.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>` : '';
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <img src="${item.logo}" alt="${item.organization} logo" class="timeline-logo">
                    <div class="timeline-meta">
                        <h3 class="timeline-title">${item.title}</h3>
                        <h4 class="timeline-organization">${item.organization}</h4>
                        <div class="timeline-period">${item.period}</div>
                        <div class="timeline-location">${item.location}</div>
                    </div>
                    <div class="timeline-type-badge">${this.getTypeBadge(item.type)}</div>
                </div>
                <p class="timeline-description">${item.description}</p>
                ${achievementsHtml}
            </div>
        `;
        
        return timelineItem;
    }
    
    getTypeBadge(type) {
        const badges = {
            'work': 'Work',
            'venture': 'Venture',
            'education': 'Education',
            'volunteer': 'Volunteer'
        };
        return badges[type] || type;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.timelineManager = new TimelineManager();
});