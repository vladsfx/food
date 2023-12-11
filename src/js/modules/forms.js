'use strict';

import { openModal, closeModal } from './modal';
import { postData } from '../services/services';

const forms = document.querySelectorAll('form');

const message = {
	loading: 'img/form/spinner.svg',
	success: 'Спасибо! Скоро мы с вами свяжемся.',
	failure: 'Что-то пошло не так...',
};

function bindPostData(form, modalSelector, modalTimerId) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const statusMessage = document.createElement('img');
		statusMessage.srcset = message.loading;
		statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
		form.insertAdjacentElement('afterend', statusMessage);

		const formData = new FormData(form);

		const jsonObj = JSON.stringify(Object.fromEntries(formData.entries()));
		// Запрос к серверу при помощи метода Fetch
		postData('http://localhost:3000/requests', jsonObj)
			.then((data) => {
				console.log(data);
				showThanksModal(message.success, modalSelector, modalTimerId);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure, modalSelector, modalTimerId);
			})
			.finally(() => {
				form.reset();
			});
	});
}

function showThanksModal(message, modalSelector, modalTimerId) {
	const prevModalDialog = document.querySelector('.modal__dialog');

	prevModalDialog.classList.add('hide');
	openModal(modalSelector, modalTimerId);

	const thanksModal = document.createElement('div');
	thanksModal.classList.add('modal__dialog');
	thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

	document.querySelector('.modal').append(thanksModal);

	setTimeout(() => {
		thanksModal.remove();
		prevModalDialog.classList.add('show');
		prevModalDialog.classList.remove('hide');
		closeModal(modalSelector);
	}, 4000);
}

export const initForms = (modalSelector, modalTimerId) => {
	forms.forEach((item) => bindPostData(item, modalSelector, modalTimerId));
};
