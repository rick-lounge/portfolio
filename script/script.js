document.addEventListener("DOMContentLoaded", () => {
    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const loadPromise = new Promise(resolve => {
            window.addEventListener('load', resolve);
        });
        const minTimePromise = new Promise(resolve => {
            setTimeout(resolve, 2000); // Waits for 2 seconds
        });

        Promise.all([loadPromise, minTimePromise]).then(() => {
            preloader.classList.add('preloader--hidden');
        });
    }
        
    const siteHeader = document.querySelector(".site-header");

    // --- Manage mobile header height for background visibility ---
    const manageHeaderHeight = () => {
        if (siteHeader) {
            if (window.innerWidth < 1024) {
                siteHeader.style.height = '5.5rem';
            } else {
                siteHeader.style.height = '';
            }
        }
    };

    manageHeaderHeight();
    window.addEventListener('resize', manageHeaderHeight);


    // --- Skills Tab Filtering ---
    const tabsContainer = document.querySelector('.skills-tabs');
    const tabButtons = document.querySelectorAll('.tab-button');
    const skillsGrid = document.getElementById('skills-grid');
    const allSkillItems = document.querySelectorAll('.skill-item');

    // --- Function to move the slider ---
    const moveSlider = () => {
        const activeButton = document.querySelector('.tab-button.active');
        if (tabsContainer && activeButton) {
            const leftPosition = activeButton.offsetLeft;
            const width = activeButton.offsetWidth;
            tabsContainer.style.setProperty('--slider-left', `${leftPosition}px`);
            tabsContainer.style.setProperty('--slider-width', `${width}px`);
        }
    };

    if (tabButtons.length && skillsGrid && allSkillItems.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Move slider to the new active button
                moveSlider();

                const category = button.getAttribute('data-category');
                skillsGrid.classList.add('fade-out');

                setTimeout(() => {
                    allSkillItems.forEach(item => {
                        const isMatch = category === 'all' || item.dataset.category === category;
                        item.style.display = isMatch ? 'flex' : 'none';
                    });
                    skillsGrid.classList.remove('fade-out');
                    skillsGrid.classList.add('fade-in');
                    setTimeout(() => {
                        skillsGrid.classList.remove('fade-in');
                    }, 400); 
                }, 300);
            });
        });
        
        // Set initial position of the slider on page load
        moveSlider();
        // Recalculate slider position on window resize
        window.addEventListener('resize', moveSlider);
    }


    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(section => observer.observe(section));
    }

    // --- Mobile overlay menu (open/close) ---
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');
    const htmlEl = document.documentElement;
    const body = document.body;
    const mobileNavLinks = document.querySelectorAll('.main-nav .nav-links a');

    if (hamburger && mainNav && body) {
        const closeMenu = () => {
            hamburger.classList.remove('is-active');
            mainNav.classList.remove('active');
            htmlEl.classList.remove('no-scroll');
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        };

        const openMenu = () => {
            hamburger.classList.add('is-active');
            mainNav.classList.add('active');
            htmlEl.classList.add('no-scroll');
            body.classList.add('no-scroll');
            hamburger.setAttribute('aria-expanded', 'true');
        };

        hamburger.addEventListener('click', () => {
            const isActive = mainNav.classList.contains('active');
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (mobileNavLinks.length) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMenu();
                });
            });
        }
    }


    // --- Project Accordion Functionality ---
const accordionItems = document.querySelectorAll('.accordion-item');

if (accordionItems.length) {
    // Initially disable focus on all links within closed accordions
    accordionItems.forEach(item => {
        if (!item.classList.contains('active')) {
            item.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
        }
    });

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        if (header && content) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items and disable their focus
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherHeader = otherItem.querySelector('.accordion-header');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        otherHeader.setAttribute('aria-expanded', 'false');
                        otherContent.setAttribute('aria-hidden', 'true');
                        otherContent.style.maxHeight = null;
                        otherContent.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
                    }
                });

                // Toggle the clicked item
                if (isActive) {
                    item.classList.remove('active');
                    header.setAttribute('aria-expanded', 'false');
                    content.setAttribute('aria-hidden', 'true');
                    content.style.maxHeight = null;
                    content.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1')); // Disable focus
                } else {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                    content.setAttribute('aria-hidden', 'false');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.querySelectorAll('a, button').forEach(el => el.removeAttribute('tabindex')); // Enable focus
                }
            });
        }
    });
}

    // --- Project Image Preview on Hover ---
    const projectPreview = document.getElementById('project-preview');
    const projectPreviewImage = projectPreview ? projectPreview.querySelector('img') : null;

    if (projectPreview && projectPreviewImage && accordionItems.length) {
        if (window.innerWidth >= 1024) { 
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                if (header) {
                    header.addEventListener('mouseenter', (e) => {
                        const imageUrl = item.getAttribute('data-preview-image');
                        if (imageUrl) {
                            projectPreviewImage.src = imageUrl;
                            projectPreview.style.opacity = '1';
                        }
                    });

                    header.addEventListener('mouseleave', () => {
                        projectPreview.style.opacity = '0';
                    });

                    header.addEventListener('mousemove', (e) => {
                        projectPreview.style.left = `${e.clientX}px`;
                        projectPreview.style.top = `${e.clientY}px`;
                    });
                }
            });
        }
    }

