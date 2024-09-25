/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {
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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/trainers')
        .then(data => { // отрисовка полученных данных
            data.forEach(({ src, alt, name, major }) => {
                new TrainerCard(src, alt, name, major, '.trainers__slider .trainers__slider-items').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");



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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests' ,json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(formSelector, modalTimerId);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
        }, 4000);
    }

    // отправка данных на сервер (на случай, если форм в будущем будет несколько используем forEach)
    forms.forEach(item => {
        bindPostData(item);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/js/modules/menu.js":
/*!********************************!*\
  !*** ./src/js/modules/menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
// функция отправки запроса на сервер 
const postData = async (url, data) => { 
    const res = await fetch(url, { // async/await - функция продолжит работу после выполнения данного блока
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

// функция получения данных с сервера
const getResource = async (url) => {
    const result = await fetch(url);
    if (!result.ok) { // ошибка получения данных
        throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
    }

    return await result.json(); 
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules//menu */ "./src/js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");

;





document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])(
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
/******/ })()
;
//# sourceMappingURL=bundle.js.map