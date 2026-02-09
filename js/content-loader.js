document.addEventListener("DOMContentLoaded", function() {
    
    // Determine which page we are on
    const processContainer = document.getElementById("process-dynamic-container");
    const servicesContainer = document.getElementById("services-dynamic-container");
    const aboutContainer = document.getElementById("about-dynamic-container");

    if (!processContainer && !servicesContainer && !aboutContainer) return;

    fetch('content-data.json')
        .then(response => response.json())
        .then(data => {
            
            // --- LOAD PROCESS PAGE ---
            if (processContainer) {
                renderHero(data.process.hero);
                renderIntro(data.process.intro, processContainer);
                
                let html = '<div class="content-section">';
                data.process.steps.forEach((step, index) => {
                    const swapClass = (index % 2 !== 0) ? 'swap-desktop' : '';
                    const aosDir = (index % 2 !== 0) ? 'fade-left' : 'fade-right';
                    
                    html += `
                        <div class="grid-2 ${swapClass}" style="margin-bottom: 100px;" data-aos="${aosDir}">
                            <div>
                                <h1 style="color:#C5A059; font-size:4rem; margin-bottom: 0;">${step.id}</h1>
                                <h2 style="font-family: 'Cinzel', serif; margin-bottom: 20px;">${step.title}</h2>
                                <p>${step.desc}</p>
                            </div>
                            <div class="image-wrapper">
                                <img src="${step.image}" alt="${step.title}" style="width:100%; height:400px; object-fit:cover; border:1px solid #C5A059;">
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
                processContainer.innerHTML += html;
            }

            // --- LOAD SERVICES PAGE (UPDATED WITH TIERS) ---
            if (servicesContainer) {
                renderHero(data.services.hero);
                
                // 1. List of Services
                let html = '<div class="content-section"><div class="grid-2" style="max-width:1200px; margin:0 auto; gap:30px;">';
                data.services.list.forEach(service => {
                    html += `
                        <div class="card" data-aos="zoom-in" style="margin:0; min-height:350px;">
                            <i class="fas ${service.icon}" style="font-size:3rem; color:#C5A059; margin-bottom:20px;"></i>
                            <h2>${service.title}</h2>
                            <div class="card-divider"></div>
                            <p>${service.desc}</p>
                        </div>
                    `;
                });
                html += '</div></div>';

                // 2. The Budget Tiers Section (Moved from Materials)
                html += `
                    <div class="content-section" style="background:#0a0a0a; padding-top:50px;">
                        <div style="text-align:center; margin-bottom:50px;" data-aos="fade-up">
                            <h2 style="font-size:2.5rem;">${data.services.tiers_title}</h2>
                            <p style="color:#8C6E42;">${data.services.tiers_subtitle}</p>
                        </div>
                        <div class="grid-2" style="max-width:1200px; margin:0 auto; gap:30px; align-items:start;">
                `;

                data.services.tiers.forEach(tier => {
                    html += `
                        <div class="card" data-aos="fade-up" style="margin:0; text-align:left; border: 1px solid #333;">
                            <h3 style="color:#C5A059; font-family:'Cinzel'; font-size:1.5rem;">${tier.title}</h3>
                            <span style="font-size:0.9rem; color:#666; display:block; margin-bottom:15px;">${tier.subtitle}</span>
                            <p style="font-size:0.95rem;">${tier.desc}</p>
                            <div style="margin-top:20px; border-top:1px solid #333; padding-top:15px;">
                                <strong style="color:#E6DCCA;">We use:</strong>
                                <ul style="margin-top:10px; padding-left:20px; color:#999;">
                                    ${tier.items.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                });

                html += '</div></div>';
                servicesContainer.innerHTML = html;
            }

            // --- LOAD ABOUT PAGE ---
            if (aboutContainer) {
                renderHero(data.about.hero);
                aboutContainer.innerHTML = `
                    <div class="content-section" style="text-align:center; max-width:800px; margin:0 auto;">
                        <h2 data-aos="fade-up">Our Story</h2>
                        <div class="card-divider"></div>
                        <p data-aos="fade-up" style="font-size:1.2rem;">${data.about.story}</p>
                        
                        <div class="grid-2" style="margin-top:50px; display:flex; justify-content:center; gap:50px;">
                            ${data.about.stats.map(stat => `
                                <div style="text-align:center;">
                                    <h1 style="font-size:3rem; margin:0;">${stat.num}</h1>
                                    <span style="color:#8C6E42;">${stat.label}</span>
                                </div>
                            `).join('')}
                        </div>

                        <div class="card" style="margin-top:80px;" data-aos="flip-up">
                            <h2>Philosophy</h2>
                            <p>${data.about.philosophy}</p>
                        </div>
                    </div>
                `;
            }

        })
        .catch(err => console.error("JSON Load Error:", err));

    // Helpers
    function renderHero(heroData) {
        const heroTitle = document.querySelector('.hero-text h1');
        const heroSub = document.querySelector('.hero-text p');
        if (heroTitle) heroTitle.innerText = heroData.title;
        if (heroSub) heroSub.innerText = heroData.subtitle;
    }

    function renderIntro(introLines, container) {
        let html = '<section class="content-section"><div class="story-text" style="text-align:center; margin-bottom:50px;">';
        introLines.forEach(line => {
            html += `<p class="reveal-line" style="font-size:1.5rem; color:#E6DCCA; margin-bottom:15px;">${line}</p>`;
        });
        html += '</div></section>';
        container.innerHTML += html;
    }
});
