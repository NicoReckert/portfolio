export const privacyDom = {
    htmlRoot: document.documentElement,
    pageTitle: document.querySelector('title'),
    germanButton: document.getElementById('german-button'),
    englishButton: document.getElementById('english-button'),
    privacyTitle: document.querySelector('.privacy__title'),
    privacySectionTitles: Array.from(document.querySelectorAll('.privacy__section-title')),
    privacySubtitle: document.querySelector('.privacy__subtitle'),
    privacyTexts: Array.from(document.querySelectorAll('.privacy__text')),
    privacyLinks: Array.from(document.querySelectorAll('.privacy__link')),
}