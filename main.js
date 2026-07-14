import { languageGerman, languageEnglish } from "./js/language-data.js";
import { dom } from "./js/dom-elements.js";
import { references } from "./js/reference-data.js";

let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let isPolicyValid = false;

function setLanguageGerman() {
    dom.englishButton.classList.remove('header__language-button--active');
    dom.germanButton.classList.add('header__language-button--active');
}

function setLanguageEnglish() {
    dom.germanButton.classList.remove('header__language-button--active');
    dom.englishButton.classList.add('header__language-button--active');
}

function validateName() {
    const nameInput = document.getElementById('contact-name');
    const nameField = document.getElementById('field-name');
    const errorText = document.getElementById('error-name');
    if (nameInput.value.trim().length < 2) {
        nameField.classList.add('is-error', 'contact__field--error');
        nameField.classList.remove('is-success', 'contact__field--success');
        errorText.classList.remove('d-none');
        isNameValid = false;
    } else {
        nameField.classList.add('is-success', 'contact__field--success');
        nameField.classList.remove('is-error', 'contact__field--error');
        errorText.classList.add('d-none');
        isNameValid = true;
    }
    updateSubmitButton();
}

function validateEmail() {
    const emailInput = document.getElementById('contact-email');
    const emailField = document.getElementById('field-email');
    const errorRequired = document.getElementById('error-email-required');
    const errorFormat = document.getElementById('error-email-format');
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errorRequired.classList.add('d-none');
    errorFormat.classList.add('d-none');
    emailField.classList.remove('is-error', 'contact__field--error', 'is-success', 'contact__field--success');
    if (value === "") {
        emailField.classList.add('is-error', 'contact__field--error');
        errorRequired.classList.remove('d-none');
        isEmailValid = false;
    } else if (!emailPattern.test(value)) {
        emailField.classList.add('is-error', 'contact__field--error');
        errorFormat.classList.remove('d-none');
        isEmailValid = false;
    } else {
        emailField.classList.add('is-success', 'contact__field--success');
        isEmailValid = true;
    }
    updateSubmitButton();
}

function validateMessage() {
    const messageTextarea = document.getElementById('contact-message');
    const messageField = document.getElementById('field-message');
    const errorText = document.getElementById('error-message');
    if (messageTextarea.value.trim() === "") {
        messageField.classList.add('is-error', 'contact__field-area--error');
        messageField.classList.remove('is-success', 'contact__field-area--success');
        errorText.classList.remove('d-none');
        isMessageValid = false;
    } else {
        messageField.classList.add('is-success', 'contact__field-area--success');
        messageField.classList.remove('is-error', 'contact__field-area--error');
        errorText.classList.add('d-none');
        isMessageValid = true;
    }
    updateSubmitButton();
}

function validateCheckbox() {
    const policyCheckbox = document.getElementById('contact-policy');
    const errorText = document.getElementById('error-policy');
    if (!policyCheckbox.checked) {
        policyCheckbox.classList.add('is-error');
        policyCheckbox.classList.remove('is-success');
        errorText.classList.remove('d-none');
        isPolicyValid = false;
    } else {
        policyCheckbox.classList.add('is-success');
        policyCheckbox.classList.remove('is-error');
        errorText.classList.add('d-none');
        isPolicyValid = true;
    }
    updateSubmitButton();
}

function updateSubmitButton() {
    const submitButton = document.getElementById('submit-button');
    if (isNameValid && isEmailValid && isMessageValid && isPolicyValid) {
        submitButton.classList.add('contact__button--enabled');
    } else {
        submitButton.classList.remove('contact__button--enabled');
    }
}

const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMessage = document.getElementById('contact-message');
const contactPolicy = document.getElementById('contact-policy');

contactName.addEventListener('input', validateName);
contactName.addEventListener('blur', validateName);

contactEmail.addEventListener('input', validateEmail);
contactEmail.addEventListener('blur', validateEmail);

contactMessage.addEventListener('input', validateMessage);
contactMessage.addEventListener('blur', validateMessage);

contactPolicy.addEventListener('change', validateCheckbox);





function changeLanguage(language) {
    let currentLanguage = language === "de" ? languageGerman : languageEnglish;
    dom.aboutTitle.innerHTML = currentLanguage.about.title;
    dom.aboutIntroduction.innerHTML = currentLanguage.about.introduction;
    dom.aboutLocation.innerHTML = currentLanguage.about.location;
    dom.aboutLearning.innerHTML = currentLanguage.about.learning;
    dom.aboutProblemSolving.innerHTML = currentLanguage.about.problemSolving;
}

dom.germanButton.addEventListener('click', () => {
    setLanguageGerman();
    changeLanguage("de");
})

dom.englishButton.addEventListener('click', () => {
    setLanguageEnglish();
    changeLanguage("en");
})

function init() {
    setLanguageEnglish();
    changeLanguage("en");
}

init();



let currentReference = 0;

function setReference(index) {
    currentReference = index;

    const reference = references[currentReference];

    dom.referencesQuote.textContent = reference.text;
    dom.referencesAuthor.textContent = reference.author;
    dom.referencesImage.src = reference.portraitSrc;

    updateDots();
}

function nextReference() {
    currentReference++;

    if (currentReference >= references.length) {
        currentReference = 0;
    }

    setReference(currentReference);
}

function prevReference() {
    currentReference--;

    if (currentReference < 0) {
        currentReference = references.length - 1;
    }

    setReference(currentReference);
}

function updateDots() {
    dom.referencesDots.forEach((dot, index) => {
        dot.classList.toggle(
            "references__dot-active",
            index === currentReference
        );
    });
}

dom.referencesDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        setReference(index);
    });
});


dom.referencesNext.addEventListener("click", nextReference);
dom.referencesPrev.addEventListener("click", prevReference);

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById("contact-name").value.trim(),
        email: document.getElementById("contact-email").value.trim(),
        message: document.getElementById("contact-message").value.trim()
    };

    try {
        const response = await fetch("./send-mail.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            showOverlay(
                "Message sent!",
                "Thank you for your message. I'll get back to you as soon as possible."
            );
            form.reset();
            isNameValid = false;
            isEmailValid = false;
            isMessageValid = false;
            isPolicyValid = false;

            updateSubmitButton();
            document.querySelectorAll(".is-success, .is-error").forEach(element => {
                element.classList.remove("is-success", "is-error");
            });

            document.querySelectorAll(
                ".contact__field--success, .contact__field--error, " +
                ".contact__field-area--success, .contact__field-area--error"
            ).forEach(element => {
                element.classList.remove(
                    "contact__field--success",
                    "contact__field--error",
                    "contact__field-area--success",
                    "contact__field-area--error"
                );
            });

            document.querySelectorAll(".contact__error-text").forEach(element => {
                element.classList.add("d-none");
            });
        } else {
            showOverlay(
                "Error",
                "Unfortunately your message could not be sent. Please try again later."
            );
            console.error(result.error);
        }

    } catch (error) {
        console.error(error);
        showOverlay(
            "Server Error",
            "A server error occurred. Please try again later."
        );
    }
});

const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");

function showOverlay(title, message) {
    overlayTitle.textContent = title;
    overlayMessage.textContent = message;
    overlay.classList.remove("d-none");
    setTimeout(() => {
        overlay.classList.add("d-none");
    }, 2500);
}