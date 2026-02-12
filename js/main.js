document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GLOBAL INJECTIONS (Run Immediately) ---
    injectGlobalIcons();   
    injectCustomCursor();  

    // --- 2. LOAD COMPONENTS ---
    
    // Header (This loads the Menu)
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
        
        // STATIC POSITION: Center of Header (slightly to the right to avoid text)
        needle.style.position = 'fixed';
        needle.style.top = '15px'; 
        needle.style.left = '55%'; /* Pushed slightly right of center */
        needle.style.width = '50px'; 
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

    // Create if missing
    if (!dot || !circle) {
        dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);

        circle = document.createElement('div');
        circle.className = 'cursor-circle';
        document.body.appendChild(circle);
    }

    // Attach Listeners (Desktop Only)
    if (window.innerWidth > 768) {
        dot.style.display = 'block';
        circle.style.display = 'block';

        window.addEventListener('mousemove', (e) => {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            
            circle.animate({ 
                left: `${e.clientX}px`, 
                top: `${e.clientY}px` 
            }, { duration: 400, fill: "forwards" });
        });

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

// 3. Mobile Menu Logic
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }
}

// 4. Ken Burns Slider
function startBannerSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 7000);
}

// 5. Highlight Page
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add('active'); 
            link.style.color = "#C5A059"; 
        }
    });
}

// --- MAGNETIC BUTTONS ---
document.addEventListener('mousemove', function(e) {
    if (e.target.closest('.lux-btn')) {
        const btn = e.target.closest('.lux-btn');
        const rect = btn.getBoundingClientRect();
        const deltaX = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const deltaY = (e.clientY - rect.top - rect.height / 2) * 0.3;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
});
document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.lux-btn')) {
        e.target.closest('.lux-btn').style.transform = `translate(0px, 0px)`;
    }
});
