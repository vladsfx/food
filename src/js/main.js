'use script';

import { actionsWithTabs } from './tabs';
import { timerPage } from './timer';
import { actionsModal } from './modal';
import { createCards } from './cards';
import { initForms } from './forms';
import { sliderOperation } from './slider';
import { useCalculator } from './calculator';


window.addEventListener('DOMContentLoaded', () => {
	actionsWithTabs();
	timerPage;
	actionsModal();
	createCards();
	initForms;
	sliderOperation();
	useCalculator();
});
