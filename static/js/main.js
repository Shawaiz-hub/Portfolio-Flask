// Main JavaScript for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Skills progress bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate skill bars when skills section is visible
                if (entry.target.closest('.skills-section')) {
                    setTimeout(animateSkillBars, 300);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .timeline-item, .skill-item').forEach(el => {
        observer.observe(el);
    });

    // Contact form enhancement
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
            submitBtn.disabled = true;
        });
    }

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const category = this.getAttribute('data-category');
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                    project.classList.add('fade-in-up');
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // File upload preview
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const preview = this.parentNode.querySelector('.file-preview');
                if (preview && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 200px;" class="img-thumbnail">`;
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    });

    // Auto-generate slug from title
    const titleInput = document.querySelector('#title');
    const slugInput = document.querySelector('#slug');
    if (titleInput && slugInput) {
        titleInput.addEventListener('input', function() {
            const slug = this.value
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-');
            slugInput.value = slug;
        });
    }

    // Admin table actions
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item?')) {
                e.preventDefault();
            }
        });
    });

    // Auto-hide alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });

    // Toggle current job checkbox
    const isCurrentCheckbox = document.querySelector('#is_current');
    const endDateField = document.querySelector('#end_date');
    if (isCurrentCheckbox && endDateField) {
        isCurrentCheckbox.addEventListener('change', function() {
            if (this.checked) {
                endDateField.disabled = true;
                endDateField.value = '';
            } else {
                endDateField.disabled = false;
            }
        });
    }

    // Character counter for textareas
    const textareas = document.querySelectorAll('textarea[maxlength]');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counter = document.createElement('small');
        counter.className = 'text-muted';
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });

    // Initialize CKEditor if available
    if (typeof CKEDITOR !== 'undefined') {
        document.querySelectorAll('.ckeditor').forEach(element => {
            CKEDITOR.replace(element, {
                height: 300,
                toolbar: [
                    { name: 'basic', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
                    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'] },
                    { name: 'links', items: ['Link', 'Unlink'] },
                    { name: 'insert', items: ['Image', 'Table'] },
                    { name: 'styles', items: ['Format'] }
                ]
            });
        });
    }

    // Search functionality for admin tables
    const searchInputs = document.querySelectorAll('.table-search');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.card').querySelector('table tbody');
            const rows = table.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Theme toggle (if implemented)
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Apply saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
});

// Utility functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid') || document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Export functions for use in other scripts
window.portfolioUtils = {
    showAlert,
    formatDate,
    truncateText
};
