import { showOverlay } from "./overlay.js";

let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let isPolicyValid = false;

/**
 * Initializes the contact form and its validation event listeners.
 * @returns {void}
 */
export function initContactForm() {
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactMessage = document.getElementById('contact-message');
    const contactPolicy = document.getElementById('contact-policy');
    const form = document.getElementById("contact-form");
    bindValidation(contactName, validateName);
    bindValidation(contactEmail, validateEmail);
    bindValidation(contactMessage, validateMessage);
    contactPolicy.addEventListener('change', validateCheckbox);
    bindContactSubmit(form);
}

/**
 * Binds validation to input and blur events.
 * @param {HTMLElement} element - The element to validate.
 * @param {Function} validator - The validation function.
 * @returns {void}
 */
function bindValidation(element, validator) {
    element.addEventListener('input', validator);
    element.addEventListener('blur', validator);
}

/**
 * Binds the submit event to the contact form.
 * @param {HTMLFormElement} form - The contact form element.
 * @returns {void}
 */
function bindContactSubmit(form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await submitContactForm(form);
    });
}

/**
 * Validates the name input and updates the field status and submit button.
 * @returns {void}
 */
function validateName() {
    const nameInput = document.getElementById('contact-name');
    const nameField = document.getElementById('field-name');
    const errorText = document.getElementById('contact-error-name');
    isNameValid = nameInput.value.trim().length >= 2;
    updateFieldStatus(nameField, errorText, isNameValid);
    updateSubmitButton();
}

/**
 * Updates the field and error message styles based on validation status.
 * @param {HTMLElement} field - The input field container.
 * @param {HTMLElement} errorText - The error message element.
 * @param {boolean} isValid - Whether the field is valid.
 * @returns {void}
 */
function updateFieldStatus(field, errorText, isValid) {
    field.classList.toggle('is-error', !isValid);
    field.classList.toggle('contact__field--error', !isValid);
    field.classList.toggle('is-success', isValid);
    field.classList.toggle('contact__field--success', isValid);
    errorText.classList.toggle('d-none', isValid);
}

/**
 * Validates the email input and updates the field status and submit button.
 * @returns {void}
 */
function validateEmail() {
    const emailInput = document.getElementById('contact-email');
    const emailField = document.getElementById('field-email');
    const errorRequired = document.getElementById('contact-error-email-required');
    const errorFormat = document.getElementById('contact-error-email-format');
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    hideEmailErrors(errorRequired, errorFormat);
    resetFieldStatus(emailField);
    isEmailValid = checkEmail(value, emailField, errorRequired, errorFormat, emailPattern);
    updateSubmitButton();
}

/**
 * Hides the required and format error messages for the email field.
 * @param {HTMLElement} errorRequired - The required error message element.
 * @param {HTMLElement} errorFormat - The format error message element.
 * @returns {void}
 */
function hideEmailErrors(errorRequired, errorFormat) {
    errorRequired.classList.add('d-none');
    errorFormat.classList.add('d-none');
}

/**
 * Resets the validation status classes of a field.
 * @param {HTMLElement} field - The field element.
 * @returns {void}
 */
function resetFieldStatus(field) {
    field.classList.remove('is-error', 'contact__field--error', 'is-success', 'contact__field--success');
}

/**
 * Validates the email value and updates the field status.
 * @param {string} value - The email address to validate.
 * @param {HTMLElement} field - The email field element.
 * @param {HTMLElement} errorRequired - The required error message element.
 * @param {HTMLElement} errorFormat - The format error message element.
 * @param {RegExp} pattern - The email validation pattern.
 * @returns {boolean} Whether the email is valid.
 */
function checkEmail(value, field, errorRequired, errorFormat, pattern) {
    if (value === "") return showEmailError(field, errorRequired);
    if (!pattern.test(value)) return showEmailError(field, errorFormat);
    setEmailSuccess(field);
    return true;
}

/**
 * Displays an email validation error.
 * @param {HTMLElement} field - The email field element.
 * @param {HTMLElement} errorElement - The error message element.
 * @returns {boolean} Always returns false.
 */
function showEmailError(field, errorElement) {
    field.classList.add('is-error', 'contact__field--error');
    errorElement.classList.remove('d-none');
    return false;
}

/**
 * Sets the email field to its success state.
 * @param {HTMLElement} field - The email field element.
 * @returns {void}
 */
function setEmailSuccess(field) {
    field.classList.add('is-success', 'contact__field--success');
}

/**
 * Validates the message input and updates the field status and submit button.
 * @returns {void}
 */
function validateMessage() {
    const messageTextarea = document.getElementById('contact-message');
    const messageField = document.getElementById('field-message');
    const errorText = document.getElementById('contact-error-message');
    isMessageValid = messageTextarea.value.trim() !== "";
    updateMessageField(messageField, errorText, isMessageValid);
    updateSubmitButton();
}

/**
 * Updates the message field and error message styles based on validation status.
 * @param {HTMLElement} field - The message field container.
 * @param {HTMLElement} errorText - The error message element.
 * @param {boolean} isValid - Whether the field is valid.
 * @returns {void}
 */
function updateMessageField(field, errorText, isValid) {
    field.classList.toggle('is-error', !isValid);
    field.classList.toggle('contact__field-area--error', !isValid);
    field.classList.toggle('is-success', isValid);
    field.classList.toggle('contact__field-area--success', isValid);
    errorText.classList.toggle('d-none', isValid);
}

