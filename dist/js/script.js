'use strict'

document.addEventListener('DOMContentLoaded', () => {

    //Modal
    const 
    modalButton = document.querySelectorAll('[data-modal]'),
    modalClose = document.querySelector('[data-close]'),
    modal = document.querySelector('.modal');

    // функция открытия модального окна
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    // функция закрытия модального окна
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // открытие по нажатию на кнопку 
    modalButton.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    //закрытие модального окна по нажатию на кнопку и пустую область
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    //закрытие модального окна по нажатию на кнопки esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });







    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();


            // создаем запрос
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // устанавливаем тип
            const formData = new FormData(form); // форма данных их атрибутов

            request.send(formData); //отправляем форму данных
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log('done');
                    form.reset(); // очищаем форму
                } else {
                    console.log('error');
                }
            });
        });
    }

    forms.forEach(item => {
        postData(item);
    });

});