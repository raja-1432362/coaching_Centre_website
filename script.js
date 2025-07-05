// Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const mainNav = document.getElementById('mainNav');
        
        mobileMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenu.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Form Submission
        const admissionForm = document.getElementById('admissionForm');
        
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const course = document.getElementById('course').value;
            const mode = document.getElementById('mode').value;
            
            if (!name || !phone || !email || !course || !mode) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!/^\d{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }
            
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for your application! We will contact you shortly.');
            admissionForm.reset();
        });
        
        // Countdown Timer
        function updateCountdown() {
            const now = new Date();
            const nextBatch = new Date(now);
            nextBatch.setDate(now.getDate() + 15);
            nextBatch.setHours(9, 0, 0, 0); // Set to 9:00 AM
            
            const diff = nextBatch - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initialize countdown and update every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    mainNav.classList.remove('active');
                    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // Simple typewriter effect
        const typewriterElement = document.querySelector('.typewriter');
        const texts = ["IITs and AIIMS", "Medical Colleges", "Engineering Colleges", "Your Dreams"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 100;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typewriter effect
        setTimeout(type, 1000);
        
        // Course filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                courseCards.forEach(card => {
                    if (filter === 'all' || card.dataset.course === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Testimonial slider
        const testimonialTrack = document.getElementById('testimonialTrack');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            
            currentTestimonial = index;
        }
        
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', () => {
                showTestimonial(parseInt(dot.dataset.index));
            });
        });
        
        // Auto slide testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
            showTestimonial(currentTestimonial);
        }, 7000);
        
        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        // Scroll animation
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial active state for mobile menu icon
            mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        });