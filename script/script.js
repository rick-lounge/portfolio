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

// Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        gsap.set(follower, {
            css: {
                left: posX,
                top: posY
            }
        });

        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        });
    }
});

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


    







