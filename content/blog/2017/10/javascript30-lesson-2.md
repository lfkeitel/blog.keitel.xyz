---
title: "Javascript30 Lesson 2"
description: "What I learned from lesson 2 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-14T09:30:00-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

Lesson 2 of JavaScript30 was to make a realtime clock with second, minute, and hour hands. This lesson focused on both CSS
and JavaScript. With CSS, styles were applied to adjust the start position of the hands, make them look like a real clock
where they overshoot slightly before bouncing back into place, and ensuring a smooth transition between positions.
JavaScript was used to adjust the rotation of the hands in accordance with the current time.

## What I Learned

From this lesson I learned about the transform-origin and transition-timing-function CSS properties. transform-origin
adjusts where the center of a rotation is taken place. The default value is 50% which places the pivot point in the middle
of the object. For the clock hands, it was set to 100% so the pivot point was instead at the end of the hand so it would
rotate around the center of the clock face. All the hands were also given an initial rotation of 90 degrees so they would
start at the 0 or 12 o'clock position on the clock face.

The transition-timing-function property modifies how a transform is done by adjusting the timing of the transform and the
intermediate values of it. It has a few built-in curves such as ease (default), ease-in, ease-out, step-start, and step-end.
A custom curve can also be defined using the functions steps, cubic-bezier, and frames. For the clock, cubic-bezier was
used to get the slight overshoot and bounce back. The specific values were gotten by using Chrome's Dev Tools to play with
the curve.

The JavaScript side wasn't very complicated. A function is fired at one second intervals which gets the current time
and then adjusts the rotation of the clock hands using ".style.transform". The degree value is determined by taking the
current seconds, minutes, or hours, dividing them by their max values, multiplying by 360 then adding 90 to compensate
for the initial 90 degree rotation of the hands. The code looks like this:

```javascript
function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    const hoursDegrees = ((hours / 24) * 360) + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}
```

The DOM elements are retrieved outside of the function and then referenced from within. ES6 template strings are used
to set the transform property.

## Issues

The only issue with the clock is when the hands reach 0 degrees (90 degrees offset) they jitter and rotate backwards because
they're going from 400 something degrees to 90. To solve this, I set the transition property to "all 0s" which will make
the hand immediately go to its next position. I tried simply removing the property, but the hands still
jumped. The fixed code looks like this:

```javascript
function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    const hoursDegrees = ((hours / 24) * 360) + 90;

    if (seconds === 0) { // Set transition to 0s so hands don't jump
        secondHand.style.transition = 'all 0s';
        minuteHand.style.transition = 'all 0s';
        hourHand.style.transition = 'all 0s';
    } else { // Reapply original duration and timing function
        secondHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
        minuteHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
        hourHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
    }

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}
```

## Final Thoughts

This lesson really helped me to better understand CSS transitions and transforms. This is something I would like to
use more going forward to add that oh so sweet eye candy to my projects. This lesson was pretty fun although I
don't I'll be replacing my system clock with this anytime soon.
