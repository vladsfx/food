/**
 * Показ модального окна
 */

'use strict';

const modalsOpen = document.querySelectorAll('[data-modal]');
const modalWindow = document.querySelector('.modal');

let openModalTimeout;

export function openModal() {
	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	clearInterval(openModalTimeout); // Очистка интервала открытия окна по времени
}

export function closeModal() {
	modalWindow.classList.add('hide');
	modalWindow.classList.remove('show');
	document.body.style.overflow = '';
}

function actionsModal() {
	modalsOpen.forEach((item) => {
		item.addEventListener('click', openModal);
	});

	// Закрытие по щелчку на модальном окне и крестике
	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});
	//Закрытие по нажатию кнопки "Escape"
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal();
		}
	});

	// Открытие модального окна по истечении времени
	openModalTimeout = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll); // Удаление события открытия модалки конца страницы
		}
	}
	// Открытие модального окна при достижении конца страницы
	window.addEventListener('scroll', showModalByScroll);
}

export { actionsModal };
