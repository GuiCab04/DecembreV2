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

const panierBook = document.querySelector(".panier__contentBook #value__book");
const panierEbook = document.querySelector(".panier__contentEbook #value__ebook");

const totalBookList = document.querySelector(".panierTotal__list--book");
const totalEbookList = document.querySelector(".panierTotal__list--ebook");

const totalBook = document.querySelector(".panierTotal__list--book #value__book");
const totalEbook = document.querySelector(".panierTotal__list--ebook #value__ebook");
const valueTotal = document.getElementById("value__total");

const noItemsMessage = document.getElementById("no-items-message");

function updateTotals() {
    const pricePerBook = 169.99;
    const pricePerEbook = 9.99;

    const quantityBook = Number(quantitySelectBook.value);
    const quantityEbook = Number(quantitySelectEbook.value);

    const subtotalBook = (pricePerBook * quantityBook).toFixed(2);
    const subtotalEbook = (pricePerEbook * quantityEbook).toFixed(2);

    // Mettre à jour les sous-totaux dans les deux sections (panier et total)
    if (panierBook) panierBook.textContent = `${subtotalBook}€`;
    if (totalBook) totalBook.textContent = `${subtotalBook}€`;

    if (panierEbook) panierEbook.textContent = `${subtotalEbook}€`;
    if (totalEbook) totalEbook.textContent = `${subtotalEbook}€`;

    // Afficher ou masquer les sections en fonction des sous-totaux
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

    // Calculer et mettre à jour le total global
    const total = (parseFloat(subtotalBook) + parseFloat(subtotalEbook)).toFixed(2);
    if (valueTotal) valueTotal.textContent = `${total}€`;

    // Afficher ou masquer le message "Aucun article n'est sélectionné"
    if (subtotalBook == 0 && subtotalEbook == 0) {
        noItemsMessage.style.display = "block";
    } else {
        noItemsMessage.style.display = "none";
    }
}

if (quantitySelectBook) {
    quantitySelectBook.addEventListener("input", updateTotals);
}

if (quantitySelectEbook) {
    quantitySelectEbook.addEventListener("input", updateTotals);
}







