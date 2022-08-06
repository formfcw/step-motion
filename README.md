# Step Motion

[![NPM version](https://img.shields.io/npm/v/step-motion)](https://www.npmjs.com/package/step-motion)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/step-motion?label=size)](https://bundlephobia.com/result?p=step-motion)
[![GitHub license](https://img.shields.io/github/license/formfcw/step-motion)](./LICENSE)

Basic animation function to animate any value or element with a step function. It uses `requestAnimationFrame` for the step function and the [Bezier Easing](https://github.com/gre/bezier-easing) package for easing functions. It is a simple, but very flexible and powerful package, because you can animate everything with it with no limits. It could also be used as a base for a more complex animation library.

## Installation

```bash
npm i step-motion
```
or

```bash
yarn add step-motion
```

## Usage

Import the `animate()` function from `step-motion` and apply a step function.

```js
import animate from 'step-motion'

animate({
    step: (progress) => console.log(progress)
})
```

## API

Parameters:

- `step` … step function that is called on every frame of the animation, with a parameter `progress` … the eased progress (value between `0` and `1`) of the animation (required)
- `duration` … the duration of the animation in `ms` (default: `1000`)
- `delay` … the delay before the animation starts in `ms` (default: `0`)
- `easing` … the bezier easing array of the animation that describes the easing curve (default: `[0, 0, 1, 1]` which is `linear`) – [more information here](https://github.com/gre/bezier-easing)
- `start` … callback function that is called as soon as the animation starts (optional)
- `stop` … callback function that is called as soon as the animation stops (optional)
- `cancel` … callback function that is called as soon as the animation is cancelled (optional)
- `enableReducedMotion` … accessibility feature that prevents animations for users who prefer reduced motion on their OS (default: `true`)

Methods:

- `cancel` … cancels the running animation
- `running` … returns a boolean that indicates if the animation is running or not

## Examples

Example 1 — Animate a value of an element with easing:

```js
const element = document.querySelector('div');

animate({
    step: (progress) => {
        element.style.opacity = progress;
    },
    easing: [0.25, 0, 0.75, 1],
});
```

Example 2 — Same as above but a bit more complex step function:

```js
const element = document.querySelector('div');
const startValue = 20;
const endValue = 80;
const diffValue = endValue - startValue;

animate({
    step: (progress) => {
        element.style.left = startValue + diffValue * progress;
    },
    easing: [0.25, 0, 0.75, 1],
});
```

Example 3 — Animate two values of an element and set a custom duration:

```js
const element = document.querySelector('div');
const startValue = 20;
const endValue = 80;
const diffValue = endValue - startValue;

animate({
    step: (progress) => {
        element.style.opacity = 1 - progress;
        element.style.left = startValue + diffValue * progress;
    },
    duration: 500,
    easing: [0.75, 0, 0.25, 1],
});
```

Example 4 — Add a delay before the animation starts:

```js
const element = document.querySelector('div');

animate({
    step: (progress) => element.style.opacity = progress,
    duration: 750,
    delay: 500,
    easing: [0.25, 0, 0.75, 1],
});
```

Example 5 — Add callbacks for starting, stopping or cancelling the animation:

```js
const element = document.querySelector('div');

animate({
    step: (progress) => element.style.opacity = progress,
    duration: 750,
    delay: 500,
    easing: [0.25, 0, 0.75, 1],
    start: () => console.log('animation has started'),
    cancel: () => console.log('animation was cancelled'),
    stop: () => console.log('animation has stopped'),
});
```

Example 6 — Animate a value without changing DOM elements directly – interesting for manipulating reactive variables (vue, react, svelte, …):

```js
let counter = 0;
const counterMax = 100;

animate({
    step: (progress) => {
        counter = counterMax * progress;
    },
    easing: [0.25, 0, 0.75, 1],
});
```

Example 7 — Cancelling an animation that is running with methods:

```js
const element = document.querySelector('div');

const myAnimation = animate({
    step: (progress) => element.style.opacity = progress,
    cancel: () => console.log('animation was cancelled by a click of a button'),
});

const myButton = document.querySelector('button');

myButton.addEventListener('click', () => {
    if (myAnimation.running()){
        myAnimation.cancel();
        return;
    }
    console.log('animation is not running');
});
```

Example 8 — Disable `prefers-reduced-motion` accessibility feature:

```js
let counter = 0;
const counterMax = 100;

animate({
    step: (progress) => counter = counterMax * progress,
    enableReducedMotion: false,
});
```
