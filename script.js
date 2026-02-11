document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Prepare hamburger animation
        hamburger.classList.toggle('active');
        // Toggle Nav
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple fade-in animation for elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // You can add a .fade-in class in CSS if you want more scroll animations
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-card').forEach(el => {
        observer.observe(el);
    });

    // Handle Contact Form Submission with EmailJS
    emailjs.init("NoqQ0uNP0Yc2Xngur");

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get field values
            const name = document.getElementById("from_name").value.trim();
            const email = document.getElementById("email_id").value.trim();
            const message = document.getElementById("message").value.trim();

            // Email RegEx
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
            // Name RegEX
            const nameRegex = /^[A-Za-z\s]+$/;

            // Validations
            if (name === "") {
                alert("❌ Name cannot be empty.");
                return;
            }
            if (!nameRegex.test(name)) {
                alert("❌ Name must contain only letters A–Z and no numbers.");
                return;
            }
            if (!emailRegex.test(email)) {
                alert("❌ Please enter a valid email address.");
                return;
            }
            if (message === "") {
                alert("❌ Message cannot be empty.");
                return;
            }

            // Send with EmailJS
            emailjs.sendForm("service_3q00g5l", "template_bwt4f92", this)
                .then(() => {
                    alert("✅ Message sent successfully!");
                    contactForm.reset();
                }, (error) => {
                    alert("❌ Failed to send message.");
                    console.error("EmailJS Error:", error);
                });
        });
    }
});
