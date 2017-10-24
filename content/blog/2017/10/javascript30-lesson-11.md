---
title: "Javascript30 Lesson 11"
description: "What I learned from lesson 11 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-23T19:09:04-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

Lesson 11 has been the most fun so far. This lesson looked at creating custom HTML5 video controls. Browsers have builtin controls
for video and audio elements but they don't offer all the features one may want. Also, they typically don't fit stylistically
with the rest of a site. In this case, custom controls can be created using CSS and JavaScript to add functionality and fit the
style and flow of a site.

## What I Learned

In this lesson I gained a better understanding of how video, and by extension audio, elements can be manipulated both in style
and functionality. One feature I find very helpful is the ability to change the playback speed. Recently I've been increasing
the speed of any video or podcast I watch/listen to. We can process information far faster than we can speak it. This makes it
where a piece of media can be played back much faster but still be able to understand everything that's said. Right now I'm
up to 1.3x and working up to maybe 1.5x.

For this lesson I watched the video first and then implemented it the next day without referencing the video again. For the most
part my code turned out the same but I did have to look up a few things just to remember what was what.

I only made a couple changes the the original project. I set the max playback rate to 3 instead of 2 and set the progress
bar to `flex-basis: 0;` to start. Otherwise the progress bar was already half full when the video hadn't even started yet.

A challenge Wes proposed was to implement fullscreen functionality. I didn't realize the rabbit hole I was about to enter as I
thought to myself, "That can't be too hard." Apparently although there is a [Fullscreen API][mdn-fullscreen] spec, each browser
still has it behind vendor prefixes. There also the problem of some browsers supporting and older version of the spec instead of
the latest. What this means is to support [all browsers][ciu-fullscreen] (IE 11+, Evergreen) you need an if statement like so:

```javascript
if (player.requestFullscreen) { // Actual spec
    player.requestFullscreen();
} else if (player.webkitRequestFullScreen) { // WebKit engine
    player.webkitRequestFullScreen();
} else if (player.mozRequestFullScreen) { // Gecko engine
    player.mozRequestFullScreen();
} else if (player.msRequestFullScreen) { // Microsoft (Trident/EdgeHTML)
    player.msRequestFullScreen();
}
```

This is the same for nearly every aspect of the API. If you want to determine if the site is currently in fullscreen mode, the
spec says check `document.fullscreenElement`. WebKit says nope, check `document.webkitFullscreenElement`. Then Gecko comes
along and is like psshh, nope. Use `document.mozFullScreenElement` instead. Notice the subtle capital S. Mozilla is the only
browser that capitalizes screen in fullscreen. This is utter madness. Hopefully everyone will sort this out soon. I would prefer
a nice simple API like most sane people and not have to use a giant if statement for each thing. Yes there are ways to clean
it up. You can just make a function that hides it or assign the document function to the browser specific one, but still.

In the end, I didn't bother messing with anything except Chrome for the rest of my fullscreen implementation. My final version
looks like this:

```javascript
fullscreen_btn.addEventListener('click', () => {
    if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
        return
    }

    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.webkitRequestFullScreen) {
        player.webkitRequestFullScreen();
    } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
    } else if (player.msRequestFullScreen) {
        player.msRequestFullScreen();
    }
})
```

I added a button to the control bar, I just had it display `FS`, and then linked it to the above function. Actually going to
fullscreen I wrote out the full if statement but for detecting and actually exiting fullscreen mode, I only use the webkit prefix.
The only issue I ran into is my video player has a weird border when in fullscreen. I'm not sure if I used the wrong element or
if there's something I could do in the styles to remove it. By this point I was just happy to have something fullscreen so didn't
spend any time finding a solution. Over all I feel it went well.


## Final Thoughts

The use of media on the web will only increase going forward. Being able to manipulate and control it well can mean the difference
between a repeat or one-time user. As web developers we want to create an immersive and pleasant experience for our users so they
feel comfortable and want to come back. Creating a well styled, feature rich media player is one step towards that goal.

One last thing. **Always** turnoff autoplay on video and audio unless the user is expecting it.

[mdn-fullscreen]: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
[ciu-fullscreen]: https://caniuse.com/#search=Full%20Screen%20API
