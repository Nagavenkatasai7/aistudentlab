// Tool Vault Filtering and Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const pricingFilter = document.getElementById('pricing-filter');
    const toolRows = document.querySelectorAll('.tool-row');

    function filterTools() {
        const selectedCategory = categoryFilter.value;
        const selectedRating = parseInt(ratingFilter.value);
        const selectedPricing = pricingFilter.value;

        toolRows.forEach(row => {
            const category = row.dataset.category;
            const rating = parseInt(row.dataset.rating);
            const pricing = row.dataset.pricing;

            const categoryMatch = selectedCategory === 'all' || category === selectedCategory;
            const ratingMatch = rating >= selectedRating;
            const pricingMatch = selectedPricing === 'all' || pricing === selectedPricing;

            if (categoryMatch && ratingMatch && pricingMatch) {
                row.style.display = '';
                row.classList.add('visible');
            } else {
                row.style.display = 'none';
                row.classList.remove('visible');
            }
        });

        updateVisibleCount();
    }

    function updateVisibleCount() {
        const visibleRows = document.querySelectorAll('.tool-row.visible');
        const totalRows = toolRows.length;

        // Update category stats if needed
        const categoryCounts = {};
        visibleRows.forEach(row => {
            const category = row.dataset.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
    }

    // Event listeners for filters
    categoryFilter.addEventListener('change', filterTools);
    ratingFilter.addEventListener('change', filterTools);
    pricingFilter.addEventListener('change', filterTools);

    // Initialize filters
    filterTools();

    // Add smooth animations for filtered items
    const style = document.createElement('style');
    style.textContent = `
        .tool-row {
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        }

        .tool-row.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .category-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .action-btn {
            transition: all 0.3s ease;
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .stars {
            color: #fbbf24;
            font-size: 0.875rem;
        }

        .rating-score {
            font-weight: 600;
            color: var(--text-primary);
            background: var(--border-color);
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
        }

        .category-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .category-badge.code {
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
        }

        .category-badge.image {
            background: rgba(168, 85, 247, 0.1);
            color: #a855f7;
        }

        .category-badge.writing {
            background: rgba(34, 197, 94, 0.1);
            color: #22c55e;
        }

        .category-badge.video {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
        }

        .category-badge.productivity {
            background: rgba(245, 158, 11, 0.1);
            color: #f59e0b;
        }

        .pricing-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .pricing-badge.free {
            background: rgba(34, 197, 94, 0.1);
            color: #22c55e;
        }

        .pricing-badge.freemium {
            background: rgba(245, 158, 11, 0.1);
            color: #f59e0b;
        }

        .pricing-badge.paid {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
        }

        .tool-icon {
            width: 32px;
            height: 32px;
            border-radius: 6px;
            object-fit: cover;
            margin-right: 0.75rem;
        }

        .tool-info {
            display: flex;
            align-items: center;
        }

        .tool-info strong {
            display: block;
            color: var(--text-primary);
            margin-bottom: 0.125rem;
        }

        .tool-info small {
            color: var(--text-secondary);
            font-size: 0.75rem;
        }

        .action-btn {
            padding: 0.375rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            font-weight: 500;
            text-decoration: none;
            display: inline-block;
            margin-right: 0.5rem;
            margin-bottom: 0.25rem;
        }

        .action-btn.primary {
            background: var(--primary-color);
            color: white;
        }

        .action-btn.secondary {
            background: var(--border-color);
            color: var(--text-primary);
        }

        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .category-card {
            background: var(--card-bg);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            text-align: center;
        }

        .category-icon {
            width: 60px;
            height: 60px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            color: white;
            font-size: 1.5rem;
        }

        .category-card h3 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            font-size: 1.125rem;
        }

        .category-card p {
            color: var(--text-secondary);
            margin-bottom: 1rem;
            font-size: 0.875rem;
        }

        .category-rating {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.875rem;
        }

        .category-rating .stars {
            color: #fbbf24;
        }

        .category-rating span:last-child {
            color: var(--text-muted);
        }

        .filter-controls {
            background: var(--card-bg);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 2rem;
        }

        .filter-controls {
            display: flex;
            gap: 2rem;
            align-items: center;
            flex-wrap: wrap;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .filter-group label {
            font-weight: 500;
            color: var(--text-primary);
            font-size: 0.875rem;
        }

        .filter-group select {
            padding: 0.5rem 1rem;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--dark-bg);
            color: var(--text-primary);
            font-size: 0.875rem;
            min-width: 150px;
        }

        .filter-group select:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        @media (max-width: 768px) {
            .filter-controls {
                flex-direction: column;
                align-items: stretch;
            }

            .filter-group {
                width: 100%;
            }

            .filter-group select {
                width: 100%;
            }

            .categories-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);

    // Add tool icons fallback
    const toolIcons = document.querySelectorAll('.tool-icon');
    toolIcons.forEach(icon => {
        icon.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.width = '32px';
            fallback.style.height = '32px';
            fallback.style.background = 'var(--primary-color)';
            fallback.style.borderRadius = '6px';
            fallback.style.display = 'flex';
            fallback.style.alignItems = 'center';
            fallback.style.justifyContent = 'center';
            fallback.style.color = 'white';
            fallback.style.fontSize = '16px';
            fallback.innerHTML = '<i class="fas fa-tools"></i>';
            this.parentNode.insertBefore(fallback, this);
        });
    });
});
