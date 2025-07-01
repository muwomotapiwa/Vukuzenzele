// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
let currentGalleryImage = 0;
const galleryImages = [];

// Product data
const productData = {
    'standard': {
        title: 'Standard Ox Cart',
        image: 'assets/b3.jpg',
        description: 'Our Standard Ox Cart is the perfect solution for general farming and transportation needs. Built with high-quality materials and designed for durability, this cart offers excellent value for money while maintaining the reliability that Zimbabwean farmers depend on.',
        specifications: [
            'Load Capacity: 1.5 - 2 tons',
            'Wheel Size: 20 inches diameter',
            'Frame Material: Heavy-duty steel',
            'Dimensions: 3.5m x 1.8m x 1.2m',
            'Weight: 350kg',
            'Axle: Reinforced steel axle'
        ],
        features: [
            'Weather-resistant coating',
            'Heavy-duty steel frame construction',
            'Reliable wheel bearings',
            'Easy maintenance design',
            'Suitable for various terrains',
            'Cost-effective solution'
        ]
    },
    'heavy-duty': {
        title: 'Heavy Duty Cart',
        image: 'assets/c1.jpg',
        description: 'Built for the most demanding agricultural work, our Heavy Duty Cart can handle substantial loads and challenging conditions. This cart features reinforced construction and enhanced capacity, making it ideal for commercial farming operations and heavy transportation needs.',
        specifications: [
            'Load Capacity: 3 - 4 tons',
            'Wheel Size: 24 inches diameter',
            'Frame Material: Reinforced steel',
            'Dimensions: 4.2m x 2.1m x 1.4m',
            'Weight: 520kg',
            'Axle: Heavy-duty reinforced axle'
        ],
        features: [
            'Extra-strong reinforced construction',
            'Enhanced load capacity',
            'Superior durability',
            'Heavy-duty wheel system',
            'Commercial-grade materials',
            'Extended warranty coverage'
        ]
    },
    'custom': {
        title: 'Custom Solutions',
        image: 'assets/c2.jpg',
        description: 'Every farm has unique needs, and our Custom Solutions service ensures you get exactly what you require. We work closely with you to design and build ox carts that meet your specific requirements, whether it\'s special dimensions, unique features, or specialized applications.',
        specifications: [
            'Load Capacity: Customizable',
            'Wheel Size: Various options available',
            'Frame Material: As per requirements',
            'Dimensions: Tailored to your needs',
            'Weight: Varies by specification',
            'Special Features: As requested'
        ],
        features: [
            'Fully customizable design',
            'Specialized sizing options',
            'Unique feature integration',
            'Consultation and design service',
            'Quality assurance guarantee',
            'Ongoing support and maintenance'
        ]
    }
};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== WEBSITE INITIALIZATION =====
function initializeWebsite() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);

    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeTestimonials();
    initializeGallery();
    initializeContactForm();
    initializeBackToTop();
    initializeAnimations();
    initializeProductModal();
    
    // Collect gallery images
    collectGalleryImages();
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active navigation link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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

    // Parallax effect for hero section
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImg.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ===== TESTIMONIALS CAROUSEL =====
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navButtons = document.querySelectorAll('.testimonial-nav-btn');

    if (testimonialCards.length === 0) return;

    // Auto-rotate testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000);

    // Navigation buttons
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });

        // Remove active class from all nav buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
            navButtons[index].classList.add('active');
        }

        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
}

// ===== GALLERY LIGHTBOX =====
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            if (img) {
                currentGalleryImage = index;
                showLightboxImage(img.src, img.alt);
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentGalleryImage = currentGalleryImage > 0 ? currentGalleryImage - 1 : galleryImages.length - 1;
            showLightboxImage(galleryImages[currentGalleryImage].src, galleryImages[currentGalleryImage].alt);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentGalleryImage = (currentGalleryImage + 1) % galleryImages.length;
            showLightboxImage(galleryImages[currentGalleryImage].src, galleryImages[currentGalleryImage].alt);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        }
    });

    function showLightboxImage(src, alt) {
        if (lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function collectGalleryImages() {
    const galleryImgs = document.querySelectorAll('.gallery-img');
    galleryImages.length = 0; // Clear array
    galleryImgs.forEach(img => {
        galleryImages.push({
            src: img.src,
            alt: img.alt
        });
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');

    if (!contactForm) return;

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission(contactForm);
    });

    // Input validation and floating labels
    formInputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            clearFieldError(input);
        });

        // Floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Initialize floating labels for pre-filled inputs
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
    }

    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Name validation
    if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = `${getFieldLabel(fieldName)} must be at least 2 characters long.`;
        }
    }

    // Message validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    field.parentElement.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '#e5e7eb';
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone Number',
        message: 'Message'
    };
    return labels[fieldName] || fieldName;
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    let isFormValid = true;

    // Validate all fields
    const fields = form.querySelectorAll('.form-input, .form-textarea');
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showNotification('Please correct the errors in the form.', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button state
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;
        
        // Clear focused states
        fields.forEach(field => {
            field.parentElement.classList.remove('focused');
        });
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
    }, 2000);
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .why-choose-card, .testimonial-card, .gallery-item, .about-feature');
    
    animatedElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        
        observer.observe(el);
    });

    // Counter animation for hero stats
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;

    // Set background color based on type
    const colors = {
        success: '#059669',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

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

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation for custom elements
document.addEventListener('keydown', (e) => {
    // Handle keyboard navigation for gallery
    if (e.target.classList.contains('gallery-item') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.target.click();
    }
    
    // Handle keyboard navigation for buttons
    if (e.target.classList.contains('btn') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.target.click();
    }
});

// Focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== BROWSER COMPATIBILITY =====
// Polyfill for IntersectionObserver
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    const animatedElements = document.querySelectorAll('.product-card, .why-choose-card, .testimonial-card, .gallery-item, .about-feature');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// ===== PRODUCT MODAL =====
function initializeProductModal() {
    const productModal = document.getElementById('product-modal');
    const productModalClose = document.getElementById('product-modal-close');

    // Close modal when clicking close button
    if (productModalClose) {
        productModalClose.addEventListener('click', closeProductModal);
    }

    // Close modal when clicking outside
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('show')) {
            closeProductModal();
        }
    });
}

function openProductModal(productId) {
    const product = productData[productId];
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('product-modal-img');
    const modalTitle = document.getElementById('product-modal-title');
    const modalDescription = document.getElementById('product-modal-description');
    const modalSpecs = document.getElementById('product-modal-specs');
    const modalFeatures = document.getElementById('product-modal-features');

    // Populate modal content
    modalImg.src = product.image;
    modalImg.alt = product.title;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;

    // Clear and populate specifications
    modalSpecs.innerHTML = '';
    product.specifications.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
    });

    // Clear and populate features
    modalFeatures.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Focus management
    trapFocus(modal);
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// ===== INITIALIZATION COMPLETE =====
console.log('Vukuzenzele Steel Projects website initialized successfully!');

