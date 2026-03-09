// ===== CALCULATOR FUNCTIONALITY =====
var autoplayTime = (window.innerWidth < 768) ? 2000 : 2500;

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,              // hide prev/next arrows
    dots: true,             // hide dots (if you want)
    autoplay: true,          // enable auto scroll
    autoplayTimeout: autoplayTime,   // 3 seconds per slide
    autoplayHoverPause: true,// pause on hover
    smartSpeed: 600,  // transition speed (0.8s)
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});

// Global variable to store calculator display
let calculatorDisplay = '';

// Function to append values to calculator display
function appendToDisplay(value) {
    calculatorDisplay += value;
    document.getElementById('calculator-display').value = calculatorDisplay;
}

// Function to clear calculator display
function clearDisplay() {
    calculatorDisplay = '';
    document.getElementById('calculator-display').value = calculatorDisplay;
}

// Function to delete last character
function deleteLast() {
    calculatorDisplay = calculatorDisplay.slice(0, -1);
    document.getElementById('calculator-display').value = calculatorDisplay;
}

// Function to calculate result
function calculate() {
    try {
        // Replace × with * for evaluation
        let expression = calculatorDisplay.replace(/×/g, '*');
        
        // Validate expression
        if (!expression) {
            document.getElementById('calculator-display').value = 'Error';
            return;
        }
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Check if result is valid
        if (isFinite(result)) {
            // Format result to avoid too many decimal places
            if (Number.isInteger(result)) {
                calculatorDisplay = result.toString();
            } else {
                calculatorDisplay = parseFloat(result.toFixed(8)).toString();
            }
        } else {
            calculatorDisplay = 'Error';
        }
        
        document.getElementById('calculator-display').value = calculatorDisplay;
    } catch (error) {
        document.getElementById('calculator-display').value = 'Error';
        calculatorDisplay = '';
    }
}

// ===== SMOOTH SCROLLING NAVIGATION =====

// Add smooth scrolling to all navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== NAVIGATION ACTIVE STATE =====

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// ===== NOTIFICATION SYSTEM =====

// Function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.subject-card, .testimonial-card, .resource-card, .gallery-item');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// ===== NAVBAR SCROLL EFFECT =====

// Add background to navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ===== MATH QUIZ FUNCTIONALITY =====

// Simple math quiz questions
const mathQuizQuestions = [
    {
        question: "What is 15 + 27?",
        answer: 42,
        options: [40, 41, 42, 43]
    },
    {
        question: "What is 8 × 7?",
        answer: 56,
        options: [54, 55, 56, 57]
    },
    {
        question: "What is the square root of 64?",
        answer: 8,
        options: [6, 7, 8, 9]
    },
    {
        question: "What is 100 ÷ 4?",
        answer: 25,
        options: [20, 25, 30, 35]
    },
    {
        question: "What is 3² + 4²?",
        answer: 25,
        options: [23, 24, 25, 26]
    }
];

// Open and close modal
  function openDemoForm() {
    document.getElementById('demoFormModal').style.display = 'flex';
  }
  function closeDemoForm() {
    document.getElementById('demoFormModal').style.display = 'none';
  }

  // Submit to WhatsApp with prefilled info
  function submitToWhatsApp(event) {
    event.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value);
    const studentClass = encodeURIComponent(document.getElementById('class').value);
    const message = encodeURIComponent(document.getElementById('message').value);

    const prefilledText = `Hello Obaid Sir, I’m interested in booking a Free Demo session.%0AName: ${name}%0AClass: ${studentClass}%0AMessage: ${message}`;
    const waLink = `https://wa.me/916392761479?text=${prefilledText}`;

    window.open(waLink, '_blank');
    closeDemoForm();
  }

// Function to create and display math quiz
function createMathQuiz() {
    const quizContainer = document.createElement('div');
    quizContainer.className = 'math-quiz-container';
    quizContainer.innerHTML = `
        <h4 class="text-center mb-4">Quick Math Quiz</h4>
        <div id="quiz-content">
            <div id="quiz-question" class="mb-3"></div>
            <div id="quiz-options" class="mb-3"></div>
            <button id="quiz-submit" class="btn btn-primary w-100" style="display: none;">Submit Answer</button>
            <div id="quiz-result" class="mt-3"></div>
        </div>
    `;
    
    return quizContainer;
}

// ===== UTILITY FUNCTIONS =====

// Function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to debounce scroll events
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

// ===== KEYBOARD SHORTCUTS =====

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus on calculator
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const calculatorDisplay = document.getElementById('calculator-display');
        if (calculatorDisplay) {
            calculatorDisplay.focus();
        }
    }
    
    // Escape to clear calculator
    if (e.key === 'Escape') {
        clearDisplay();
    }
});

$(document).ready(function(){
    $(".screenshot-carousel").owlCarousel({
        loop: true,               // Keeps it looping infinitely
        margin: 15,               // Space between items
        items: 1,                 // Show one image at a time
        
        // Autoplay settings
        autoplay: true,           // Turns on scheduled sliding
        autoplayTimeout: 3000,    // Time between slides (3 seconds)
        autoplayHoverPause: true, // Pauses ONLY on hover, resumes on mouseleave
        
        // Navigation settings
        nav: true,                // Enables the Next/Prev arrows
        dots: true,               // Keeps the dots at the bottom (set to false if you want to hide them)
        navText: [
            "<i class='fas fa-chevron-left'></i>", 
            "<i class='fas fa-chevron-right'></i>"
        ] // Uses the FontAwesome icons you already loaded in your <head>
    });

    // Initialize the other text testimonial carousel if you haven't already
    $("#testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        nav: false, // Probably don't need arrows for the text ones
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });
});

// ===== ACCESSIBILITY FEATURES =====

// Add focus indicators for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '0px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// ===== PERFORMANCE OPTIMIZATION =====

// Lazy load images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// ===== INITIALIZATION =====

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Obaid Khan Mathematics Website loaded successfully!');
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Add loading animation to page
    document.body.classList.add('loaded');
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Master Mathematics with Obaid Khan – 6+ Years of Teaching Excellence”');
    }, 700);
});



// ===== CSS ANIMATIONS FOR NOTIFICATIONS =====

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .navbar-scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        font-size: 1rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    body {
        opacity: 0;
    }
`;

document.head.appendChild(style); 