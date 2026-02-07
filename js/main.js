// js/main.js
document.addEventListener("DOMContentLoaded", function() {
    
    // Fetch Header from the 'pages' folder
    fetch("pages/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
        });

    // Fetch Footer from the 'pages' folder
    fetch("pages/footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
});
