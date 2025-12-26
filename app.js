// ========================================
// FIREBASE CONFIGURATION & INITIALIZATION
// ========================================

// Import Firebase SDK v9 modular functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase configuration object
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app, db;
try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// ========================================
// INTERNATIONALIZATION (i18n) DICTIONARY
// ========================================

const i18n = {
    da: {
        landing: {
            headline: "Velkommen til BusBus",
            description: "Din rejse starter her. Tilmeld dig for at komme i gang og udforsk fantastiske muligheder.",
            cta: "Start"
        },
        form: {
            step: "Trin",
            back: "Tilbage",
            next: "Næste",
            submit: "Indsend",
            step1: {
                title: "Personlige Oplysninger",
                description: "Lad os starte med det grundlæggende.",
                name: "Navn",
                namePlaceholder: "Indtast dit navn",
                email: "Email",
                emailPlaceholder: "Indtast din email"
            },
            step2: {
                title: "Professionelle Detaljer",
                description: "Fortæl os om dit arbejde (valgfrit).",
                company: "Virksomhed",
                companyPlaceholder: "Indtast virksomhedsnavn",
                role: "Rolle",
                rolePlaceholder: "Indtast din rolle"
            },
            step3: {
                title: "Dine Præferencer",
                description: "Hjælp os med at forstå dine behov bedre.",
                interest: "Hvad er du mest interesseret i?",
                option1: "Produktopdateringer",
                option2: "Events & Workshops",
                option3: "Nyhedsbrev",
                option4: "Andet",
                notes: "Yderligere Noter",
                notesPlaceholder: "Skriv eventuelle yderligere kommentarer..."
            },
            step4: {
                title: "Gennemse & Indsend",
                description: "Venligst gennemse dine oplysninger før indsendelse."
            },
            errors: {
                required: "Dette felt er påkrævet",
                email: "Indtast venligst en gyldig email-adresse"
            }
        },
        confirmation: {
            title: "Tak!",
            message: "Din indsendelse er modtaget. Vi vender tilbage snart.",
            reset: "Start Forfra"
        },
        toast: {
            success: "Indsendelse gennemført!",
            error: "Der opstod en fejl. Prøv venligst igen."
        }
    },
    en: {
        landing: {
            headline: "Welcome to BusBus",
            description: "Your journey starts here. Sign up to get started and explore amazing possibilities.",
            cta: "Start"
        },
        form: {
            step: "Step",
            back: "Back",
            next: "Next",
            submit: "Submit",
            step1: {
                title: "Personal Information",
                description: "Let's start with the basics.",
                name: "Name",
                namePlaceholder: "Enter your name",
                email: "Email",
                emailPlaceholder: "Enter your email"
            },
            step2: {
                title: "Professional Details",
                description: "Tell us about your work (optional).",
                company: "Company",
                companyPlaceholder: "Enter company name",
                role: "Role",
                rolePlaceholder: "Enter your role"
            },
            step3: {
                title: "Your Preferences",
                description: "Help us understand your needs better.",
                interest: "What are you most interested in?",
                option1: "Product Updates",
                option2: "Events & Workshops",
                option3: "Newsletter",
                option4: "Other",
                notes: "Additional Notes",
                notesPlaceholder: "Write any additional comments..."
            },
            step4: {
                title: "Review & Submit",
                description: "Please review your information before submitting."
            },
            errors: {
                required: "This field is required",
                email: "Please enter a valid email address"
            }
        },
        confirmation: {
            title: "Thank You!",
            message: "Your submission has been received. We'll be in touch soon.",
            reset: "Start Over"
        },
        toast: {
            success: "Submission successful!",
            error: "An error occurred. Please try again."
        }
    }
};

// ========================================
// STATE MANAGEMENT
// ========================================

const state = {
    // For multi-page setup we still track step and language
    currentStep: 1,
    totalSteps: 4,
    currentLanguage: localStorage.getItem('language') || 'en',
    formData: {}
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Get translated text for a given key path
 * @param {string} keyPath - Dot notation path to translation (e.g., "landing.headline")
 * @returns {string} Translated text
 */
function t(keyPath) {
    const keys = keyPath.split('.');
    let value = i18n[state.currentLanguage];
    
    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) {
            console.warn(`Translation missing: ${keyPath}`);
            return keyPath;
        }
    }
    
    return value;
}

/**
 * Update all translatable elements in the DOM
 */
function updateTranslations() {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        element.setAttribute('aria-label', t(key));
    });
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type: 'success' or 'error'
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Switch between views with fade animation
 * @param {string} viewName - Name of the view to show
 */
