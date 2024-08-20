"use strict";

// IMPORT GSAP & SCROLLTRIGGER

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// BURGER MENU

const buttonToggle = document.querySelector('.menu__nav--toggle');
const menu = document.querySelector('.menu');
const body = document.body;
const html = document.documentElement;

if (buttonToggle && menu) {
    buttonToggle.addEventListener('click', menuOpen);
}

function menuOpen() {
    menu.classList.toggle("active");
    buttonToggle.classList.toggle("active");

    if (menu.classList.contains('active')) {
        body.classList.add('menu--open');
        html.classList.add('menu--open');
    } else {
        body.classList.remove('menu--open');
        html.classList.remove('menu--open');
    }
}

const linkScrollMenu = document.querySelectorAll('a[href^="#"]');

linkScrollMenu.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            let offsetTop;
            if (window.innerWidth >= 1200) {
                offsetTop = target.offsetTop - 100;
            } else {
                offsetTop = target.offsetTop - 50;
            }
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

const menuLinks = document.querySelectorAll('.menu__el a');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        buttonToggle.classList.remove('active');
        body.classList.remove('menu--open');
        html.classList.remove('menu--open');
    });
});

//Tomes Overlay Infini

function initializeAnimation() {
    const container = document.querySelector('.tomes__img');
    if (!container) {
        return;
    }

    const images = Array.from(container.children);
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    images.forEach(image => {
        const clone = image.cloneNode(true);
        container.appendChild(clone);
    });

    const totalWidth = images.reduce((acc, image) => acc + image.clientWidth, 0) + (images.length * 20);

    const animation = gsap.to(container, {
        x: -totalWidth,
        duration: 25,
        repeat: -1,
        ease: "linear",
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % -totalWidth)
        },
        paused: false
    });

    function pauseAnimation() {
        console.log('Pausing animation');
        animation.pause();
    }

    function resumeAnimation() {
        console.log('Resuming animation');
        animation.resume();
    }

    container.addEventListener('mouseenter', () => {
        pauseAnimation();
    });

    container.addEventListener('mouseleave', () => {
        resumeAnimation();
    });

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            overlayImg.src = event.target.src;
            overlay.style.display = 'flex';
            pauseAnimation();
        }
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        overlayImg.src = '';
        resumeAnimation();
    });
}

initializeAnimation();


//COUNT 


const quantitySelectBook = document.getElementById("quantity_book");
const quantitySelectEbook = document.getElementById("quantity_ebook");
const panierBook = document.querySelector(".panier__contentBook #value__book_panier");
const panierEbook = document.querySelector(".panier__contentEbook #value__ebook_panier");
const totalBookList = document.querySelector(".panierTotal__list--book");
const totalEbookList = document.querySelector(".panierTotal__list--ebook");
const totalBook = document.querySelector(".panierTotal__list--book #value__book_total");
const totalEbook = document.querySelector(".panierTotal__list--ebook #value__ebook_total");
const valueTotal = document.getElementById("value__total");
const noItemsMessage = document.getElementById("no-items-message");


function updateTotals() {
    const pricePerBook = 169.99;
    const pricePerEbook = 9.99;
    const quantityBook = Number(quantitySelectBook.value);
    const quantityEbook = Number(quantitySelectEbook.value);
    const subtotalBook = (pricePerBook * quantityBook).toFixed(2);
    const subtotalEbook = (pricePerEbook * quantityEbook).toFixed(2);
    if (panierBook) panierBook.textContent = `${subtotalBook}€`;
    if (totalBook) totalBook.textContent = `${subtotalBook}€`;
    if (panierEbook) panierEbook.textContent = `${subtotalEbook}€`;
    if (totalEbook) totalEbook.textContent = `${subtotalEbook}€`;
    if (subtotalBook > 0) {
        totalBookList.style.display = "flex";
    } else {
        totalBookList.style.display = "none";
    }
    if (subtotalEbook > 0) {
        totalEbookList.style.display = "flex";
    } else {
        totalEbookList.style.display = "none";
    }
    const total = (parseFloat(subtotalBook) + parseFloat(subtotalEbook)).toFixed(2);
    if (valueTotal) valueTotal.textContent = `${total}€`;
    if (subtotalBook == 0 && subtotalEbook == 0) {
        noItemsMessage.style.display = "block";
    } else {
        noItemsMessage.style.display = "none";
    }
    const cartData = {
        subtotalBook: subtotalBook,
        subtotalEbook: subtotalEbook,
        total: total,
        quantityBook: quantityBook,
        quantityEbook: quantityEbook
    };

    localStorage.setItem('cartData', JSON.stringify(cartData));
}

if (quantitySelectBook) {
    quantitySelectBook.addEventListener("input", updateTotals);
}

