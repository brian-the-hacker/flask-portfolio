const app = {
    init() {
        this.handlePageLoad();
        this.addScrollIndicator();
        this.addKeyboardNavigation();
    },

    handlePageLoad() {
        document.body.style.opacity = '0';
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    },

    addScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (scrollIndicator) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            });
        }
    },

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');

                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

console.log('%c👋 Welcome to my Portfolio!', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #a0a0a0;');
console.log('%cReady to integrate with Flask backend', 'font-size: 14px; color: #00d9ff;');
