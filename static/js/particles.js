const particleSystem = {
    container: document.getElementById('particles'),
    particles: [],
    particleCount: 50,

    init() {
        if (!this.container) return;
        this.createParticles();
        this.animateParticles();
    },

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    },

    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--accent-primary)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        return particle;
    },

    animateParticles() {
        const animate = () => {
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
                if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

                p.element.style.transform = `translate(${p.x}px, ${p.y}px)`;
            });

            requestAnimationFrame(animate);
        };

        animate();
    }
};

if (window.innerWidth > 768) {
    particleSystem.init();
}
