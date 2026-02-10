document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LOAD HEADER ---
    const headerElement = document.querySelector("header");
    if (headerElement) {
        fetch("pages/header.html")
            .then(res => res.text())
            .then(data => {
                headerElement.innerHTML = data;
                highlightCurrentPage(); 
            });
    }

    // --- 2. LOAD FOOTER ---
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        fetch("pages/footer.html")
            .then(res => res.text())
            .then(data => footerElement.innerHTML = data);
    }

    // --- 3. LOAD BANNER & START ANIMATIONS ---
    const bannerContainer = document.getElementById("banner-container");
    if (bannerContainer) {
        fetch("pages/banner.html")
            .then(res => res.text())
            .then(data => {
                bannerContainer.innerHTML = data;
                
                // A. Start the Zoom Slider
                startBannerSlider(); 
                
                // B. Start Particles (CRITICAL STEP)
                if (typeof startParticles === "function") {
                    startParticles();
                } else {
                    console.warn("Particles config not found.");
                }
            });
    }

    // --- 4. GLOBAL INJECTIONS (Needle & WhatsApp) ---
    injectGlobalIcons();

    // --- 5. PRELOADER FADE OUT ---
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

// --- HELPER FUNCTIONS ---

function startBannerSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let current = 0;
    const intervalTime = 7000; // 7 seconds per slide

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, intervalTime);
}

function injectGlobalIcons() {
    // Needle
    if (!document.querySelector('.floating-needle')) {
        let needle = document.createElement('img');
        needle.src = 'images/thread-needle.gif';
        needle.className = 'floating-needle';
        needle.style.position = 'fixed';
        needle.style.top = '20px';
        needle.style.left = '20px';
        needle.style.width = '60px';
        needle.style.zIndex = '9999';
        needle.style.pointerEvents = 'none';
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

    // WhatsApp
    if (!document.querySelector('.whatsapp-float')) {
        let whatsapp = document.createElement('a');
        whatsapp.href = 'https://wa.me/919307159339';
        whatsapp.className = 'whatsapp-float';
        whatsapp.target = '_blank';
        whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsapp);
    }
}

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

// --- CURSOR LOGIC ---
if (window.innerWidth > 768) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    if (cursorDot && cursorCircle) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorCircle.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 400, fill: "forwards" });
        });
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .card, .art-image')) document.body.classList.add('hovering');
            else document.body.classList.remove('hovering');
        });
    }
}
