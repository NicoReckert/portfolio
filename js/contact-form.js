import { showOverlay } from "./overlay.js";

let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;
let isPolicyValid = false;

export function initContactForm() {
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactMessage = document.getElementById('contact-message');
    const contactPolicy = document.getElementById('contact-policy');
    const form = document.getElementById("contact-form");

    contactName.addEventListener('input', validateName);
    contactName.addEventListener('blur', validateName);
    contactEmail.addEventListener('input', validateEmail);
    contactEmail.addEventListener('blur', validateEmail);
    contactMessage.addEventListener('input', validateMessage);
    contactMessage.addEventListener('blur', validateMessage);
    contactPolicy.addEventListener('change', validateCheckbox);
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await submitContactForm(form)
    });
}

function validateName() {
    const nameInput = document.getElementById('contact-name');
    const nameField = document.getElementById('field-name');
    const errorText = document.getElementById('contact-error-name');
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
    const errorRequired = document.getElementById('contact-error-email-required');
    const errorFormat = document.getElementById('contact-error-email-format');
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
    const errorText = document.getElementById('contact-error-message');
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
    const errorText = document.getElementById('contact-error-policy');
    if (!policyCheckbox.checked) {
        policyCheckbox.classList.add('is-error');
        policyCheckbox.classList.remove('is-success--checkbox');
        errorText.classList.remove('d-none');
        isPolicyValid = false;
    } else {
        policyCheckbox.classList.add('is-success--checkbox');
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

async function submitContactForm(form) {
    validateName();
    validateEmail();
    validateMessage();
    validateCheckbox();

    if (!isNameValid || !isEmailValid || !isMessageValid || !isPolicyValid) {
        return;
    }

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

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

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
}