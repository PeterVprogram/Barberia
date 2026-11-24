/**
 * URBAN FADE BARBERSHOP - LÓGICA INTERACTIVA EN JAVASCRIPT
 * Cotizador en tiempo real, Visagismo, Horarios en Vivo y Conexión WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. ESTADO DE HORARIO EN VIVO (ABIERTO / CERRADO)
    // =========================================================================
    const shopStatusEl = document.getElementById('shop-status');

    function checkShopStatus() {
        if (!shopStatusEl) return;
        const now = new Date();
        const day = now.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hour + minutes / 60;

        let isOpen = false;
        let closingHourText = '';

        if (day >= 1 && day <= 6) {
            // Lunes a Sábado: 9:00 AM a 9:00 PM (21:00)
            if (currentTime >= 9 && currentTime < 21) {
                isOpen = true;
                closingHourText = 'Cerramos a las 9:00 PM';
            }
        } else {
            // Domingo: 10:00 AM a 6:00 PM (18:00)
            if (currentTime >= 10 && currentTime < 18) {
                isOpen = true;
                closingHourText = 'Cerramos a las 6:00 PM';
            }
        }

        if (isOpen) {
            shopStatusEl.innerHTML = `<strong>ABIERTO HOY</strong> • ${closingHourText}`;
            shopStatusEl.style.color = '#10b981';
        } else {
            shopStatusEl.innerHTML = `<strong>CERRADO AHORA</strong> • Abrimos a las 9:00 AM`;
            shopStatusEl.style.color = '#f59e0b';
        }
    }

    checkShopStatus();

    // =========================================================================
    // 2. MENÚ MÓVIL Y NAVEGACIÓN SUAVE
    // =========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // Scroll Spy para marcar enlaces activos
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // =========================================================================
    // 3. FILTRO DE TIPOS DE CORTES
    // =========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cutCards = document.querySelectorAll('.cut-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cutCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.35s ease';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // =========================================================================
    // 4. TEST DE VISAGISMO FACIAL
    // =========================================================================
    const faceButtons = document.querySelectorAll('.face-btn');
    const faceNameEl = document.getElementById('result-face-name');
    const faceDescEl = document.getElementById('result-face-desc');
    const faceCutsList = document.getElementById('result-recommended-cuts');
    const faceAvoidNotes = document.getElementById('result-avoid-notes');

    const faceData = {
        oval: {
            title: "Diagnóstico: Rostro Ovalado",
            desc: "El rostro más equilibrado geométricamente. El ancho de los pómulos es suavemente mayor que la mandíbula y la frente. Prácticamente cualquier técnica luce sensacional.",
            cuts: [
                "Low Fade con volumen texturizado arriba",
                "Mid Fade clásico de precisión",
                "Pompadour y Slick Back elegante",
                "Buzz Cut con acabado en navaja limpia"
            ],
            avoid: "Evita flequillos caídos demasiado pesados sobre la frente que tapen tus ojos y acorten visualmente tu estructura."
        },
        square: {
            title: "Diagnóstico: Rostro Cuadrado",
            desc: "Mandíbula marcada, pómulos prominentes y líneas angulares muy masculinas. Tu objetivo es destacar la fuerza ósea sin ensanchar en exceso los lados.",
            cuts: [
                "High Fade o Skin Fade para resaltar la mandíbula",
                "Buzz Cut militar ultra definido",
                "Textured Crop con laterales bien cortos",
                "Fade con raya lateral marcada a navaja"
            ],
            avoid: "Evita cortes con demasiado volumen abultado en los laterales de las orejas que den sensación de cabeza rectangular."
        },
        round: {
            title: "Diagnóstico: Rostro Redondo",
            desc: "Líneas suaves en pómulos y mejillas con medidas similares de alto y ancho. El objetivo estético es crear altura y verticalidad para alargar ópticamente el perfil.",
            cuts: [
                "Pompadour alto o Quiff con volumen en coronilla",
                "High Fade bien pulido al ras de piel",
                "Spiky Cut (peinado elevado desordenado)",
                "Barba perfilada en punta (estilo candado o degraded beard)"
            ],
            avoid: "Evita cortes circulares tipo hongo o cortes sin desvanecer a los lados que acentúen la redondez de las mejillas."
        },
        long: {
            title: "Diagnóstico: Rostro Alargado / Rectangular",
            desc: "La longitud de tu rostro es visiblemente mayor que el ancho. El objetivo del barbero es evitar sumar altura excesiva arriba y mantener un ancho proporcionado.",
            cuts: [
                "Low Fade o Taper Fade suave",
                "Crop Top texturizado con flequillo recto frontal",
                "Corte clásico a tijera con caída lateral",
                "Barba poblada pero corta en el mentón para acortar distancia"
            ],
            avoid: "Evita Pompadours gigantes o crestas muy altas que estiren el rostro aún más verticalmente."
        },
        diamond: {
            title: "Diagnóstico: Rostro Diamante",
            desc: "Pómulos anchos y muy marcados con frente y barbilla estrechas. Necesitamos suavizar los ángulos de los pómulos y equilibrar la frente.",
            cuts: [
                "Burst Fade con movimiento superior",
                "Taper Fade con textura desenfadada",
                "Side Part (línea de lado clásica contemporánea)",
                "Mid Fade con flequillo despuntado"
            ],
            avoid: "Evita cortes rapados extremos en las sienes que hagan sobresalir los pómulos de forma desproporcionada."
        }
    };

    faceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            faceButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const faceType = btn.getAttribute('data-face');
            const data = faceData[faceType];

            if (data) {
                faceNameEl.textContent = data.title;
                faceDescEl.textContent = data.desc;
                faceAvoidNotes.textContent = data.avoid;

                faceCutsList.innerHTML = '';
                data.cuts.forEach(c => {
                    const li = document.createElement('li');
                    li.textContent = c;
                    faceCutsList.appendChild(li);
                });
            }
        });
    });

    // =========================================================================
    // 5. COTIZADOR Y CALCULADORA EN VIVO DE CITAS
    // =========================================================================
    const cutRadios = document.querySelectorAll('input[name="calc-cut"]');
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    const ticketItemsContainer = document.getElementById('ticket-items');
    const totalTimeDisplay = document.getElementById('total-time-display');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const discountRow = document.getElementById('ticket-discount-row');
    const discountDisplay = document.getElementById('total-discount-display');
    const btnResetCalc = document.getElementById('btn-reset-calc');
    const btnApplyPromo = document.getElementById('btn-apply-promo');
    const promoCodeInput = document.getElementById('promo-code-input');
    const promoMsg = document.getElementById('promo-msg');
    const btnConfirmBooking = document.getElementById('btn-confirm-booking');

    let appliedDiscountPercentage = 0;
    let appliedDiscountFixed = 0;

    // Formateador de moneda en Pesos
    function formatMoney(amount) {
        return '$' + Math.round(amount).toLocaleString('es-CO');
    }

    function calculateCart() {
        let total = 0;
        let totalMinutes = 0;
        let selectedItems = [];

        // 1. Corte seleccionado
        const selectedCut = document.querySelector('input[name="calc-cut"]:checked');
        if (selectedCut) {
            const price = parseFloat(selectedCut.getAttribute('data-price') || 0);
            const time = parseInt(selectedCut.getAttribute('data-time') || 0);
            const name = selectedCut.value;

            total += price;
            totalMinutes += time;
            selectedItems.push({ name: `Corte: ${name}`, price, time });
        }

        // Marcar estilo visual de tarjetas de corte
        cutRadios.forEach(r => {
            const card = r.closest('.service-checkbox-card');
            if (card) {
                if (r.checked) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            }
        });

        // 2. Addons seleccionados (Barba, Skin Care, Promos)
        addonCheckboxes.forEach(chk => {
            const card = chk.closest('.service-checkbox-card');
            if (chk.checked) {
                if (card) card.classList.add('selected');
                const price = parseFloat(chk.getAttribute('data-price') || 0);
                const time = parseInt(chk.getAttribute('data-time') || 0);
                const name = chk.value;

                total += price;
                totalMinutes += time;
                selectedItems.push({ name, price, time });
            } else {
                if (card) card.classList.remove('selected');
            }
        });

        // 3. Renderizar items en el Ticket Resumen
        if (ticketItemsContainer) {
            ticketItemsContainer.innerHTML = '';
            if (selectedItems.length === 0) {
                ticketItemsContainer.innerHTML = `<div class="ticket-item"><span>Ningún servicio seleccionado</span></div>`;
            } else {
                selectedItems.forEach(item => {
                    const row = document.createElement('div');
                    row.className = 'ticket-item';
                    row.innerHTML = `
                        <span>${item.name} <small>(${item.time}m)</small></span>
                        <strong>${formatMoney(item.price)}</strong>
                    `;
                    ticketItemsContainer.appendChild(row);
                });
            }
        }

        // 4. Aplicar Descuento si existe
        let discountAmount = 0;
        if (appliedDiscountPercentage > 0) {
            discountAmount += total * (appliedDiscountPercentage / 100);
        }
        if (appliedDiscountFixed > 0) {
            discountAmount += appliedDiscountFixed;
        }

        if (discountAmount > total) discountAmount = total;

        const finalTotal = total - discountAmount;

        // 5. Actualizar displays
        if (totalTimeDisplay) totalTimeDisplay.textContent = `${totalMinutes} minutos`;
        if (totalPriceDisplay) totalPriceDisplay.textContent = formatMoney(finalTotal);

        if (discountRow && discountDisplay) {
            if (discountAmount > 0) {
                discountRow.style.display = 'flex';
                discountDisplay.textContent = `-${formatMoney(discountAmount)}`;
            } else {
                discountRow.style.display = 'none';
            }
        }

        return {
            items: selectedItems,
            totalMinutes,
            subtotal: total,
            discount: discountAmount,
            finalTotal
        };
    }

    // Escuchadores para recalculación
    cutRadios.forEach(radio => radio.addEventListener('change', calculateCart));
    addonCheckboxes.forEach(chk => chk.addEventListener('change', calculateCart));

    // Aplicar código promocional
    if (btnApplyPromo && promoCodeInput && promoMsg) {
        btnApplyPromo.addEventListener('click', () => {
            const code = promoCodeInput.value.trim().toUpperCase();
            if (code === 'URBAN2026' || code === 'URBANPASS') {
                appliedDiscountPercentage = 25;
                appliedDiscountFixed = 0;
                promoMsg.style.color = '#10b981';
                promoMsg.textContent = '✓ ¡Cupón del 25% OFF aplicado exitosamente!';
                showToast('🔥 Cupón del 25% OFF aplicado');
            } else if (code === 'FADEVIP') {
                appliedDiscountPercentage = 0;
                appliedDiscountFixed = 10000;
                promoMsg.style.color = '#10b981';
                promoMsg.textContent = '✓ ¡Bono VIP de $10.000 descontado!';
                showToast('🎉 Bono VIP aplicado');
            } else if (code === 'BRO') {
                appliedDiscountPercentage = 20;
                appliedDiscountFixed = 0;
                promoMsg.style.color = '#10b981';
                promoMsg.textContent = '✓ ¡Descuento Bro del 20% aplicado!';
                showToast('🤙 Descuento Bro aplicado');
            } else {
                appliedDiscountPercentage = 0;
                appliedDiscountFixed = 0;
                promoMsg.style.color = '#ef4444';
                promoMsg.textContent = 'Código no válido o vencido.';
            }
            calculateCart();
        });
    }

    // Botón de resetear cotizador
    if (btnResetCalc) {
        btnResetCalc.addEventListener('click', () => {
            if (cutRadios.length > 0) cutRadios[0].checked = true;
            addonCheckboxes.forEach(chk => chk.checked = false);
            appliedDiscountPercentage = 0;
            appliedDiscountFixed = 0;
            if (promoCodeInput) promoCodeInput.value = '';
            if (promoMsg) promoMsg.textContent = '';
            calculateCart();
            showToast('Cotizador restablecido');
        });
    }

    // Inicializar cálculo en carga
    calculateCart();

    // =========================================================================
    // 6. BOTONES "+ AGREGAR A COTIZACIÓN" EN LAS TARJETAS (CORTES, SPA, PROMOS)
    // =========================================================================
    const addToCalcButtons = document.querySelectorAll('.add-to-calc');

    addToCalcButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price') || 0);
            const time = parseInt(btn.getAttribute('data-time') || 0);

            let found = false;

            // Revisar si coincide con un radio button de corte
            cutRadios.forEach(radio => {
                if (radio.value.toLowerCase().includes(serviceName.toLowerCase()) || 
                    serviceName.toLowerCase().includes(radio.value.toLowerCase())) {
                    radio.checked = true;
                    found = true;
                }
            });

            // Si no fue un corte directo, buscar en addons
            if (!found) {
                addonCheckboxes.forEach(chk => {
                    if (chk.value.toLowerCase().includes(serviceName.toLowerCase()) || 
                        serviceName.toLowerCase().includes(chk.value.toLowerCase())) {
                        chk.checked = true;
                        found = true;
                    }
                });
            }

            // Si es un combo especial no listado como checkbox individual, podemos agregarlo o seleccionarlo
            if (!found && serviceName.includes('Combo')) {
                // Marcar corte y seleccionar servicios incluidos
                if (cutRadios.length > 0) cutRadios[1].checked = true; // Mid Fade
                addonCheckboxes.forEach(chk => {
                    if (chk.value.includes('Barba') || chk.value.includes('Black Mask')) {
                        chk.checked = true;
                    }
                });
            }

            calculateCart();
            showToast(`✓ "${serviceName}" añadido a tu cotización`);

            // Scroll suave hacia la sección del cotizador
            const targetSection = document.getElementById('cotizador-reserva');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =========================================================================
    // 7. CONFIRMACIÓN Y RESERVA POR WHATSAPP
    // =========================================================================
    const modal = document.getElementById('booking-modal');
    const modalClose = document.getElementById('modal-close');
    const modalDoneBtn = document.getElementById('modal-done-btn');
    const modalSummaryContent = document.getElementById('modal-summary-content');
    const modalWhatsAppLink = document.getElementById('modal-whatsapp-link');

    // Asignar fecha por defecto a mañana en el input de fecha
    const bookingDateInput = document.getElementById('booking-date');
    if (bookingDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        bookingDateInput.value = tomorrow.toISOString().split('T')[0];
        bookingDateInput.min = new Date().toISOString().split('T')[0];
    }

    if (btnConfirmBooking) {
        btnConfirmBooking.addEventListener('click', () => {
            const dateVal = document.getElementById('booking-date')?.value;
            const timeVal = document.getElementById('booking-time')?.value;
            const barberVal = document.getElementById('booking-barber')?.value || 'Cualquiera';
            const nameVal = document.getElementById('booking-name')?.value.trim();
            const phoneVal = document.getElementById('booking-phone')?.value.trim();

            if (!nameVal) {
                alert('Por favor escribe tu Nombre Completo para agendar la cita.');
                document.getElementById('booking-name')?.focus();
                return;
            }

            if (!phoneVal) {
                alert('Por favor escribe tu número de WhatsApp para contactarte.');
                document.getElementById('booking-phone')?.focus();
                return;
            }

            if (!timeVal) {
                alert('Por favor selecciona una hora de atención deseada.');
                document.getElementById('booking-time')?.focus();
                return;
            }

            const cart = calculateCart();

            // Construir resumen para el modal
            let itemsTextList = cart.items.map(it => `• ${it.name} (${formatMoney(it.price)})`).join('<br>');

            modalSummaryContent.innerHTML = `
                <strong>Cliente:</strong> ${nameVal}<br>
                <strong>Teléfono:</strong> ${phoneVal}<br>
                <strong>Fecha & Hora:</strong> ${dateVal} a las ${timeVal}<br>
                <strong>Barbero:</strong> ${barberVal}<br>
                <strong>Duración Estimada:</strong> ${cart.totalMinutes} minutos<br>
                <hr style="border:0; border-top:1px solid #333; margin:8px 0;">
                <strong>Servicios Seleccionados:</strong><br>
                ${itemsTextList}<br>
                <hr style="border:0; border-top:1px solid #333; margin:8px 0;">
                ${cart.discount > 0 ? `<strong>Descuento:</strong> -${formatMoney(cart.discount)}<br>` : ''}
                <strong style="color: #f3d068; font-size: 1.1rem;">TOTAL A PAGAR: ${formatMoney(cart.finalTotal)}</strong>
            `;

            // Construir mensaje codificado para WhatsApp
            const waServices = cart.items.map(it => `- ${it.name}`).join('\n');
            const waMessage = 
`💈 *NUEVA RESERVA URBAN FADE* 💈
👤 *Cliente:* ${nameVal}
📱 *Teléfono:* ${phoneVal}
📅 *Fecha:* ${dateVal}
⏰ *Hora:* ${timeVal}
✂️ *Barbero:* ${barberVal}
⏱ *Tiempo Estimado:* ${cart.totalMinutes} min

📋 *Servicios Solicitados:*
${waServices}

💰 *Total Estimado:* ${formatMoney(cart.finalTotal)}
${cart.discount > 0 ? `🎁 *Descuento Aplicado:* -${formatMoney(cart.discount)}\n` : ''}
_Hola, deseo confirmar mi reserva con este paquete en Urban Fade._`;

            const encodedWa = encodeURIComponent(waMessage);
            const waUrl = `https://wa.me/573001234567?text=${encodedWa}`;

            if (modalWhatsAppLink) {
                modalWhatsAppLink.href = waUrl;
            }

            // Mostrar modal
            if (modal) modal.classList.add('active');
        });
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // =========================================================================
    // 8. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    // =========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('active');

            // Cerrar otros acordeones abiertos
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                }
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                question.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // =========================================================================
    // 9. FORMULARIO DE CONTACTO RÁPIDO
    // =========================================================================
    const quickContactForm = document.getElementById('quick-contact-form');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('✉️ ¡Mensaje enviado! Te responderemos muy pronto.');
            quickContactForm.reset();
        });
    }

    // =========================================================================
    // 10. SISTEMA DE NOTIFICACIONES TOAST
    // =========================================================================
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

});
