import { initStorage } from "./js/storage.js";
import { initLanguage } from "./js/language.js";
import { initContactForm } from "./js/contact-form.js";
import { initDom } from "./js/dom-elements.js";

initDom();
initStorage();
initLanguage();
initContactForm();

const grid = document.querySelector(".grid");

// window.addEventListener("mousemove", (e) => {
//     const x = (e.clientX / window.innerWidth - 0.5) * 20;
//     const y = (e.clientY / window.innerHeight - 0.5) * 20;

//     grid.style.transform = `
//         translate(${x}px, ${y}px)
//     `;
// });