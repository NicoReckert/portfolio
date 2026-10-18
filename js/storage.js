const DEFAULT_LANGUAGE = "en";

/**
 * Initializes the language setting in local storage if none exists.
 * @returns {void}
 */
export function initStorage() {
    if (!localStorage.getItem("language")) {
        localStorage.setItem("language", DEFAULT_LANGUAGE);
    }
}

/**
 * Retrieves the current language from local storage.
 * @returns {string | null} The stored language, or null if none exists.
 */
export function getCurrentLanguage() {
    return localStorage.getItem("language");
}

/**
 * Stores the selected language in local storage.
 * @param {string} language - The language to store.
 * @returns {void}
 */
export function setLanguage(language) {
    localStorage.setItem("language", language);
}