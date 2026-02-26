const cursor = {
    dot: document.querySelector('[data-cursor-dot]'),
    outline: document.querySelector('[data-cursor-outline]'),

    init() {
        if (!this.dot || !this.outline) return;
        this.addEventListeners();
    },

    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.updatePosition(e.clientX, e.clientY);
        });

        document.addEventListener('mouseenter', () => {
            this.show();
        });

        document.addEventListener('mouseleave', () => {
            this.hide();
        });

        const interactiveElements = document.querySelectorAll('a, button, .expertise-card, .project-card, .tech-badge');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.grow();
            });

            el.addEventListener('mouseleave', () => {
                this.shrink();
            });
        });
    },

    updatePosition(x, y) {
        this.dot.style.transform = `translate(${x}px, ${y}px)`;
        this.outline.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
    },

    show() {
        this.dot.style.opacity = '1';
        this.outline.style.opacity = '0.5';
    },

    hide() {
        this.dot.style.opacity = '0';
        this.outline.style.opacity = '0';
    },

    grow() {
        this.outline.style.width = '48px';
        this.outline.style.height = '48px';
    },

    shrink() {
        this.outline.style.width = '32px';
        this.outline.style.height = '32px';
    }
};

if (window.innerWidth > 768) {
    cursor.init();
} else {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
}
