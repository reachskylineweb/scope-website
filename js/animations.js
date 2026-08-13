/* ==========================================================================
   NATIONAL ENDOSCOPY CONFERENCE 2026 - GSAP ANIMATIONS
   ScrollTrigger Reveals, Card Staggers, and Parallax Motion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // If GSAP & ScrollTrigger are available, register plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initScrollAnimations();
    }
});

/**
 * 1. HERO ENTRANCE ANIMATION (Triggered post ECG loader fade-out)
 */
function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    heroTimeline
        .from('.hero-content .badge', { opacity: 0, y: -20 })
        .from('.hero-title', { opacity: 0, y: 30 }, '-=0.6')
        .from('.hero-subtitle', { opacity: 0, y: 20 }, '-=0.6')
        .from('.event-meta-card', { opacity: 0, y: 20, scale: 0.98 }, '-=0.5')
        .from('.hero-buttons .btn', { opacity: 0, y: 20, stagger: 0.15 }, '-=0.5')
        .from('.scroll-indicator', { opacity: 0, y: 10 }, '-=0.3');
}

/**
 * 2. SCROLL TRIGGER REVEALS FOR SECTIONS & CARDS
 */
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Fade-up elements with data-gsap="fade-up"
    gsap.utils.toArray('[data-gsap="fade-up"]').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: 'power3.out'
        });
    });

    // Fade-right elements with data-gsap="fade-right"
    gsap.utils.toArray('[data-gsap="fade-right"]').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -50,
            duration: 0.9,
            ease: 'power3.out'
        });
    });

    // Fade-left elements with data-gsap="fade-left"
    gsap.utils.toArray('[data-gsap="fade-left"]').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: 50,
            duration: 0.9,
            ease: 'power3.out'
        });
    });

    // Stagger Highlight Cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    if (highlightCards.length) {
        gsap.from(highlightCards, {
            scrollTrigger: {
                trigger: '.highlights-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Stagger Faculty Cards
    const facultyCards = document.querySelectorAll('.faculty-card');
    if (facultyCards.length) {
        gsap.from(facultyCards, {
            scrollTrigger: {
                trigger: '.faculty-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Timeline Items Reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length) {
        gsap.from(timelineItems, {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -30,
            stagger: 0.18,
            duration: 0.7,
            ease: 'power2.out'
        });
    }

    // 3D Sequential Card Flip-Open / Flip-Close Scroll Animation for Guest Doctor Cards
    const flipCards = document.querySelectorAll('[data-gsap="flip-card"]');
    if (flipCards.length) {
        gsap.set(flipCards, {
            rotateY: -90,
            opacity: 0,
            scale: 0.9,
            transformPerspective: 1000,
            transformOrigin: 'left center'
        });

        ScrollTrigger.batch(flipCards, {
            onEnter: batch => gsap.to(batch, {
                rotateY: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                stagger: 0.12,
                ease: 'back.out(1.4)',
                overwrite: 'auto'
            }),
            onLeave: batch => gsap.to(batch, {
                rotateY: 90,
                opacity: 0,
                scale: 0.9,
                duration: 0.45,
                stagger: 0.08,
                ease: 'power2.in',
                overwrite: 'auto'
            }),
            onEnterBack: batch => gsap.to(batch, {
                rotateY: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                stagger: 0.12,
                ease: 'back.out(1.4)',
                overwrite: 'auto'
            }),
            onLeaveBack: batch => gsap.to(batch, {
                rotateY: -90,
                opacity: 0,
                scale: 0.9,
                duration: 0.45,
                stagger: 0.08,
                ease: 'power2.in',
                overwrite: 'auto'
            }),
            start: 'top 85%',
            end: 'bottom 15%'
        });
    }

    // 3D Animated Caduceus Emblem Scroll Formation & Reverse Dissolve
    const caduceusStage = document.getElementById('caduceus-stage');
    const caduceusEmblem = document.getElementById('caduceus-emblem');
    const guestSection = document.getElementById('guest-doctors');

    if (caduceusStage && guestSection) {
        ScrollTrigger.create({
            trigger: guestSection,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => caduceusStage.classList.add('active'),
            onLeave: () => caduceusStage.classList.remove('active'),
            onEnterBack: () => caduceusStage.classList.add('active'),
            onLeaveBack: () => caduceusStage.classList.remove('active')
        });

        // Dynamic 3D Parallax Tilt Effect on Cursor Movement
        guestSection.addEventListener('mousemove', (e) => {
            if (!caduceusEmblem) return;
            const rect = guestSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(caduceusEmblem, {
                rotateY: x * 30,
                rotateX: -y * 25,
                duration: 0.6,
                ease: 'power1.out'
            });
        });

        guestSection.addEventListener('mouseleave', () => {
            if (!caduceusEmblem) return;
            gsap.to(caduceusEmblem, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }
}
