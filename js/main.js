document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LOAD COMPONENTS ---
    
    // Load Header
    const headerElement = document.querySelector("header");
    if (headerElement) {
        fetch("pages/header.html")
            .then(response => {
                if (!response.ok) throw new Error("Header file not found");
                return response.text();
            })
            .then(data => {
                headerElement.innerHTML = data;
                highlightCurrentPage(); 
            })
            .catch(error => console.error("Error loading header:", error));
    }

    // Load Footer
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

    // Load Banner (And start Ken Burns Animation)
    const bannerContainer = document.getElementById("banner-container");
    if (bannerContainer) {
        fetch("pages/banner.html")
            .then(response => {
                if (!response.ok) throw new Error("Banner file not found");
                return response.text();
            })
            .then(data => {
                bannerContainer.innerHTML = data;
                // Start the new Zoom Animation instead of Particles
                startBannerSlider(); 
            })
            .catch(error => console.error("Error loading banner:", error));
    }

    // --- 2. GLOBAL INJECTIONS (Needle & WhatsApp) ---
    
    // Inject Floating Needle (if missing)
    let needle = document.querySelector('.floating-needle');
    if (!needle) {
        needle = document.createElement('img');
        needle.src = 'images/thread-needle.gif';
        needle.className = 'floating-needle';
        needle.alt = 'Sewing Animation';
        // Add basic styles directly to ensure visibility
        needle.style.position = 'fixed';
        needle.style.top = '20px';
        needle.style.left = '20px';
        needle.style.width = '60px';
        needle.style.zIndex = '9999';
        needle.style.pointerEvents = 'none';
        needle.style.transition = 'transform 0.1s linear';
        document.body.appendChild(needle);
    }

    // Inject WhatsApp (if missing)
    let whatsapp = document.querySelector('.whatsapp-float');
    if (!whatsapp) {
        whatsapp = document.createElement('a');
        whatsapp.href = 'https://wa.me/919307159339';
        whatsapp.className = 'whatsapp-float';
        whatsapp.target = '_blank';
        whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsapp);
    }

    // --- 3. SCROLL ANIMATION (Diagonal Needle Movement) ---
    window.addEventListener('scroll', function() {
        if (!needle) return;

        // Calculate scroll percentage
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        // Move diagonally from Top-Left to Bottom-Right
        const maxX = window.innerWidth - 80; 
        const maxY = window.innerHeight - 100;

        const moveX = scrollPercent * maxX;
        const moveY = scrollPercent * maxY;

        needle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // --- 4. PRELOADER FADE OUT ---
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

// --- HELPER: Active Menu Highlighter ---
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add('active'); // Assumes .active class in CSS
            link.style.color = "#C5A059"; 
        }
    });
}

// --- NEW FUNCTION: KEN BURNS BANNER SLIDER ---
function startBannerSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let current = 0;
    const intervalTime = 7000; // 7 seconds per slide

    setInterval(() => {
        // Remove active class from current
        slides[current].classList.remove('active');
        
        // Move to next
        current = (current + 1) % slides.length;
        
        // Add active class to next (triggers CSS zoom)
        slides[current].classList.add('active');
    }, intervalTime);
}

// --- MAGNETIC BUTTON EFFECT ---
// Applies to any element with .lux-btn class (loaded dynamically or static)
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

/* ============================
   CUSTOM CURSOR LOGIC
   ============================ */
// Only run on desktop (width > 768px) to prevent mobile issues
if (window.innerWidth > 768) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    if (cursorDot && cursorCircle) {
        // 1. Move Cursor
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot moves instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Circle moves with fluid delay
            cursorCircle.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 400, fill: "forwards" });
        });

        // 2. Hover Effect (Delegation for dynamic elements)
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.card') || e.target.closest('.art-image')) {
                document.body.classList.add('hovering');
            } else {
                document.body.classList.remove('hovering');
            }
        });
    }
}
