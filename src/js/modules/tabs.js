/**
 * Работа с табами
 */

'use strict';

//const tabContents = document.querySelectorAll('.tabcontent');
//const tabsParent = document.querySelector('.tabheader__items');
//const tabs = tabsParent.querySelectorAll('.tabheader__item');

//const tabActiveClass = 'tabheader__item_active';

// Функция скрытия контента
const hideTabContent = (tabs, tabContents, activeClass) => {
	tabs.forEach((item) => {
		item.classList.remove(activeClass);
	});
	tabContents.forEach((item) => {
		item.classList.remove('show', 'fade');
		item.classList.add('hide');
	});
};

// Функция показа контента
const showTabContent = (tabs, tabContents, activeClass, i = 0) => {
	tabs[i].classList.add(activeClass);
	tabContents[i].classList.remove('hide');
	tabContents[i].classList.add('show', 'fade');
};

// Главная функция переключения табов
function actionsWithTabs(tabs, tabContents, tabsParent, activeClass) {
	const fTabContents = document.querySelectorAll(tabContents);
	const fTabsParent = document.querySelector(tabsParent);
	const fTabs = fTabsParent.querySelectorAll(tabs);

	hideTabContent(fTabs, fTabContents, activeClass);
	showTabContent(fTabs, fTabContents, activeClass);

	fTabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains(tabs.slice(1))) {
			fTabs.forEach((item, i) => {
				if (item == target) {
					hideTabContent(fTabs, fTabContents, activeClass);
					showTabContent(fTabs, fTabContents, activeClass, i);
				}
			});
		}
	});
}

export { actionsWithTabs };
