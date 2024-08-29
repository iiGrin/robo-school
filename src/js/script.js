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
        clearInterval(showModalTimer); // останавливаем вызов по таймеру, если уже вызван другой способ
    }

    const showModalTimer = setTimeout(openModal, 15000);

    // открытие модального окна при скроле страницы до конца [scroll-end]
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.scrollY -= 1;
            window.removeEventListener('scroll', showModalByScroll);
        }
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

    // [scroll-end] 
    window.addEventListener('scroll', showModalByScroll);

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
        loading: 'icons/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // функция отправки данных
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // создаем спиннер загрузки/отправки данных
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 
                                        `
                                        display: block;
                                        margin: 0 auto
                                        `;
            form.append(statusMessage); // fix: добавляем спиннер вниз после формы, т.к. обертка имеет flex верстку
            // form.insertAdjacentElement('afterend', statusMessage);

            // создаем запрос
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // устанавливаем тип
            const formData = new FormData(form); // форма данных их атрибутов

            request.send(formData); //отправляем форму данных
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    showStatusMessage(message.success);
                    form.reset(); // очищаем форму
                    statusMessage.remove();
                } else {
                    showStatusMessage(message.failure);
                }
            });
        });
    }

    // функция отрисовки окна ответа пользователю после отправки данных
    function showStatusMessage(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // обертка окна ответа
        prevModalDialog.classList.add('hide'); // скрываем на этапе создания
        openModal();

        const thanksModal = document.createElement('div'); // внутренность окна ответа
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = 
                                `
                                <div class="modal__content">
                                    <div class="modal__close" data-close>&times;</div>
                                    <div class="modal__title" style="margin: 0; font-size: 30px">${message}</div>
                                </div>
                                `;

        document.querySelector('.modal').append(thanksModal); // отрисовка
        setTimeout(() => {
            thanksModal.remove(); // удаление ответа
            // возвращаем форму отправки 
            // prevModalDialog.classList.add('show'); // создает модальное окно ответа при повторном вызове
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

    // отправка данных на сервер
    forms.forEach(item => {
        postData(item);
    });

});