'use script';

import { actionsWithTabs } from './modules/tabs';
import { setTimer } from './modules/timer';
import { actionsModal } from './modules/modal';
import { createCards } from './modules/cards';
import { initForms } from './modules/forms';
import { sliderOperation } from './modules/slider';
import { useCalculator } from './modules/calculator';
import { openModal } from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {
	// Открытие модального окна по истечении времени
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
	const deadline = '2023-12-25';

	actionsWithTabs('.tabheader__item', '.tabcontent', '.tabheader__items', '.tabheader__item_active');
	setTimer('.timer', deadline);
	actionsModal('[data-modal]', '.modal', modalTimerId);
	createCards();
	initForms('.modal', modalTimerId);
	sliderOperation({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prewArrow: '.offer__slider-prev',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	useCalculator();
});