// --- FINAL: Advanced Cursor with Smooth Scale and Sway Effect ---
const follower = document.querySelector('.cursor-follower');

if (follower && !('ontouchstart' in window) && window.matchMedia('(hover: hover)').matches) {
    // Position variables
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let prevFollowerX = 0;
    let prevFollowerY = 0;
    
    // Scale variables
    let currentScale = 1;
    let targetScale = 1;

    const speed = 0.1; // Controls the "lag" of the tail

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateFollower = () => {
        // Smoothly move the follower towards the mouse (lerp)
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;

        // Calculate velocity and angle for the sway effect
        const deltaX = followerX - prevFollowerX;
        const deltaY = followerY - prevFollowerY;
        prevFollowerX = followerX;
        prevFollowerY = followerY;
        const velocity = Math.min(Math.sqrt(deltaX**2 + deltaY**2) * 4, 150);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

        // Calculate the stretch factor for the sway effect
        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
        const stretch = clamp(velocity / 30, 1, 1.5);

        // Smoothly animate the scale towards the target scale (for hover)
        currentScale += (targetScale - currentScale) * speed;

        // Apply all transforms: position, rotation, sway, and hover scale
        follower.style.transform = `
            translate(${followerX - follower.offsetWidth / 2}px, ${followerY - follower.offsetHeight / 2}px) 
            rotate(${angle}deg) 
            scaleX(${stretch * currentScale}) 
            scaleY(${(2 - stretch) * currentScale})
        `;
        
        requestAnimationFrame(animateFollower);
    };

    animateFollower();

    // Handle setting the target scale on hover
    const clickableElements = document.querySelectorAll(
        'a, button, .tab-button, .accordion-header'
    );

    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            targetScale = 1.5; // Set target to expand
        });
        el.addEventListener('mouseleave', () => {
            targetScale = 1; // Set target to shrink back
        });
    });

} else if (follower) {
    follower.style.display = 'none';
}

    // --- Scroll-triggered Star Rotation ---
    const starLeft = document.getElementById('star-left');
    const starRight = document.getElementById('star-right');
    
    // Only run this on devices that aren't touch-based for performance
    if (starLeft && starRight && !('ontouchstart' in window)) {
        window.addEventListener('scroll', () => {
            // The value '2' controls the speed. Increase for slower, decrease for faster.
            const rotation = window.scrollY / 2;
            
            // Use requestAnimationFrame for smoother animation
            window.requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--scroll-rotate', rotation + 'deg');
            });
        });
    }

    // --- Hide Nav/Sidebar when Footer is in View ---
    const socialSidebar = document.querySelector(".social-sidebar");
    const footer = document.querySelector(".site-footer");
    const logo = document.querySelector(".logo");
    
    if (socialSidebar && footer && mainNav && hamburger && logo && siteHeader) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const inView = entry.isIntersecting;
                
                socialSidebar.classList.toggle("hidden", inView);
                if (window.innerWidth >= 1024) {
                    mainNav.classList.toggle("hidden", inView);
                }

                const fade = inView ? "0" : "1";
                const slide = inView ? "-20px" : "0";

                hamburger.style.opacity = fade;
                hamburger.style.transform = `translateY(${slide})`;
                hamburger.style.transition = "opacity 0.5s ease, transform 0.5s ease";

                logo.style.opacity = fade;
                logo.style.transform = `translateY(${slide})`;
                logo.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                
                if (siteHeader && window.innerWidth < 1024) {
                    siteHeader.style.opacity = fade;
                    siteHeader.style.transform = `translateY(${slide})`;
                    siteHeader.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                }
            });
        }, { threshold: 0.1 });

        observer.observe(footer);
    }
});