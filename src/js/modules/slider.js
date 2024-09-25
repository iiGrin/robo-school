function slider({container, slide, nextButton, prevButton, wrapper, field}) {
    const 
        slider = document.querySelector(container),
        slides = document.querySelectorAll(slide),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        prev = document.querySelector(prevButton),
        next = document.querySelector(nextButton);

        sliderField.style.display = 'flex';
        sliderField.style.columnGap = '40px';
        sliderField.style.transition = '.5s all';
}

export default slider;