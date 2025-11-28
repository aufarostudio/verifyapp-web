// Definición de los pasos del flujo de verificación
const STEPS = {
    1: {
        title: "1. Captura del Pago (Rol Admin)",
        detail: "El administrador instala la aplicación en el teléfono que recibe el Yape y la vincula para capturar las notificaciones. Se crea un registro de pago en nuestra base de datos en menos de un segundo.",
        visual: '📱 Admin: Captura la notificación oficial de Yape y la encripta.'
    },
    2: {
        title: "2. Alerta en Tiempo Real (Rol Ayudante)",
        detail: "El sistema inmediatamente emite una notificación de confirmación verificada a todos los números de 'Ayudantes' registrados por el Admin. ¡Tu equipo es el primero en saber!",
        visual: '🔔 Ayudante: Recibe Notificación PUSH: Pago de S/XX.XX CONFIRMADO.'
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

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
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
        stepTitle.textContent = data.title;
        stepDetail.textContent = data.detail;
        stepVisual.innerHTML = `<p class="text-2xl font-semibold text-white">${data.visual}</p>`;

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

    // Inicializar lógica al cargar la página
    initFAQAccordion();
    updateFlowStep('1'); // Asegura que el paso 1 esté activo al iniciar
}

// Initialize the app logic once the window is fully loaded
window.onload = initApp;