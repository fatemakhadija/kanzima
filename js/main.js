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

/* =========================================
   NEEDLE ANIMATION & GLOBAL ICONS
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {

    // 1. INJECT NEEDLE (If not present)
    let needle = document.querySelector('.floating-needle');
    if (!needle) {
        needle = document.createElement('img');
        needle.src = 'images/thread-needle.gif';
        needle.className = 'floating-needle';
        needle.alt = 'Sewing Animation';
        document.body.appendChild(needle);
    }

    // 2. INJECT WHATSAPP (If not present)
    let whatsapp = document.querySelector('.whatsapp-float');
    if (!whatsapp) {
        whatsapp = document.createElement('a');
        whatsapp.href = 'https://wa.me/919307159339';
        whatsapp.className = 'whatsapp-float';
        whatsapp.target = '_blank';
        whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsapp);
    }

    // 3. SCROLL ANIMATION (Diagonal Movement)
    window.addEventListener('scroll', function() {
        if (!needle) return;

        // Calculate how far we have scrolled (0 to 1)
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        // Calculate Target Position (Diagonal Path)
        // Moves from Left (0) to Right (Screen Width - Needle Width)
        // Moves from Top (0) to Bottom (Screen Height - Needle Height)
        
        const maxX = window.innerWidth - 80; // 80px buffer
        const maxY = window.innerHeight - 100; // 100px buffer

        const moveX = scrollPercent * maxX;
        const moveY = scrollPercent * maxY;

        // Apply Movement
        needle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // 4. HEADER LOADER (Keep your existing header logic if you have it here)
    // If you don't have header logic, you can add it below.
    const header = document.querySelector('header');
    if(header && header.innerHTML.trim() === '') {
        header.innerHTML = `
            <div class="logo">
                <img src="images/logo.png" alt="Kanzima Logo" style="height: 50px;">
                <span class="logo-text">KANZIMA COUTURE</span>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="process.html">The Process</a></li>
                    <li><a href="gallery.html">Collection</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        `;
        
        // Highlight Active Link
        const currentPage = window.location.pathname.split("/").pop() || 'index.html';
        const links = document.querySelectorAll('nav a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
});

/* ============================
   CUSTOM CURSOR LOGIC
   ============================ */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// 1. Move Cursor
window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot moves instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline moves with lag (Animation)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// 2. Hover Effect (Expand on Links)
const interactiveElements = document.querySelectorAll('a, button, .card, .art-image');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });
});
