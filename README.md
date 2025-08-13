# Yuno Portfolio - Developer Documentation

A modern, interactive portfolio website built with vanilla JavaScript, featuring a fluid simulation background, smooth animations, and glassmorphism design.

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   cd claude-refactor
   npm install
   npm run dev
   ```

2. **View the site**
   - Open your browser to `http://localhost:3000`
   - The site will automatically reload on file changes

## 📁 Project Structure

```
claude-refactor/
├── src/
│   ├── index.html              # Main HTML structure
│   ├── assets/                 # Images, videos, icons
│   │   ├── profile.png         # Profile image
│   │   ├── story-video.mp4     # Story section background video
│   │   ├── portfolio-*.jpg     # Portfolio project thumbnails
│   │   ├── store-*.png         # App store badges
│   │   └── testimonials/       # Testimonial avatars
│   ├── styles/                 # CSS files (modular structure)
│   │   ├── base.css           # Variables, resets, utilities
│   │   ├── hero.css           # Hero section styles
│   │   ├── story.css          # Story section styles
│   │   ├── portfolio.css      # Portfolio section styles
│   │   └── components.css     # All other component styles
│   └── js/                    # JavaScript modules
│       ├── fluid-simulation.js # Interactive background
│       ├── hero.js           # Hero animations & typing
│       ├── story.js          # Story scroll animations
│       ├── portfolio.js      # Portfolio functionality
│       ├── timeline.js       # Experience timeline
│       └── main.js           # Main app controller
├── package.json              # Dependencies and scripts
└── README.md                # This file
```

## 🎨 Design System

### CSS Variables (base.css)
- **Colors**: Primary, accent, light, dark variations
- **Spacing**: Consistent spacing scale (--space-sm to --space-xl)
- **Typography**: Font sizes, weights, line heights
- **Z-index**: Layering system for proper stacking
- **Transitions**: Consistent animation timing

### Key Design Patterns
- **Glass Morphism**: `backdrop-filter: blur()` with transparent backgrounds
- **Smooth Animations**: CSS transitions with consistent timing
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox
- **Intersection Observer**: For scroll-triggered animations

## 🧩 Component Architecture

### 1. Hero Section (`hero.js`)
**Features:**
- Typing animation for role descriptions
- Smooth profile image loading
- Neon text effects

**Key Functions:**
- `initTypingAnimation()` - Handles the typewriter effect
- `roles` array - Contains the rotating job titles

### 2. Story Section (`story.js`)
**Features:**
- Scroll-triggered text reveals
- Background video integration
- Apple-inspired scroll animations

**Key Functions:**
- `initScrollAnimations()` - Sets up Intersection Observer
- `setupTextReveal()` - Animates individual text spans

### 3. Portfolio Section (`portfolio.js`)
**Features:**
- 9 project cards with detailed modals
- "Show more" functionality (shows 3, then all)
- 3D tilt hover effects
- URL-based project routing (`#project/easypz`)

**Key Functions:**
- `loadPortfolioData()` - Contains all project information
- `openProject(id)` - Opens modal and updates URL
- `togglePortfolioProjects()` - Show/hide additional projects
- `initPortfolioTilt()` - Adds 3D hover effects

**Adding New Projects:**
```javascript
// Add to portfolioData array in portfolio.js
{
    id: 'unique-id',
    title: 'Project Name',
    description: 'Short description',
    thumbnail: 'assets/project-image.jpg',
    featured: true, // Shows in first 3
    tags: ['Tag1', 'Tag2'],
    year: '2024',
    content: `HTML content for modal`
}
```

### 4. Experience Timeline (`timeline.js`)
**Features:**
- Interactive timeline with company logos
- Show more/less functionality
- Scroll animations for timeline items
- Category filtering (work, venture, education)

**Key Functions:**
- `timelineData` array - Contains all experience data
- `renderTimeline()` - Creates timeline HTML
- `setupTimelineAnimations()` - Scroll-triggered reveals

**Adding Experience:**
```javascript
// Add to timelineData array
{
    company: 'Company Name',
    title: 'Job Title',
    period: 'Jan 2024 - Present',
    location: 'City, Country',
    description: 'Job description',
    achievements: ['Achievement 1', 'Achievement 2'],
    category: 'work', // work, venture, education, volunteer
    logo: 'assets/company-logo.png'
}
```

