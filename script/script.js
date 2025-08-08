const tabButtons = document.querySelectorAll('.tab-button');
const skillsGrid = document.getElementById('skills-grid');
const allItems = document.querySelectorAll('.skill-item');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');

    // Update active tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Slide out first
    skillsGrid.classList.add('fade-out');

    // After fade out transition
    setTimeout(() => {
        allItems.forEach(item => {
            const isMatch = category === 'all' || item.dataset.category === category;
            item.style.display = isMatch ? 'flex' : 'none';
        });

        // Slide back in
        skillsGrid.classList.remove('fade-out');
        skillsGrid.classList.add('fade-in');

        // Remove fade-in after animation completes to reset
        setTimeout(() => {
            skillsGrid.classList.remove('fade-in');
        }, 400); // match transition duration
        }, 300);
    });
});


// navigation menu
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 4) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.querySelector('.main-nav');
const body = document.body;

hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// When clicking a nav link (on mobile), close menu and remove no-scroll
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 1024) { 
            mainNav.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
});

// --- SLIDER FUNCTIONALITY WITH DOTS + SWIPE + BLUR ---

const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.project-slide');
const prevBtn = document.querySelector('.slider-arrow.left');
const nextBtn = document.querySelector('.slider-arrow.right');

// Create dot container and append to .projects-slider
const dotContainer = document.querySelector('.slider-dots');
dotContainer.classList.add('slider-dots');
document.querySelector('.projects-slider').appendChild(dotContainer);

// Track the current index
let currentSlide = 0;

// Create nav dots
slides.forEach((_, index) => {
	const dot = document.createElement('span');
	dot.classList.add('dot');
	if (index === 0) dot.classList.add('active');
	dot.addEventListener('click', () => {
		currentSlide = index;
		updateSlider();
	});
	dotContainer.appendChild(dot);
});

function updateSlider() {
  // Add blur to each slide temporarily
  slides.forEach(slide => slide.classList.add('motion-blur'));
  setTimeout(() => {
    slides.forEach(slide => slide.classList.remove('motion-blur'));
  }, 300);

	// Update position
	const offset = -currentSlide * 100;
	sliderTrack.style.transform = `translateX(${offset}%)`;

	// Update dots
	document.querySelectorAll('.dot').forEach((dot, i) => {
		dot.classList.toggle('active', i === currentSlide);
	});
}

prevBtn.addEventListener('click', () => {
	currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	updateSlider();
});

nextBtn.addEventListener('click', () => {
	currentSlide = (currentSlide + 1) % slides.length;
	updateSlider();
});

// Swipe support
let startX = 0;
let isDragging = false;

sliderTrack.addEventListener('mousedown', (e) => {
	isDragging = true;
	startX = e.pageX;
});

sliderTrack.addEventListener('mouseup', (e) => {
	if (!isDragging) return;
	const deltaX = e.pageX - startX;
	handleSwipe(deltaX);
	isDragging = false;
});

sliderTrack.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX;
}, { passive: true });

sliderTrack.addEventListener('touchend', (e) => {
	const deltaX = e.changedTouches[0].clientX - startX;
	handleSwipe(deltaX);
});

function handleSwipe(deltaX) {
	if (Math.abs(deltaX) > 50) {
		if (deltaX > 0) {
			currentSlide = (currentSlide - 1 + slides.length) % slides.length;
		} else {
			currentSlide = (currentSlide + 1) % slides.length;
		}
		updateSlider();
	}
}

// cursor
const follower = document.querySelector('.cursor-follower');

window.addEventListener('mousemove', e => {
  follower.style.top = `${e.clientY}px`;
  follower.style.left = `${e.clientX}px`;
});

// detect user scrolls to footer
document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.querySelector(".main-nav");
  const socialSidebar = document.querySelector(".social-sidebar");
  const footer = document.querySelector(".site-footer");
  const hamburger = document.querySelector(".hamburger");
  const logo = document.querySelector(".logo");
  const siteHeader = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const inView = footerRect.top <= windowHeight;

    // Hide elements when footer is in view
    socialSidebar.classList.toggle("hidden", inView);
    mainNav.classList.toggle("hidden", inView);

    // Fade/slide logo and hamburger
    const fade = inView ? "0" : "1";
    const slide = inView ? "-20px" : "0";

    hamburger.style.opacity = fade;
    hamburger.style.transform = `translateY(${slide})`;
    hamburger.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    logo.style.opacity = fade;
    logo.style.transform = `translateY(${slide})`;
    logo.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    // Remove site-header background on small screens
    if (siteHeader && window.innerWidth < 768) {
      siteHeader.style.background = inView ? "transparent" : "";
    } else {
      siteHeader.style.background = "";
    }
  });
});