if (quantitySelectEbook) {
    quantitySelectEbook.addEventListener("input", updateTotals);
}

//LOAD DATA PRIX

function loadCartData() {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
        const cartData = JSON.parse(storedCartData);
        const recapValueBook = document.getElementById('recapValue__book');
        const recapValueEbook = document.getElementById('recapValue__ebook');
        const recapValueTotal = document.getElementById('recapValue__total');
        const noItemsMessageRecap = document.getElementById("no-items-message");

        if (recapValueBook && cartData.subtotalBook > 0) {
            recapValueBook.textContent = `${cartData.subtotalBook}€`;
        } else if (recapValueBook) {
            recapValueBook.parentElement.style.display = 'none';
        }

        if (recapValueEbook && cartData.subtotalEbook > 0) {
            recapValueEbook.textContent = `${cartData.subtotalEbook}€`;
        } else if (recapValueEbook) {
            recapValueEbook.parentElement.style.display = 'none';
        }

        if (recapValueTotal) {
            recapValueTotal.textContent = `${cartData.total}€`;
        }

        if (noItemsMessageRecap && cartData.subtotalBook == 0 && cartData.subtotalEbook == 0) {
            noItemsMessageRecap.style.display = "block";
        } else if (noItemsMessageRecap) {
            noItemsMessageRecap.style.display = "none";
        }
    }
}
loadCartData();

//SAVE DATA LIVRAISON

function saveFormData() {
    const formData = {
        prenom: document.getElementById('prenom').value,
        nom: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        adresse: document.getElementById('adresse').value,
        codepostal: document.getElementById('codepostal').value,
        ville: document.getElementById('ville').value,
        pays: document.getElementById('pays').value,
        prenomCadeau: document.getElementById('prenomCadeau').value,
        nomCadeau: document.getElementById('nomCadeau').value,
        emailCadeau: document.getElementById('emailCadeau').value,
        telephoneCadeau: document.getElementById('telephoneCadeau').value,
        adresseCadeau: document.getElementById('adresseCadeau').value,
        codepostalCadeau: document.getElementById('codepostalCadeau').value,
        villeCadeau: document.getElementById('villeCadeau').value,
        paysCadeau: document.getElementById('paysCadeau').value
    };

    localStorage.setItem('formData', JSON.stringify(formData));
}

function handleSubmit(event) {
    event.preventDefault();
    saveFormData();
    window.location.href = 'payement.html';
}

//CADEAU

const cadeauCheckbox = document.getElementById('cadeau');

if (cadeauCheckbox) {
    cadeauCheckbox.addEventListener('change', function () {
        const gridParent = document.querySelector('.cadeau__gridParent');
        const inputs = gridParent.querySelectorAll('input, select');

        if (this.checked) {
            gridParent.style.display = 'grid';
            inputs.forEach(input => {
                input.required = true;
            });
        } else {
            gridParent.style.display = 'none';
            inputs.forEach(input => {
                input.required = false;
            });
        }
    });
}


//RADIO

document.querySelectorAll('input[name="paymentMethod"]').forEach((elem) => {
    elem.addEventListener('change', function (e) {
        let creditParent = document.querySelector('.payement__creditParent');
        let debitParent = document.querySelector('.payement__debitParent');

        // Sélectionnez tous les champs d'entrée à l'intérieur des fieldsets
        let creditInputs = creditParent.querySelectorAll('input');
        let debitInputs = debitParent.querySelectorAll('input');

        if (this.value === 'credit') {
            // Afficher la section crédit et masquer la section débit
            creditParent.style.display = 'grid';
            debitParent.style.display = 'none';

            // Rendre les champs de crédit requis
            creditInputs.forEach(input => input.setAttribute('required', 'required'));
            // Retirer le statut requis des champs de débit
            debitInputs.forEach(input => input.removeAttribute('required'));

        } else if (this.value === 'debit') {
            // Afficher la section débit et masquer la section crédit
            creditParent.style.display = 'none';
            debitParent.style.display = 'grid';

            // Rendre les champs de débit requis
            debitInputs.forEach(input => input.setAttribute('required', 'required'));
            // Retirer le statut requis des champs de crédit
            creditInputs.forEach(input => input.removeAttribute('required'));

        } else if (this.value === 'paypal') {
            // Masquer les sections crédit et débit
            creditParent.style.display = 'none';
            debitParent.style.display = 'none';

            // Retirer le statut requis des champs de crédit et de débit
            creditInputs.forEach(input => input.removeAttribute('required'));
            debitInputs.forEach(input => input.removeAttribute('required'));
        }
    });
});

// Initialisation de l'affichage
let selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
if (selectedPaymentMethod) {
    selectedPaymentMethod.dispatchEvent(new Event('change'));
}