/**
 * Validates the policy checkbox and updates its status and submit button.
 * @returns {void}
 */
function validateCheckbox() {
    const policyCheckbox = document.getElementById('contact-policy');
    const errorText = document.getElementById('contact-error-policy');
    isPolicyValid = policyCheckbox.checked;
    updateCheckboxStatus(policyCheckbox, errorText, isPolicyValid);
    updateSubmitButton();
}

/**
 * Updates the checkbox and error message styles based on validation status.
 * @param {HTMLElement} checkbox - The policy checkbox element.
 * @param {HTMLElement} errorText - The error message element.
 * @param {boolean} isValid - Whether the checkbox is valid.
 * @returns {void}
 */
function updateCheckboxStatus(checkbox, errorText, isValid) {
    checkbox.classList.toggle('is-error', !isValid);
    checkbox.classList.toggle('is-success--checkbox', isValid);
    errorText.classList.toggle('d-none', isValid);
}

/**
 * Updates the submit button state based on form validation.
 * @returns {void}
 */
function updateSubmitButton() {
    const submitButton = document.getElementById('submit-button');
    if (isNameValid && isEmailValid && isMessageValid && isPolicyValid) {
        submitButton.classList.add('contact__button--enabled');
    } else {
        submitButton.classList.remove('contact__button--enabled');
    }
}

/**
 * Validates and submits the contact form and handles the response.
 * @param {HTMLFormElement} form - The contact form element.
 * @returns {Promise<void>}
 */
async function submitContactForm(form) {
    validateContactFields();
    if (!isContactFormValid()) return;
    const formData = getContactFormData();
    try {
        const result = await sendContactRequest(formData);
        handleContactResult(form, result);
    } catch (error) {
        handleContactServerError(error);
    }
}

/**
 * Validates all contact form fields.
 * @returns {void}
 */
function validateContactFields() {
    validateName();
    validateEmail();
    validateMessage();
    validateCheckbox();
}

/**
 * Checks whether all contact form fields are valid.
 * @returns {boolean} Whether the form is valid.
 */
function isContactFormValid() {
    return isNameValid && isEmailValid &&
        isMessageValid && isPolicyValid;
}

/**
 * Retrieves and trims the contact form data.
 * @returns {{ name: string; email: string; message: string }} The contact form data.
 */
function getContactFormData() {
    return {
        name: document.getElementById("contact-name").value.trim(),
        email: document.getElementById("contact-email").value.trim(),
        message: document.getElementById("contact-message").value.trim()
    };
}

/**
 * Sends the contact form data to the server.
 * @param {{ name: string; email: string; message: string }} formData - The contact form data.
 * @returns {Promise<Object>} The server response.
 * @throws {Error} If the server response is not successful.
 */
async function sendContactRequest(formData) {
    const response = await fetch("./send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
    }
    return response.json();
}

/**
 * Handles the contact form result based on the success status.
 * @param {HTMLFormElement} form - The contact form element.
 * @param {Object} result - The server response.
 * @returns {void}
 */
function handleContactResult(form, result) {
    if (result.success) {
        handleContactSuccess(form);
    } else {
        handleContactFailure(result.error);
    }
}

/**
 * Displays a success message and resets the contact form.
 * @param {HTMLFormElement} form - The contact form element.
 * @returns {void}
 */
function handleContactSuccess(form) {
    showOverlay(
        "Message sent!",
        "Thank you for your message. I'll get back to you as soon as possible."
    );
    form.reset();
    resetContactValidation();
    updateSubmitButton();
    clearContactStatusClasses();
}

/**
 * Resets all contact form validation states.
 * @returns {void}
 */
function resetContactValidation() {
    isNameValid = false;
    isEmailValid = false;
    isMessageValid = false;
    isPolicyValid = false;
}

/**
 * Clears all contact form status classes and hides error messages.
 * @returns {void}
 */
function clearContactStatusClasses() {
    clearBasicStatusClasses();
    clearFieldStatusClasses();
    hideContactErrors();
}

/**
 * Removes success and error classes from all matching elements.
 * @returns {void}
 */
function clearBasicStatusClasses() {
    document.querySelectorAll(".is-success, .is-error").forEach(element => {
        element.classList.remove("is-success", "is-error");
    });
}

/**
 * Removes success and error classes from all contact field elements.
 * @returns {void}
 */
function clearFieldStatusClasses() {
    document.querySelectorAll(
        ".contact__field--success, .contact__field--error, " +
        ".contact__field-area--success, .contact__field-area--error"
    ).forEach(element => {
        element.classList.remove(
            "contact__field--success", "contact__field--error",
            "contact__field-area--success", "contact__field-area--error"
        );
    });
}

/**
 * Hides all contact form error messages.
 * @returns {void}
 */
function hideContactErrors() {
    document.querySelectorAll(".contact__error-text").forEach(element => {
        element.classList.add("d-none");
    });
}

/**
 * Displays an error message and logs the error to the console.
 * @param {Error} error - The error that occurred.
 * @returns {void}
 */
function handleContactFailure(error) {
    showOverlay(
        "Error",
        "Unfortunately your message could not be sent. Please try again later."
    );
    console.error(error);
}

/**
 * Logs the server error and displays an error message.
 * @param {Error} error - The error that occurred.
 * @returns {void}
 */
function handleContactServerError(error) {
    console.error(error);
    showOverlay(
        "Server Error",
        "A server error occurred. Please try again later."
    );
}