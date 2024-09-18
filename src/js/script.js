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

    // Trainer card class
    class TrainerCard { 
        constructor(src, alt, name, major, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.name = name;
            this.major = major;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() { // метод отрисовки по конструктору
            const element = document.createElement('div');
            if (!this.classes.length) {
                this.element = 'trainers__slider-item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML += 
            `
                <img src="${this.src}" alt="${this.alt}" class="trainers__slider-item__photo">
                <div class="trainers__slider-item__info">
                    <h3 class="title title_item">${this.name}</h3>
                    <div class="trainers__slider-item__major">${this.major}</div>
                </div>
                <button class="button button_link">Подробнее</button>
            `;

            this.parent.append(element);
        };
    }

    // функция получения данных с сервера
    const getResource = async (url) => {
        const result = await fetch(url);
        if (!result.ok) { // ошибка получения данных
            throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
        }

        return await result.json(); 
    }

    getResource('http://localhost:3000/trainers')
        .then(data => { // отрисовка полученных данных
            data.forEach(({src, alt, name, major}) => {
                new TrainerCard(src, alt, name, major, '.trainers__slider .trainers__slider-content').render();
            });
        });

    // Modal
    const
        modalButton = document.querySelectorAll('[data-modal]'),
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

    const postData = async (url, data) => { // функция отправки запроса на сервер 
        const res = await fetch(url, { // async/await - что-бы дождаться получения данных
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) { // функция отправки данных
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // создаем спиннер загрузки/отправки данных
            statusMessage.src = message.loading;
            statusMessage.style.cssText =
                `
                                        display: block;
                                        margin: 0 auto
                                        `;
            // form.append(statusMessage); // fix: добавляем спиннер вниз после формы, т.к. обертка имеет flex верстку

            // устанавливаем тип
            const formData = new FormData(form); // форма данных их атрибутов

            // const object = {}; // формирование объекта ответа пользователю
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests' ,json)
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
        bindPostData(item);
    });

    fetch('http://localhost:3000/requests') // json-server
        .then(data => data.json())
        .then(res => console.log(res));
});