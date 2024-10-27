// Toggle Content Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
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
window.addEventListener('load', toggleBackground);

// Video hover functionality
document.querySelectorAll('.grid-item video').forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
    });
    video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0;
    });
});
