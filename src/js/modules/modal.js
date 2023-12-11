/**
 * Показ модального окна
 */

'use strict';

export function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId); // Очистка интервала открытия окна по времени}
	}
}

export function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function actionsModal(triggerSelector, modalSelector, modalTimerId) {
	const modalTrigger = document.querySelectorAll(triggerSelector);
	const modal = document.querySelector(modalSelector);

	modalTrigger.forEach((item) => {
		item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	// Закрытие по щелчку на модальном окне и крестике
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});
	//Закрытие по нажатию кнопки "Escape"
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});


	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll); // Удаление события открытия модалки конца страницы
		}
	}
	// Открытие модального окна при достижении конца страницы
	window.addEventListener('scroll', showModalByScroll);
}

export { actionsModal };
