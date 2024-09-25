'use strict'
import menu from "./modules//menu";
import modal from "./modules/modal";
import cards from "./modules/cards"
import form from "./modules/form";
import slider from "./modules/slider";

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

    menu();
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    form('form', modalTimerId);
    slider(
        {
            container: 'trainer__slider',
            slides: 'trainers__slider-item',
            sliderWrapper: '.trainers__slider-content',
            sliderField: '.trainers__slider-items',
            prevButton: '#prev',
            nextButton: '#next'
        }
    );

    fetch('http://localhost:3000/requests') // json-server
        .then(data => data.json())
        .then(res => console.log(res));
});