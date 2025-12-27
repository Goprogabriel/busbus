// ========================================
// FIREBASE CONFIGURATION & INITIALIZATION
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// Your web app's Firebase configuration (provided)
const firebaseConfig = {
    apiKey: "AIzaSyBPZD1qOVmUAqiRKMA2EIy75vIapkjZpTA",
    authDomain: "busbus-a4556.firebaseapp.com",
    projectId: "busbus-a4556",
    storageBucket: "busbus-a4556.firebasestorage.app",
    messagingSenderId: "986020652124",
    appId: "1:986020652124:web:1beeceac928db31c823299",
    measurementId: "G-20L316JRVP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
let analytics;
try { analytics = getAnalytics(firebaseApp); } catch (e) { /* analytics may not be available in some environments */ }
const db = getFirestore(firebaseApp);

const i18n = {
    da: {
        landing: {
            headline: "Frivillig hos BUSBUS",
            description: `
                <p>Roskilde Festival 2026 ligger fra lørdag d. 27/6 til lørdag d. 4/7 - og BUSBUS har åbent alle dage.</p>
                <p>BUSBUS ligger i Central Park på Ydre Plads med udsigt ind til Orange Sceneplads. Vi sælger bl.a. brunch, flæskestegssandwich og stegt flæsk med persillesovs.</p>
                <h2>Sådan tilmelder dig dig</h2>
                <p>Tryk på ‘start’ nederst på siden og udfyld tilmeldingen. Husk at læse og godkende betingelserne til sidst i tilmeldingen.</p>
                <p>Herefter modtager du en mail med emnet ‘Velkommen som frivillig hos BUSBUS’, hvor du kan se din tilmelding.</p>
                <p>Du er nu oprettet som frivillig hos BUSBUS og sikret et armbånd til festivalen.</p>
                <p>Er du i gruppe med andre, er det vigtigt, at I skriver samme gruppenavn i jeres tilmelding, da vores system ellers ikke kan se, at I skal have jeres vagter sammen.</p>
                <h2>Hvad sker der så?</h2>
                <p>Senest d. 16/6 modtager du vagtplan og al relevant information om afhentning af armbånd mm.</p>
                <h2>Få svar på dine spørgsmål:</h2>
                <p>På Roskilde Festivals hjemmeside kan du få svar på alle dine spørgsmål om at være frivillig på festivalen: <a href="https://faq.roskilde-festival.dk/hc/da/sections/14361365551773-Bliv-frivillig?_gl=1*1onv2tx*_gcl_au*MTMyOTc2MjM4LjE3MzM3NDc1ODQ.*_ga*MTY3NzAxODg2LjE3MTcyNTA4NzE.*_ga_3MDRMNX0DN*MTczMzc0NzU4My4zLjEuMTczMzc0NzYwNC4zOS4wLjA.">Roskilde Festival - FAQ</a></p>
                <p>På Roskilde Festivals hjemmeside kan du finde svar på de fleste ting ang. festivalen, men finder du ikke svar, kan du selvfølgelig altid kontakte os på følgende mail: <a href="mailto:busbus.roskilde@gmail.com">busbus.roskilde@gmail.com</a></p>
                <p>Vi glæder os til en god festival.</p>
                <p>De bedste hilsner<br>Jonas og Susanne / BUSBUS</p>
            `,
            cta: "Start"
        },
        intro: {
            headline: "People-VOL-nr.",
            p1: `<p>Alle frivillige på Roskilde Festival skal have en profil i festivalens interne system kaldet People-VOL. Alle med en profil i systemet har et individuelt People-VOL-nummer. Nummeret skal du bruge for at kunne tilmelde dig som frivillig hos BUSBUS.</p>`,
            askPreviouslyVolunteer: "Har du tidligere været frivillig på Roskilde Festival?",
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
                title: "Værge Oplysninger",
                description: "Kontaktoplysninger på forælder eller værge"
            },
            step7: {
                title: "Betingelser",
                description: "Læs og acceptér betingelserne"
            },
            step8: {
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
        registered: {
            title: "Velkommen som frivillig hos BUSBUS",
            body: `
                <p>Du er nu oprettet som frivillig, og du er sikret et armbånd til Roskilde Festival 2026.</p>
                <p>Senest d. 16/6-25 modtager du vagtplan og øvrig info vedrørende afhentning af armbånd mm.</p>
                <p>På Roskilde Festivals hjemmeside kan du få svar på alle dine spørgsmål om at være frivillig på festivalen: <a href="https://faq.roskilde-festival.dk/hc/da/sections/14361365551773-Bliv-frivillig?_gl=1*1onv2tx*_gcl_au*MTMyOTc2MjM4LjE3MzM3NDc1ODQ.*_ga*MTY3NzAxODg2LjE3MTcyNTA4NzE.*_ga_3MDRMNX0DN*MTczMzc0NzU4My4zLjEuMTczMzc0NzYwNC4zOS4wLjA.">Roskilde Festival - FAQ</a></p>
                <p>På Roskilde Festivals hjemmeside kan du finde svar på de fleste ting ang. festivalen, men finder du ikke svar, kan du selvfølgelig altid kontakte os på følgende mail: <a href="mailto:busbus.roskilde@gmail.com">busbus.roskilde@gmail.com</a></p>
                <p>Har du venner eller veninder, der også vil være frivillige, er de velkomne, og vi kan garantere, at I får jeres vagter sammen - de skal blot huske at skrive samme gruppenavn som dig, når de tilmelder sig.</p>
                <p>Vi glæder os til en god festival.</p>
                <p>De bedste hilsner<br>Jonas og Susanne / BUSBUS</p>
            `
        ,
            emailCopy: "Send kopi til mail"
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
            terms: "Betingelser",
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
                parentPhone: "Telefon",
                termsAccepted: "Betingelser accepteret"
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
        },
        terms: {
            title: "Betingelser",
            shiftsTitle: "Dine vagter",
            shiftsText: "- Frivillige hos BUSBUS arbejder ca. 32 timer fordelt på 4 vagter.\n\n- Dine vagter kan ligge i dagene fra lørdag d. 28. juni til lørdag d. 5. juli 2025.\n\n- Mødetid er altid 15 minutter, før vagten starter.",
            benefitsTitle: "Frivilliggoder",
            benefitsText: "- Du får mad og drikke, når du er på vagt.\n\n- Du har gratis adgang til Volunteer Camping, hvis du selv bestiller det via People-VOL.\n\n- Du har gratis adgang til Volunteer Village, som er et særligt lukket område for frivillige.\n\n- Du er som frivillig dækket af en lovpligtig arbejs­skade­forsik­ring tegnet af Roskilde Festival.",
            requirementsTitle: "Generelle krav",
            requirementsText: "- Hvis du som frivillig får inddraget dit armbånd, hvis armbåndet går tabt, eller det bliver beskadiget, skal det meddeles bodens frivilligansvarlige, Susanne, på tlf. 31310003.\n\n- Mistede armbånd kan IKKE erstattes. Du vil derfor ikke kunne tage dine vagter som frivillig, og det vil betragtes som udeblivelse fra vagt.\n\n- Ingen frivillige på vagt må fremtræde beruset eller på anden måde påvirket. Bortvises en frivillig af denne grund, vil adgangstegnet blive inddraget.",
            sicknessTitle: "Sygemeldingsprocedure",
            sicknessText: "1: Ring til Susanne på tlf. 31310003 og meld din sygemelding - inden din vagt starter.\nPak alle dine ejendele og mød i BUSBUS-boden med din bagage.\n\n2: Her skal du aflevere dit armbånd. Herefter bliver du fulgt til nærmeste udgang og ønsket god bedring.",
            importantTitle: "VIGTIGT",
            importantText: "Det er et krav, at armbåndet afleveres fysisk i boden, da sygemeldingen ellers ikke godkendes. Husk at medbringe al din oppakning, da det ikke efterfølgende er muligt for dig at komme ind på camping og hente dine ting, når du først er kommet uden for festivalområdet.\n\nVed godkendelse af betingelserne indvilger jeg i, at Roskilde Festival må opkræve 3500 kr. og registrere mig som uønsket frivillig de kommende 3 år, såfremt jeg udebliver fra en vagt, eller sygemeldingsproceduren ikke følges.",
            acceptLabel: "Jeg har læst betingelserne"
        }
    },
    en: {
        landing: {
            headline: "Volunteer at BUSBUS",
            description: `
                <p>Roskilde Festival 2026 runs from Saturday 27/6 to Saturday 4/7 — and BUSBUS is open every day.</p>
                <p>BUSBUS is located in Central Park on the Outer Plaza with a view towards the Orange Stage area. We sell, among other things, brunch, pork roast sandwiches and fried pork with parsley sauce.</p>
                <h2>How to sign up</h2>
                <p>Click “Start” at the bottom of the page and complete the registration. Remember to read and accept the terms at the end of the registration.</p>
                <p>Afterwards you'll receive an email with the subject ‘Welcome as a volunteer at BUSBUS’ where you can view your registration.</p>
                <p>You are now registered as a volunteer at BUSBUS and have secured a wristband for the festival.</p>
                <p>If you are in a group with others, it's important that you enter the same group name in your registrations so our system can schedule your shifts together.</p>
                <h2>What happens next?</h2>
                <p>By 16/6 you will receive the shift schedule and all relevant information about wristband collection etc.</p>
                <h2>Find answers to your questions:</h2>
                <p>On Roskilde Festival's website you can find answers to all your questions about volunteering: <a href="https://faq.roskilde-festival.dk/hc/da/sections/14361365551773-Bliv-frivillig?_gl=1*1onv2tx*_gcl_au*MTMyOTc2MjM4LjE3MzM3NDc1ODQ.*_ga*MTY3NzAxODg2LjE3MTcyNTA4NzE.*_ga_3MDRMNX0DN*MTczMzc0NzU4My4zLjEuMTczMzc0NzYwNC4zOS4wLjA.">Roskilde Festival - FAQ</a></p>
                <p>On Roskilde Festival's website you can find answers to most things about the festival, but if you can't find an answer you can always contact us at: <a href="mailto:busbus.roskilde@gmail.com">busbus.roskilde@gmail.com</a></p>
                <p>We look forward to a great festival.</p>
                <p>Best regards<br>Jonas and Susanne / BUSBUS</p>
            `,
            cta: "Start"
        },
        intro: {
            headline: "People-VOL-no.",
            p1: `<p>All volunteers at Roskilde Festival must have a profile in the festival's internal system called People-VOL. Everyone with a profile in the system has an individual People-VOL number. You will need this number to register as a volunteer at BUSBUS.</p>`,
            askPreviouslyVolunteer: "Have you previously volunteered at Roskilde Festival?",
            findTitle: "I HAVE previously volunteered at Roskilde Festival and already have a People-VOL profile:",
            findText: `<p>If you have volunteered before at Roskilde Festival, you already have a People-VOL number.</p>
                       <p>If you don't remember your People-VOL number, you can find it by clicking the blue button 'Find my People-VOL number' below. Remember to note the number so you have it when entering it into our system.</p>`,
            findBtn: "Find my People-VOL number",
            createTitle: "I have NOT volunteered before and do not have a People-VOL profile:",
            createText: `<p>If you have NOT volunteered at Roskilde Festival before, you must first create a profile in People-VOL before you can continue your registration at BUSBUS. Remember to note your new People-VOL number. Create a profile by clicking the button below.</p>`,
            createBtn: "Create People-VOL profile",
            startTitle: "Start registration as a volunteer at BUSBUS:",
            startBtn: "Start registration"
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
                title: "Guardian Information",
                description: "Parent or guardian contact details"
            },
            step7: {
                title: "Terms & Conditions",
                description: "Read and accept the terms"
            },
            step8: {
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
        registered: {
            title: "Welcome as a volunteer at BUSBUS",
            body: `
                <p>You are now registered as a volunteer and have secured a wristband for Roskilde Festival 2026.</p>
                <p>By 16/6 you will receive the shift schedule and other information about wristband collection and practicalities.</p>
                <p>On Roskilde Festival's website you can find answers to all your questions about volunteering: <a href="https://faq.roskilde-festival.dk/hc/da/sections/14361365551773-Bliv-frivillig?_gl=1*1onv2tx*_gcl_au*MTMyOTc2MjM4LjE3MzM3NDc1ODQ.*_ga*MTY3NzAxODg2LjE3MTcyNTA4NzE.*_ga_3MDRMNX0DN*MTczMzc0NzU4My4zLjEuMTczMzc0NzYwNC4zOS4wLjA.">Roskilde Festival - FAQ</a></p>
                <p>If you can't find an answer there, you can always contact us at: <a href="mailto:busbus.roskilde@gmail.com">busbus.roskilde@gmail.com</a></p>
                <p>If you have friends who also want to volunteer, they are welcome, and we can ensure you'll get shifts together — they just need to use the same group name when registering.</p>
                <p>We look forward to a great festival.</p>
                <p>Best regards<br>Jonas and Susanne / BUSBUS</p>
            `
        ,
            emailCopy: "Send me a copy"
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
            terms: "Terms & Conditions",
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
                parentPhone: "Phone",
                termsAccepted: "Terms accepted"
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
        },
        terms: {
            title: "Terms & Conditions",
            shiftsTitle: "Your shifts",
            shiftsText: "- Volunteers at BUSBUS work approximately 32 hours divided into 4 shifts.\n\n- Your shifts may be scheduled between Saturday 28 June and Saturday 5 July 2025.\n\n- Meeting time is always 15 minutes before the shift starts.",
            benefitsTitle: "Volunteer benefits",
            benefitsText: "- You will receive food and drinks when you are on shift.\n\n- You have free access to Volunteer Camping if you order it yourself via People-VOL.\n\n- You have free access to Volunteer Village, which is a special closed area for volunteers.\n\n- As a volunteer, you are covered by mandatory work injury insurance taken out by Roskilde Festival.",
            requirementsTitle: "General requirements",
            requirementsText: "- If your wristband is confiscated, lost, or damaged as a volunteer, it must be reported to the booth's volunteer manager, Susanne, at tel. 31310003.\n\n- Lost wristbands can NOT be replaced. You will therefore not be able to take your shifts as a volunteer, and it will be considered absence from shift.\n\n- No volunteers on shift may appear intoxicated or otherwise impaired. If a volunteer is expelled for this reason, the access ticket will be confiscated.",
            sicknessTitle: "Sick leave procedure",
            sicknessText: "1: Call Susanne at tel. 31310003 and report your sick leave - before your shift starts.\nPack all your belongings and meet at the BUSBUS booth with your luggage.\n\n2: Here you must hand in your wristband. You will then be escorted to the nearest exit and wished a speedy recovery.",
            importantTitle: "IMPORTANT",
            importantText: "It is a requirement that the wristband is physically handed in at the booth, otherwise the sick leave will not be approved. Remember to bring all your belongings, as it will not be possible for you to enter the camping area and collect your things once you have left the festival area.\n\nBy accepting the terms, I agree that Roskilde Festival may charge 3500 DKK and register me as an unwanted volunteer for the next 3 years if I am absent from a shift or the sick leave procedure is not followed.",
            acceptLabel: "I have read the terms and conditions"
        }
    }
};

// ========================================
// STATE MANAGEMENT
// ========================================

const state = {
    // For multi-page setup we still track step and language
    currentStep: 1,
    totalSteps: 8,
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
    // Check if we should skip step 6 (guardian info) based on age
    const birthdate = document.getElementById('birthdate')?.value;
    
    // If moving to step 6 but user is 18+, skip to step 7
    if (stepNumber === 6 && birthdate && !isUnder18(birthdate)) {
        if (state.currentStep < 6) {
            // Going forward, skip to 7
            stepNumber = 7;
        } else {
            // Going backward from step 7+, skip to 5
            stepNumber = 5;
        }
    }
    
    // If coming back from step 7 and trying to go to 6, but user is 18+, go to 5 instead
    if (stepNumber === 6 && state.currentStep === 7 && birthdate && !isUnder18(birthdate)) {
        stepNumber = 5;
    }
    
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
    
    // Populate review step if on step 8
    if (stepNumber === 8) {
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

    if (state.currentStep === 7) {
        const termsCheckbox = document.getElementById('termsAccepted');
        if (termsCheckbox && !termsCheckbox.checked) {
            isValid = false;
            const formGroup = termsCheckbox.closest('.form-group');
            if (formGroup) formGroup.classList.add('has-error');
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
        country: (function(){
            const sel = document.getElementById('country');
            const other = document.getElementById('countryOther');
            if (!sel) return null;
            if (sel.value === 'other') return other?.value.trim() || null;
            return sel.value || null;
        })(),
        phoneCountry: (function(){
            const sel = document.getElementById('phoneCountry');
            const other = document.getElementById('phoneCountryOther');
            if (!sel) return null;
            if (sel.value === 'other') return other?.value.trim() || null;
            return sel.value || null;
        })(),
        phone: document.getElementById('phone')?.value.trim() || null,
        email: document.getElementById('email')?.value.trim() || null,
        previousVolunteer: document.querySelector('input[name="previousVolunteer"]:checked')?.value || null,
        experience: document.getElementById('experience')?.value.trim() || null,
        inGroup: document.querySelector('input[name="inGroup"]:checked')?.value || null,
        groupName: document.getElementById('groupName')?.value.trim() || null,
        remarks: document.getElementById('remarks')?.value.trim() || null,
        parentName: document.getElementById('parentName')?.value.trim() || null,
        parentPhone: document.getElementById('parentPhone')?.value.trim() || null,
        termsAccepted: document.getElementById('termsAccepted')?.checked || false
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
    let countryText = '-';
    if (data.country) {
        const countryLabelKey = countryKeyMap[data.country];
        countryText = countryLabelKey ? t(countryLabelKey) : data.country;
    }
    document.getElementById('review-country').textContent = countryText || '-';
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

    // Terms acceptance
    document.getElementById('review-termsAccepted').textContent = data.termsAccepted ? t('form.yes') : t('form.no');
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

        // Store a small summary and the full form data in sessionStorage for the confirmation page
        try {
            const small = {
                id: docRef.id,
                name: `${formData.firstNames || ''} ${formData.lastName || ''}`.trim() || null,
                phone: formData.phone || null
            };
            sessionStorage.setItem('lastSubmission', JSON.stringify(small));
            // store full form answers so user can email themselves a copy
            sessionStorage.setItem('lastSubmissionFull', JSON.stringify(formData));
        } catch (e) {
            console.warn('Could not save submission summary to sessionStorage', e);
        }

        // Redirect to registered/tilmeldt page
        setTimeout(() => {
            window.location.href = 'tilmeldt.html';
        }, 800);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        const message = error?.message ? `${t('toast.error')} (${error.message})` : t('toast.error');
        showToast(message, 'error');
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

    // Ensure intro page content is populated (works around timing/lookup issues)
    function populateIntroPage() {
        const keys = [
            'intro.headline', 'intro.p1', 'intro.askPreviouslyVolunteer',
            'intro.findTitle', 'intro.findText', 'intro.findBtn',
            'intro.createTitle', 'intro.createText', 'intro.createBtn',
            'intro.startTitle', 'intro.startBtn'
        ];

        keys.forEach(key => {
            const el = document.querySelector(`[data-i18n="${key}"]`);
            if (el) {
                const html = t(key);
                // If the translation contains HTML tags, set innerHTML, otherwise use textContent
                if (/<[a-z][\s\S]*>/i.test(html)) {
                    el.innerHTML = html;
                } else {
                    el.textContent = html;
                }
            }
        });

        // Setup show/hide for the intro 'previous volunteer' question
        const findSection = document.getElementById('intro-find-section');
        const createSection = document.getElementById('intro-create-section');
        const updateIntroVisibility = () => {
            const selected = document.querySelector('input[name="introPreviouslyVolunteer"]:checked')?.value;
            if (selected === 'yes') {
                if (findSection) findSection.style.display = 'block';
                if (createSection) createSection.style.display = 'none';
            } else if (selected === 'no') {
                if (findSection) findSection.style.display = 'none';
                if (createSection) createSection.style.display = 'block';
            } else {
                if (findSection) findSection.style.display = 'none';
                if (createSection) createSection.style.display = 'none';
            }
        };

        document.querySelectorAll('input[name="introPreviouslyVolunteer"]').forEach(r => {
            r.addEventListener('change', updateIntroVisibility);
        });

        // Ensure initial visibility
        updateIntroVisibility();
    }

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

    // Populate intro page immediately after language init
    if (window.location.pathname.endsWith('intro.html') || document.querySelector('[data-i18n^="intro."]')) {
        populateIntroPage();
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

        // Terms checkbox error removal
        const termsCheckbox = document.getElementById('termsAccepted');
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', () => {
                const formGroup = termsCheckbox.closest('.form-group');
                if (formGroup) formGroup.classList.remove('has-error');
            });
        }

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
        // Step 6 is now the dedicated guardian step, only shown if user is under 18
        const birthEl = document.getElementById('birthdate');
        function updateParentVisibility() {
            const val = birthEl?.value;
            const parentName = document.getElementById('parentName');
            const parentPhone = document.getElementById('parentPhone');
            if (val && isUnder18(val)) {
                // Make parent fields required since step 6 will be shown
                if (parentName) parentName.required = true;
                if (parentPhone) parentPhone.required = true;
            } else {
                // User is 18+, step 6 will be skipped
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

        // Country -> show 'other' input when user selects 'Andet'
        function updateCountryVisibility() {
            const sel = document.getElementById('country');
            const other = document.getElementById('countryOther');
            if (!sel || !other) return;
            if (sel.value === 'other') {
                other.style.display = 'block';
                other.setAttribute('aria-hidden', 'false');
                other.required = true;
            } else {
                other.style.display = 'none';
                other.setAttribute('aria-hidden', 'true');
                other.required = false;
                other.value = '';
            }
        }
        const countrySel = document.getElementById('country');
        if (countrySel) {
            countrySel.addEventListener('change', updateCountryVisibility);
            updateCountryVisibility();
        }

        // Phone country code -> show custom code input when 'Andet' selected
        function updatePhoneCountryVisibility() {
            const sel = document.getElementById('phoneCountry');
            const other = document.getElementById('phoneCountryOther');
            if (!sel || !other) return;
            if (sel.value === 'other') {
                other.style.display = 'inline-block';
                other.setAttribute('aria-hidden', 'false');
                other.required = true;
            } else {
                other.style.display = 'none';
                other.setAttribute('aria-hidden', 'true');
                other.required = false;
                other.value = '';
            }
        }
        const phoneCountrySel = document.getElementById('phoneCountry');
        if (phoneCountrySel) {
            phoneCountrySel.addEventListener('change', updatePhoneCountryVisibility);
            updatePhoneCountryVisibility();
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

        // Email copy button: build a mailto: link containing the visible confirmation text and full answers
        const emailBtn = document.getElementById('btn-email-copy');
        if (emailBtn) {
            emailBtn.addEventListener('click', (e) => {
                e.preventDefault();

                // Helper: strip HTML from registered body
                const stripHtml = (html) => {
                    const div = document.createElement('div');
                    div.innerHTML = html || '';
                    return div.textContent || div.innerText || '';
                };

                // Build core message: localized title + registered body (as text)
                const title = t('registered.title');
                const registeredHtml = t('registered.body');
                let body = `${title}\n\n${stripHtml(registeredHtml)}\n\n`;

                // Append submitted answers (from sessionStorage if available)
                let answers = {};
                try {
                    const raw = sessionStorage.getItem('lastSubmissionFull');
                    if (raw) answers = JSON.parse(raw);
                } catch (err) {
                    answers = {};
                }

                // Use review labels when possible for nicer field names
                const labels = i18n[state.currentLanguage]?.review?.labels || {};

                if (answers && Object.keys(answers).length) {
                    body += `Dine svar:\n`;
                    for (const key of Object.keys(answers)) {
                        const label = labels[key] || key;
                        let val = answers[key];
                        if (val === null || val === undefined || val === '') val = '-';
                        body += `${label}: ${val}\n`;
                    }
                } else {
                    body += 'Ingen svar gemt.\n';
                }

                const subject = `${title} - BUSBUS`;
                const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                // Open user's mail client
                window.location.href = mailto;
            });
        }
    }

});

// ========================================
// EXPORTS (for potential future use)
// ========================================

export { setLanguage, navigateTo, showToast, t };
