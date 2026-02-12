document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GLOBAL INJECTIONS (Run Immediately) ---
    injectGlobalIcons();   
    injectCustomCursor();  // <--- Now works for BOTH existing and missing cursor divs

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

    // Home Page Banner (Ken Burns)
    const bannerContainer = document.getElementById("banner-container");
    if (bannerContainer) {
        fetch("pages/banner.html")
            .then(res => res.text())
            .then(data => {
                bannerContainer.innerHTML = data;
                startBannerSlider(); 
                if (typeof startParticles === "function") {
                    startParticles();
                } else {
                    console.warn("Particles function not found.");
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

// 1. Global Custom Cursor Injection (FIXED LOGIC)
function injectCustomCursor() {
    let dot = document.querySelector('.cursor-dot');
    let circle = document.querySelector('.cursor-circle');

    // Step 1: Create elements if they don't exist
    if (!dot || !circle) {
        dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);

        circle = document.createElement('div');
        circle.className = 'cursor-circle';
        document.body.appendChild(circle);
    }

    // Step 2: ALWAYS attach listeners (whether elements were created or already existed)
    if (window.innerWidth > 768) {
        // Show them (in case they were hidden by CSS defaults)
        dot.style.display = 'block';
        circle.style.display = 'block';

        window.addEventListener('mousemove', (e) => {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            
            // Smooth follow for the circle
            circle.animate({ 
                left: `${e.clientX}px`, 
                top: `${e.clientY}px` 
            }, { duration: 400, fill: "forwards" });
        });

        // Hover effect for interactive elements
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .card, .art-image, .lux-btn')) {
                document.body.classList.add('hovering');
            } else {
                document.body.classList.remove('hovering');
            }
        });
    } else {
        // Hide on mobile
        if(dot) dot.style.display = 'none';
        if(circle) circle.style.display = 'none';
    }
}

// 2. Mobile Menu Logic
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }
}

// 3. Ken Burns Banner Slider
function startBannerSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    let current = 0;
    const intervalTime = 7000;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, intervalTime);
}

// 4. Inject Icons (Needle + WhatsApp)
function injectGlobalIcons() {
    // Floating Needle
    if (!document.querySelector('.floating-needle')) {
        let needle = document.createElement('img');
        needle.src = 'images/thread-needle.gif';
        needle.className = 'floating-needle';
        needle.alt = 'Sewing Animation';
        needle.style.position = 'fixed';
        needle.style.top = '20px';
        needle.style.left = '20px';
        needle.style.width = '60px';
        needle.style.zIndex = '9999';
        needle.style.pointerEvents = 'none';
        needle.style.transition = 'transform 0.1s linear';
        document.body.appendChild(needle);

        // Scroll Logic for Needle
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            const maxX = window.innerWidth - 80;
            const maxY = window.innerHeight - 100;
            needle.style.transform = `translate(${scrollPercent * maxX}px, ${scrollPercent * maxY}px)`;
        });
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

// 5. Highlight Active Page
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add('active'); 
            link.style.color = "#C5A059"; 
        }
    });
}

// --- MAGNETIC BUTTONS LOGIC ---
document.addEventListener('mousemove', function(e) {
    if (e.target.closest('.lux-btn')) {
        const btn = e.target.closest('.lux-btn');
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) * 0.3;
        const deltaY = (y - centerY) * 0.3;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.lux-btn')) {
        e.target.closest('.lux-btn').style.transform = `translate(0px, 0px)`;
    }
});
