import BezierEasing from 'bezier-easing';


export default function (options) {
	const {
		step: stepCallback,
		duration = 1000,
		delay = 0,
		easing: bezierArray = [0, 0, 1, 1],
		start: startCallback = () => { },
		stop: stopCallback = () => { },
		cancel: cancelCallback = () => { },
		enableReducedMotion = true,
	} = options;

	const prefersReducedMotion = () => enableReducedMotion && window.matchMedia('(prefers-reduced-motion)').matches;

	if (duration === 0 || prefersReducedMotion()) {
		startCallback();
		stepCallback(1);
		stopCallback();
		return;
	}

	let startTime = false;
	let stop = false;
	let cancel = false;

	const easing = BezierEasing(...bezierArray);

	const methods = {
		cancel: () => cancel = true,
		running: () => !stop && !cancel,
	};

	function step(timestamp) {
		if (cancel) {
			cancelCallback();
			return;
		}

		if (stop) {
			stopCallback();
			return;
		}

		if (!startTime) {
			startCallback();
			startTime = timestamp;
		}

		const elapsedTimeSinceStart = timestamp - startTime;

		if (elapsedTimeSinceStart > delay) {
			const elapsedTimeSinceDelay = elapsedTimeSinceStart - delay;
			const progress = elapsedTimeSinceDelay / duration;
			let easedProgress = easing(progress);

			if (progress >= 1) {
				easedProgress = 1;
				stop = true;
			}

			stepCallback(easedProgress);
		}

		window.requestAnimationFrame(step);
	};

	window.requestAnimationFrame(step);

	return methods;
}