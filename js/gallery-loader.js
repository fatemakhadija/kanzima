document.addEventListener("DOMContentLoaded", function() {
    const galleryContainer = document.getElementById("gallery-container");

    // 1. Fetch the Data
    fetch('gallery-data.json')
        .then(response => response.json())
        .then(data => {
            let htmlContent = '';
            let displayIndex = 0; // To keep track of zig-zag layout

            data.forEach(item => {
                // 2. Check the Excel Flag (If visible is false, skip it)
                if (item.visible === false) return;

                // 3. Determine Layout (Zig-Zag)
                // If it's the 2nd, 4th, 6th item, add 'reverse-layout'
                let layoutClass = (displayIndex % 2 !== 0) ? 'reverse-layout' : '';

                // 4. Build the HTML
                htmlContent += `
                    <div class="art-piece ${item.category} ${layoutClass}" data-aos="fade-up">
                        <div class="art-image" onclick="openLightbox(this)">
                            <div class="img-frame">
                                <img src="${item.image}" alt="${item.title}">
                                <div class="shine"></div>
                            </div>
                        </div>
                        <div class="art-details">
                            <h2>${item.title}</h2>
                            <h3>${item.subtitle}</h3>
                            <p>${item.description}</p>
                            <button class="lux-btn">
                                <span class="btn-content">
                                    <span class="btn-text-primary">Inquire Price</span>
                                    <span class="btn-text-secondary" style="color:#000;">Inquire Price</span>
                                </span>
                            </button>
                        </div>
                    </div>
                `;
                
                displayIndex++; // Increment count only for visible items
            });

            // 5. Inject into Page
            galleryContainer.innerHTML = htmlContent;
        })
        .catch(error => console.error('Error loading gallery data:', error));
});
