const typingAnimation = {
    element: document.getElementById('typing-code'),
    text: `class Developer {
  constructor() {
    this.name = "IT Developer";
    this.skills = [
      "JavaScript",
      "Python",
      "Rust",
      "Machine Learning"
    ];
  }

  code() {
    return "Intelligent Systems";
  }

  learn() {
    while(true) {
      this.expandKnowledge();
      this.buildSomethingNew();
    }
  }
}

const dev = new Developer();
dev.learn();`,
    currentIndex: 0,
    speed: 30,

    init() {
        if (!this.element) return;
        this.type();
    },

    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
};

const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typingAnimation.init();
            typingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const codeWindow = document.querySelector('.code-window');
if (codeWindow) {
    typingObserver.observe(codeWindow);
}
