document.addEventListener("DOMContentLoaded", function() {
    // Function to show different sections and toggle background based on section
    function showSection(section) {
        const sections = document.querySelectorAll(".section");
        sections.forEach(sec => sec.style.display = "none");

        // Display only the selected section
        const selectedSection = document.getElementById(section);
        if (selectedSection) selectedSection.style.display = "block";

        // Change background for ART section
        if (section === "ART") {
            document.getElementById("video-background").style.display = "none";
            document.getElementById("background-image").style.display = "none";
            document.body.style.backgroundColor = "#C8D9ED";
        } else {
            document.getElementById("video-background").style.display = "block";
            document.getElementById("background-image").style.display = "block";
            document.body.style.backgroundColor = "#1A1A1A";
        }
    }

    // Event listeners for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetSection = this.getAttribute("href").substring(1);
            showSection(targetSection);
        });
    });

    // Add event listeners for video hover/click functionality in ART section
    const videoItems = document.querySelectorAll(".grid-item");
    videoItems.forEach(item => {
        const video = item.querySelector("video");
        const link = item.getAttribute("data-link");

        // Autoplay on hover for desktop
        item.addEventListener("mouseenter", () => {
            video.src = item.getAttribute("data-video");
            video.play();
        });
        item.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0; // Reset to beginning on mouse leave
        });

        // Autoplay on click and navigate on second click for mobile
        let clickCount = 0;
        item.addEventListener("click", () => {
            clickCount++;
            video.src = item.getAttribute("data-video");

            if (clickCount === 1) {
                video.play();
            } else if (clickCount === 2) {
                window.location.href = link;
                clickCount = 0; // Reset click count after navigation
            }
        });
    });

    // Set the default section to display
    showSection("home");
});
