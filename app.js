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
            yes: "Ja",
            no: "Nej",
            step1: {
                title: "Personlige Oplysninger",
                description: "Lad os starte med det grundlæggende.",
                name: "Navn",
                namePlaceholder: "Indtast dit navn",
                email: "Email",
                emailPlaceholder: "Indtast din email"
            },
            step2: {
                title: "Adresse",
                description: "Hvor bor du?"
            },
            step3: {
                title: "Kontaktoplysninger",
                description: "Hvordan kan vi nå dig?"
            },
            step4: {
                title: "Frivillig Erfaring",
                description: "Fortæl os om din baggrund"
            },
            step5: {
                title: "Gruppe & Bemærkninger",
                description: "Yderligere information"
            },
            step6: {
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
        },
        fields: {
            volNo: "People-VOL-nr.",
            firstNames: "Fornavn og mellemnavn",
            lastName: "Efternavn",
            birthdate: "Fødselsdag",
            address: "Adresse",
            postcode: "Postnummer",
            city: "By",
            country: "Land",
            phone: "Tlf. nr.",
            phoneCountry: "Landekode",
            previousVolunteerQuestion: "Tidligere frivillig hos BUSBUS?",
            experienceLabel: "Har du relevant erhvervserfaring, kan du evt. skrive det her.",
            inGroupQuestion: "Er du i gruppe med andre?",
            groupName: "Gruppenavn",
            remarks: "Evt. bemærkninger",
            parentName: "Navn på forælder/værge",
            parentPhone: "Telefonnummer på forælder/værge",
            under18Notice: "Hvis under 18 år, angiv forælder eller værge"
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
            yes: "Yes",
            no: "No",
            step1: {
                title: "Personal Information",
                description: "Let's start with the basics.",
                name: "Name",
                namePlaceholder: "Enter your name",
                email: "Email",
                emailPlaceholder: "Enter your email"
            },
            step2: {
                title: "Address",
                description: "Where do you live?"
            },
            step3: {
                title: "Contact Information",
                description: "How can we reach you?"
            },
            step4: {
                title: "Volunteer Experience",
                description: "Tell us about your background"
            },
            step5: {
                title: "Group & Remarks",
                description: "Additional information"
            },
            step6: {
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
        },
        fields: {
            volNo: "People-VOL-no.",
            firstNames: "First and middle name",
            lastName: "Last name",
            birthdate: "Birthdate",
            address: "Address",
            postcode: "Postal code",
            city: "City",
            country: "Country",
            phone: "Phone",
            phoneCountry: "Country code",
            previousVolunteerQuestion: "Previously volunteered at BUSBUS?",
            experienceLabel: "Do you have relevant work experience? You can write it here.",
            inGroupQuestion: "Are you in a group with others?",
            groupName: "Group name",
            remarks: "Any comments",
            parentName: "Parent/guardian name",
            parentPhone: "Parent/guardian phone",
            under18Notice: "If under 18, provide parent or guardian contact"
        }
    }
};

// ========================================
// STATE MANAGEMENT
// ========================================

const state = {
    // For multi-page setup we still track step and language
    currentStep: 1,
    totalSteps: 6,
    currentLanguage: localStorage.getItem('language') || 'da',
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
    // Update text content (preserve inner required markers when present)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const requiredEl = element.querySelector('.required');
        const requiredHTML = requiredEl ? requiredEl.outerHTML : '';
        // Set translated text and re-attach required marker if needed
        element.innerHTML = `${t(key)}${requiredHTML ? ' ' + requiredHTML : ''}`;
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

/**
 * Check if given birthdate string indicates age under 18 as of June 27, 2026
 * @param {string} birthdate - ISO date string (YYYY-MM-DD)
 * @returns {boolean}
 */
function isUnder18(birthdate) {
    if (!birthdate) return false;
    const bd = new Date(birthdate + 'T00:00:00');
    if (isNaN(bd)) return false;
    // Target date: June 27, 2026
    const targetDate = new Date('2026-06-27T00:00:00');
    let age = targetDate.getFullYear() - bd.getFullYear();
    const m = targetDate.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && targetDate.getDate() < bd.getDate())) {
        age--;
    }
    return age < 18;
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
    
    // Populate review step if on step 6
    if (stepNumber === 6) {
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
    
    // Additional conditional checks
    try {
        // If group field is shown and inGroup is yes, require groupName
            if (state.currentStep === 5) {
                const inGroup = document.querySelector('input[name="inGroup"]:checked')?.value;
                if (inGroup === 'yes') {
                    const groupName = document.getElementById('groupName');
                    if (groupName && !groupName.value.trim()) {
                        isValid = false;
                        groupName.closest('.form-group').classList.add('has-error');
                        groupName.classList.add('error');
                    }
                }
            }

            // If applicant is under 18 on June 27 2026, require parent contact fields on step 6
            if (state.currentStep === 6) {
                const parentName = document.getElementById('parentName');
                const parentPhone = document.getElementById('parentPhone');
                // Only validate if parent fields are visible/required
                if (parentName && parentName.required && parentPhone && parentPhone.required) {
                    if (!parentName.value.trim() || !parentPhone.value.trim()) {
                        isValid = false;
                        if (!parentName.value.trim()) {
                            parentName.closest('.form-group').classList.add('has-error');
                            parentName.classList.add('error');
                        }
                        if (!parentPhone.value.trim()) {
                            parentPhone.closest('.form-group').classList.add('has-error');
                            parentPhone.classList.add('error');
                        }
                    }
                }
            }
        }
    } catch (e) {
        // ignore and allow normal validation to surface other errors
    }

    return isValid;
}


