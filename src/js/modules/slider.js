'use strict';

export const sliderOperation = ({ container, nextArrow, prewArrow, slide, totalCounter, currentCounter, wrapper, field }) => {
	const slides = document.querySelectorAll(slide);
	const next = document.querySelector(nextArrow);
	const prev = document.querySelector(prewArrow);
	const total = document.querySelector(totalCounter);
	const current = document.querySelector(currentCounter);
	const slidesField = document.querySelector(field);
	const slideWrapper = document.querySelector(wrapper);
	const slider = document.querySelector(container);

	let widthSlideWindow = window.getComputedStyle(slideWrapper).width;
	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slides.forEach((item) => (item.style.width = widthSlideWindow));

	slider.style.position = 'relative';
	// Индикаторы слайдов
	const indicators = document.createElement('ol');
	let dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	const dotsOpacity = () => {
		dots.forEach((dot) => (dot.style.opacity = '0.5'));
		dots[slideIndex - 1].style.opacity = 1;
	};

	const currentSlideIndex = () => {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	};

	const toDigital = (str) => +str.replace(/\D/g, '');

	// Кнопка Вперед
	next.addEventListener('click', () => {
		if (offset == toDigital(widthSlideWindow) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += toDigital(widthSlideWindow);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		currentSlideIndex();
		dotsOpacity();
	});

	// Кнопка Назад
	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = toDigital(widthSlideWindow) * (slides.length - 1);
		} else {
			offset -= toDigital(widthSlideWindow);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		currentSlideIndex();
		dotsOpacity();
	});

	dots.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +widthSlideWindow.replace(/\D/g, '') * (slideTo - 1);
			slidesField.style.transform = `translate(-${offset}px)`;

			currentSlideIndex();
			dotsOpacity();
		});
	});
};
