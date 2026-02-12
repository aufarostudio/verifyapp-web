document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle (Kept just in case, though header is being removed, checking if other nav exists)
    // If we remove the header, we might not need this, but let's keep it robust.
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('open');
            } else {
                mobileMenu.classList.remove('open');
            }
        }
    }

    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }

    // FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-button');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.faq-icon');

            // Toggle current
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('open');
                icon.classList.remove('rotate-180');
            } else {
                // Close others (optional - strictly accordion behavior)
                document.querySelectorAll('.faq-content').forEach(c => {
                    c.style.maxHeight = null;
                    c.classList.remove('open');
                });
                document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('open');
                icon.classList.add('rotate-180');
            }
        });
    });

    // Pricing Toggle Logic
    const billingToggle = document.getElementById('billingToggle');
    const toggleDot = document.getElementById('toggleDot');
    const labelMensual = document.getElementById('label-mensual');
    const labelAnual = document.getElementById('label-anual');
    const prices = document.querySelectorAll('[data-price-m]');
    const periods = document.querySelectorAll('.price-period');
    const originalPrices = document.querySelectorAll('.price-original');

    let isAnnual = false; // Default: Monthly

    if (billingToggle) {
        billingToggle.addEventListener('click', () => {
            isAnnual = !isAnnual;

            // Toggle UI state
            if (isAnnual) {
                // Switch to Annual
                billingToggle.classList.remove('bg-gray-300');
                billingToggle.classList.add('bg-primary');
                toggleDot.classList.remove('left-1');
                toggleDot.classList.add('translate-x-7'); // Tailwind translate for movement

                labelMensual.classList.remove('text-primary');
                labelMensual.classList.add('text-gray-500');

                labelAnual.classList.remove('text-gray-500');
                labelAnual.classList.add('text-primary');

                // Update Prices
                prices.forEach(price => {
                    price.textContent = `S/ ${price.dataset.priceA}`;
                });

                periods.forEach(period => {
                    period.textContent = '/anual';
                });

                originalPrices.forEach(op => {
                    op.classList.remove('hidden');
                });

            } else {
                // Switch to Monthly
                billingToggle.classList.remove('bg-primary');
                billingToggle.classList.add('bg-gray-300');
                toggleDot.classList.remove('translate-x-7');
                toggleDot.classList.add('left-1');

                labelMensual.classList.remove('text-gray-500');
                labelMensual.classList.add('text-primary');

                labelAnual.classList.remove('text-primary');
                labelAnual.classList.add('text-gray-500');

                // Update Prices
                prices.forEach(price => {
                    price.textContent = `S/ ${price.dataset.priceM}`;
                });

                periods.forEach(period => {
                    period.textContent = '/mes';
                });

                originalPrices.forEach(op => {
                    op.classList.add('hidden');
                });
            }
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});
