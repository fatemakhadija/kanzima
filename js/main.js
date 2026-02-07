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
/* js/particles-config.js */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#C5A059" /* Kanzima Gold */
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#C5A059",
      "opacity": 0.2, /* Very subtle lines */
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2, /* Slow floating speed */
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse" /* Particles move away from mouse */
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "repulse": {
        "distance": 100,
        "duration": 0.4
      }
    }
  },
  "retina_detect": true
});
