'use strict';

const result = document.querySelector('.calculating__result span');
let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
	sex = localStorage.getItem('sex');
} else {
	sex = 'female';
	localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
	ratio = localStorage.getItem('ratio');
} else {
	ratio = 1.375;
	localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass = 'calculating__choose-item_active') {
	const elements = document.querySelectorAll(`${selector} div`);

	elements.forEach((elem) => {
		elem.classList.remove(activeClass);

		if (elem.getAttribute('id') === localStorage.getItem('sex')) {
			elem.classList.add(activeClass);
		}

		if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
			elem.classList.add(activeClass);
		}
	});
}

function calcTotal() {
	if (!sex || !height || !weight || !age || !ratio) {
		result.textContent = '_';
		return;
	}

	if (sex === 'female') {
		result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
	} else {
		result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
	}
}

function getStaticInformation(selector, activeClass = 'calculating__choose-item_active') {
	const elements = document.querySelectorAll(`${selector} div`);

	elements.forEach((elem) => {
		elem.addEventListener('click', (e) => {
			if (e.target.getAttribute('data-ratio')) {
				ratio = +e.target.getAttribute('data-ratio');
				localStorage.setItem('ratio', ratio);
			} else {
				sex = e.target.getAttribute('id');
				localStorage.setItem('sex', sex);
			}

			// console.log(ratio, sex);

			elements.forEach((elem) => {
				elem.classList.remove(activeClass);
			});
			e.target.classList.add(activeClass);

			calcTotal();
		});
	});
}

function getDinamycInformation(selector) {
	const input = document.querySelector(selector);

	input.addEventListener('input', (e) => {
		if (input.value.match(/\D/g)) {
			input.style.border = '1px solid red';
		} else {
			input.style.border = 'none';
		}

		const id = e.target.getAttribute('id');

		switch (id) {
			case 'height':
				height = +input.value;
				break;
			case 'weight':
				weight = +input.value;
				break;
			case 'age':
				age = +input.value;
				break;
		}

		calcTotal();
	});
}

export function useCalculator() {
	initLocalSettings('#gender');
	initLocalSettings('.calculating__choose_big');
	calcTotal();
	getStaticInformation('#gender');
	getStaticInformation('.calculating__choose_big');
	getDinamycInformation('#height');
	getDinamycInformation('#weight');
	getDinamycInformation('#age');
}
