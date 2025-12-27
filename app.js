// ========================================
// FIREBASE CONFIGURATION & INITIALIZATION
const i18n = {
    da: {
        landing: {
            headline: "Frivillig hos BUSBUS",
            description: `
                <p>Roskilde Festival 2025 ligger fra lørdag d. 28/6 til lørdag d. 5/7 - og BUSBUS har åbent alle dage.</p>
                <p>BUSBUS ligger i Central Park på Ydre Plads med udsigt ind til Orange Sceneplads. Vi sælger bl.a. brunch, flæskestegssandwich og stegt flæsk med persillesovs.</p>
                <h2>Sådan tilmelder du dig:</h2>
                <p>Tryk på ‘start’ nederst på siden og udfyld tilmeldingen. Husk at læse og godkende betingelserne til sidst.</p>
                <p>Er du i gruppe med andre, er det vigtigt, at I skriver samme gruppenavn i jeres tilmelding, da vores system ellers ikke kan se, at I skal have jeres vagter sammen.</p>
                <p>Herefter modtager du en mail med emnet ‘Velkommen som frivillig hos BUSBUS’, hvor du kan se dine svar i tilmeldingen.</p>
                <p>Du er nu oprettet som frivillig hos BUSBUS og sikret et armbånd til festivalen.</p>
                <h2>Hvad sker der så?</h2>
                <p>Senest d. 16/6 modtager du vagtplan og al relevant information om afhentning af armbånd mm.</p>
                <h2>Få svar på dine spørgsmål:</h2>
                <p>På Roskilde Festivals hjemmeside kan du få svar på alle dine spørgsmål om at være frivillig på festivalen: Roskilde Festival - FAQ</p>
                <p>Vi opfordrer dig til at søge information på Roskilde Festivals hjemmeside, men finder du ikke svar her, kan du selvfølgelig altid kontakte os på følgende mail: <a href="mailto:busbus.roskilde@gmail.com">busbus.roskilde@gmail.com</a></p>
                <p>Vi glæder os til en god festival.</p>
                <p>De bedste hilsner<br>Jonas og Susanne / BUSBUS</p>
            `,
            cta: "Start"
        },
        intro: {
            headline: "People-VOL-nr.",
            p1: `<p>Alle frivillige på Roskilde Festival skal have en profil i festivalens interne system kaldet People-VOL. Alle med en profil i systemet har et individuelt People-VOL-nummer. Nummeret skal du bruge for at kunne tilmelde dig som frivillig hos BUSBUS.</p>`,
            findTitle: "Jeg HAR tidligere været frivillig på Roskilde Festival og har en People-VOL-profil:",
            findText: `<p>Har du tidligere været frivillig på Roskilde Festival, så har du allerede et People-VOL-nummer.</p>
                       <p>Kan du ikke huske dit People-VOL-nummer, kan du finde det ved at trykke på den blå bjælke 'Find mit People-VOL-nummer' nedenunder. Husk at notere nummeret, så du har det, når du skal indtaste det i vores system.</p>`,
            findBtn: "Find mit People-VOL-nummer",
            createTitle: "Jeg har IKKE tidligere været frivillig og har ikke en People-VOL-profil:",
            createText: `<p>Har du IKKE tidligere været frivillig på Roskilde Festival, skal du først oprette en profil i People-VOL inden, at du kan fortsætte din tilmelding hos BUSBUS. Husk at notere dit nye People-VOL-nummer. Du opretter en profil ved at trykke på bjælken nedenunder.</p>`,
            createBtn: "Opret People-VOL-profil",
            startTitle: "Start tilmelding som frivillig hos BUSBUS:",
            startBtn: "Start tilmelding"
        },
        form: {
            step: "Trin",
            back: "Tilbage",
            next: "Næste",
            submit: "Indsend",
            submitting: "Indsender...",
            yes: "Ja",
            no: "Nej",
            step1: {
                title: "Personlige Oplysninger",
                description: "Grundlæggende information"
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
                description: "Tjek dine oplysninger før du sender"
            },
            errors: {
                required: "Dette felt er påkrævet",
                email: "Indtast venligst en gyldig email-adresse"
            }
        },
        confirmation: {
            title: "Tak!",
            message: "Din indsendelse er modtaget. Vi vender tilbage snart.",
            reset: "Start Forfra",
            newSubmission: "Ny tilmelding"
        },
        toast: {
            success: "Indsendelse gennemført!",
            error: "Der opstod en fejl. Prøv venligst igen."
        },
        fields: {
            volNo: "People-VOL-nr.",
            volNoPlaceholder: "f.eks. 123456",
            firstNames: "Fornavn og mellemnavn",
            firstNamesPlaceholder: "f.eks. Anna Marie",
            lastName: "Efternavn",
            lastNamePlaceholder: "f.eks. Jensen",
            birthdate: "Fødselsdag",
            birthdateHint: "Vi tjekker om du er under 18 d. 27. juni 2026",
            address: "Adresse",
            addressPlaceholder: "f.eks. Hovedgaden 12",
            postcode: "Postnummer",
            postcodePlaceholder: "2100",
            city: "By",
            cityPlaceholder: "f.eks. København",
            country: "Land",
            phone: "Tlf. nr.",
            phonePlaceholder: "12345678",
            phoneCountry: "Landekode",
            email: "E-mail",
            emailPlaceholder: "f.eks. navn@email.dk",
            previousVolunteerQuestion: "Tidligere frivillig hos BUSBUS?",
            experienceLabel: "Har du relevant erhvervserfaring? Skriv her (valgfrit)",
            experiencePlaceholder: "Beskriv din erfaring...",
            inGroupQuestion: "Er du i gruppe med andre?",
            groupName: "Gruppenavn",
            groupNamePlaceholder: "f.eks. Team København",
            remarks: "Evt. bemærkninger",
            remarksPlaceholder: "Eventuelle kommentarer...",
            parentSectionTitle: "Kontaktoplysninger på forælder eller værge",
            parentSectionDescription: "Du er under 18 år d. 27. juni 2026, så vi har brug for kontaktoplysninger på din forælder/værge.",
            parentName: "Navn på forælder/værge",
            parentNamePlaceholder: "Forældres fulde navn",
            parentPhone: "Telefonnummer på forælder/værge",
            parentPhonePlaceholder: "12345678"
        },
        review: {
            personal: "Personlige Oplysninger",
            address: "Adresse",
            contact: "Kontakt",
            experience: "Erfaring",
            group: "Gruppe & Bemærkninger",
            parent: "Forældre / Værge",
            labels: {
                volNo: "People-VOL-nr.",
                firstNames: "Fornavn",
                lastName: "Efternavn",
                birthdate: "Fødselsdag",
                address: "Adresse",
                postcode: "Postnummer",
                city: "By",
                country: "Land",
                phone: "Telefon",
                email: "E-mail",
                previousVolunteer: "Tidligere frivillig",
                experience: "Erhvervserfaring",
                inGroup: "I gruppe?",
                groupName: "Gruppenavn",
                remarks: "Bemærkninger",
                parentName: "Navn",
                parentPhone: "Telefon"
            }
        },
        options: {
            countryPlaceholder: "Vælg land",
            countryDK: "Danmark (DK)",
            countryNO: "Norge (NO)",
            countrySE: "Sverige (SE)",
            countryDE: "Tyskland (DE)",
            countryUK: "Storbritannien (UK)",
            countryOther: "Andet",
            phoneDK: "DK +45",
            phoneNO: "NO +47",
            phoneSE: "SE +46",
            phoneDE: "DE +49",
            phoneUK: "UK +44",
            phoneOther: "Andet"
        }
    },
    en: {
        landing: {
            headline: "Volunteer at BUSBUS",
            description: `
                <p>Roskilde Festival 2025 runs from Saturday 28/6 to Saturday 5/7 — and BUSBUS is open every day.</p>
                <p>BUSBUS is located in Central Park on the Outer Plaza with a view towards the Orange Stage area. We sell, among other things, brunch, pork roast sandwiches and fried pork with parsley sauce.</p>
                <h2>How to sign up:</h2>
                <p>Click “Start” at the bottom of the page and complete the registration. Remember to read and accept the terms at the end.</p>
                <p>If you are in a group with others, it's important that you enter the same group name in your registrations so our system can schedule your shifts together.</p>
                <p>Afterwards you'll receive an email with the subject ‘Welcome as a volunteer at BUSBUS’ where you can view your registration answers.</p>
                <p>You are now registered as a volunteer at BUSBUS and secured a wristband for the festival.</p>
                <h2>What happens next?</h2>
                <p>Latest by 16/6 you will receive the shift schedule and all relevant information about wristband collection etc.</p>
                <h2>Find answers to your questions:</h2>
                <p>On Roskilde Festival's website you can find answers to all your questions about volunteering: Roskilde Festival - FAQ</p>
                <p>We encourage you to look on Roskilde Festival's site first, but if you can't find an answer you can always contact us at: <a href="mailto:busbus.roskilde@gmail.com">busbus.roskilde@gmail.com</a></p>
                <p>We look forward to a great festival.</p>
                <p>Best regards<br>Jonas and Susanne / BUSBUS</p>
            `,
            cta: "Start"
        },
        form: {
            step: "Step",
            back: "Back",
            next: "Next",
            submit: "Submit",
            submitting: "Submitting...",
            yes: "Yes",
            no: "No",
            step1: {
                title: "Personal Information",
                description: "Let's start with the basics."
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
                description: "Review your details before submitting."
            },
            errors: {
                required: "This field is required",
                email: "Please enter a valid email address"
            }
        },
        confirmation: {
            title: "Thank You!",
            message: "Your submission has been received. We'll be in touch soon.",
            reset: "Start Over",
            newSubmission: "Submit Another"
        },
        toast: {
            success: "Submission successful!",
            error: "An error occurred. Please try again."
        },
        fields: {
            volNo: "People-VOL-no.",
            volNoPlaceholder: "e.g. 123456",
            firstNames: "First and middle name",
            firstNamesPlaceholder: "e.g. Anna Marie",
            lastName: "Last name",
            lastNamePlaceholder: "e.g. Johnson",
            birthdate: "Birthdate",
            birthdateHint: "We check if you are under 18 on 27 June 2026",
            address: "Address",
            addressPlaceholder: "e.g. Main Street 12",
            postcode: "Postal code",
            postcodePlaceholder: "2100",
            city: "City",
            cityPlaceholder: "e.g. Copenhagen",
            country: "Country",
            phone: "Phone",
            phonePlaceholder: "12345678",
            phoneCountry: "Country code",
            email: "Email",
            emailPlaceholder: "e.g. name@email.com",
            previousVolunteerQuestion: "Previously volunteered at BUSBUS?",
            experienceLabel: "Do you have relevant work experience? Write it here (optional)",
            experiencePlaceholder: "Describe your experience...",
            inGroupQuestion: "Are you in a group with others?",
            groupName: "Group name",
            groupNamePlaceholder: "e.g. Team Copenhagen",
            remarks: "Any comments",
            remarksPlaceholder: "Any additional comments...",
            parentSectionTitle: "Parent or guardian contact details",
            parentSectionDescription: "You are under 18 on 27 June 2026, so we need contact details for your parent/guardian.",
            parentName: "Parent/guardian name",
            parentNamePlaceholder: "Full name of parent",
            parentPhone: "Parent/guardian phone",
            parentPhonePlaceholder: "12345678"
        },
        review: {
            personal: "Personal Information",
            address: "Address",
            contact: "Contact",
            experience: "Experience",
            group: "Group & Remarks",
            parent: "Parent / Guardian",
            labels: {
                volNo: "People-VOL-no.",
                firstNames: "First names",
                lastName: "Last name",
                birthdate: "Birthdate",
                address: "Address",
                postcode: "Postal code",
                city: "City",
                country: "Country",
                phone: "Phone",
                email: "Email",
                previousVolunteer: "Previous volunteer",
                experience: "Work experience",
                inGroup: "In group?",
                groupName: "Group name",
                remarks: "Remarks",
                parentName: "Name",
                parentPhone: "Phone"
            }
        },
        options: {
            countryPlaceholder: "Select country",
            countryDK: "Denmark (DK)",
            countryNO: "Norway (NO)",
            countrySE: "Sweden (SE)",
            countryDE: "Germany (DE)",
            countryUK: "United Kingdom (UK)",
            countryOther: "Other",
            phoneDK: "DK +45",
            phoneNO: "NO +47",
            phoneSE: "SE +46",
            phoneDE: "DE +49",
            phoneUK: "UK +44",
            phoneOther: "Other"
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

    // If on review step, refresh summary to reflect new language
    if (document.getElementById('wizard-form') && state.currentStep === 6) {
        populateReview();
    }
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

    if (state.currentStep === 6) {
        const parentName = document.getElementById('parentName');
        const parentPhone = document.getElementById('parentPhone');
        if (parentName && parentName.required && parentPhone && parentPhone.required) {
            const parentNameValue = parentName.value.trim();
            const parentPhoneValue = parentPhone.value.trim();
            if (!parentNameValue || !parentPhoneValue) {
                isValid = false;
                if (!parentNameValue) {
                    parentName.closest('.form-group').classList.add('has-error');
                    parentName.classList.add('error');
                }
                if (!parentPhoneValue) {
                    parentPhone.closest('.form-group').classList.add('has-error');
                    parentPhone.classList.add('error');
                }
            }
        }
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
        email: document.getElementById('email')?.value.trim() || null,
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
    const countryKeyMap = {
        dk: 'options.countryDK',
        no: 'options.countryNO',
        se: 'options.countrySE',
        de: 'options.countryDE',
        en: 'options.countryUK',
        other: 'options.countryOther'
    };

    const booleanLabel = (value) => {
        if (value === 'yes') return t('form.yes');
        if (value === 'no') return t('form.no');
        return '-';
    };

    document.getElementById('review-volNo').textContent = data.volNo || '-';
    document.getElementById('review-firstNames').textContent = data.firstNames || '-';
    document.getElementById('review-lastName').textContent = data.lastName || '-';
    document.getElementById('review-birthdate').textContent = data.birthdate || '-';
    document.getElementById('review-address').textContent = data.address || '-';
    document.getElementById('review-postcode').textContent = data.postcode || '-';
    document.getElementById('review-city').textContent = data.city || '-';
    const countryLabelKey = data.country ? countryKeyMap[data.country] : null;
    document.getElementById('review-country').textContent = countryLabelKey ? t(countryLabelKey) : '-';
    document.getElementById('review-phone').textContent = `${data.phoneCountry || ''} ${data.phone || ''}`.trim() || '-';
    document.getElementById('review-email').textContent = data.email || '-';

    document.getElementById('review-previousVolunteer').textContent = booleanLabel(data.previousVolunteer);
    document.getElementById('review-experience').textContent = data.experience || '-';
    document.getElementById('review-inGroup').textContent = booleanLabel(data.inGroup);
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
    btnSubmit.textContent = t('form.submitting');
    
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
        startBtn.href = 'intro.html';
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
