const DEFAULT_LANGUAGE = "en";

export function initStorage() {
    if (!localStorage.getItem("language")) {
        localStorage.setItem("language", DEFAULT_LANGUAGE);
    }
}

export function getCurrentLanguage() {
    return localStorage.getItem("language");
}

export function setLanguage(language) {
    localStorage.setItem("language", language);
}