// Load components based on data-page attribute
document.addEventListener("DOMContentLoaded", async function () {
  const page = document.body.getAttribute("data-page");
  const rootPath = document.body.getAttribute("data-root-path") || ".";

  console.log("Loader initialized for page:", page);

  // Function to load component HTML
  async function loadComponent(componentPath, targetElementId) {
    try {
      const response = await fetch(`${rootPath}/${componentPath}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${componentPath}: ${response.statusText}`);
      }
      const html = await response.text();
      const container = document.getElementById(targetElementId);
      if (container) {
        container.innerHTML = html;
        
        // Special handling for navigation component
        if (componentPath.includes('navigation.html')) {
          console.log("Navigation component loaded, initializing...");
          initializeNavigationComponent(rootPath);
        }
        
        // Special handling for footer component
        if (componentPath.includes('footer.html')) {
          console.log("Footer component loaded, initializing...");
          initializeFooterComponent(rootPath);
        }
        
        // Special handling for breadcrumb component
        if (componentPath.includes('breadcrumb.html')) {
          console.log("Breadcrumb component loaded, initializing...");
          initializeBreadcrumbComponent(rootPath);
        }
      } else {
        // Don't log an error if the element simply doesn't exist on the page
        // console.log(`Container element #${targetElementId} not found on this page.`); 
      }
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
    }
  }

  // Navigation initialization function
  function initializeNavigationComponent(rootPath) {
    console.log("Initializing navigation with rootPath:", rootPath);
    
    const pathPrefix = rootPath ? rootPath + '/' : '';
    
    // Update all navigation links with correct paths
    const navLinks = {
      'nav-home-link': pathPrefix + 'index.html',
      'nav-logo-img': pathPrefix + 'images/logo-k2-consulting-white.svg',
      'nav-isg-home': pathPrefix + 'pages/isg.html',
      'nav-planning-scheduling': pathPrefix + 'pages/isg/performance/planning-scheduling.html',
      'nav-claims-management': pathPrefix + 'pages/isg/performance/claims-management.html', 
      'nav-evms': pathPrefix + 'pages/isg/performance/evms.html',
      'nav-risk-management': pathPrefix + 'pages/isg/performance/risk-management.html',
      'nav-pmis': pathPrefix + 'pages/isg/transformation/pmis.html',
      'nav-data-analytics': pathPrefix + 'pages/isg/transformation/data-analytics.html',
      'nav-ai-ml': pathPrefix + 'pages/isg/transformation/ai-ml.html',
      'nav-vdc': pathPrefix + 'pages/isg/transformation/vdc.html',
      'nav-cmmc-preparation': pathPrefix + 'pages/isg/cyber/cmmc-preparation.html',
      'nav-security-assessment': pathPrefix + 'pages/isg/cyber/security-assessment.html',
      'nav-rmf': pathPrefix + 'pages/isg/cyber/risk-management-framework.html',
      'nav-continuous-monitoring': pathPrefix + 'pages/isg/cyber/continuous-monitoring.html',
      'nav-blog': pathPrefix + 'pages/isg/blog.html',
      'nav-about': pathPrefix + 'pages/isg/leadership.html',
      'nav-careers': pathPrefix + 'pages/isg/careers.html'
    };
    
    // Set href attributes for links with error handling
    Object.keys(navLinks).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        try {
          if (id === 'nav-logo-img') {
            element.src = navLinks[id];
            console.log("Set logo src:", navLinks[id]);
          } else {
            element.href = navLinks[id];
            console.log("Set link href for", id, ":", navLinks[id]);
          }
        } catch (error) {
          console.error("Error setting link for", id, ":", error);
        }
      } else {
        console.warn("Element not found:", id);
      }
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
      });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu && navToggle && navMenu.classList.contains('active') && 
          !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
    
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (toggle && menu) {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close other dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle('active');
        });
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
    
    console.log("Navigation initialization complete!");
  }

  // Footer initialization function
  function initializeFooterComponent(rootPath) {
    console.log("Initializing footer with rootPath:", rootPath);
    
    const pathPrefix = rootPath ? rootPath + '/' : '';
    
    // Update footer links with correct paths
    const footerLinks = {
      'footer-logo': pathPrefix + 'images/logo-k2-consulting-white.svg',
      'footer-home-link': pathPrefix + 'index.html',
      'footer-isg-link': pathPrefix + 'pages/isg.html',
      'footer-ssg-link': pathPrefix + 'pages/ssg.html'
    };
    
    // Set href attributes for links
    Object.keys(footerLinks).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        try {
          if (id === 'footer-logo') {
            element.src = footerLinks[id];
            console.log("Set footer logo src:", footerLinks[id]);
          } else {
            element.href = footerLinks[id];
            console.log("Set footer link href for", id, ":", footerLinks[id]);
          }
        } catch (error) {
          console.error("Error setting footer link for", id, ":", error);
        }
      } else {
        console.warn("Footer element not found:", id);
      }
    });
    
    console.log("Footer initialization complete!");
  }

  // Breadcrumb initialization function
  function initializeBreadcrumbComponent(rootPath) {
    console.log("Initializing breadcrumb with rootPath:", rootPath);
    
    const pathPrefix = rootPath ? rootPath + '/' : '';
    
    // Update breadcrumb links with correct paths
    const breadcrumbLinks = {
      'breadcrumb-home-link': pathPrefix + 'index.html',
      'breadcrumb-isg-link': pathPrefix + 'pages/isg.html'
    };
    
    // Set href attributes for links
    Object.keys(breadcrumbLinks).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        try {
          element.href = breadcrumbLinks[id];
          console.log("Set breadcrumb link href for", id, ":", breadcrumbLinks[id]);
        } catch (error) {
          console.error("Error setting breadcrumb link for", id, ":", error);
        }
      } else {
        console.warn("Breadcrumb element not found:", id);
      }
    });
    
    console.log("Breadcrumb initialization complete!");
  }

  // --- Load Core Components --- 
  await loadComponent("components/navigation.html", "navigation");
  await loadComponent("components/breadcrumb.html", "breadcrumb");
  await loadComponent("components/footer.html", "footer");
  await loadComponent("components/floating-contact.html", "floatingContact");

  // --- Load Contact Form Modals (only if the placeholder div exists) --- 
  await loadComponent("components/contact-forms/general-form.html", "generalContactModal");
  await loadComponent("components/contact-forms/project-performance-form.html", "projectPerformanceContactModal");
  await loadComponent("components/contact-forms/data-transformation-form.html", "dataTransformationContactModal");
  await loadComponent("components/contact-forms/cyber-security-form.html", "cyberSecurityContactModal");

  // After loading modals, make sure all containers have the right styles
  console.log("Setting direct styles on modal containers");
  document.querySelectorAll('.modal-container').forEach(container => {
    // Make container ready for proper display
    container.style.display = "block";  
    container.style.visibility = "visible";
    container.style.opacity = "1";
    container.style.zIndex = "10000";
    container.style.transform = "translateY(0)";
  });

  // Ensure ModalSystem is initialized after all components are loaded
  if (typeof ModalSystem !== 'undefined' && ModalSystem.init) {
    console.log("Re-initializing ModalSystem after loading components");
    ModalSystem.init();
  } else {
    console.warn("ModalSystem not available when components loaded");
  }

  // --- Trigger Breadcrumb Update After Core Components --- 
  // Wait a short moment for the breadcrumb script to potentially be executed 
  // from within its loaded HTML before triggering the update.
  setTimeout(() => {
      const breadcrumbContainer = document.getElementById("breadcrumb");
      const hardcodedBreadcrumb = document.querySelector(".breadcrumb");
      
      if (hardcodedBreadcrumb && !breadcrumbContainer) {
          console.log("Loader: Found hardcoded breadcrumb, skipping dynamic breadcrumb update.");
      } else if (breadcrumbContainer) {
          console.log("Loader: Triggering BreadcrumbReady event with", page, rootPath);
          const breadcrumbEvent = new CustomEvent('BreadcrumbReady', {
              detail: {
                  page: page,
                  rootPath: rootPath
              }
          });
          document.dispatchEvent(breadcrumbEvent);
      } else {
           console.log('Loader: No breadcrumb container found - using hardcoded breadcrumb or none needed.');
      }
  }, 100); // Reduced timeout slightly

  console.log("Loader finished.");
});