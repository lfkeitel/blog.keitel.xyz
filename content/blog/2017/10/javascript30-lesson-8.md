---
title: "Javascript30 Lesson 8"
description: "What I learned from lesson 8 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-17T19:40:14-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

Lesson 8 so far ass been the most fun. It focused around HTML canvases with the goal being to make a simple painting application.
I have some experience with canvases before this lesson. A couple years ago I made an implementation of Conway's Game of Life
using the canvas element. I have it setup at the bottom of this post if you want to play it. Source code it [here](https://github.com/lfkeitel/gameoflife).

Canvas elements allow web develops to have very fine control over a section of the page. Graphics can be as complex or simple as
needed and their decent enough to work with.

## What I Learned

This lesson was reenforcement of event listeners which were used to get mouse movement, and basic canvas usage. In my Game of Life,
I used the fillRect() and strokeRect() context methods which this lesson used line drawing. I did learn about several style
settings that can be applied to lines such as strokeStyle, lineJoin, lineCap, and lineWidth. None of which I've used before.
I also learned about the power of hsl(). [hsl](https://en.wikipedia.org/wiki/HSL_and_HSV) is a way of defining colors. In contrast
to the RGB model where a color is specified by its red, green, and blue components, hsl uses hue, saturation, and lightness.
Hue is the color itself. Saturation is the amount of the color. Lightness is how bright the color is. The Wikipedia article
does a better job explaining it and it has pretty charts too. So if you want to learn about the specifics go and give that a read.

In this lesson, hsl was used to programmatically change the color of the line as the mouse was dragged across the canvas. This was
done by simply changing the hue value while keeping the saturation and lightness constant. The relevant code being:

```javascript
function draw(e) {
    ...
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Assign new line color
    ...
    hue = (hue + 1) % 360; // Adjust hue
}
```

In the lesson, Wes used a simply if statement to reset the hue to 0. In my code I used a more compact for with the modulus operator.

## Final Thoughts

The canvas element is really neat. For bigger projects I can see where it may get a bit clunky to use, but it appears to be a very
powerful element for designers and developers. I can't think of any upcoming projects where I would need it, but I'll certainly
keep it in my toolbox.

Now, please enjoy my version of Conway's Game of Life.

## Conway's Game of Life

Only tested in Chrome, but should work in other browsers. For mobile, all bets are off.
Click on a square to toggle it "live" or "dead". Click and drag to make shapes. When you're ready, click "Play".
The game will detect if life has stalled or is looping and will display that generation number next to "Messages".

<div class="conway-game-of-life">
<canvas id="game-grid" height="600" width="900"></canvas>

<br><div>
    Messages: <span id="messages">Paused</span>
    <br>Generation: <span id="generation-count">0</span>
</div>

<div id="controls">
    <button type="button" onClick="Game.play(1);">Play</button>
    <button type="button" onClick="Game.play(2);">Play Fast</button>
    <button type="button" onClick="Game.play(5);">Play Really Fast</button>
    <button type="button" onClick="Game.play(10);">Play Ludicrous Speed</button>
    <button type="button" onClick="Game.nextOneStep();">One Step</button>
    <button type="button" onClick="Game.pause();">Pause</button>
    <button type="button" onClick="Game.init();">Reset</button>
    <input type="checkbox" id="pause-stall" onClick="Game.setPauseOnStall();"> Pause on life stall
</div>
<script type="text/javascript" src="/js/2017/10/gameoflife.js"></script>
</div>
