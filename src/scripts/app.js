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

const container = document.querySelector('.tomes__img');
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






