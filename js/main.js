document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LOAD THE HEADER ---
    const headerElement = document.querySelector("header");
    if (headerElement) {
        fetch("pages/header.html")
            .then(response => {
                if (!response.ok) throw new Error("Header file not found");
                return response.text();
            })
            .then(data => {
                headerElement.innerHTML = data;
                // Highlight the current page in the menu (Optional polish)
                highlightCurrentPage(); 
            })
            .catch(error => console.error("Error loading header:", error));
    }

    // --- 2. LOAD THE FOOTER ---
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        fetch("pages/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Footer file not found");
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
    }

    // --- 3. LOAD BANNER & START ANIMATION ---
    const bannerContainer = document.getElementById("banner-container");
    
    // Only try to load the banner if the container exists (e.g., on the Homepage)
    if (bannerContainer) {
        fetch("pages/banner.html")
            .then(response => {
                if (!response.ok) throw new Error("Banner file not found");
                return response.text();
            })
            .then(data => {
                // A. Inject the Banner HTML
                bannerContainer.innerHTML = data;
                
                // B. Initialize the Particle Animation
                // We check if the function exists first to prevent errors
                if (typeof startParticles === "function") {
                    console.log("Starting Gold Dust Animation...");
                    startParticles();
                } else {
                    console.warn("startParticles function not found. Check js/particles-config.js");
                }
            })
            .catch(error => console.error("Error loading banner:", error));
    }
});

// --- HELPER: Active Menu Highlighter ---
// This adds a gold color to the menu item of the page you are currently on
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = "#C5A059"; // Force Gold Color
            link.style.borderBottom = "1px solid #C5A059";
        }
    });
}
/* js/main.js - Add this at the bottom */

// MAGNETIC BUTTON EFFECT
const buttons = document.querySelectorAll('.lux-btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X inside button
        const y = e.clientY - rect.top;  // Mouse Y inside button
        
        // Calculate distance from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.3; // 0.3 is the magnetic strength
        const deltaY = (y - centerY) * 0.3;

        // Move the button slightly
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    // Reset when mouse leaves
    btn.addEventListener('mouseleave', function() {
        btn.style.transform = `translate(0px, 0px)`;
    });
});
