import { postData } from "../services/services";
import { openModal, closeModal } from "./modal";

function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector); // родитель формы

    const message = {
        loading: 'icons/form/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
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
            // устанавливаем тип
            const formData = new FormData(form); // форма данных их атрибутов
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
        openModal(formSelector, modalTimerId);

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
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // отправка данных на сервер (на случай, если форм в будущем будет несколько используем forEach)
    forms.forEach(item => {
        bindPostData(item);
    });
}

export default form;