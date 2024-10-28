// Toggle Content Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    
    // Update the URL hash
    window.location.hash = sectionId;
}

// Show video on desktop, image on mobile
function toggleBackground() {
    const videoBackground = document.getElementById('video-background');
    const imageBackground = document.getElementById('background-image');

    if (window.innerWidth <= 768) { // Mobile screen
        videoBackground.style.display = 'none';
        imageBackground.style.display = 'block';
    } else { // Desktop
        videoBackground.style.display = 'block';
        imageBackground.style.display = 'none';
    }
}

window.addEventListener('resize', toggleBackground);
window.addEventListener('load', () => {
    toggleBackground();
    const hash = window.location.hash.substring(1); // Remove the '#' character
    if (hash) {
        showSection(hash); // Show the section corresponding to the hash
    } else {
        showSection('home'); // Default to home section
    }
});

// Initialize video elements and add interactivity
document.querySelectorAll('.grid-item').forEach(item => {
    const video = item.querySelector('video');
    const videoSource = item.dataset.video;
    const link = item.dataset.link;

    // Set video source
    video.src = videoSource;

    // Desktop interaction: play on hover
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) { // Desktop
            video.play();
        }
    });

    item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) { // Desktop
            video.pause();
        }
    });

    // Mobile interaction: click to play and then navigate
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Mobile
            if (video.paused) {
                video.play(); // Play video on first click
            } else {
                window.location.href = link; // Navigate on second click
            }
        } else {
            window.location.href = link; // For desktop, navigate on click
        }
    });
});
