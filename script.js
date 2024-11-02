// Toggle Content Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    
    // Update the URL hash
    window.location.hash = sectionId;

    // Adjust video background visibility
    toggleBackground();
}

// Show video on desktop, image on mobile
function toggleBackground() {
    const videoBackground = document.getElementById('video-background');
    const imageBackground = document.getElementById('background-image');

    const artSection = document.getElementById('ART');
    if (window.innerWidth <= 768) { // Mobile screen
        videoBackground.style.display = 'none';
        imageBackground.style.display = 'block';
    } else { // Desktop
        if (artSection.style.display === 'block') {
            videoBackground.style.display = 'none'; // Hide video for ART section
        } else {
            videoBackground.style.display = 'block'; // Show video for other sections
        }
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

    // Set the video poster attribute
    video.setAttribute('poster', videoSource.replace('.mp4', '-poster.jpg')); // Adjust as necessary for your image naming

    // Create an image element for mobile display
    const img = document.createElement('img');
    img.src = videoSource.replace('.mp4', '-poster.jpg'); // Adjust according to your file naming
    img.alt = 'Video Thumbnail'; // Add alt text for accessibility
    item.appendChild(img); // Append image to the grid item

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

    // Pause the video on mobile
    video.addEventListener('loadeddata', () => {
        if (window.innerWidth <= 768) {
            video.pause(); // Pause the video
            video.currentTime = 0; // Show the first frame
        }
    });

    // Mobile interaction: click to navigate
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Mobile
            window.location.href = link; // Navigate to the specific video
        }
    });
});
