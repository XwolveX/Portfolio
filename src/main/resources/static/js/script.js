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

// // Profile Image Animation
// const profileCircle = document.querySelector('.profile-circle');
// if (profileCircle) {
//     profileCircle.addEventListener('mouseenter', function() {
//         this.style.transform = 'scale(1.05) rotate(5deg)';
//     });
//
//     profileCircle.addEventListener('mouseleave', function() {
//         this.style.transform = 'scale(1) rotate(0deg)';
//     });
// }
