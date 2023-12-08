/**
 * Установка таймера
 */

'use strict';

const deadline = '2023-12-12';
const timerClass = '.timer';

function getTimeRemaining(endTime) {
	let days, hours, minutes, seconds;
	const t = Date.parse(endTime) - Date.parse(new Date());

	if (t <= 0) {
		days = 0;
		hours = 0;
		minutes = 0;
		seconds = 0;
	} else {
		days = Math.floor(t / (1000 * 60 * 60 * 24));
		hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((t / 1000 / 60) % 60);
		seconds = Math.floor((t / 1000) % 60);
	}

	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
}

function setZero(num) {
	return num >= 0 && num < 10 ? `0${num}` : num;
}

function setDatePage(maxdate) {
	const d = new Date(Date.parse(maxdate));
	const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	let month = '';

	months.forEach((item, i) => {
		if (d.getMonth() == i) month = item;
	});

	return `${d.getDate()} ${month}`;
}

function setTimer(selector, endTime) {
	const timer = document.querySelector(selector);
	const days = timer.querySelector('#days');
	const hours = timer.querySelector('#hours');
	const minutes = timer.querySelector('#minutes');
	const seconds = timer.querySelector('#seconds');
	const dataAction = document.querySelector('.promotion__descr-date');
	const timeInterval = setInterval(updateClock, 1000);

	dataAction.innerHTML = setDatePage(endTime);

	updateClock();

	function updateClock() {
		const t = getTimeRemaining(endTime);

		days.innerHTML = setZero(t.days);
		hours.innerHTML = setZero(t.hours);
		minutes.innerHTML = setZero(t.minutes);
		seconds.innerHTML = setZero(t.seconds);

		if (t <= 0) {
			clearInterval(timeInterval);
		}
	}
}

export const timerPage = setTimer(timerClass, deadline);
