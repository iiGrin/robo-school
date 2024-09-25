function openModal(modalSelector, modalTimerId) { // функция открытия модального окна
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); // останавливаем вызов по таймеру, если уже вызван другой способ
}

function closeModal(modalSelector) { // функция закрытия модального окна
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const
        modal = document.querySelector(modalSelector),
        modalButton = document.querySelectorAll(triggerSelector);

    function showModalByScroll() { // открытие модального окна при скроле страницы до конца [scroll-end]
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.scrollY -= 1;
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); // [scroll-end] 

    modalButton.forEach(btn => { // открытие по нажатию на кнопку
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => { // закрытие модального окна по нажатию на кнопку и пустую область
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // закрытие модального окна по нажатию на кнопки esc
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
}

export default modal;
export {openModal, closeModal};