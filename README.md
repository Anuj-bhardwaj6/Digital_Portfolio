# Modern Portfolio Website

A stunning portfolio website built with Three.js and GSAP featuring interactive 3D elements, smooth animations, and a modern responsive design.

## Features

- **Interactive 3D Background**: Particle system and floating geometric shapes using Three.js
- **Smooth Animations**: GSAP-powered animations with scroll triggers
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Modern UI**: Clean, professional design with gradient accents
- **Smooth Scrolling**: Enhanced user experience with smooth navigation
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Efficient rendering and animations

## Technologies Used

- **Three.js** - 3D graphics and WebGL rendering
- **GSAP** - High-performance animations and scroll triggers
- **Vite** - Fast build tool and development server
- **Modern CSS** - CSS Grid, Flexbox, custom properties
- **Vanilla JavaScript** - Clean, efficient code without frameworks

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
├── main.js             # Three.js scene and GSAP animations
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

## Customization

### Colors
Update the CSS custom properties in `style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #f59e0b;
    /* ... other colors */
}
```

### Content
- Update personal information in `index.html`
- Modify project details in the projects section
- Add your own images and content

### 3D Elements
- Adjust particle count and behavior in `main.js`
- Modify geometric shapes and their animations
- Customize camera movements and interactions

## Performance Tips

- The particle system is optimized for performance
- Animations use hardware acceleration
- Images should be optimized for web
- Consider lazy loading for additional content

## Browser Support

- Modern browsers with WebGL support
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- Mobile browsers with WebGL support

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Built with modern web technologies and best practices for performance and user experience.
