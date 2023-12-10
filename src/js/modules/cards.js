/**
 * Классы для карточек
 */

'use strict';

class MenuCard {
	constructor(src, alt, title, descr, price, parentSelector, classes) {
		this.src = src;
		this.alt = alt;
		this.title = title;
		this.descr = descr;
		this.price = price;
		this.classes = classes;
		this.parent = document.querySelector(parentSelector);
		this.transfer = 87;
		this.changeToRub();
	}

	changeToRub() {
		return (this.price *= this.transfer);
	}

	render() {
		const elem = document.createElement('div');

		if (this.classes.length === 0) {
			this.elemClassDefault = 'menu__item';
			elem.classList.add(this.elemClassDefault);
		} else {
			this.classes.forEach((className) => elem.classList.add(className));
		}

		elem.innerHTML = `
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
		this.parent.append(elem);
	}
}

export function createCards() {
	const parentElem = '.menu .container';

	const getResources = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getResources('http://localhost:3000/menu').then((data) => {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(img, altimg, title, descr, price, parentElem, []).render();
		});
	});

	// const cards = [
	// 	{
	// 		src: 'img/tabs/vegy.jpg',
	// 		alt: 'vegy',
	// 		title: 'Меню "Фитнес"',
	// 		descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 		price: 9,
	// 		classes: ['menu__item', 'first'],
	// 	},
	// 	{
	// 		src: 'img/tabs/elite.jpg',
	// 		alt: 'elite',
	// 		title: 'Меню “Премиум”',
	// 		descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 		price: 14,
	// 		classes: [],
	// 	},
	// 	{
	// 		src: 'img/tabs/post.jpg',
	// 		alt: 'post',
	// 		title: 'Меню "Постное"',
	// 		descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 		price: 4,
	// 		classes: [],
	// 	},
	// ];

	// cards.forEach((item) => new MenuCard(item.src, item.alt, item.title, item.descr, item.price, parentElem, item.classes).render());
}
