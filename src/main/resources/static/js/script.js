// Typing Effect for Programming Languages
const languages = ['Java', 'Python', 'JavaScript', 'C/C++','Kotlin', 'HTML/CSS', 'SQL'];
let langIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeLanguage() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const currentLang = languages[langIndex];

    if (isDeleting) {
        typingElement.textContent = currentLang.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typingElement.textContent = currentLang.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentLang.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        langIndex = (langIndex + 1) % languages.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeLanguage, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeLanguage, 1000);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Project Video Switcher with Improved Description Formatting
function switchProjectVideo(projectCard) {
    const videoUrl = projectCard.getAttribute('data-video-url');
    const longDescription = projectCard.getAttribute('data-long-description');
    const title = projectCard.getAttribute('data-title');
    const description = projectCard.getAttribute('data-description');

    const videoElement = document.getElementById('projectVideo');
    const videoSource = videoElement.querySelector('source');

    // Remove active class from all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('active');
    });

    // Add active class to clicked card
    projectCard.classList.add('active');

    // Update video source
    if (videoUrl && videoSource) {
        videoSource.src = videoUrl;
        videoElement.load();
    }

    // Update title
    document.getElementById('projectTitleMain').textContent = title;
    document.getElementById('projectOverview').textContent = description;

    // Format and update long description
    const descriptionContainer = document.getElementById('projectLongDescription');
    if (longDescription) {
        const formattedDescription = formatLongDescription(longDescription);
        descriptionContainer.innerHTML = formattedDescription;
    }

    // Scroll to video section smoothly
    const videoSection = document.querySelector('.video-demo-section');
    if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Format long description to HTML with proper structure
function formatLongDescription(text) {
    if (!text) return '';

    // Split by double newlines to separate sections
    const sections = text.split('\n\n');
    let html = '';

    sections.forEach(section => {
        const lines = section.trim().split('\n');

        if (lines.length === 0) return;

        // Check if it's a heading (starts with "For " or similar patterns)
        const firstLine = lines[0].trim();
        if (firstLine.startsWith('For ') || firstLine.length < 50 && !firstLine.includes(':')) {
            html += `<h4>${firstLine}</h4><ul>`;

            // Process remaining lines as list items
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    html += `<li>${line}</li>`;
                }
            }
            html += '</ul>';
        } else {
            // Regular paragraph or list
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                    html += `<li>${trimmedLine}</li>`;
                }
            });
        }
    });

    return html;
}
// Auto-format description on page load
window.addEventListener('DOMContentLoaded', function() {
    const descContainer = document.getElementById('projectLongDescription');
    if (descContainer) {
        const rawText = descContainer.textContent;
        if (rawText && rawText.trim()) {
            descContainer.innerHTML = formatLongDescription(rawText);
        }
    }
});