// Definición de los pasos del flujo de verificación
const STEPS = {
    1: {
        title: "1. Captura del Pago (Rol Admin)",
        detail: "El administrador instala la aplicación en el teléfono que recibe el Yape y la vincula para capturar las notificaciones. Se crea un registro de pago en nuestra base de datos en menos de un segundo.",
        visual: '📱 Admin: Captura la notificación oficial de Yape.'
    },
    2: {
        title: "2. Alerta en Tiempo Real (Rol Ayudante)",
        detail: "El sistema inmediatamente emite una notificación de confirmación verificada a todos tus 'Ayudantes' registrados. ¡Tu equipo es el primero en saber!",
        visual: '🔔 Ayudante: Recibe Notificación PUSH: Pago de S/15.00 CONFIRMADO.'
    },
    3: {
        title: "3. Confirmación Final en Panel",
        detail: "El ayudante puede verificar el pago al instante en su Panel de Pagos, que se actualiza automáticamente. Se elimina cualquier posibilidad de fraude por captura de pantalla falsa.",
        visual: '✅ Ayudante: Revisa el panel y confirma la venta con total seguridad.'
    }
};

function initApp() {
    // --- Navigation Logic (Mobile Menu) ---
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('nav a, #mobile-menu a');






    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Monitor Web Mobile Device Access Control ---
    const monitorWebLinks = document.querySelectorAll('a[href*="monitor.verifyapp"]');

    function createMonitorModal() {
        let modal = document.getElementById('monitor-web-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'monitor-web-modal';
            modal.className = 'fixed inset-0 bg-black/60 z-[150] hidden items-center justify-center p-4 backdrop-blur-xs transition-opacity duration-300';
            modal.innerHTML = `
                <div class="bg-[#EBF7FC] rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-white/50 text-center transform transition-transform">
                    <button id="close-monitor-modal" class="absolute top-5 right-5 text-[#456b82] hover:text-[#16425b] text-2xl font-bold leading-none cursor-pointer focus:outline-none">&times;</button>
                    <div class="w-16 h-16 rounded-2xl bg-[#186ecc]/15 text-[#186ecc] flex items-center justify-center mx-auto mb-4">
                        <svg class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-extrabold text-[#16425b] mb-2 leading-tight">Acceso solo para Tablet, Laptop o PC</h3>
                    <p class="text-sm text-[#456b82] mb-6 leading-relaxed">
                        El Monitor Web de VerifyApp está diseñado para ser utilizado en pantallas más grandes como Tablet, Laptop o PC.
                    </p>
                    <button id="confirm-monitor-modal" class="w-full bg-[#186ecc] hover:bg-[#165EB8] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-md cursor-pointer text-base">
                        Entendido
                    </button>
                </div>
            `;
            document.body.appendChild(modal);

            const closeModal = () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            };

            modal.querySelector('#close-monitor-modal').addEventListener('click', closeModal);
            modal.querySelector('#confirm-monitor-modal').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
        return modal;
    }

    function isMobileDevice() {
        const isSmallScreen = window.innerWidth < 768;
        const isPhoneUA = /Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isSmallScreen || isPhoneUA;
    }

    monitorWebLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (isMobileDevice()) {
                e.preventDefault();
                const modal = createMonitorModal();
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        });
    });

    // --- Interactive Flow Logic ---
    const stepNavs = document.querySelectorAll('.step-nav');
    const stepTitle = document.getElementById('step-title');
    const stepDetail = document.getElementById('step-detail');
    const stepVisual = document.getElementById('step-visual');

    stepNavs.forEach(nav => {
        nav.addEventListener('click', (e) => {
            const step = e.currentTarget.getAttribute('data-step');
            updateFlowStep(step);
        });
    });

    function updateFlowStep(step) {
        const data = STEPS[step];
        if (!data) return;

        // Update text content
        if (stepTitle && stepDetail && stepVisual) {
            stepTitle.textContent = data.title;
            stepDetail.textContent = data.detail;
            stepVisual.innerHTML = `<p class="text-2xl font-semibold text-white">${data.visual}</p>`;
        }

        // Update active button styles
        stepNavs.forEach(nav => {
            const navStep = nav.getAttribute('data-step');
            const dot = nav.querySelector('.flow-step-dot');
            if (navStep === step) {
                // Active state
                nav.classList.remove('text-primary-blue-light', 'hover:bg-primary-blue-dark', 'hover:text-white');
                nav.classList.add('bg-primary-blue', 'text-white');
                dot.classList.remove('border-2', 'border-primary-blue-light', 'text-primary-blue-light');
                dot.classList.add('bg-white', 'text-primary-blue-dark');
            } else {
                // Inactive state
                nav.classList.remove('bg-primary-blue', 'text-white');
                nav.classList.add('text-primary-blue-light', 'hover:bg-primary-blue-dark', 'hover:text-white');
                dot.classList.remove('bg-white', 'text-primary-blue-dark');
                dot.classList.add('border-2', 'border-primary-blue-light', 'text-primary-blue-light');
            }
        });
    }

    // --- FAQ Accordion Logic ---
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            // Inicialización del estado: Si está abierto por defecto
            if (item.classList.contains('is-open')) {
                // Asegura que el ícono esté rotado y la respuesta visible
                icon.classList.add('rotate-180');
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                icon.classList.remove('rotate-180');
                answer.style.maxHeight = '0';
            }

            question.addEventListener('click', () => {
                // Toggle de la clase 'is-open'
                item.classList.toggle('is-open');

                // Toggle de la rotación del ícono
                icon.classList.toggle('rotate-180');

                // Animación de apertura/cierre de la respuesta
                if (item.classList.contains('is-open')) {
                    // Abre el acordeón: Establece max-height a la altura real del contenido.
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    // Cierra el acordeón: Establece max-height a 0.
                    answer.style.maxHeight = '0';
                }
            });
        });
    }

    // WhatsApp Floating Widget Logic
    const waButton = document.getElementById('wa-button');
    const waModal = document.getElementById('wa-modal');
    const closeWaModal = document.getElementById('close-wa-modal');

    if (waButton && waModal && closeWaModal) {
        waButton.addEventListener('click', () => {
            waModal.classList.toggle('hidden');
        });

        closeWaModal.addEventListener('click', () => {
            waModal.classList.add('hidden');
        });

        // Close when clicking outside of the modal and button
        document.addEventListener('click', (e) => {
            if (!waButton.contains(e.target) && !waModal.contains(e.target)) {
                waModal.classList.add('hidden');
            }
        });
    }

    // --- Custom Helpers Plan Modal Logic ---
    const helperModal = document.getElementById('custom-helpers-modal');
    const openHelperBtns = document.querySelectorAll('.open-helpers-modal');
    const closeHelperBtn = document.getElementById('close-helpers-modal');
    const cancelHelperBtn = document.getElementById('cancel-helpers-modal');
    const helperSelect = document.getElementById('helpers-count-select');
    const calcPriceDisplay = document.getElementById('calculated-price-display');
    const submitHelperBtn = document.getElementById('submit-helpers-request');

    const HELPER_PRICES = {
        "4": { price: "S/ 10 / mes", text: "4" },
        "6": { price: "S/ 15 / mes", text: "6" },
        "8": { price: "S/ 20 / mes", text: "8" },
        "10": { price: "S/ 25 / mes", text: "10" },
        "más de 10": { price: "A cotizar (Más de 10)", text: "más de 10" }
    };

    if (helperModal) {
        openHelperBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                helperModal.classList.remove('hidden');
                helperModal.classList.add('flex');
            });
        });

        const closeModal = () => {
            helperModal.classList.add('hidden');
            helperModal.classList.remove('flex');
        };

        if (closeHelperBtn) closeHelperBtn.addEventListener('click', closeModal);
        if (cancelHelperBtn) cancelHelperBtn.addEventListener('click', closeModal);

        helperModal.addEventListener('click', (e) => {
            if (e.target === helperModal) {
                closeModal();
            }
        });

        if (helperSelect && calcPriceDisplay) {
            helperSelect.addEventListener('change', () => {
                const val = helperSelect.value;
                const info = HELPER_PRICES[val] || HELPER_PRICES["4"];
                calcPriceDisplay.textContent = info.price;
            });
        }

        if (submitHelperBtn && helperSelect) {
            submitHelperBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const val = helperSelect.value;
                const info = HELPER_PRICES[val] || HELPER_PRICES["4"];
                const msg = `Hola quiero un plan personalizado de Verifyapp, tengo ${info.text} trabajadores`;
                const url = `https://wa.me/51907796591?text=${encodeURIComponent(msg)}`;
                if (typeof fbq === 'function') {
                    fbq('track', 'Contact');
                }
                window.open(url, '_blank');
                closeModal();
            });
        }
    }

    // Inicializar lógica al cargar la página
    initFAQAccordion();
    updateFlowStep('1'); // Asegura que el paso 1 esté activo al iniciar
}

// Initialize the app logic once the window is fully loaded
window.onload = initApp;