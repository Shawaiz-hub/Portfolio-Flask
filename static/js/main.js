// Portfolio Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced navbar scroll effect with animations
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
                // Hide navbar when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Add stagger animation to navbar items
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach((link, index) => {
        link.style.setProperty('--animation-order', index);
        link.classList.add('animate-fade-in-right', 'stagger-animation');
    });

    // Mobile sidebar toggle for admin panel
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminSidebar = document.querySelector('.admin-sidebar');

    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 1200) {
                if (!adminSidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    adminSidebar.classList.remove('show');
                }
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced scroll animations with stagger effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animations = ['animate-fade-in-up', 'animate-bounce-in', 'animate-fade-in-left', 'animate-fade-in-right'];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                
                entry.target.classList.add(randomAnimation);
                
                // Add stagger effect for grouped elements
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .skill-item, .project-card, .hero-content > *, h1, h2, h3, p').forEach(el => {
        observer.observe(el);
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('animate-typing');
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.classList.remove('animate-typing');
                    heroTitle.classList.add('animate-text-glow');
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Floating elements animation
    document.querySelectorAll('.floating-element').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
        el.classList.add('animate-float');
    });

    // Text glow effect on hover for headings
    document.querySelectorAll('h1, h2, h3, .hero-title, .navbar-brand').forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            this.classList.add('animate-text-glow');
        });
        
        heading.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.classList.remove('animate-text-glow');
            }, 2000);
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            // Re-enable button after 3 seconds (adjust based on your form handling)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Auto-dismiss alerts
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });

    // Skills level animation
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const level = progress.getAttribute('data-level');
        setTimeout(() => {
            progress.style.width = level + '%';
        }, 500);
    });

    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Admin table row actions
    document.querySelectorAll('.table tbody tr').forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.closest('.btn, .form-check-input')) {
                this.classList.toggle('table-active');
            }
        });
    });

    // Copy to clipboard functionality
    document.querySelectorAll('[data-clipboard]').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-clipboard');
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });

    // Loading states for async actions
    document.querySelectorAll('[data-loading]').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="loading"></span> Loading...';
                this.disabled = true;

                // Reset after 3 seconds (adjust as needed)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 3000);
            }
        });
    });

    // Responsive table wrapper
    document.querySelectorAll('.table').forEach(table => {
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

    // Dark mode toggle (if needed)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // Profile image interactive effects
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        let isHovered = false;
        
        profileImage.addEventListener('mouseenter', function() {
            isHovered = true;
            this.style.animationPlayState = 'paused';
            
            // Add sparkle effect
            createSparkles(this.parentElement);
        });
        
        profileImage.addEventListener('mouseleave', function() {
            isHovered = false;
            this.style.animationPlayState = 'running';
            
            // Remove sparkles
            const sparkles = this.parentElement.querySelectorAll('.sparkle');
            sparkles.forEach(sparkle => sparkle.remove());
        });
        
        // Add click effect
        profileImage.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotate(0deg)';
            setTimeout(() => {
                this.style.transform = isHovered ? 'scale(1.05) rotate(5deg)' : '';
            }, 150);
        });
    }

    function createSparkles(container) {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: radial-gradient(circle, #fff, #60a5fa);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                z-index: 10;
                pointer-events: none;
            `;
            container.appendChild(sparkle);
        }
    }

    // Create animated background particles
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                z-index: 1;
            `;
            hero.appendChild(particle);
        }
    }

    // Initialize particles after a short delay
    setTimeout(createParticles, 1000);

    // Add smooth color transitions on element interactions
    document.querySelectorAll('.btn, .card, .nav-link').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });

    // Dynamic text color animation
    setInterval(() => {
        const textElements = document.querySelectorAll('.animate-text-glow');
        textElements.forEach(el => {
            const hue = Math.random() * 60 + 200; // Blue spectrum
            el.style.textShadow = `0 0 20px hsl(${hue}, 70%, 60%)`;
        });
    }, 3000);
});

// Utility functions
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close float-end" onclick="this.parentElement.remove()"></button>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Export functions for use in other scripts
window.PortfolioJS = {
    showToast,
    formatDate,
    debounce
};