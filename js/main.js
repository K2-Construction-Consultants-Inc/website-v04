// Enhanced Modal Management System
const ModalSystem = {
  activeModal: null,
  modalBackdrop: null,
  initialized: false,

  init() {
    if (this.initialized) {
      console.log("ModalSystem already initialized, skipping");
      return;
    }

    console.log("Initializing ModalSystem...");
    
    // Create backdrop element if it doesn't exist
    if (!this.modalBackdrop || !document.body.contains(this.modalBackdrop)) {
      console.log("Creating backdrop element");
      this.modalBackdrop = document.createElement("div");
      this.modalBackdrop.className = "modal-backdrop";
      document.body.appendChild(this.modalBackdrop);
    }

    // Enhanced event delegation for clicks
    document.body.addEventListener("click", (e) => {
      // Check for click on backdrop itself
      if (e.target === this.modalBackdrop && this.activeModal) {
        this.hideModal(this.activeModal);
        return;
      }
      
      // Check for click on overlay (but not content)
      if (e.target.classList.contains('modal-overlay') && this.activeModal) {
           this.hideModal(this.activeModal);
        return;
      }
      
      // Check for click on a close button
      const closeButton = e.target.closest(".modal-close");
      if (closeButton && this.activeModal) {
        e.preventDefault();
        this.hideModal(this.activeModal);
        return;
      }
      
      // Check for click on a cancel button within form actions
      const cancelButton = e.target.closest('.form-actions .btn-secondary');
      if (cancelButton && this.activeModal) {
          const onclickAttr = cancelButton.getAttribute('onclick');
          if (onclickAttr && onclickAttr.includes('ModalSystem.hideModal')) {
          e.preventDefault();
               this.hideModal(this.activeModal);
          return;
          }
      }
    });

    // Enhanced keyboard event listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeModal) {
        this.hideModal(this.activeModal);
      }
    });

    this.initialized = true;
    console.log("Modal System Initialized with Enhanced Features");
  },

  showModal(modalId) {
    console.log(`Attempting to show modal: ${modalId}`);
    
    if (!this.initialized) {
      console.log("ModalSystem not initialized, initializing now...");
      this.init();
    }
    
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with id ${modalId} not found in the DOM`);
      return;
    }

    // Create backdrop if it doesn't exist yet
    if (!this.modalBackdrop || !document.body.contains(this.modalBackdrop)) {
      console.warn("Modal backdrop not found, creating it now");
      this.modalBackdrop = document.createElement("div");
      this.modalBackdrop.className = "modal-backdrop";
      document.body.appendChild(this.modalBackdrop);
    }

    // Hide any active modal first
    if (this.activeModal) {
      this.hideModal(this.activeModal);
    }

    // Prepare modal and backdrop for transition
    modal.style.display = "flex";
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    modal.style.pointerEvents = "auto";
    modal.style.zIndex = "9999";
    
    this.modalBackdrop.style.display = "block";
    this.modalBackdrop.style.opacity = "1";
    this.modalBackdrop.style.visibility = "visible";
    this.modalBackdrop.style.zIndex = "9998";

    // Force reflow
    void modal.offsetWidth;
    void this.modalBackdrop.offsetWidth;

    this.activeModal = modal;
    document.body.style.overflow = "hidden";
    
    // Set styles on the modal container
    const container = modal.querySelector('.modal-container');
    if (container) {
      container.style.opacity = "1";
      container.style.visibility = "visible";
      container.style.transform = "translateY(0)";
      container.style.zIndex = "10000";
    }
    
    // Add show class with slight delay for smooth transition
    setTimeout(() => {
      modal.classList.add("show");
      this.modalBackdrop.classList.add("show");
      console.log(`Modal ${modalId} show transition started`);
    }, 10);

    console.log(`Modal ${modalId} show triggered.`);
  },

  hideModal(modal) {
    if (!modal || !modal.classList.contains('show')) return;

    console.log(`Hiding modal: ${modal.id}`);
    
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.remove("show");
    }
    
    modal.classList.remove("show");
    modal.style.pointerEvents = "none";

    // Enhanced transition handling
    const onTransitionEnd = (event) => {
        if (event.target === modal && window.getComputedStyle(modal).opacity === '0') { 
            console.log(`Transition ended for ${modal.id}`);
            modal.style.display = "none";
        
            if (this.activeModal === modal) { 
                if (this.modalBackdrop) {
                  this.modalBackdrop.style.display = "none";
                }
          document.body.style.overflow = "";
                this.activeModal = null;
                console.log(`Modal ${modal.id} fully hidden and activeModal reset.`);
            }
            modal.removeEventListener('transitionend', onTransitionEnd);
        }
    };
    
    modal.addEventListener('transitionend', onTransitionEnd);

    // Enhanced fallback timeout
    setTimeout(() => {
        if (modal.style.display !== 'none') { 
        console.log(`Transitionend fallback triggered for ${modal.id}`);
            modal.style.display = 'none';
        
            if (this.activeModal === modal) {
                if (this.modalBackdrop) {
                  this.modalBackdrop.style.display = 'none';
                }
                document.body.style.overflow = '';
                this.activeModal = null;
            }
            modal.removeEventListener('transitionend', onTransitionEnd);
        }
    }, 500);
  },
};

// Enhanced Modal Functions
function showGeneralModal() {
  console.log("showGeneralModal called");
  ModalSystem.showModal("generalContactModal");
}

function showProjectPerformanceModal() {
  console.log("showProjectPerformanceModal called");
  ModalSystem.showModal("projectPerformanceContactModal");
}

function showDataTransformationModal() {
  console.log("showDataTransformationModal called");
  ModalSystem.showModal("dataTransformationContactModal");
}

function showCyberSecurityModal() {
  console.log("showCyberSecurityModal called");
  ModalSystem.showModal("cyberSecurityContactModal");
}

// Attach modal functions to window object
window.showGeneralModal = showGeneralModal;
window.showProjectPerformanceModal = showProjectPerformanceModal;
window.showDataTransformationModal = showDataTransformationModal;
window.showCyberSecurityModal = showCyberSecurityModal;

// Enhanced Form Handling Functions
window.handleGeneralFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("generalFormSuccess");

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
  if (successMessage) {
    successMessage.classList.add("show");
  }
  form.reset();

    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;

    // Hide success message and modal after delay
  setTimeout(() => {
    if (successMessage) {
      successMessage.classList.remove("show");
    }
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);
  }, 1000);

  return false;
};

window.handleProjectPerformanceFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("projectPerformanceFormSuccess");

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  setTimeout(() => {
  if (successMessage) {
    successMessage.classList.add("show");
  }
  form.reset();

    submitButton.textContent = originalText;
    submitButton.disabled = false;

  setTimeout(() => {
    if (successMessage) {
      successMessage.classList.remove("show");
    }
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);
  }, 1000);

  return false;
};

window.handleDataTransformationFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("dataTransformationFormSuccess");

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  setTimeout(() => {
  if (successMessage) {
    successMessage.classList.add("show");
  }
  form.reset();

    submitButton.textContent = originalText;
    submitButton.disabled = false;

  setTimeout(() => {
    if (successMessage) {
      successMessage.classList.remove("show");
    }
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);
  }, 1000);

  return false;
};

window.handleCyberSecurityFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("cyberSecurityFormSuccess");

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  setTimeout(() => {
  if (successMessage) {
    successMessage.classList.add("show");
  }
  form.reset();

    submitButton.textContent = originalText;
    submitButton.disabled = false;

  setTimeout(() => {
    if (successMessage) {
      successMessage.classList.remove("show");
    }
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);
  }, 1000);

  return false;
};

// Enhanced Floating Contact Button
window.toggleContactInfo = function () {
  const contactInfo = document.getElementById("contactInfo");
  if (contactInfo) {
    contactInfo.classList.toggle("active");
    
    // Add smooth animation
    if (contactInfo.classList.contains("active")) {
      contactInfo.style.transform = "translateY(0)";
      contactInfo.style.opacity = "1";
    } else {
      contactInfo.style.transform = "translateY(10px)";
      contactInfo.style.opacity = "0";
    }
  } else {
    console.warn("Contact info element not found");
  }
};

// Enhanced click outside handler
document.addEventListener("click", function (event) {
  const contactInfo = document.getElementById("contactInfo");
  const floatingContact = event.target.closest(".floating-contact");

  if (contactInfo && !floatingContact && contactInfo.classList.contains("active")) {
    contactInfo.classList.remove("active");
    contactInfo.style.transform = "translateY(10px)";
    contactInfo.style.opacity = "0";
  }
});

// Enhanced Carousel System
window.initializeCarousel = function(carouselElement = null) {
  console.log('Initializing Enhanced Carousel(s)... Target:', carouselElement || 'All');
  const carousels = carouselElement ? [carouselElement] : document.querySelectorAll(".carousel");
  
  if (carousels.length === 0) {
      console.warn("No carousel elements found to initialize.");
    return;
  }

  carousels.forEach((carousel) => {
    const items = carousel.querySelector(".carousel-items");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    if (!items || !dotsContainer) {
      console.warn("Carousel missing .carousel-items or .carousel-dots", carousel);
      return;
    }

    // Enhanced carousel item setup
    const carouselItems = items.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, index) => {
      item.style.width = '100%';
      item.style.minWidth = '100%';
      item.style.flex = '0 0 100%';
      item.classList.toggle('active', index === 0);
    });

    items.style.transform = 'translateX(0%)'; 
    items.style.width = '100%';

    let slides = Array.from(items.children);
    let currentIndex = 0;
    let intervalId;
    let isTransitioning = false;

    // Create dots if needed
    if (carouselElement || dotsContainer.children.length === 0) {
      dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
          const dot = document.createElement("span");
          dot.classList.add("carousel-dot");
          if (index === 0) dot.classList.add("active"); 
          dot.dataset.index = index;
          dotsContainer.appendChild(dot);
        });
    }
    
    let dots = Array.from(dotsContainer.children);

    // Ensure proper initial state
    slides.forEach((slide, index) => slide.classList.toggle('active', index === 0));
    if (dots.length === slides.length) {
         dots.forEach((dot, index) => dot.classList.toggle('active', index === 0));
    }

    function updateSlidePositions() {
      if (items && !isTransitioning) {
        isTransitioning = true;
           const slideWidth = 100;
           items.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Reset transition flag after animation
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
       }
    }

    function showSlide(index) {
      if (isTransitioning) return; // Prevent rapid transitions
      
      slides = Array.from(items.children); 
      dots = Array.from(dotsContainer.children); 
      
      if (index < 0 || index >= slides.length || slides.length === 0) {
          console.warn(`showSlide: Invalid index ${index} or no slides.`);
          return;
      }

      // Enhanced slide transition
      if (currentIndex >= 0 && currentIndex < slides.length) {
          if (slides[currentIndex]) slides[currentIndex].classList.remove("active");
          if (dots.length === slides.length && dots[currentIndex]) {
              dots[currentIndex].classList.remove("active");
          }
      }

      currentIndex = index;

       if (slides[currentIndex]) slides[currentIndex].classList.add("active");
       if (dots.length === slides.length && dots[currentIndex]) {
            dots[currentIndex].classList.add("active");
       }

      updateSlidePositions();
      resetInterval();
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }

    function previousSlide() {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }

    function startInterval() {
      clearInterval(intervalId);
      intervalId = setInterval(nextSlide, 6000); // Increased interval for better UX
    }

    function resetInterval() {
      startInterval();
    }

    // Enhanced dot event listeners
    dots.forEach((dot) => {
      const newDot = dot.cloneNode(true);
      dot.parentNode.replaceChild(newDot, dot);
      
      newDot.addEventListener("click", function() {
        const index = parseInt(this.dataset.index);
        if (!isNaN(index) && index !== currentIndex) {
          showSlide(index);
        }
      });
    });

    // Enhanced keyboard navigation
    carousel.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(intervalId);
    });

    carousel.addEventListener('mouseleave', () => {
      startInterval();
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }
    });

    // Start the carousel
        startInterval();
    
    console.log(`Enhanced carousel initialized for ${carousel.className}`);
  });
};

// Enhanced Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll
      if (scrollY > lastScrollY && scrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);
  }
});

// Enhanced Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerOffset = 100; // Account for fixed header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
      }
    });
  });
});

// Enhanced Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('show');
          
          // Add special effects for different elements
          if (entry.target.classList.contains('metric-card')) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
          }
          
          if (entry.target.classList.contains('service-card')) {
            entry.target.style.animationDelay = `${index * 0.2}s`;
          }
        }, index * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-up, .animate-scale-in').forEach((element) => {
    observer.observe(element);
  });
});

// Enhanced Performance Monitoring
const PerformanceMonitor = {
  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Performance:', {
          loadTime: perfData.loadEventEnd - perfData.loadEventStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          totalTime: perfData.loadEventEnd - perfData.fetchStart
        });
      }, 0);
});

    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('Largest Contentful Paint:', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
};

// Initialize performance monitoring
PerformanceMonitor.init();

// Enhanced Error Handling
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    error: e.error
  });
});

// Enhanced Console Styling (Development)
if (typeof process === 'undefined' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('%cK2 Consulting Website', 'color: #13294B; font-size: 24px; font-weight: bold;');
  console.log('%cModern JavaScript Enhanced', 'color: #FABC09; font-size: 14px;');
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ModalSystem,
    showGeneralModal,
    showProjectPerformanceModal,
    showDataTransformationModal,
    showCyberSecurityModal
  };
}