/**
 * Collect form data from all steps
 * @returns {Object} Form data
 */
function collectFormData() {
    const formData = {
        volNo: document.getElementById('volNo')?.value.trim() || null,
        firstNames: document.getElementById('firstNames')?.value.trim() || null,
        lastName: document.getElementById('lastName')?.value.trim() || null,
        birthdate: document.getElementById('birthdate')?.value || null,
        address: document.getElementById('address')?.value.trim() || null,
        postcode: document.getElementById('postcode')?.value.trim() || null,
        city: document.getElementById('city')?.value.trim() || null,
        country: document.getElementById('country')?.value || null,
        phoneCountry: document.getElementById('phoneCountry')?.value || null,
        phone: document.getElementById('phone')?.value.trim() || null,
        previousVolunteer: document.querySelector('input[name="previousVolunteer"]:checked')?.value || null,
        experience: document.getElementById('experience')?.value.trim() || null,
        inGroup: document.querySelector('input[name="inGroup"]:checked')?.value || null,
        groupName: document.getElementById('groupName')?.value.trim() || null,
        remarks: document.getElementById('remarks')?.value.trim() || null,
        parentName: document.getElementById('parentName')?.value.trim() || null,
        parentPhone: document.getElementById('parentPhone')?.value.trim() || null
    };

    return formData;
}

/**
 * Populate the review step with form data
 */
function populateReview() {
    const data = collectFormData();

    document.getElementById('review-volNo').textContent = data.volNo || '-';
    document.getElementById('review-firstNames').textContent = data.firstNames || '-';
    document.getElementById('review-lastName').textContent = data.lastName || '-';
    document.getElementById('review-birthdate').textContent = data.birthdate || '-';
    document.getElementById('review-address').textContent = data.address || '-';
    document.getElementById('review-postcode').textContent = data.postcode || '-';
    document.getElementById('review-city').textContent = data.city || '-';
    document.getElementById('review-country').textContent = data.country || '-';
    document.getElementById('review-phone').textContent = `${data.phoneCountry || ''} ${data.phone || ''}`.trim() || '-';

    document.getElementById('review-previousVolunteer').textContent = data.previousVolunteer || '-';
    document.getElementById('review-experience').textContent = data.experience || '-';
    document.getElementById('review-inGroup').textContent = data.inGroup || '-';
    document.getElementById('review-groupName').textContent = data.groupName || '-';
    document.getElementById('review-remarks').textContent = data.remarks || '-';

    // Parent info show/hide
    const parentSection = document.getElementById('review-parent');
    if (isUnder18(data.birthdate)) {
        if (parentSection) parentSection.style.display = 'block';
        document.getElementById('review-parentName').textContent = data.parentName || '-';
        document.getElementById('review-parentPhone').textContent = data.parentPhone || '-';
    } else {
        if (parentSection) parentSection.style.display = 'none';
    }
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
                name: `${formData.firstNames || ''} ${formData.lastName || ''}`.trim() || null,
                phone: formData.phone || null
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
    // Navigate back to landing page (index.html)
    if (window.location.pathname.endsWith('form.html')) {
        // If currently on form page, reset to step 1 and keep user here
        showStep(1);
    } else {
        window.location.href = 'index.html';
    }
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

        // Group name toggle: show groupName input when inGroup === 'yes'
        function updateGroupVisibility() {
            const inGroup = document.querySelector('input[name="inGroup"]:checked')?.value;
            const wrap = document.getElementById('groupNameWrap');
            const groupName = document.getElementById('groupName');
            if (inGroup === 'yes') {
                if (wrap) wrap.style.display = 'block';
                if (groupName) groupName.required = true;
            } else {
                if (wrap) wrap.style.display = 'none';
                if (groupName) {
                    groupName.required = false;
                    groupName.value = '';
                }
            }
        }
        document.querySelectorAll('input[name="inGroup"]').forEach(r => r.addEventListener('change', updateGroupVisibility));
        updateGroupVisibility();

        // Birthdate -> parent contact visibility when under 18
        const birthEl = document.getElementById('birthdate');
        function updateParentVisibility() {
            const val = birthEl?.value;
            const container = document.getElementById('parentContact');
            const parentName = document.getElementById('parentName');
            const parentPhone = document.getElementById('parentPhone');
            if (val && isUnder18(val)) {
                if (container) container.style.display = 'block';
                if (parentName) parentName.required = true;
                if (parentPhone) parentPhone.required = true;
            } else {
                if (container) container.style.display = 'none';
                if (parentName) {
                    parentName.required = false;
                    parentName.value = '';
                }
                if (parentPhone) {
                    parentPhone.required = false;
                    parentPhone.value = '';
                }
            }
        }
        if (birthEl) {
            birthEl.addEventListener('change', updateParentVisibility);
            updateParentVisibility();
        }

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
                const confName = document.getElementById('conf-name');
                if (confName && data.name) {
                    confName.textContent = data.name;
                }
            } catch (e) { /* ignore parsing errors */ }
        }
    }

});

// ========================================
// EXPORTS (for potential future use)
// ========================================

export { setLanguage, navigateTo, showToast, t };
