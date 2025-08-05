// Modern Portfolio JavaScript with Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initAnimations();
    initSkillBars();
    initTypewriter();
    initParallax();
    initSmoothScroll();
    initFormValidation();
    initParticles();
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
});

// Enhanced Navbar with scroll effects
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations for elements
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Stagger animations for children
                const children = entry.target.querySelectorAll('.card-custom, .timeline-item, .project-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all sections
    document.querySelectorAll('.section, section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards and other elements
    document.querySelectorAll('.card-custom, .timeline-item, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage') || 
                                   progressBar.parentElement.querySelector('.skill-name span')?.textContent?.replace('%', '') || 
                                   '0';
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 300);
                
                // Counter animation
                const counter = progressBar.parentElement.querySelector('.skill-name span');
                if (counter) {
                    animateCounter(counter, 0, parseInt(percentage), 1500);
                }
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });
}

// Counter animation
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Typewriter effect for hero section
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'Full-Stack Developer',
        'Game Builder',
        'UI/UX Designer',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced form validation and submission
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission with loading state
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid && submitBtn) {
                submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
                submitBtn.disabled = true;
            } else if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing feedback
    const existingFeedback = field.parentElement.querySelector('.invalid-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Required fields
    if (field.required && !value) {
        isValid = false;
        message = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address.';
        }
    }
    
    // Password strength (if it's a password field)
    if (field.type === 'password' && value) {
        if (value.length < 8) {
            isValid = false;
            message = 'Password must be at least 8 characters long.';
        }
    }
    
    // Update field styling
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        
        // Add error message
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
        field.parentElement.appendChild(feedback);
    }
    
    return isValid;
}

// Particle background effect
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(96, 165, 250, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentElement) {
            particle.remove();
            createParticle(container); // Create new particle
        }
    }, (Math.random() * 10 + 10) * 1000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .typewriter::after {
        content: '|';
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .is-invalid {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.25) !important;
    }
    
    .is-valid {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.25) !important;
    }
    
    .invalid-feedback {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Any scroll-dependent code here will be throttled
}, 16)); // ~60fps

// Page loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in elements
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .btn-primary-custom, .btn-outline-custom');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Dark mode toggle (if implemented)
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('light-mode') ? 'false' : 'true');
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'false') {
    document.body.classList.add('light-mode');
}

// Mobile-specific enhancements
if (window.innerWidth <= 768) {
    // Reduce animations for better performance on mobile
    document.documentElement.style.setProperty('--transition-normal', '0.2s ease');
    document.documentElement.style.setProperty('--transition-slow', '0.3s ease');
    
    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could trigger next section
                console.log('Swiped left');
            } else {
                // Swipe right - could trigger previous section
                console.log('Swiped right');
            }
        }
    }
}

// Print styles
window.addEventListener('beforeprint', function() {
    document.body.classList.add('print-mode');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('print-mode');
});