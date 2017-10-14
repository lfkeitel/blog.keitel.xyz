---
title: "JavaScript30 - Lesson 1"
description: "What I learned from lesson 1 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-13T18:35:09-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

The first lesson of JavaScript30 is to make a page where pressing a key on the homerow of a qwerty keyboard caused the browser
to play a sound such as a bass drum, cymbal, or snare drum. This lesson focused on event handlers and manipulating the HTML
audio element.

## What I Learned

I was already familiar with event handlers and query selectors. I've never used an audio element before so that was new.
In particular I was already aware of being able to play and stop audio with JavaScript but I wasn't aware of being able to
manipulate the current time of an audio or video element. In order to allow playing a sound in quick succession, you
need to set the currentTime property of the audio element to 0. This "rewinds" the audio to the beginning. After this, play() is called
on the audio element to ensure it's still playing the sound.

This lesson also touched on CSS transitions. When a key was pressed, the audio would play and the corresponding
box on the page would slightly expand and gain a yellow glow. To do this, a class was added when the key was pressed
and removed when the event "transitionend" was fired. In particular, the event being looked for had a propertyName of
"transform" which is the event fired once the transition ended for the transform CSS property.

## Final Thoughts

I don't necessarily see myself using the audio element any time soon, but it's still good to know just in case.
The CSS transforms and animations is definitely something I want to research some more. I'm still unsure how
transforms work in the sense of how they're applied and how a transform on one class affects another.
