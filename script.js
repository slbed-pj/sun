// Toggle Content Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    // Stop all videos in the video grid when navigating away
    if (sectionId !== 'videoGrid') {
        document.querySelectorAll('.grid-item video').forEach(video => {
            video.pause();
            video.currentTime = 0; // Reset to the beginning
        });
    }
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

// Handle hover to play video and click to go to link
document.querySelectorAll('.grid-item').forEach(item => {
    const video = item.querySelector('video');
    const link = item.dataset.link;

    item.addEventListener('mouseenter', () => {
        video.play();
    });

    item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Reset to the beginning
    });

    item.addEventListener('click', () => {
        window.open(link, '_blank'); // Open the video link in a new tab
    });
});

window.addEventListener('resize', toggleBackground);
window.addEventListener('load', toggleBackground);
