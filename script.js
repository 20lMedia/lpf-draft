// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Luxury header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced mobile navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const overlay = document.querySelector('.nav-overlay');
    const body = document.body;
    
    // Function to open menu
    const openMenu = () => {
        nav.classList.add('nav-active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.add('toggle');
    };
    
    // Function to close menu
    const closeMenu = () => {
        nav.classList.remove('nav-active');
        overlay.classList.remove('active');
        body.style.overflow = 'auto';
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
        
        burger.classList.remove('toggle');
    };
    
    // Toggle menu when burger is clicked
    burger.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when overlay is clicked
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('nav-active')) {
            closeMenu();
        }
    });
};

navSlide();

// Luxury Hero Section Animation
// Luxury Hero Section Animation - fixed to remove duplicates
gsap.from('.hero-content h1', {
    duration: 1.2,
    y: 80,
    opacity: 0,
    ease: 'power3.out',
    onComplete: function() {
        // Ensure h1 is fully visible after animation
        gsap.set('.hero-content h1', {opacity: 1, clearProps: "all"});
    }
});

gsap.from('.hero-content h1::after', {
    duration: 1.5,
    width: 0,
    delay: 1,
    ease: 'power3.inOut'
});

gsap.from('.hero-content h2', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('.hero-content p', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6
});

// Modified animation for the button to ensure it stays visible
gsap.from('.hero-content .btn', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.9,
    onComplete: function() {
        // Ensure the button is fully visible after animation
        gsap.set('.hero-content .btn', {opacity: 1, clearProps: "all"});
    }
});

gsap.from('.hero-image img', {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.4
});

gsap.from('.hero-image::before', {
    duration: 1.5,
    opacity: 0,
    x: 30,
    y: 30,
    ease: 'power3.out',
    delay: 0.8
});

// Luxury About Section Animation
gsap.from('.about-image img', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%'
    },
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%'
    },
    duration: 1,
    x: 100,
    opacity: 0,
    ease: 'power3.out'
});

// Menu Section Animation
gsap.from('.menu h2', {
    scrollTrigger: {
        trigger: '.menu',
        start: 'top 80%'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.menu-item', {
    scrollTrigger: {
        trigger: '.menu-container',
        start: 'top 80%'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
});

// Gallery Section Enhanced Animations
gsap.from('.gallery h2', {
    scrollTrigger: {
        trigger: '.gallery',
        start: 'top 80%'
    },
    duration: 1.2,
    y: 60,
    opacity: 0,
    ease: 'back.out(1.7)'
});

// Create a staggered reveal effect for gallery items with random starting positions
gsap.from('.gallery-item', {
    scrollTrigger: {
        trigger: '.gallery-container',
        start: 'top 80%'
    },
    duration: 1.2,
    y: gsap.utils.wrap([80, 40, 60, 30, 50, 70]),
    x: gsap.utils.wrap([-30, 30, -20, 20, -40, 40]),
    opacity: 0,
    scale: 0.8,
    rotation: gsap.utils.wrap([-5, 3, -2, 4, -3, 2]),
    stagger: {
        amount: 1.5,
        from: "center",
        grid: "auto"
    },
    ease: 'power3.out'
});

// Enhanced lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

// Create lightbox elements
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';

const lightboxContent = document.createElement('div');
lightboxContent.className = 'lightbox-content';

const closeBtn = document.createElement('span');
closeBtn.className = 'lightbox-close';
closeBtn.innerHTML = '&times;';

const img = document.createElement('img');
lightboxContent.appendChild(closeBtn);
lightboxContent.appendChild(img);

const navButtons = document.createElement('div');
navButtons.className = 'lightbox-nav';

const prevBtn = document.createElement('button');
prevBtn.innerHTML = '←';
prevBtn.setAttribute('aria-label', 'Previous image');

const nextBtn = document.createElement('button');
nextBtn.innerHTML = '→';
nextBtn.setAttribute('aria-label', 'Next image');

navButtons.appendChild(prevBtn);
navButtons.appendChild(nextBtn);
lightboxContent.appendChild(navButtons);

lightbox.appendChild(lightboxContent);
document.body.appendChild(lightbox);

// Open lightbox function
function openLightbox(index) {
    currentIndex = index;
    const imgSrc = galleryItems[index].querySelector('img').src;
    img.src = imgSrc;
    
    document.body.style.overflow = 'hidden';
    lightbox.classList.add('active');
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
}

// Close lightbox function
function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 400);
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeyDown);
}

