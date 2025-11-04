import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

class PortfolioWebsite {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.canvas = null;
        this.particles = null;
        this.mouse = new THREE.Vector2();
        this.mouseTarget = new THREE.Vector2();
        this.windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
        
        this.init();
    }

    init() {
        this.setupLoader();
        this.setupThreeJS();
        this.createParticleSystem();
        this.setupEventListeners();
        this.setupGSAPAnimations();
        this.setupNavigation();
        this.animate();
        
        // Hide loader after everything is set up
        setTimeout(() => {
            this.hideLoader();
        }, 2000);
    }

    setupLoader() {
        const loaderBar = document.querySelector('.loader-bar');
        let progress = 0;
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
            }
            loaderBar.style.width = progress + '%';
        }, 100);
    }

    hideLoader() {
        const loader = document.querySelector('.loader');
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.classList.add('hidden');
                this.startHeroAnimations();
            }
        });
    }

    setupThreeJS() {
        this.canvas = document.getElementById('three-canvas');
        
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createParticleSystem() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const color1 = new THREE.Color(0x6366f1); // Primary color
        const color2 = new THREE.Color(0x8b5cf6); // Secondary color
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Position
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
            
            // Color
            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        // Add floating geometric shapes
        this.createFloatingShapes();
    }

    createFloatingShapes() {
        const shapes = [];
        
        // Create different geometric shapes
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.ConeGeometry(0.3, 0.6, 8),
            new THREE.OctahedronGeometry(0.4)
        ];
        
        const material = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            mesh.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            shapes.push(mesh);
            this.scene.add(mesh);
        }
        
        this.shapes = shapes;
    }

    setupEventListeners() {
        // Mouse movement
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
            
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
        
        // Scroll events for particle interaction
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = scrollY / maxScroll;
            
            if (this.particles) {
                this.particles.rotation.y = scrollProgress * Math.PI * 2;
            }
        });
    }

    setupGSAPAnimations() {
        // Hero animations
        this.setupHeroAnimations();
        
        // Section animations
        this.setupSectionAnimations();
        
        // Skill bar animations
        this.setupSkillAnimations();
        
        // Project card animations
        this.setupProjectAnimations();
        
        // Scroll indicator animation
        this.setupScrollIndicator();
    }

    startHeroAnimations() {
        const tl = gsap.timeline();
        
        tl.to('.title-line', {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.hero-buttons', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.2');
    }

    setupHeroAnimations() {
        // Parallax effect for hero content
        gsap.to('.hero-content', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    setupSectionAnimations() {
        // Fade in animations for sections
        gsap.utils.toArray('section:not(.hero)').forEach(section => {
            gsap.fromTo(section.querySelector('.section-header'), {
                y: 60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
        
        // About section content animation
        gsap.fromTo('.about-text', {
            x: -60,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%'
            }
        });
        
        gsap.fromTo('.about-image', {
            x: 60,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%'
            }
        });
    }

    setupSkillAnimations() {
        gsap.utils.toArray('.skill-progress').forEach(bar => {
            const width = bar.dataset.width;
            gsap.to(bar, {
                width: width + '%',
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%'
                }
            });
        });
    }

    setupProjectAnimations() {
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.fromTo(card, {
                y: 60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%'
                }
            });
        });
    }

    setupScrollIndicator() {
        gsap.to('.scroll-indicator', {
            opacity: 0,
            scrollTrigger: {
                trigger: '.hero',
                start: 'bottom 90%',
                end: 'bottom 70%',
                scrub: true
            }
        });
    }

    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const navbar = document.querySelector('.navbar');

        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu && navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling and close mobile menu after click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href') || '';
                const target = href.startsWith('#') ? document.querySelector(href) : document.querySelector(href);
                
                // Close mobile menu
                hamburger && hamburger.classList.remove('active');
                navMenu && navMenu.classList.remove('active');

                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });

                    // update URL hash without jumping
                    if (href.startsWith('#')) {
                        history.replaceState(null, '', href);
                    }
                }
            });
        });

        // Active navigation highlighting
        ScrollTrigger.batch('section', {
            onEnter: (elements) => {
                const id = elements[0].id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            },
            onLeave: (elements) => {
                const id = elements[0].id;
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.remove('active');
                    }
                });
            }
        });

        // Navbar background on scroll
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: {
                className: 'scrolled',
                targets: '.navbar'
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Smooth mouse following
        this.mouseTarget.lerp(this.mouse, 0.05);
        
        // Rotate particles based on mouse movement
        if (this.particles) {
            this.particles.rotation.x += (this.mouseTarget.y * 0.1 - this.particles.rotation.x) * 0.05;
            this.particles.rotation.y += (this.mouseTarget.x * 0.1 - this.particles.rotation.y) * 0.05;
        }
        
        // Animate floating shapes
        if (this.shapes) {
            this.shapes.forEach((shape, index) => {
                shape.rotation.x += 0.005 + index * 0.001;
                shape.rotation.y += 0.003 + index * 0.0005;
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
            });
        }
        
        // Camera movement based on mouse
        if (this.camera) {
            this.camera.position.x += (this.mouseTarget.x * 0.5 - this.camera.position.x) * 0.05;
            this.camera.position.y += (-this.mouseTarget.y * 0.5 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    function scrollToSection(id) {
        const target = document.getElementById(id);
        if (!target) return;
        const offset = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href') || '';
            const id = href.startsWith('#') ? href.slice(1) : href;
            scrollToSection(id);

            // close mobile menu if open
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger && hamburger.classList.remove('open');
            }

            // update URL hash without jump
            history.replaceState(null, '', `#${id}`);
        });
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu && navMenu.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
    }

    // If page loaded with hash, scroll to it
    if (location.hash) {
        const id = location.hash.slice(1);
        setTimeout(() => scrollToSection(id), 50);
    }

    // Initialize the portfolio website
    new PortfolioWebsite();
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
            const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
            const message = formData.get('message') || e.target.querySelector('textarea').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            alert(`Opening project ${projectId}. In a real implementation, this would navigate to the project details.`);
        });
    });
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent.includes('View Work')) {
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: '#projects',
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            } else if (button.textContent.includes('Get in Touch')) {
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: '#contact',
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
});

// Add CSS for scrolled navbar state
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);
