document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-button");
    const icons = document.querySelectorAll(".skill-icon");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.category;
    
            // Update active class
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
    
            icons.forEach(icon => {
                if (category === "all" || icon.dataset.category === category) {
                    icon.style.display = "block";
                } else {
                    icon.style.display = "none";
                }
            });
        });
    });
});
