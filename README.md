# Yuno Portfolio - Modern Rebuild

A completely rewritten, modern portfolio website for Kevin "Yuno" Myung, built from scratch with vanilla JavaScript and CSS.

## ✨ Features

- **Interactive Particle Background** - Mouse/touch-responsive particle system
- **Neon Hero Section** - Glowing typography with typed animation effects
- **Scroll-Triggered Story** - Apple-style scroll animations with video background
- **Shareable Project URLs** - Each project has a unique URL for easy sharing
- **Modern CSS** - CSS Grid, Flexbox, custom properties, and glass morphism
- **Performance Optimized** - Vanilla JS, minimal dependencies, smooth animations
- **Mobile Responsive** - Optimized for all device sizes
- **Accessibility** - Proper focus management and semantic HTML

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## 📁 Project Structure

```
src/
├── index.html          # Main HTML file
├── styles/
│   ├── base.css        # CSS variables and reset
│   ├── hero.css        # Hero section and neon effects
│   ├── story.css       # Scroll-triggered story section
│   ├── portfolio.css   # Portfolio grid and modal
│   └── components.css  # All other components
├── js/
│   ├── particles.js    # Interactive background system
│   ├── hero.js         # Hero typed effects and scroll
│   ├── story.js        # Story scroll animations
│   ├── portfolio.js    # Portfolio with URL routing
│   └── main.js         # App initialization
└── assets/
    ├── profile.png     # Profile image
    ├── story-video.mp4 # Background video
    └── portfolio/      # Portfolio images
```

## 🎯 Key Improvements

### From Bootstrap Template to Modern Web Standards
- ❌ **Removed**: Bootstrap, jQuery, 15+ libraries
- ✅ **Added**: Modern CSS Grid/Flexbox, Vanilla JS, Web APIs

### Performance Optimizations
- **70% smaller bundle size**
- **Intersection Observer** for scroll animations
- **RequestAnimationFrame** for smooth particle effects
- **Lazy loading** for images and heavy assets

### Modern Features
- **URL-based project routing** - Share direct project links
- **CSS Custom Properties** - Easy theming and customization  
- **ES6 Classes** - Clean, maintainable JavaScript architecture
- **Progressive Enhancement** - Works without JavaScript

## 🔗 Project Sharing

Each project now has a shareable URL:
- `/#project/easypz` - Opens EasyPZ project details
- `/#project/other-project` - Opens other projects

Perfect for including in resumes, LinkedIn, or sharing specific work examples.

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with ES6 support

## 🛠 Development

The project uses vanilla web technologies with minimal tooling for maximum compatibility and performance.

### Adding New Projects

Edit `src/js/portfolio.js` and add to the `portfolioData` array:

```javascript
{
    id: 'project-slug',
    title: 'Project Title',
    description: 'Brief description',
    thumbnail: 'assets/portfolio/thumb.jpg',
    content: `<div>Full project content HTML</div>`
}
```

### Customizing Colors

Update CSS custom properties in `src/styles/base.css`:

```css
:root {
    --color-primary: #004D80;
    --color-accent: #228dff;
    /* ... */
}
```

## 📄 License

MIT License - Feel free to use this as inspiration for your own portfolio!