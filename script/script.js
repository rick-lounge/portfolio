document.addEventListener("DOMContentLoaded", () => {

    const siteHeader = document.querySelector(".site-header");

    // --- FIX: Manage mobile header height for background visibility ---
    const manageHeaderHeight = () => {
        if (siteHeader) {
            if (window.innerWidth < 1024) {
                // On mobile, set a fixed height so the background is visible.
                siteHeader.style.height = '5.5rem';
            } else {
                // On desktop, remove the inline style to revert to the CSS definition.
                siteHeader.style.height = '';
            }
        }
    };

    // Run on initial load and on window resize
    manageHeaderHeight();
    window.addEventListener('resize', manageHeaderHeight);


    // --- Skills Tab Filtering ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const skillsGrid = document.getElementById('skills-grid');
    const allSkillItems = document.querySelectorAll('.skill-item');

    if (tabButtons.length && skillsGrid && allSkillItems.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

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
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            if (header && content) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                            otherItem.querySelector('.accordion-content').style.maxHeight = null;
                        }
                    });

                    if (isActive) {
                        item.classList.remove('active');
                        header.setAttribute('aria-expanded', 'false');
                        content.style.maxHeight = null;
                    } else {
                        item.classList.add('active');
                        header.setAttribute('aria-expanded', 'true');
                        content.style.maxHeight = content.scrollHeight + 'px';
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

    // --- Custom Cursor Follower ---
    const follower = document.querySelector('.cursor-follower');

    if (follower && !('ontouchstart' in window)) {
        window.addEventListener('mousemove', e => {
            follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
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