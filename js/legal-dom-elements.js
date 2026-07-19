export const legalDom = {
    htmlRoot: document.documentElement,
    pageTitle: document.querySelector('title'),
    germanButton: document.getElementById('german-button'),
    englishButton: document.getElementById('english-button'),
    legalTitle: document.querySelector('.legal__title'),
    legalSectionTitles: Array.from(document.querySelectorAll('.legal__section-title')),
    legalTexts: Array.from(document.querySelectorAll('.legal__text')),
    legalLinks: Array.from(document.querySelectorAll('.legal__link')),
}