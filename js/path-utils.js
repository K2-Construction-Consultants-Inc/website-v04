/**
 * Path Utilities for Multi-Level Directory Support
 * 
 * This utility automatically calculates correct relative paths
 * based on the current page location, supporting unlimited nesting levels
 * and a configurable base path for sections like ISG.
 */

window.PathUtils = {
  
  // Configuration for the new folder structure
  config: {
    // The base filename for the ISG section (e.g., 'pages/isg.html')
    basePage: 'pages/isg.html',
    // Whether we're in the ISG section
    isISGSection: true,
    // Base path for ISG files
    isgBasePath: 'pages/isg'
  },

  /**
   * Calculate the relative path back to the website root
   * Examples with new structure:
   * - /index.html → '.'
   * - /pages/isg.html → '..'
   * - /pages/isg/blog.html → '../..'  
   * - /pages/isg/performance/planning-scheduling.html → '../../..'
   * - /pages/isg/blog/article.html → '../../..'
   */
  calculateRootPath: function() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    
    // Remove the filename (last segment if it contains a dot)
    let segments = [...pathSegments];
    if (segments.length > 0 && segments[segments.length - 1].includes('.')) {
      segments.pop();
    }
    
    // Check if we're on the root index.html
    const currentFile = pathSegments[pathSegments.length - 1];
    if (currentFile === 'index.html' || segments.length === 0) {
      return '.';
    }
    
    // Calculate levels from root based on directory depth
    const levelsFromRoot = segments.length;
    return levelsFromRoot === 0 ? '.' : '../'.repeat(levelsFromRoot);
  },

  /**
   * Calculate the relative path back to the ISG section root (pages/isg/)
   * Examples:
   * - /pages/isg.html → '.'
   * - /pages/isg/blog.html → '.'  
   * - /pages/isg/performance/planning-scheduling.html → '..'
   * - /pages/isg/blog/article.html → '..'
   */
  calculateISGRootPath: function() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    
    // Remove the filename (last segment if it contains a dot)
    let segments = [...pathSegments];
    if (segments.length > 0 && segments[segments.length - 1].includes('.')) {
      segments.pop();
    }
    
    // Find the ISG base directory index
    const pagesIndex = segments.findIndex(segment => segment === 'pages');
    const isgIndex = segments.findIndex(segment => segment === 'isg');
    
    if (pagesIndex >= 0 && isgIndex >= 0) {
      // We're in the ISG structure: count levels after /pages/isg/
      const levelsAfterISG = segments.length - isgIndex - 1;
      return levelsAfterISG === 0 ? '.' : '../'.repeat(levelsAfterISG);
    }
    
    // If not in ISG structure, assume we need to navigate to pages/isg/
    return './pages/isg';
  },

  /**
   * Resolve a relative path from the current location to the website root
   * @param {string} relativePath - Path relative to website root (e.g., 'pages/isg.html', 'images/logo.svg')
   * @returns {string} - Correct path from current location
   */
  resolveFromRoot: function(relativePath) {
    const rootPath = this.calculateRootPath();
    if (rootPath === '.') {
      return relativePath;
    }
    // Remove trailing slash from rootPath to avoid double slashes
    const cleanRootPath = rootPath.endsWith('/') ? rootPath.slice(0, -1) : rootPath;
    return `${cleanRootPath}/${relativePath}`;
  },

  /**
   * Resolve a relative path from the current location to the ISG section root
   * @param {string} relativePath - Path relative to ISG root (e.g., 'blog.html', 'performance/planning-scheduling.html')
   * @returns {string} - Correct path from current location
   */
  resolveFromISGRoot: function(relativePath) {
    const isgRootPath = this.calculateISGRootPath();
    if (isgRootPath === '.') {
      return relativePath;
    }
    const cleanISGRootPath = isgRootPath.endsWith('/') ? isgRootPath.slice(0, -1) : isgRootPath;
    return `${cleanISGRootPath}/${relativePath}`;
  },

  /**
   * Get the correct path to the home page from current location
   * @returns {string} - Path to index.html from current location
   */
  getHomePath: function() {
    const rootPath = this.calculateRootPath();
    if (rootPath === '.') {
      return 'index.html';
    }
    return `${rootPath}/index.html`;
  },

  /**
   * Get the correct path to the ISG home page from current location
   * @returns {string} - Path to pages/isg.html from current location
   */
  getISGHomePath: function() {
    const rootPath = this.calculateRootPath();
    if (rootPath === '.') {
      return 'pages/isg.html';
    }
    return `${rootPath}/pages/isg.html`;
  },

  /**
   * Update all links in a container to use correct relative paths
   * @param {Element} container - Container element with links to update
   * @param {Array} excludeSelectors - CSS selectors of links to exclude
   */
  updateLinksInContainer: function(container, excludeSelectors = []) {
    if (!container) return;
    
    const links = container.querySelectorAll('a[href]');
    
    links.forEach(link => {
      // Skip if link matches any exclude selector
      if (excludeSelectors.some(selector => link.matches(selector))) {
        return;
      }
      
      const href = link.getAttribute('href');
      
      // Skip external links, special protocols, placeholder links, and links with onclick
      if (!href || 
          href.startsWith('http') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') || 
          href === '#' || 
          link.hasAttribute('onclick')) {
        return;
      }
      
      // Handle special case for home links
      if (href === 'index.html' || href === '/') {
        link.href = this.getHomePath();
        console.log(`PathUtils: Updated home link from "${href}" to: ${link.href}`);
        return;
      }
      
      // Handle ISG home links
      if (href === 'pages/isg.html' || href === 'isg.html') {
        link.href = this.getISGHomePath();
        console.log(`PathUtils: Updated ISG home link from "${href}" to: ${link.href}`);
        return;
      }
      
      // Update other relative links based on the root path
      if (!href.startsWith('/')) {
        // Relative link - resolve from current location
        const newPath = this.resolveFromRoot(href);
        link.href = newPath;
        console.log(`PathUtils: Updated relative link from "${href}" to "${newPath}"`);
      } else {
        // Absolute link - make relative to current location
        const relativePath = href.startsWith('/') ? href.substring(1) : href;
        const newPath = this.resolveFromRoot(relativePath);
        link.href = newPath;
        console.log(`PathUtils: Updated absolute link from "${href}" to "${newPath}"`);
      }
    });
  },

  /**
   * Update an image src to use correct relative path
   * @param {Element} img - Image element to update
   * @param {string} originalSrc - Original src relative to website root
   */
  updateImageSrc: function(img, originalSrc) {
    if (!img) return;
    
    const newSrc = this.resolveFromRoot(originalSrc);
    img.src = newSrc;
    
    console.log(`PathUtils: Updated image src from "${originalSrc}" to "${newSrc}"`);
  },

  /**
   * Initialize path resolution for a component
   * Call this from component scripts to automatically fix paths
   * @param {Object} options - Configuration options
   */
  initializeComponent: function(options = {}) {
    const {
      containerId,
      logoId,
      logoSrc,
      excludeLinks = []
    } = options;
    
    console.log(`PathUtils: Initializing component with website root path: ${this.calculateRootPath()}`);
    console.log(`PathUtils: ISG root path: ${this.calculateISGRootPath()}`);
    console.log(`PathUtils: Current URL: ${window.location.pathname}`);
    console.log(`PathUtils: Home path: ${this.getHomePath()}`);
    console.log(`PathUtils: ISG Home path: ${this.getISGHomePath()}`);
    
    // Update logo if specified
    if (logoId && logoSrc) {
      const logo = document.getElementById(logoId);
      this.updateImageSrc(logo, logoSrc);
    }
    
    // Update links in container if specified
    if (containerId) {
      const container = document.getElementById(containerId);
      this.updateLinksInContainer(container, excludeLinks);
    }
  },

  /**
   * Debug function to log current path information
   */
  debugPaths: function() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    
    console.group('PathUtils Debug Info - New Folder Structure');
    console.log('Current URL:', window.location.href);
    console.log('Current pathname:', currentPath);
    console.log('Website root path:', this.calculateRootPath());
    console.log('ISG root path:', this.calculateISGRootPath());
    console.log('Home path:', this.getHomePath());
    console.log('ISG Home path:', this.getISGHomePath());
    console.log('Example resolved paths from root:');
    console.log('  pages/isg.html →', this.resolveFromRoot('pages/isg.html'));
    console.log('  pages/isg/blog.html →', this.resolveFromRoot('pages/isg/blog.html'));
    console.log('  images/logo.svg →', this.resolveFromRoot('images/logo.svg'));
    console.log('Example resolved paths from ISG root:');
    console.log('  blog.html →', this.resolveFromISGRoot('blog.html'));
    console.log('  performance/planning-scheduling.html →', this.resolveFromISGRoot('performance/planning-scheduling.html'));
    console.groupEnd();
  }
};

// Auto-initialize for components that are loaded dynamically
if (typeof window !== 'undefined') {
  // Expose globally for use in component scripts
  window.PathUtils = window.PathUtils;
} 