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

// Set mobile backgrounds from video posters
function setMobileBackgrounds() {
    if (window.innerWidth <= 768) { // Mobile only
        document.querySelectorAll('.grid-item').forEach(item => {
            const video = item.querySelector('video');
            const poster = video.getAttribute('poster');

            // Set poster image as background on mobile
            if (poster) {
                item.style.backgroundImage = `url(${poster})`;
            }
        });
    }
}

window.addEventListener('load', () => {
    toggleBackground();
    setMobileBackgrounds();
    const hash = window.location.hash.substring(1); // Remove the '#' character
    if (hash) {
        showSection(hash); // Show the section corresponding to the hash
    } else {
        showSection('home'); // Default to home section
    }
});

window.addEventListener('resize', () => {
    toggleBackground();
    setMobileBackgrounds();
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
