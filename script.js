/* ============================================
   PORTFOLIO — INTERACTIVE JAVASCRIPT
   Animations, Typing Effect, Scroll Reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============ PARTICLES BACKGROUND ============
    const particlesContainer = document.getElementById('particles');
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            if (Math.random() > 0.5) {
                particle.style.background = '#8b5cf6';
            }
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // ============ TYPING EFFECT ============
    const typedNameEl = document.getElementById('typedName');
    const nameText = 'Addriyan Bagus Syahputra';
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;

    function typeEffect() {
        if (!isDeleting) {
            typedNameEl.textContent = nameText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === nameText.length) {
                typingDelay = 3000; // Pause before deleting
                isDeleting = true;
            } else {
                typingDelay = 150;
            }
        } else {
            typedNameEl.textContent = nameText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                typingDelay = 500; // Pause before re-typing
            } else {
                typingDelay = 80;
            }
        }
        setTimeout(typeEffect, typingDelay);
    }
    typeEffect();

    // ============ NAVBAR SCROLL ============
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('.section, .hero');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ MOBILE NAV TOGGLE ============
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ============ SCROLL REVEAL ANIMATION ============
    const revealElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .contact-card, .contact-form, .about-grid, .stat-item'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============ SKILL BAR ANIMATION ============
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ============ COUNTER ANIMATION ============
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    function animateCounter(element, target) {
        if (element.classList.contains('stat-ipk')) {
            let val = 0;
            const timer = setInterval(() => {
                val += 0.1;
                if (val >= 3.8) {
                    val = 3.8;
                    clearInterval(timer);
                    element.textContent = '3.80';
                } else {
                    element.textContent = val.toFixed(2);
                }
            }, 35);
            return;
        }
        let current = 0;
        const increment = Math.ceil(target / 40);
        const duration = 1500;
        const stepTime = duration / (target / increment);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current;
        }, stepTime);
    }

    counters.forEach(counter => counterObserver.observe(counter));

    // ============ CONTACT FORM (DIRECT TO WHATSAPP) ============
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const subject = formData.get('subject') || '';
        const message = formData.get('message') || '';

        // Format message for WhatsApp
        const waText = 
`Halo Mas Addriyan Bagus, saya menghubungi Anda melalui Website Portfolio:

*Nama:* ${name}
*Email:* ${email}
*Subjek:* ${subject}

*Pesan:*
${message}`;

        const waUrl = `https://wa.me/6289516184614?text=${encodeURIComponent(waText)}`;

        // Open WhatsApp in a new tab
        window.open(waUrl, '_blank');

        // Show feedback on submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Membuka WhatsApp... Terima kasih, ${name}!
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3500);
    });

    // ============ DOWNLOAD CV HANDLER ============
    // Link is set directly in index.html to open Google Drive folder

    // ============ SMOOTH SCROLL FOR NAV LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ============ TILT EFFECT ON PROJECT CARDS ============
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Log a welcome message
    console.log(
        '%c🚀 Portfolio Loaded Successfully!',
        'color: #06b6d4; font-size: 16px; font-weight: bold;'
    );
    console.log(
        '%cDibuat dengan ❤️ — Selamat mencari pekerjaan!',
        'color: #8b5cf6; font-size: 12px;'
    );
});
