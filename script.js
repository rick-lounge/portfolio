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
