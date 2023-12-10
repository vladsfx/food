/**
 * Работа с табами
 */

'use strict';

const tabContents = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');
const tabs = tabsParent.querySelectorAll('.tabheader__item');

const tabActiveClass = 'tabheader__item_active';

// Функция скрытия контента
const hideTabContent = () => {
	tabs.forEach((item) => {
		item.classList.remove(tabActiveClass);
	});
	tabContents.forEach((item) => {
		item.classList.remove('show', 'fade');
		item.classList.add('hide');
	});
};

// Функция показа контента
const showTabContent = (i = 0) => {
	tabs[i].classList.add(tabActiveClass);
	tabContents[i].classList.remove('hide');
	tabContents[i].classList.add('show', 'fade');
};

// Главная функция переключения табов
function actionsWithTabs() {
	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (item == target) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export { actionsWithTabs };