### 5. Testimonials (`main.js`)
**Features:**
- Card-based testimonial grid
- Modal overlays for full testimonials
- LinkedIn invitation integration
- Show more/less functionality

**Key Functions:**
- `createTestimonialCards()` - Renders testimonial grid
- `openTestimonialModal()` - Shows full testimonial
- `createLinkedInInvitationCard()` - Adds LinkedIn CTA

### 6. Services Section
**Features:**
- Glass morphism cards with hover effects
- Scale animation on hover
- Service detail modals
- Contact form integration

**Key Functions:**
- `initServiceButtons()` - Sets up modal triggers
- `openServiceModal()` - Shows service details
- `prefillContactForm()` - Auto-fills contact form

### 7. Interactive Background (`fluid-simulation.js`)
**Features:**
- WebGL-based fluid simulation
- Mouse interaction
- Performance optimized
- Mobile responsive

**Key Functions:**
- Automatically initializes on page load
- No manual configuration needed
- Self-contained WebGL implementation

## 🎛️ Configuration

### Animation Timing
```css
/* base.css - Modify these for consistent timing */
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Color Scheme
```css
/* base.css - Update brand colors here */
--color-primary: #1a1d25;
--color-accent: #228DFF;
--color-accent-light: #a4d0ff;
--color-light: #f8f9fa;
--color-dark: #0a0b0f;
```

### Portfolio Delay Settings
```javascript
// portfolio.js - Adjust animation delays
const baseDelay = 800; // Portfolio section delay (ms)
const staggerDelay = itemIndex * 100; // Time between items
```

## 🔧 Development Workflow

### Adding New Sections
1. **HTML**: Add section to `index.html`
2. **CSS**: Create styles in appropriate CSS file
3. **JS**: Add functionality to existing JS file or create new one
4. **Integration**: Import and initialize in `main.js`

### Modifying Animations
- **Scroll Animations**: Use Intersection Observer pattern
- **Hover Effects**: CSS transitions with transform/opacity
- **Page Transitions**: CSS transforms with consistent timing variables

### Testing Checklist
- ✅ Desktop responsiveness (1920px, 1440px, 1024px)
- ✅ Mobile responsiveness (375px, 414px, 768px)
- ✅ Animation performance (check for jank)
- ✅ Modal functionality (open/close/escape key)
- ✅ Form validation and submission
- ✅ URL routing for portfolio projects

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles: Mobile (0-768px) */

@media (min-width: 768px) {
    /* Tablet styles */
}

@media (min-width: 1024px) {
    /* Desktop styles */
}

@media (min-width: 1440px) {
    /* Large desktop styles */
}
```

## 🚀 Deployment

### Build Process
```bash
npm run build  # Optimizes assets
npm run preview  # Preview production build
```

### Hosting Requirements
- Static file hosting (Netlify, Vercel, etc.)
- No server-side requirements
- Modern browser support (ES6+)
- WebGL support for background animation

## 🐛 Common Issues & Solutions

### Portfolio Images Not Loading
- Check file paths in `portfolio.js`
- Ensure images exist in `assets/` folder
- Verify correct file extensions

### Animations Not Working
- Check if Intersection Observer is supported
- Verify CSS animation variables are defined
- Ensure proper z-index layering

### Modal Issues
- Check for JavaScript errors in console
- Verify modal HTML structure exists
- Ensure event listeners are properly attached

### Performance Issues
- Monitor WebGL performance on mobile
- Check image file sizes
- Verify animation efficiency with dev tools

## 📚 Dependencies

- **jQuery 3.6.0**: DOM manipulation and animations
- **Feather Icons**: Icon library (only loaded, not required)
- **Modern Browser APIs**: Intersection Observer, CSS Grid, ES6+

## 🤝 Contributing

1. Follow existing code patterns and conventions
2. Test on multiple devices and browsers
3. Update this documentation for new features
4. Keep animations smooth and performant
5. Maintain accessibility standards

## 📞 Support

For questions or issues with this codebase, refer to:
- This documentation
- Code comments in individual files  
- Console errors for debugging
- Browser dev tools for performance analysis

---

Built with ❤️ using modern web technologies and a focus on performance and user experience.