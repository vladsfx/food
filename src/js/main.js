'use script';

import { actionsWithTabs } from './modules/tabs';
import { timerPage } from './modules/timer';
import { actionsModal } from './modules/modal';
import { createCards } from './modules/cards';
import { initForms } from './modules/forms';
import { sliderOperation } from './modules/slider';
import { useCalculator } from './modules/calculator';


window.addEventListener('DOMContentLoaded', () => {
	actionsWithTabs();
	timerPage;
	actionsModal();
	createCards();
	initForms;
	sliderOperation();
	useCalculator();
});