// Navigate to previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    
    // Animate image change
    gsap.to(img, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
            img.src = imgSrc;
            gsap.to(img, {
                opacity: 1,
                scale: 1,
                duration: 0.3
            });
        }
    });
}

// Navigate to next image
function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    
    // Animate image change
    gsap.to(img, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
            img.src = imgSrc;
            gsap.to(img, {
                opacity: 1,
                scale: 1,
                duration: 0.3
            });
        }
    });
}

// Handle keyboard navigation
function handleKeyDown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
}

// Add event listeners
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Add hover animations for gallery items
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            duration: 0.4,
            ease: 'power2.out',
            boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        });
    });
});

// Contact Section Animation - continued with more luxury effects
gsap.from('.contact-form input, .contact-form textarea', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 70%'
    },
    duration: 0.8,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.contact-form button', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 70%'
    },
    duration: 0.8,
    y: 20,
    opacity: 0,
    scale: 0.9,
    ease: 'back.out(1.7)',
    delay: 0.5
});

// Footer animations
gsap.from('.footer-logo', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%'
    },
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.social-icon', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    delay: 0.3
});

gsap.from('.copyright', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%'
    },
    duration: 0.8,
    y: 20,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6
});

// Luxury hover effects for buttons
const allButtons = document.querySelectorAll('.btn, .btn-small');
allButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add subtle parallax to about section
ScrollTrigger.create({
    trigger: '.about',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: self => {
        const aboutImage = document.querySelector('.about-image');
        const aboutContent = document.querySelector('.about-content');
        
        if (aboutImage && aboutContent) {
            gsap.to(aboutImage, {
                y: self.progress * -30,
                duration: 0.1,
                ease: 'none'
            });
            
            gsap.to(aboutContent, {
                y: self.progress * 30,
                duration: 0.1,
                ease: 'none'
            });
        }
    }
});

// Add subtle parallax to menu items
ScrollTrigger.create({
    trigger: '.menu-container',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: self => {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach((item, index) => {
            const direction = index % 2 === 0 ? -1 : 1;
            gsap.to(item, {
                y: self.progress * 20 * direction,
                duration: 0.1,
                ease: 'none'
            });
        });
    }
});

