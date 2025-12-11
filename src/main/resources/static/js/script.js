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
// --- LOGIC GAME GALLERY (CAROUSEL 3D) ---
    const carouselWrapper = document.getElementById('carousel3dWrapper');
    if (carouselWrapper) {
        const items = Array.from(carouselWrapper.querySelectorAll('.carousel-3d-item'));
        const totalItems = items.length;
        let currentIndex = 0;
        const titleElement = document.getElementById('activeGameTitle');

        // Âm thanh chuyển đổi (Sử dụng tạm âm thanh từ Tetris/FlappyBird bạn đã có)
        // Bạn có thể dùng '/sounds/sfx_wing.wav' hoặc '/sounds/sfx_point.wav' làm tiếng "bíp" khi chuyển
        const switchSound = new Audio('/sounds/sfx_point.wav');
        switchSound.volume = 0.3;

        function updateCardPositions() {
            const itemWidth = 300; // Khớp với CSS
            const gap = 150; // Khoảng cách giữa các card

            items.forEach((item, index) => {
                let offset = index - currentIndex;

                // Logic vòng lặp (Circular)
                if (offset > totalItems / 2) offset -= totalItems;
                if (offset < -totalItems / 2) offset += totalItems;

                const absOffset = Math.abs(offset);

                // Tính toán transform
                let translateX = offset * (itemWidth - 100);
                let scale = 1 - (absOffset * 0.2);
                let opacity = 1 - (absOffset * 0.3);
                let zIndex = totalItems - absOffset;
                let rotateY = offset * -25; // Xoay nhẹ để tạo cảm giác 3D

                // Chỉ hiển thị 3 item: giữa, trái, phải. Ẩn các cái xa hơn
                if (absOffset > 2) opacity = 0;

                item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`;
                item.style.zIndex = zIndex;
                item.style.opacity = opacity;

                // Cập nhật class active
                if (offset === 0) {
                    item.classList.add('active-card');
                    item.style.pointerEvents = 'auto'; // Cho phép click
                    // Cập nhật tiêu đề
                    if(titleElement) {
                        titleElement.style.opacity = '0';
                        setTimeout(() => {
                            titleElement.textContent = item.getAttribute('data-title');
                            titleElement.style.opacity = '1';
                        }, 200);
                    }
                } else {
                    item.classList.remove('active-card');
                    item.style.pointerEvents = 'none'; // Không cho click item phía sau
                }
            });
        }

        function playSwitchSound() {
            if(switchSound) {
                switchSound.currentTime = 0;
                switchSound.play().catch(e => console.log("Audio play failed interaction needed"));
            }
        }

        const prevButton = document.getElementById('carousel3dPrev');
        const nextButton = document.getElementById('carousel3dNext');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                playSwitchSound();
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCardPositions();
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                playSwitchSound();
                currentIndex = (currentIndex + 1) % totalItems;
                updateCardPositions();
            });
        }

        // Hỗ trợ phím mũi tên
        document.addEventListener('keydown', (e) => {
            // Chỉ bắt sự kiện nếu section game đang hiển thị trong viewport (đơn giản hóa)
            if (e.key === 'ArrowLeft') {
                playSwitchSound();
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCardPositions();
            } else if (e.key === 'ArrowRight') {
                playSwitchSound();
                currentIndex = (currentIndex + 1) % totalItems;
                updateCardPositions();
            }
        });

        // Init
        updateCardPositions();
    }
});
// =========================================
// WHAT CAN I DO SECTION - Animations
// =========================================

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animate numbers counting up
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 16);
    });
}

// Intersection Observer for scroll animations
const capabilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.capability-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s, transform 0.6s';
    capabilityObserver.observe(card);
});

// Animate stats when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Initialize particles on page load
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
});