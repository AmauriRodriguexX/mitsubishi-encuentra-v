// ============================================
// FORM VALIDATION & INTERACTIVITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize desktop particles
    if (window.innerWidth >= 1024) {
        initParticles();
        initMouseGradient();
    }

    // Initialize form
    initForm();
    
    // Initialize modal
    initModal();
});

// ============================================
// MODAL AVISO DE PRIVACIDAD
// ============================================

function initModal() {
    const privacyLinks = document.querySelectorAll('.privacy-link');
    const modal = document.getElementById('privacyModal');
    const closeBtn = document.getElementById('closeModal');

    // Open modal
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open modal - privacy links
    privacyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal - button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal - overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal - ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// FLOATING LABEL HANDLERS
// ============================================

function initForm() {
    // Get both forms (mobile and desktop)
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('.form-input');
        const selects = form.querySelectorAll('.form-select');

        // Add event listeners for inputs
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
            input.addEventListener('input', handleInputChange);
            
            // Check initial value on load
            if (input.value && input.value.trim() !== '') {
                input.parentElement.classList.add('has-value');
            }
        });

        // Add event listeners for selects
        selects.forEach(select => {
            select.addEventListener('focus', handleSelectFocus);
            select.addEventListener('blur', handleSelectBlur);
            select.addEventListener('change', handleSelectChange);
            
            // Check initial value on load
            if (select.value && select.value !== '') {
                select.parentElement.classList.add('has-value');
            }
        });

        // Form submission
        form.addEventListener('submit', handleSubmit);
    });
}

function handleInputFocus(e) {
    const input = e.target;
    input.parentElement.classList.add('focused');
}

function handleInputBlur(e) {
    const input = e.target;
    input.parentElement.classList.remove('focused');
    
    // Keep has-value class if input has content
    if (input.value && input.value.trim() !== '') {
        input.parentElement.classList.add('has-value');
    } else {
        input.parentElement.classList.remove('has-value');
    }
}

function handleInputChange(e) {
    const input = e.target;
    
    // Add/remove has-value based on content
    if (input.value && input.value.trim() !== '') {
        input.parentElement.classList.add('has-value');
    } else {
        input.parentElement.classList.remove('has-value');
    }
    
    // Clear error on input
    clearError(input);
}

function handleSelectFocus(e) {
    const select = e.target;
    select.parentElement.classList.add('focused');
}

function handleSelectBlur(e) {
    const select = e.target;
    select.parentElement.classList.remove('focused');
    
    // Keep has-value class if select has a value
    if (select.value && select.value !== '') {
        select.parentElement.classList.add('has-value');
    } else {
        select.parentElement.classList.remove('has-value');
    }
}

function handleSelectChange(e) {
    const select = e.target;
    
    // Add/remove has-value based on selection
    if (select.value && select.value !== '') {
        select.parentElement.classList.add('has-value');
    } else {
        select.parentElement.classList.remove('has-value');
    }
    
    // Clear error on change
    clearError(select);
}

// ============================================
// FORM VALIDATION
// ============================================