// Add text reveal animations for paragraphs
const splitTextAnimation = () => {
    const paragraphs = document.querySelectorAll('.hero p, .about p');
    
    paragraphs.forEach(paragraph => {
        // Create wrapper for the paragraph
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        
        // Clone the paragraph
        const clone = paragraph.cloneNode(true);
        
        // Replace the paragraph with the wrapper
        paragraph.parentNode.replaceChild(wrapper, paragraph);
        
        // Add the clone to the wrapper
        wrapper.appendChild(clone);
        
        // Animate the clone
        gsap.from(clone, {
            scrollTrigger: {
                trigger: wrapper,
                start: 'top 80%'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
};

// Initialize text animations
splitTextAnimation();

// Add luxury scroll indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
        <div class="scroll-line"></div>
        <div class="scroll-text">Scroll</div>
    `;
    
    document.querySelector('.hero').appendChild(indicator);
    
    gsap.from(indicator, {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 2,
        ease: 'power3.out'
    });
    
    gsap.to('.scroll-line', {
        height: 40,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            gsap.to(indicator, {
                opacity: 0,
                duration: 0.5
            });
        } else {
            gsap.to(indicator, {
                opacity: 1,
                duration: 0.5
            });
        }
    });
};

createScrollIndicator();

// Add luxury page transition effects
const pageTransition = () => {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    
    // Initial page load animation
    gsap.to(transitionElement, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.2
    });
    
    // Link click transitions
    const pageLinks = document.querySelectorAll('a[href^="http"], a[href^="/"]');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('http') || href.startsWith('/')) {
                e.preventDefault();
                
                gsap.to(transitionElement, {
                    scaleY: 1,
                    transformOrigin: 'bottom',
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });
};

pageTransition();

// Add luxury image reveal effect
const imageRevealEffect = () => {
    const images = document.querySelectorAll('.menu-item img, .about-image img');
    
    images.forEach(image => {
        // Create wrapper and overlay
        const wrapper = document.createElement('div');
        wrapper.className = 'image-reveal-wrapper';
        
        const overlay = document.createElement('div');
        overlay.className = 'image-reveal-overlay';
        
        // Setup the DOM structure
        image.parentNode.insertBefore(wrapper, image);
        wrapper.appendChild(image);
        wrapper.appendChild(overlay);
        
        // Create the animation
        gsap.to(overlay, {
            scrollTrigger: {
                trigger: wrapper,
                start: 'top 70%'
            },
            scaleX: 0,
            transformOrigin: 'right',
            duration: 1.2,
            ease: 'power4.inOut'
        });
    });
};

// After the imageRevealEffect function definition, remove the second addLuxuryStyles function
// and call the imageRevealEffect function

imageRevealEffect();

// Add subtle floating animation to elements - removing this animation
const addFloatingAnimation = () => {
    // Animation removed to prevent elements from moving up and down
    console.log('Floating animation disabled for a more stable luxury feel');
};

addFloatingAnimation();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Menu button animation
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('mouseenter', () => {
        gsap.to(menuBtn, {
            scale: 1.1,
            duration: 0.3
        });
    });

    menuBtn.addEventListener('mouseleave', () => {
        gsap.to(menuBtn, {
            scale: 1,
            duration: 0.3
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.1}px) rotate(3deg)`;
    }
});

// Add enhanced lightbox styling
const enhanceLightbox = () => {
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 85vh;
            display: block;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lightbox-close:hover {
            transform: scale(1.2);
            color: #8A6D3B;
        }
        
        .lightbox-nav {
            position: absolute;
            bottom: -50px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        
        .lightbox-nav button {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.5);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lightbox-nav button:hover {
            background-color: #8A6D3B;
            border-color: #8A6D3B;
            transform: scale(1.1);
        }
    `;
    
    document.head.appendChild(style);
};

enhanceLightbox();

// Fix gallery visibility issues
const fixGalleryVisibility = () => {
    // Add specific styles for gallery
    const style = document.createElement('style');
    style.textContent = `
        .gallery {
            position: relative;
            z-index: 1;
            background-color: #F9F5EB;
        }
        
        .gallery-container {
            position: relative;
            z-index: 2;
        }
        
        .gallery-item {
            background-color: white;
            position: relative;
            z-index: 3;
            overflow: hidden;
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .gallery-item:hover img {
            transform: scale(1.1);
        }
        
        .gallery-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .gallery-item:hover::after {
            opacity: 1;
        }
    `;
    
    document.head.appendChild(style);
    
    // Ensure all gallery items have images
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) {
            console.warn('Gallery item missing image');
        } else {
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
        }
    });
};

fixGalleryVisibility();

// Fix CTA button styling
const fixCTAButtons = () => {
    const style = document.createElement('style');
    style.textContent = `
        .btn, .btn-small {
            background-color: #8A6D3B;
            color: white;
            border: none;
            padding: 14px 35px;
            font-size: 1rem;
            font-weight: 500;
            border-radius: 2px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: var(--font-body, 'Poppins', sans-serif);
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
            display: inline-block;
            text-decoration: none;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 5;
        }
        
        .btn:hover, .btn-small:hover {
            background-color: #6d5730;
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .btn::after, .btn-small::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(255, 255, 255, 0.1);
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.5s ease;
            z-index: -1;
        }
        
        .btn:hover::after, .btn-small:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }
    `;
    
    document.head.appendChild(style);
    
    // Apply styles to all buttons
    const buttons = document.querySelectorAll('.btn, .btn-small');
    buttons.forEach(button => {
        button.style.backgroundColor = '#8A6D3B';
        button.style.color = 'white';
        button.style.zIndex = '5';
    });
};

fixCTAButtons();

// Chef Section Animations
gsap.from('.chefs h2', {
    scrollTrigger: {
        trigger: '.chefs',
        start: 'top 80%'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// Adjust animation for single chef layout
gsap.from('.single-chef .chef-card', {
    scrollTrigger: {
        trigger: '.chefs-container',
        start: 'top 80%'
    },
    duration: 1,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.single-chef .chef-image', {
    scrollTrigger: {
        trigger: '.chefs-container',
        start: 'top 80%'
    },
    duration: 1,
    x: -50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('.single-chef .chef-info', {
    scrollTrigger: {
        trigger: '.chefs-container',
        start: 'top 80%'
    },
    duration: 1,
    x: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

// Add hover animations for chef cards
const chefCards = document.querySelectorAll('.chef-card');
chefCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.4,
            ease: 'power2.out',
            boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        });
    });
});

// Mobile bottom navigation - active section highlighting
const handleMobileNavHighlight = () => {
    const sections = document.querySelectorAll('section[id]');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    // Add active class styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav-item.active {
            color: var(--primary-color);
        }
        .mobile-nav-item.active i {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                mobileNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
};

handleMobileNavHighlight();

// Smooth scrolling for mobile nav links
document.querySelectorAll('.mobile-nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
