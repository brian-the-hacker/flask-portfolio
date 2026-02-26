const animations = {
    init() {
        this.setupScrollAnimations();
    },

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.expertise-card, .project-card').forEach(el => {
            observer.observe(el);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    animations.init();
});