// No single-page view switching; navigation is done via separate HTML pages.
function navigateTo(path) {
    window.location.href = path;
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// LANGUAGE SWITCHING
// ========================================

/**
 * Set the active language
 * @param {string} lang - Language code ('da' or 'en')
 */
function setLanguage(lang) {
    state.currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all translations
    updateTranslations();
    
    // Update document language attribute
    document.documentElement.lang = lang;
}

// ========================================
// FORM WIZARD LOGIC
// ========================================

/**
 * Update progress bar based on current step
 */
function updateProgress() {
    const progress = ((state.currentStep - 1) / (state.totalSteps - 1)) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const currentStepEl = document.getElementById('current-step');
    const totalStepsEl = document.getElementById('total-steps');
    
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.round(progress)}%`;
    currentStepEl.textContent = state.currentStep;
    if (totalStepsEl) totalStepsEl.textContent = state.totalSteps;
}

/**
 * Show a specific form step
 * @param {number} stepNumber - Step number to show
 */
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    currentStep.classList.add('active');
    
    // Update button visibility
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    
    btnBack.style.display = stepNumber === 1 ? 'none' : 'block';
    btnNext.style.display = stepNumber === state.totalSteps ? 'none' : 'block';
    btnSubmit.style.display = stepNumber === state.totalSteps ? 'block' : 'none';
    
    // Update progress
    state.currentStep = stepNumber;
    updateProgress();
    
    // Populate review step if on step 4
    if (stepNumber === 4) {
        populateReview();
    }
}

/**
 * Validate current step fields
 * @returns {boolean} True if step is valid
 */
function validateStep() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${state.currentStep}"]`);
    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('has-error');
        field.classList.remove('error');
        
        // Validate based on field type
        if (field.type === 'radio') {
            const radioGroup = currentStepEl.querySelector(`input[name="${field.name}"]:checked`);
            if (!radioGroup) {
                isValid = false;
                formGroup.classList.add('has-error');
            }
        } else if (field.type === 'email') {
            if (!field.value.trim() || !isValidEmail(field.value.trim())) {
                isValid = false;
                formGroup.classList.add('has-error');
                field.classList.add('error');
            }
        } else {
            if (!field.value.trim()) {
                isValid = false;
                formGroup.classList.add('has-error');
                field.classList.add('error');
            }
        }
    });
    
    return isValid;
}

/**
 * Collect form data from all steps
 * @returns {Object} Form data
 */
function collectFormData() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim() || null,
        role: document.getElementById('role').value.trim() || null,
        interest: document.querySelector('input[name="interest"]:checked')?.value || null,
        notes: document.getElementById('notes').value.trim() || null
    };
    
    return formData;
}

/**
 * Populate the review step with form data
 */
function populateReview() {
    const data = collectFormData();
    
    document.getElementById('review-name').textContent = data.name || '-';
    document.getElementById('review-email').textContent = data.email || '-';
    document.getElementById('review-company').textContent = data.company || '-';
    document.getElementById('review-role').textContent = data.role || '-';
    
    // Translate interest value
    const interestKey = `form.step3.option${['product', 'events', 'newsletter', 'other'].indexOf(data.interest) + 1}`;
    document.getElementById('review-interest').textContent = data.interest ? t(interestKey) : '-';
    
    document.getElementById('review-notes').textContent = data.notes || '-';
}

/**
 * Submit form data to Firebase Firestore
 */
async function submitForm() {
    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit.disabled = true;
    btnSubmit.textContent = state.currentLanguage === 'da' ? 'Indsender...' : 'Submitting...';
    
    try {
        const formData = collectFormData();
        
        // Prepare submission data
        const submission = {
            createdAt: serverTimestamp(),
            language: state.currentLanguage,
            answers: formData,
            userAgent: navigator.userAgent,
            referrer: document.referrer || null
        };
        
        // Save to Firestore
        const docRef = await addDoc(collection(db, 'submissions'), submission);
        console.log('Document written with ID:', docRef.id);
        
        // Show success message
        showToast(t('toast.success'), 'success');

        // Store a small summary in sessionStorage for the confirmation page
        try {
            const small = {
                id: docRef.id,
                name: formData.name || null,
                email: formData.email || null
            };
            sessionStorage.setItem('lastSubmission', JSON.stringify(small));
        } catch (e) {
            console.warn('Could not save submission summary to sessionStorage', e);
        }

        // Redirect to confirmation page
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 800);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast(t('toast.error'), 'error');
        btnSubmit.disabled = false;
        btnSubmit.textContent = t('form.submit');
    }
}

/**
 * Reset the entire application
 */
function resetApp() {
    // Reset form
    document.getElementById('wizard-form').reset();
    
    // Clear error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
    });
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    // Reset state
    state.currentStep = 1;
    state.formData = {};
    
    // Show landing view
    switchView('landing');
    
    // Reset form to step 1
    showStep(1);
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language on every page
    setLanguage(state.currentLanguage);

    // Language switcher (present on all pages)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });

    // Landing page: 'btn-start' links to form.html — no JS needed beyond translation
    const startBtn = document.getElementById('btn-start');
    if (startBtn) {
        // anchor already navigates; ensure it has translated text
        startBtn.href = 'form.html';
    }

    // Form page initialization
    const wizardForm = document.getElementById('wizard-form');
    if (wizardForm) {
        // Show initial step
        showStep(1);

        // Back button
        document.getElementById('btn-back').addEventListener('click', () => {
            if (state.currentStep > 1) showStep(state.currentStep - 1);
        });

        // Next button
        document.getElementById('btn-next').addEventListener('click', () => {
            if (validateStep()) {
                if (state.currentStep < state.totalSteps) showStep(state.currentStep + 1);
            }
        });

        // Form submission
        wizardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateStep()) submitForm();
        });

        // Real-time validation removal
        document.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => {
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('has-error');
                    field.classList.remove('error');
                }
            });
        });

        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const formGroup = radio.closest('.form-group');
                if (formGroup) formGroup.classList.remove('has-error');
            });
        });

        // Initialize progress
        updateProgress();
    }

    // Confirmation page: nothing complicated; allow Start Over navigation
    const confirmation = document.querySelector('.confirmation-content');
    if (confirmation) {
        // Optionally show name from session storage
        const submission = sessionStorage.getItem('lastSubmission');
        if (submission) {
            try {
                const data = JSON.parse(submission);
                const msgEl = document.querySelector('[data-i18n="confirmation.message"]');
                if (msgEl) {
                    // If Danish/English text contains full sentence, we keep translation but can append name
                }
            } catch (e) { /* ignore parsing errors */ }
        }
    }

});

// ========================================
// EXPORTS (for potential future use)
// ========================================

export { setLanguage, navigateTo, showToast, t };
