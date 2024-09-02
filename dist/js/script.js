'use strict'

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger
    const
        hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.nav__menu'),
        menuLinks = document.querySelectorAll('.nav__menu-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('nav__menu_active');

        if (menu.classList.contains('nav__menu_active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('hamburger_active');
            menu.classList.remove('nav__menu_active');
        });
    });

    // Modal
    const
        modalButton = document.querySelectorAll('[data-modal]'),
        modalClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    function openModal() { // функция открытия модального окна
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(showModalTimer); // останавливаем вызов по таймеру, если уже вызван другой способ
    }

    const showModalTimer = setTimeout(openModal, 15000);


    function showModalByScroll() { // открытие модального окна при скроле страницы до конца [scroll-end]
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.scrollY -= 1;
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    function closeModal() { // функция закрытия модального окна
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalButton.forEach(btn => { // открытие по нажатию на кнопку
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    window.addEventListener('scroll', showModalByScroll); // [scroll-end] 

    modal.addEventListener('click', (e) => { // закрытие модального окна по нажатию на кнопку и пустую область
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // закрытие модального окна по нажатию на кнопки esc
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

    function postData(form) { // функция отправки данных
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

            // устанавливаем тип
            const formData = new FormData(form); // форма данных их атрибутов

            const object = {}; // формирование объекта ответа пользователю
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => data.text()) // объект ответа формируем в виде строк
            .then(data => { // положительный ответ
                console.log(data);
                showStatusMessage(message.success);
                form.reset(); // очищаем форму
                statusMessage.remove();
            }).catch(() => { // ошибка
                showStatusMessage(message.failure);
            }).finally(() => { // финальное действие
                form.reset();
            })
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