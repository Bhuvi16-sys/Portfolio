/* --- Initialize Animated Background Canvas --- */
(function initAnimatedBackground() {
    const canvas = document.getElementById('animated-bg');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    window.addEventListener('resize', debounce(resizeCanvas, 200));
    
    // Animation parameters
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off walls
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.vx *= -1;
                this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.vy *= -1;
                this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 0, 85, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connecting lines
    function drawConnections() {
        const connectionDistance = 150;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    ctx.strokeStyle = `rgba(255, 0, 85, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with semi-transparent background
        ctx.fillStyle = 'rgba(18, 18, 18, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();

/* --- Initialize Animate On Scroll (AOS) --- */
AOS.init({
    duration: 1000, // global duration
    easing: 'ease-out-back',
    once: true, // Only animate once when scrolling down
    mirror: false // Don't animate again when scrolling up
});


/* --- Typed.js for Hero Section --- */
document.addEventListener('DOMContentLoaded', function() {
    new Typed('.typed-text', {
        strings: ['FULL-STACK DEVELOPER', 'UI/UX DESIGNER', 'PROJECT MANAGER', 'TECHNICAL LEADER'],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});


/* --- Smooth Scrolling for Navigation Links --- */
document.querySelectorAll('.nav-list a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
        });
        
        // Add an active class to current nav item
        document.querySelectorAll('.nav-list a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu on link click
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

/* --- Mobile Menu Toggle --- */
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}


/* --- INTERACTIVE BOT LOGIC --- */

// Simulated Knowledge Base
const botDatabase = {
    "resume": "You can download my CV from the dedicated Resume section. Just click the 'DOWNLOAD CV' button.",
    "cv": "Download my full resume in PDF format in the Resume section.",
    "projects": "I have experience with full-stack development, cloud solutions, and UI/UX design. Check the Projects section for details like my 'Cloud Sync Platform'.",
    "skills": "My core skills include React, Node.js, Python, AWS, Agile management, and UI/UX design. View the Skills section for a full list.",
    "contact": "You can reach me via email at '[Your Email]' or connect with me on LinkedIn. My social links are in the header and footer.",
    "email": "Email me directly at '[Your Email]'.",
    "location": "I am currently based in [Your City], [Your Country].",
    "who": "Hi! I'm [Your Name]'s personal bot assistant. I can answer questions about their background, skills, and projects.",
    "hi": "Hello! I'm here to help. What would you like to know about [Your Name]?",
    "hello": "Hi there! How can I assist you today?",
    "help": "I can help with information about 'resume', 'contact', 'skills', and 'projects'. Try typing one of those.",
    "thanks": "You're welcome! I'm happy to help."
};

function toggleBotChat() {
    const chatWindow = document.getElementById('bot-chat-window');
    chatWindow.classList.toggle('hidden');
}

function sendUserMessage() {
    const userInput = document.getElementById('bot-user-input');
    const messageContainer = document.getElementById('bot-messages');
    
    const text = userInput.value.trim().toLowerCase();
    
    if (text === "") return; // Don't send empty messages
    
    // 1. Append user message
    const userMessageDiv = document.createElement('p');
    userMessageDiv.classList.add('bot-message', 'user');
    userMessageDiv.textContent = text;
    messageContainer.appendChild(userMessageDiv);
    
    // 2. Process and find reply
    let botReplyText = "I'm not sure how to answer that yet. Try asking about 'resume', 'projects', 'contact', or 'skills'.";
    
    // Direct match check first
    if (botDatabase[text]) {
        botReplyText = botDatabase[text];
    } else {
        // Keyword match check
        for (const keyword in botDatabase) {
            if (text.includes(keyword)) {
                botReplyText = botDatabase[keyword];
                break;
            }
        }
    }
    
    // 3. Append bot reply
    setTimeout(() => { // Small delay to simulate thinking
        const botReplyDiv = document.createElement('p');
        botReplyDiv.classList.add('bot-message', 'bot-reply');
        botReplyDiv.textContent = botReplyText;
        messageContainer.appendChild(botReplyDiv);
        
        // Auto-scroll to bottom
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 800);
    
    userInput.value = ""; // Clear input field
}

// Enable sending message on 'Enter' key
document.getElementById('bot-user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});


/* --- Animation for Skill Bars --- */
// Skill fill width should increase when the section comes into view
const skillFillBars = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
    skillFillBars.forEach(bar => {
        // Use GPU-accelerated transform instead of animating width
        bar.style.transform = 'scaleX(0)'; // Temporarily reset to 0 scale
        
        // After reset, apply scaleX(1) to trigger transition
        setTimeout(() => {
             bar.style.transform = 'scaleX(1)';
        }, 100);
    });
};
/* --- DYNAMIC CONTACT FORM HANDLING --- */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from reloading
    
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    // 1. Show loading animation
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    
    // 2. Simulate a network request (Email being sent)
    setTimeout(() => {
        // Show Success State
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.backgroundColor = '#28a745'; // Success Green color
        btn.style.color = '#fff';
        
        // Clear the form fields
        this.reset(); 
        
        // 3. Revert button back to normal after 3.5 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = ''; // Reverts to CSS variable
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 3500);
        
    }, 2000); // 2 second simulated delay
});

// Start skills animation once AOS has finished its own animation for that section
document.addEventListener('aos:in:skills', animateSkills);

/* --- Resume Download Function --- */
function downloadResume() {
    const link = document.createElement('a');
    link.href = './Bhuvi_ats_resume.pdf';
    link.download = 'Bhuvi_ats_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}