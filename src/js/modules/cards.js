import { getResource } from "../services/services";

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

    getResource('http://localhost:3000/trainers')
        .then(data => { // отрисовка полученных данных
            data.forEach(({ src, alt, name, major }) => {
                new TrainerCard(src, alt, name, major, '.trainers__slider .trainers__slider-items').render();
            });
        });
}

export default cards;