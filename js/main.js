document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GLOBAL INJECTIONS (Run Immediately) ---
    injectGlobalIcons();   
    injectCustomCursor();  

    // --- 2. LOAD COMPONENTS ---
    
    // Header
    const headerElement = document.querySelector("header");
    if (headerElement) {
        fetch("pages/header.html")
            .then(res => res.text())
            .then(data => {
                headerElement.innerHTML = data;
                highlightCurrentPage(); 
                initMobileMenu(); 
            })
            .catch(error => console.error("Error loading header:", error));
    }

    // Footer
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        fetch("pages/footer.html")
            .then(res => res.text())
            .then(data => footerElement.innerHTML = data)
            .catch(error => console.error("Error loading footer:", error));
    }

    // Custom Banner (For Contact Page)
    const customHeroContainer = document.getElementById("custom-hero-container");
    if (customHeroContainer) {
        fetch("pages/custom-banner.html")
            .then(res => res.text())
            .then(data => {
                customHeroContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading custom banner:", error));
    }

    // Home Page Banner
    const bannerContainer = document.getElementById("banner-container");
    if (bannerContainer) {
        fetch("pages/banner.html")
            .then(res => res.text())
            .then(data => {
                bannerContainer.innerHTML = data;
                startBannerSlider(); 
                if (typeof startParticles === "function") {
                    startParticles();
                }
            })
            .catch(error => console.error("Error loading home banner:", error));
    }

    // --- 3. PRELOADER ---
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", function() {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => { preloader.style.display = "none"; }, 500);
            }, 1000);
        });
    }
});

// =========================================
// HELPER FUNCTIONS
// =========================================

// 1. Inject Icons (Needle + WhatsApp) - STATIC POSITION
function injectGlobalIcons() {
    // Floating Needle
    if (!document.querySelector('.floating-needle')) {
        let needle = document.createElement('img');
        needle.src = 'images/thread-needle.gif';
        needle.className = 'floating-needle';
        needle.alt = 'Sewing Animation';
        
        // STATIC POSITION (No Scrolling Animation)
        needle.style.position = 'fixed';
        needle.style.top = '10px'; 
        needle.style.left = '50%';         // Center of header
        needle.style.transform = 'translateX(-50%)'; // Center alignment
        needle.style.width = '60px'; 
        needle.style.zIndex = '9999';
        needle.style.pointerEvents = 'none';
        
        document.body.appendChild(needle);
    }

    // WhatsApp Float
    if (!document.querySelector('.whatsapp-float')) {
        let whatsapp = document.createElement('a');
        whatsapp.href = 'https://wa.me/919307159339';
        whatsapp.className = 'whatsapp-float';
        whatsapp.target = '_blank';
        whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsapp);
    }
}

// 2. Global Custom Cursor
function injectCustomCursor() {
    let dot = document.querySelector('.cursor-dot');
    let circle = document.querySelector('.cursor-circle');

    if (!dot || !circle) {
        dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);

        circle = document.createElement('div');
        circle.className = 'cursor-circle';
        document.body.appendChild(circle);
    }

    if (window.innerWidth > 768) {
        dot.style.display =
