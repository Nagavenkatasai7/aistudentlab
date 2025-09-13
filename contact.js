// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';

                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Reset form function
    window.resetForm = function() {
        const contactForm = document.getElementById('contact-form');
        const formSuccess = document.getElementById('form-success');

        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        contactForm.reset();
    };

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');

        // Initially hide answers
        answer.style.display = 'none';
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.3s ease';

        question.style.cursor = 'pointer';
        question.style.userSelect = 'none';

        // Add click event
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('p');
                const otherQuestion = otherItem.querySelector('h3');

                otherAnswer.style.display = 'none';
                otherAnswer.style.maxHeight = '0';
                otherQuestion.classList.remove('active');
            });

            // Toggle current FAQ
            if (!isOpen) {
                answer.style.display = 'block';
                answer.style.maxHeight = answer.scrollHeight + 'px';
                this.classList.add('active');
            }
        });
    });

    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-link-large');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add CSS for enhanced styling
    const style = document.createElement('style');
    style.textContent = `
        .contact-section {
            padding: 80px 0;
            background: var(--dark-bg);
        }

        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }

        .contact-info h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }

        .contact-info > p {
            font-size: 1.125rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
            line-height: 1.6;
        }

        .contact-methods {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .contact-method {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--card-bg);
            border-radius: 12px;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }

        .contact-method:hover {
            transform: translateX(5px);
            border-color: var(--primary-color);
        }

        .method-icon {
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.25rem;
            flex-shrink: 0;
        }

        .method-content h3 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.25rem;
        }

        .method-content p {
            color: var(--text-secondary);
            margin-bottom: 0.25rem;
        }

        .method-content small {
            color: var(--text-muted);
            font-size: 0.75rem;
        }

        .availability {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }

        .availability h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }

        .availability-status {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #10b981;
            animation: pulse 2s infinite;
        }

        .availability-status span {
            color: var(--text-primary);
            font-weight: 500;
        }

        .availability p {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }

        .availability ul {
            list-style: none;
            padding: 0;
        }

        .availability li {
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .contact-form-container {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }

        .contact-form-container h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 1.5rem;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--dark-bg);
            color: var(--text-primary);
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-weight: normal;
            margin-bottom: 0;
        }

        .checkbox-label input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: var(--primary-color);
        }

        .submit-btn {
            width: 100%;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
            background: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .form-success {
            text-align: center;
            padding: 2rem;
        }

        .success-icon {
            font-size: 3rem;
            color: #10b981;
            margin-bottom: 1rem;
        }

        .form-success h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }

        .form-success p {
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }

        .success-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .success-btn:hover {
            background: var(--primary-color);
            transform: translateY(-2px);
        }

        .faq-section {
            padding: 80px 0;
            background: var(--card-bg);
        }

        .faq-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
        }

        .faq-item {
            background: var(--dark-bg);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }

        .faq-item h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.75rem;
            cursor: pointer;
            user-select: none;
            transition: color 0.3s ease;
        }

        .faq-item h3:hover {
            color: var(--primary-color);
        }

        .faq-item h3.active {
            color: var(--primary-color);
        }

        .faq-item p {
            color: var(--text-secondary);
            line-height: 1.6;
        }

        .social-proof {
            padding: 80px 0;
            background: linear-gradient(135deg, var(--dark-bg) 0%, #1e1b4b 100%);
            text-align: center;
        }

        .social-stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin: 3rem 0;
            flex-wrap: wrap;
        }

        .social-stats .stat {
            text-align: center;
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            margin: 0 auto 1rem;
        }

        .social-stats .stat-number {
            display: block;
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
        }

        .social-stats .stat-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .social-link-large {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .social-link-large:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }

        @media (max-width: 768px) {
            .contact-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .form-row {
                grid-template-columns: 1fr;
            }

            .faq-grid {
                grid-template-columns: 1fr;
            }

            .social-stats {
                gap: 2rem;
            }

            .social-links {
                flex-direction: column;
                align-items: center;
            }

            .social-link-large {
                width: 100%;
                max-width: 300px;
                justify-content: center;
            }

            .contact-info h2 {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .contact-method {
                flex-direction: column;
                text-align: center;
                gap: 0.75rem;
            }

            .availability {
                padding: 1.5rem;
            }

            .contact-form-container {
                padding: 1.5rem;
            }

            .faq-item {
                padding: 1.5rem;
            }

            .social-stats {
                gap: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe various elements
    const animateElements = document.querySelectorAll('.contact-method, .faq-item, .social-link-large');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add fade-in animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
            transform: translateY(30px);
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
});
