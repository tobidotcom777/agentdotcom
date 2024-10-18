// Loading Screen
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';

    // Matrix Rain Animation
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Making the canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters - taken from the unicode charset
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const fontSize = 16;
    let columns = canvas.width / fontSize; // Number of columns for the rain
    const drops = []; // An array of drops - one per column

    // Initializing the drops
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height; // Start drops at random positions
    }

    // Drawing the characters
    function drawMatrix() {
        // Clear the canvas with a transparent background to create a fade effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff99"; // Green text
        ctx.font = fontSize + "px 'Roboto Mono', monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Resetting the drop to the top randomly after it has crossed the screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Incrementing Y coordinate
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33); // Drawing every 33 milliseconds

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Recalculate columns and drops
        columns = canvas.width / fontSize;
        drops.length = 0;
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    });
});

// Navigation Background Change on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Active Link Switching
    let currentPosition = window.scrollY + 200;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach(section => {
        if (currentPosition >= section.offsetTop && currentPosition < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Back to Top Button Visibility
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
});

// Progress Bar Animation on Scroll
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    const skillsSection = document.querySelector('.skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (skillsPosition < screenPosition) {
        progressBars.forEach(bar => {
            const progressValue = bar.parentElement.parentElement.getAttribute('data-progress');
            bar.style.width = progressValue;
        });
    }
}

window.addEventListener('scroll', showProgress);

// Audio Playback on Scroll or Click

// Get the audio element
const backgroundAudio = document.getElementById('background-audio');

// Function to play audio
function playAudio() {
    // Check if audio is already playing
    if (backgroundAudio.paused) {
        backgroundAudio.play().catch(error => {
            // Handle autoplay policy errors
            console.log('Audio playback failed:', error);
        });
    }
}

// Add event listeners for scroll and click
window.addEventListener('scroll', playAudio);
window.addEventListener('click', playAudio);
