// Work With Me Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const collaborationForm = document.getElementById('collaboration-form');

    if (collaborationForm) {
        collaborationForm.addEventListener('submit', function(e) {
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
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = '#10b981';

                // Reset form after success
                setTimeout(() => {
                    collaborationForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove featured class from all cards
            serviceCards.forEach(c => c.classList.remove('featured'));
            // Add featured class to clicked card
            this.classList.add('featured');

            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Service button interactions
    const serviceBtns = document.querySelectorAll('.service-btn');

    serviceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click when button is clicked

            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            const servicePrice = serviceCard.querySelector('.price').textContent;

            // Auto-fill the service in the form
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                const options = serviceSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].text.includes(serviceTitle.split(' ')[0])) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }

            // Scroll to form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add CSS for enhanced styling
    const style = document.createElement('style');
    style.textContent = `
        .services-section {
            padding: 60px 0;
            background: var(--dark-bg);
        }

        .services-intro {
            text-align: center;
            margin-bottom: 3rem;
        }

        .services-intro h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }

        .services-intro p {
            font-size: 1.125rem;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
        }

        .service-card {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 2rem;
            border: 2px solid var(--border-color);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .service-card:hover::before,
        .service-card.featured::before {
            transform: scaleX(1);
        }

        .service-card:hover,
        .service-card.featured {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border-color: var(--primary-color);
        }

        .service-icon {
            width: 60px;
            height: 60px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .service-content h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.75rem;
        }

        .service-content p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .service-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }

        .feature-tag {
            background: rgba(99, 102, 241, 0.1);
            color: var(--primary-color);
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .service-price {
            display: flex;
            flex-direction: column;
            margin-bottom: 1.5rem;
        }

        .price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .price-note {
            font-size: 0.875rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
        }

        .service-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--primary-color);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            width: 100%;
            justify-content: center;
        }

        .service-btn:hover {
            background: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .why-work-together {
            padding: 80px 0;
            background: var(--card-bg);
        }

        .reasons-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .reason-card {
            background: var(--dark-bg);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            transition: transform 0.3s ease;
        }

        .reason-card:hover {
            transform: translateY(-5px);
        }

        .reason-icon {
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        .reason-card h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.75rem;
        }

        .reason-card p {
            color: var(--text-secondary);
            line-height: 1.6;
        }

        .past-collaborations {
            padding: 80px 0;
            background: var(--dark-bg);
        }

        .collaborations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .collaboration-card {
            background: var(--card-bg);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            transition: transform 0.3s ease;
        }

        .collaboration-card:hover {
            transform: translateY(-5px);
        }

        .collaboration-image {
            height: 200px;
            overflow: hidden;
        }

        .collaboration-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .collaboration-card:hover .collaboration-image img {
            transform: scale(1.05);
        }

        .collaboration-content {
            padding: 1.5rem;
        }

        .collaboration-content h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.75rem;
        }

        .collaboration-content p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1rem;
        }

        .collaboration-results {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .collaboration-results span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.875rem;
            color: var(--text-muted);
        }

        .contact-cta {
            padding: 80px 0;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
        }

        .contact-form-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }

        .contact-info h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .contact-info p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            line-height: 1.6;
        }

        .contact-details {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .contact-item i {
            color: white;
            font-size: 1.125rem;
        }

        .contact-form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
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
            min-height: 100px;
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

        @media (max-width: 768px) {
            .services-grid {
                grid-template-columns: 1fr;
            }

            .reasons-grid {
                grid-template-columns: 1fr;
            }

            .collaborations-grid {
                grid-template-columns: 1fr;
            }

            .contact-form-section {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .contact-form {
                order: -1;
            }

            .contact-info h2 {
                font-size: 2rem;
            }

            .services-intro h2 {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .service-card {
                padding: 1.5rem;
            }

            .contact-form {
                padding: 1.5rem;
            }

            .service-features {
                flex-direction: column;
                align-items: flex-start;
            }

            .feature-tag {
                align-self: flex-start;
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

    // Observe service cards, reason cards, and collaboration cards
    const animateElements = document.querySelectorAll('.service-card, .reason-card, .collaboration-card');
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
