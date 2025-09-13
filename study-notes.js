// Study Notes Carousel and Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab filtering functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const noteCards = document.querySelectorAll('.note-card');

    function filterNotes(category) {
        noteCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = '';
                card.classList.add('visible');
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.dataset.category;
            filterNotes(category);
        });
    });

    // Initialize with all notes visible
    filterNotes('all');

    // Carousel functionality for each note card
    noteCards.forEach(card => {
        const carousel = card.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const indicators = carousel.querySelectorAll('.indicator');

        let currentSlide = 0;

        function updateCarousel() {
            // Update slides
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });

            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });

            // Update button states
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
        }

        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Indicator click
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });

        // Auto-play functionality (optional)
        let autoplayInterval;

        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                if (currentSlide < slides.length - 1) {
                    nextSlide();
                } else {
                    currentSlide = 0;
                    updateCarousel();
                }
            }, 3000); // Change slide every 3 seconds
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Start autoplay
        // startAutoplay(); // Uncomment to enable autoplay
    });

    // Download and preview button functionality
    const downloadBtns = document.querySelectorAll('.download-btn');
    const previewBtns = document.querySelectorAll('.preview-btn');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const noteTitle = this.closest('.note-info').querySelector('h3').textContent;

            // Simulate download
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.style.background = '#10b981';

            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-download"></i> Download PDF';
                    this.style.background = '';
                }, 2000);
            }, 1500);
        });
    });

    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const carousel = this.closest('.note-card').querySelector('.carousel-container');

            // Scroll to carousel
            carousel.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Add highlight effect
            carousel.style.boxShadow = '0 0 0 3px var(--primary-color)';
            setTimeout(() => {
                carousel.style.boxShadow = '';
            }, 2000);
        });
    });

    // Add CSS for carousel animations and styling
    const style = document.createElement('style');
    style.textContent = `
        .note-card {
            background: var(--card-bg);
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        }

        .note-card.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .note-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .note-carousel {
            position: relative;
            height: 400px;
            overflow: hidden;
        }

        .carousel-container {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .carousel-slides {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--dark-bg);
        }

        .slide.active {
            opacity: 1;
        }

        .slide img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .slide-overlay {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .carousel-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 10;
        }

        .carousel-btn:hover {
            background: white;
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .carousel-btn.prev {
            left: 10px;
        }

        .carousel-btn.next {
            right: 10px;
        }

        .carousel-btn i {
            color: var(--text-primary);
            font-size: 1rem;
        }

        .carousel-indicators {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 10;
        }

        .indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .indicator.active {
            background: white;
            transform: scale(1.2);
        }

        .note-info {
            padding: 1.5rem;
        }

        .note-info h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.75rem;
        }

        .note-info p {
            color: var(--text-secondary);
            margin-bottom: 1rem;
            line-height: 1.6;
        }

        .note-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .note-meta span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.75rem;
            color: var(--text-muted);
        }

        .note-actions {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .download-btn, .preview-btn {
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
        }

        .download-btn {
            background: var(--primary-color);
            color: white;
        }

        .download-btn:hover {
            background: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .preview-btn {
            background: var(--border-color);
            color: var(--text-primary);
        }

        .preview-btn:hover {
            background: var(--text-muted);
            transform: translateY(-2px);
        }

        .categories-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .tab-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--border-color);
            background: var(--card-bg);
            color: var(--text-secondary);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .tab-btn:hover {
            background: var(--border-color);
        }

        .tab-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .notes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 2rem;
        }

        .download-cta {
            padding: 60px 0;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
        }

        .cta-content {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .cta-content h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .cta-content p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .cta-features {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .cta-features .feature {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
        }

        .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: white;
            color: var(--primary-color);
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .cta-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
            .notes-grid {
                grid-template-columns: 1fr;
            }

            .categories-tabs {
                justify-content: flex-start;
                overflow-x: auto;
                padding-bottom: 0.5rem;
            }

            .categories-tabs::-webkit-scrollbar {
                height: 4px;
            }

            .categories-tabs::-webkit-scrollbar-track {
                background: var(--border-color);
                border-radius: 2px;
            }

            .categories-tabs::-webkit-scrollbar-thumb {
                background: var(--primary-color);
                border-radius: 2px;
            }

            .note-carousel {
                height: 300px;
            }

            .carousel-btn {
                width: 35px;
                height: 35px;
            }

            .carousel-btn i {
                font-size: 0.875rem;
            }

            .note-meta {
                flex-direction: column;
                gap: 0.5rem;
            }

            .note-actions {
                flex-direction: column;
            }

            .cta-features {
                flex-direction: column;
                gap: 1rem;
            }
        }

        @media (max-width: 480px) {
            .note-carousel {
                height: 250px;
            }

            .carousel-btn {
                width: 30px;
                height: 30px;
            }

            .carousel-btn i {
                font-size: 0.75rem;
            }

            .slide-overlay {
                font-size: 0.625rem;
                padding: 2px 6px;
            }
        }
    `;
    document.head.appendChild(style);

    // Stagger animation for note cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    noteCards.forEach(card => {
        observer.observe(card);
    });
});
