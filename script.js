document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize all functionalities
    initMobileMenu();
    initSmoothScrolling();
    initSkillBars();
    initScrollAnimations();
});

// Enhanced mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isActive = mobileMenu.classList.toggle('active');
        hamburger.innerHTML = isActive ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        }
    });
}

// Enhanced smooth scrolling with better mobile support
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }

            const navbarHeight = window.innerWidth <= 768 ? 60 : 70;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Enhanced skill bar animation with intersection observer
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = parseInt(bar.getAttribute('data-level'), 10);

                if (!isNaN(level)) {
                    setTimeout(() => {
                        bar.style.width = Math.max(0, Math.min(level, 100)) + '%';
                    }, 200);
                }

                // Stop observing once animation is triggered
                observer.unobserve(bar);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Improved scroll animations with performance optimization
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category-visual, .certification-card, .education-card, .achievement-item');
    if (animatedElements.length === 0) return;

    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Handle window resize with debouncing
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on desktop
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active') && window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    }, 250);
});

// Enhanced touch device detection
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Initialize touch-specific optimizations
if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');
}




