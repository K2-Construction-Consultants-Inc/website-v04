// Modal System - Simple, direct modal implementation
(function() {
  console.log("Modal system loading...");
  
  // Forms content for each form type
  const formTemplates = {
    general: `
      <h2>Contact Us</h2>
      <div class="form-group">
        <label for="generalName" class="required">Name</label>
        <input type="text" id="generalName" name="name" required />
      </div>
      <div class="form-group">
        <label for="generalEmail" class="required">Email</label>
        <input type="email" id="generalEmail" name="email" required />
      </div>
      <div class="form-group">
        <label for="generalCompany">Company</label>
        <input type="text" id="generalCompany" name="company" />
      </div>
      <div class="form-group">
        <label for="generalInterest" class="required">Area of Interest</label>
        <select id="generalInterest" name="interest" required>
          <option value="">Select area of interest</option>
          <option value="project-performance">Project Performance</option>
          <option value="data-transformation">Data Transformation</option>
          <option value="cyber-security">Cybersecurity</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>
      <div class="form-group">
        <label for="generalMessage" class="required">Message</label>
        <textarea id="generalMessage" name="message" placeholder="How can we help you?" required></textarea>
      </div>
      <div id="generalFormSuccess" class="form-success">
        Thank you for your message! We'll be in touch shortly.
      </div>
    `,
    
    projectPerformance: `
      <h2>Contact Us - Project Performance</h2>
      <div class="form-group">
        <label for="projectPerformanceName" class="required">Name</label>
        <input type="text" id="projectPerformanceName" name="name" required />
      </div>
      <div class="form-group">
        <label for="projectPerformanceEmail" class="required">Email</label>
        <input type="email" id="projectPerformanceEmail" name="email" required />
      </div>
      <div class="form-group">
        <label for="projectPerformanceCompany">Company</label>
        <input type="text" id="projectPerformanceCompany" name="company" />
      </div>
      <div class="form-group">
        <label for="projectPerformanceMessage" class="required">Message</label>
        <textarea
          id="projectPerformanceMessage"
          name="message"
          placeholder="How can we help you with Project Performance?"
          required
        ></textarea>
      </div>
      <div id="projectPerformanceFormSuccess" class="form-success">
        Thank you for your message! We'll be in touch shortly.
      </div>
    `,
    
    dataTransformation: `
      <h2>Contact Us - Data Transformation</h2>
      <div class="form-group">
        <label for="dataTransformationName" class="required">Name</label>
        <input type="text" id="dataTransformationName" name="name" required />
      </div>
      <div class="form-group">
        <label for="dataTransformationEmail" class="required">Email</label>
        <input type="email" id="dataTransformationEmail" name="email" required />
      </div>
      <div class="form-group">
        <label for="dataTransformationCompany">Company</label>
        <input type="text" id="dataTransformationCompany" name="company" />
      </div>
      <div class="form-group">
        <label for="dataTransformationMessage" class="required">Message</label>
        <textarea
          id="dataTransformationMessage"
          name="message"
          placeholder="How can we help you with Data Transformation?"
          required
        ></textarea>
      </div>
      <div id="dataTransformationFormSuccess" class="form-success">
        Thank you for your message! We'll be in touch shortly.
      </div>
    `,
    
    cyberSecurity: `
      <h2>Contact Us - Cybersecurity</h2>
      <div class="form-group">
        <label for="cyberSecurityName" class="required">Name</label>
        <input type="text" id="cyberSecurityName" name="name" required />
      </div>
      <div class="form-group">
        <label for="cyberSecurityEmail" class="required">Email</label>
        <input type="email" id="cyberSecurityEmail" name="email" required />
      </div>
      <div class="form-group">
        <label for="cyberSecurityCompany">Company</label>
        <input type="text" id="cyberSecurityCompany" name="company" />
      </div>
      <div class="form-group">
        <label for="cyberSecurityMessage" class="required">Message</label>
        <textarea
          id="cyberSecurityMessage"
          name="message"
          placeholder="How can we help you with Cybersecurity?"
          required
        ></textarea>
      </div>
      <div id="cyberSecurityFormSuccess" class="form-success">
        Thank you for your message! We'll be in touch shortly.
      </div>
    `
  };
  
  // Direct show function
  function showModal(formType = "general", formId = "contact-form") {
    console.log(`Showing modal: ${formType}`);
    
    // Remove any existing force modals
    const existingModal = document.getElementById("modal-backdrop");
    if (existingModal) {
      document.body.removeChild(existingModal);
    }
    
    const existingContainer = document.getElementById("modal-container");
    if (existingContainer) {
      document.body.removeChild(existingContainer);
    }
    
    // Create backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "modal-backdrop";
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 31, 77, 0.85);
      z-index: 99999;
    `;
    
    // Create container
    const container = document.createElement("div");
    container.id = "modal-container";
    container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 600px;
      z-index: 100000;
      max-height: 90vh;
      overflow-y: auto;
    `;
    
    // Get the appropriate form template
    const formTemplate = formTemplates[formType] || formTemplates.general;
    
    // Create form HTML with the template content - NO INLINE STYLES
    container.innerHTML = `
      <form id="${formId}">
        ${formTemplate}
        <div class="form-actions">
          <button type="button" class="btn-secondary" id="modal-cancel">
            Cancel
          </button>
          <button type="submit" class="btn-primary">Send Message</button>
        </div>
      </form>
    `;
    
    // Add close functionality
    backdrop.addEventListener("click", function(e) {
      if (e.target === backdrop) {
        document.body.removeChild(backdrop);
        document.body.removeChild(container);
        document.body.style.overflow = "";
      }
    });
    
    const cancelButton = container.querySelector("#modal-cancel");
    cancelButton.addEventListener("click", function() {
      document.body.removeChild(backdrop);
      document.body.removeChild(container);
      document.body.style.overflow = "";
    });
    
    // Handle form submission
    const form = container.querySelector(`#${formId}`);
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Show success message
      const successMessage = container.querySelector(`.form-success`);
      if (successMessage) {
        successMessage.classList.add("show");
        
        // Hide the form after 3 seconds
        setTimeout(() => {
          document.body.removeChild(backdrop);
          document.body.removeChild(container);
          document.body.style.overflow = "";
        }, 3000);
      } else {
        // No success message found, just close the modal
        document.body.removeChild(backdrop);
        document.body.removeChild(container);
        document.body.style.overflow = "";
      }
    });
    
    // Add to document
    document.body.appendChild(backdrop);
    document.body.appendChild(container);
    document.body.style.overflow = "hidden"; // Prevent scrolling
    
    console.log(`Modal (${formType}) displayed successfully`);
  }
  
  // Attach modal functions to window object
  window.showGeneralModal = function() {
    showModal("general", "general-form");
  };
  
  window.showProjectPerformanceModal = function() {
    showModal("projectPerformance", "project-form");
  };
  
  window.showDataTransformationModal = function() {
    showModal("dataTransformation", "data-form");
  };
  
  window.showCyberSecurityModal = function() {
    showModal("cyberSecurity", "cyber-form");
  };
  
  console.log("Modal system initialized");
})(); 