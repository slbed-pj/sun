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
