let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let isPolicyValid = false;

function setLanguageGerman() {
    document.getElementById('englishButton').classList.remove('header__language-button--active');
    document.getElementById('germanButton').classList.add('header__language-button--active');
}

function setLanguageEnglish() {
    document.getElementById('germanButton').classList.remove('header__language-button--active');
    document.getElementById('englishButton').classList.add('header__language-button--active');
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