function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    let isValid = true;

    // Clear all errors
    clearAllErrors();

    // Detect if mobile or desktop form
    const isMobile = form.id === 'contactForm';
    
    // Get fields based on form context
    const estado = isMobile ? document.getElementById('estado') : form.querySelector('[name="estado"]');
    const distribuidor = isMobile ? document.getElementById('distribuidor') : form.querySelector('[name="distribuidor"]');
    const vehiculo = isMobile ? document.getElementById('vehiculo') : form.querySelector('[name="vehiculo"]');
    const version = isMobile ? document.getElementById('version') : form.querySelector('[name="version"]');
    const nombre = isMobile ? document.getElementById('nombre') : form.querySelector('[name="nombre"]');
    const apellidoPaterno = isMobile ? document.getElementById('apellidoPaterno') : form.querySelector('[name="apellidoPaterno"]');
    const apellidoMaterno = isMobile ? document.getElementById('apellidoMaterno') : form.querySelector('[name="apellidoMaterno"]');
    const edad = isMobile ? document.getElementById('edad') : form.querySelector('[name="edad"]');
    const genero = isMobile ? document.getElementById('genero') : form.querySelector('[name="genero"]');
    const correo = isMobile ? document.getElementById('correo') : form.querySelector('[name="correo"]');
    const celular = isMobile ? document.getElementById('celular') : form.querySelector('[name="celular"]');
    const tiempoCompra = isMobile ? document.getElementById('tiempoCompra') : form.querySelector('[name="tiempoCompra"]');
    const aceptoDatos = isMobile ? document.getElementById('aceptoDatos') : form.querySelector('[name="aceptoDatos"]');
    const aceptoPrivacidad = isMobile ? document.getElementById('aceptoPrivacidad') : form.querySelector('[name="aceptoPrivacidad"]');

    // Validate Estado
    if (!estado.value) {
        showError(estado, 'Selecciona tu estado');
        isValid = false;
    }

    // Validate Distribuidor
    if (!distribuidor.value) {
        showError(distribuidor, 'Selecciona un distribuidor');
        isValid = false;
    }

    // Validate Vehiculo
    if (!vehiculo.value) {
        showError(vehiculo, 'Selecciona un modelo');
        isValid = false;
    }

    // Validate Version
    if (!version.value) {
        showError(version, 'Selecciona una versión');
        isValid = false;
    }

    // Validate Nombre
    if (!nombre.value.trim()) {
        showError(nombre, 'Ingresa tu nombre');
        isValid = false;
    } else if (nombre.value.trim().length < 2) {
        showError(nombre, 'Mínimo 2 caracteres');
        isValid = false;
    }

    // Validate Apellido Paterno
    if (!apellidoPaterno.value.trim()) {
        showError(apellidoPaterno, 'Campo requerido');
        isValid = false;
    }

    // Validate Apellido Materno
    if (!apellidoMaterno.value.trim()) {
        showError(apellidoMaterno, 'Campo requerido');
        isValid = false;
    }

    // Validate Edad
    const edadValue = parseInt(edad.value);
    if (!edad.value) {
        showError(edad, 'Campo requerido');
        isValid = false;
    } else if (edadValue < 18) {
        showError(edad, 'Debes ser mayor de edad');
        isValid = false;
    } else if (edadValue > 100) {
        showError(edad, 'Edad inválida');
        isValid = false;
    }

    // Validate Genero
    if (!genero.value) {
        showError(genero, 'Campo requerido');
        isValid = false;
    }

    // Validate Correo
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!correo.value.trim()) {
        showError(correo, 'Ingresa tu correo');
        isValid = false;
    } else if (!emailRegex.test(correo.value)) {
        showError(correo, 'Correo inválido');
        isValid = false;
    }

    // Validate Celular
    const phoneRegex = /^[0-9]{10}$/;
    if (!celular.value.trim()) {
        showError(celular, 'Ingresa tu teléfono');
        isValid = false;
    } else if (!phoneRegex.test(celular.value)) {
        showError(celular, '10 dígitos requeridos');
        isValid = false;
    }

    // Validate Tiempo Compra
    if (!tiempoCompra.value) {
        showError(tiempoCompra, 'Campo requerido');
        isValid = false;
    }

    // Validate Checkboxes
    if (!aceptoDatos.checked) {
        const errorElement = isMobile ? 
            document.getElementById('errorDatos') : 
            form.querySelector('.privacy-section .error-message:nth-of-type(1)');
        if (errorElement) {
            errorElement.textContent = 'Debes aceptar el uso de datos';
            errorElement.classList.add('show');
        }
        aceptoDatos.parentElement.classList.add('error');
        isValid = false;
    }

    if (!aceptoPrivacidad.checked) {
        const errorElement = isMobile ? 
            document.getElementById('errorPrivacidad') : 
            form.querySelector('.privacy-section .error-message:nth-of-type(2)');
        if (errorElement) {
            errorElement.textContent = 'Debes aceptar el aviso de privacidad';
            errorElement.classList.add('show');
        }
        aceptoPrivacidad.parentElement.classList.add('error');
        isValid = false;
    }

    // If valid, submit form
    if (isValid) {
        submitForm(form);
    } else {
        // Activar scroll cuando hay errores
        const isMobileLayout = window.innerWidth < 1024;
        
        if (isMobileLayout) {
            const mobileSection = document.querySelector('.form-section-mobile');
            if (mobileSection) {
                mobileSection.classList.add('has-errors');
            }
        } else {
            const desktopWrapper = document.querySelector('.form-container-desktop .form-wrapper');
            if (desktopWrapper) {
                desktopWrapper.classList.add('has-errors');
            }
        }
        
        // Scroll to first error with better UX
        const firstError = document.querySelector('.form-input.error, .form-select.error, .checkbox-label.error');
        if (firstError) {
            // Pequeño delay para que los errores se rendericen
            setTimeout(() => {
                if (isMobileLayout) {
                    // Scroll en la sección mobile
                    const mobileSection = document.querySelector('.form-section-mobile');
                    if (mobileSection) {
                        const errorPosition = firstError.getBoundingClientRect().top + mobileSection.scrollTop - 100;
                        mobileSection.scrollTo({
                            top: errorPosition,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Scroll en el form-wrapper de desktop
                    const desktopWrapper = document.querySelector('.form-container-desktop .form-wrapper');
                    if (desktopWrapper) {
                        const errorPosition = firstError.offsetTop - 100;
                        desktopWrapper.scrollTo({
                            top: errorPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }, 100);
        }
    }
}

function showError(element, message) {
    element.classList.add('error');
    const errorElement = element.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(element) {
    element.classList.remove('error');
    const errorElement = element.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearAllErrors() {
    const allInputs = document.querySelectorAll('.form-input, .form-select');
    allInputs.forEach(input => {
        clearError(input);
    });

    const allErrorMessages = document.querySelectorAll('.error-message');
    allErrorMessages.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });

    const checkboxLabels = document.querySelectorAll('.checkbox-label');
    checkboxLabels.forEach(label => label.classList.remove('error'));
    
    // Remover clase has-errors cuando se limpian todos los errores
    const mobileSection = document.querySelector('.form-section-mobile');
    const desktopWrapper = document.querySelector('.form-container-desktop .form-wrapper');
    
    if (mobileSection) {
        mobileSection.classList.remove('has-errors');
    }
    
    if (desktopWrapper) {
        desktopWrapper.classList.remove('has-errors');
    }
}

// ============================================
// FORM SUBMISSION
// ============================================

function submitForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnArrow = submitBtn.querySelector('.btn-arrow');

    // Disable button
    submitBtn.disabled = true;

    // Show loading state
    btnText.innerHTML = 'Enviando...';
    btnArrow.innerHTML = '<div class="spinner"></div>';

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate API call
    setTimeout(() => {
        console.log('Form data:', data);

        // Here you would send data to your .NET backend
        // Example:
        // fetch('/api/leads', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     // Redirect to thank you page
        //     window.location.href = 'thank-you.html';
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     submitBtn.disabled = false;
        //     btnText.innerHTML = 'Quiero mi Mitsubishi';
        //     btnArrow.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        // });

        // For demo, redirect to thank you page
        window.location.href = 'thank-you.html';
    }, 2000);
}

// ============================================
// DESKTOP EFFECTS
// ============================================

function initParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    // Create 20 particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random duration
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        
        container.appendChild(particle);
    }
}

function initMouseGradient() {
    const gradientOverlay = document.getElementById('gradientOverlay');
    if (!gradientOverlay) return;

    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        gradientOverlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(238,0,0,0.3) 0%, transparent 50%)`;
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const celularInputs = document.querySelectorAll('[name="celular"]');
    celularInputs.forEach(celular => {
        celular.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    });
});
