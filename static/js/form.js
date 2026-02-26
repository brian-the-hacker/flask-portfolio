
const contactForm = {
    form: document.getElementById('contact-form'),

    init() {
        if (!this.form) return;
        this.handleSubmit();
    },

    handleSubmit() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            const submitButton = this.form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                const response = await fetch('/submit-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    this.showNotification('Message sent successfully!', 'success');
                    this.form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.log('Form data ready:', formData);
                this.showNotification('Message ready! Connect your Flask backend to /submit-contact', 'info');
                this.form.reset();
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    },

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;

        const bgColor = type === 'success' ? 'var(--accent-primary)' : 'var(--accent-secondary)';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${bgColor};
            color: var(--bg-primary);
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInFromRight 0.3s ease-out;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
};

contactForm.init();
