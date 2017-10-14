---
title: "Javascript30 Lesson 3"
description: "What I learned from lesson 3 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-14T12:30:00-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

Lesson 3 dealt more with CSS than JavaScript. This lesson demonstrated the use of variables in standard CSS. Although
CSS preprocessors have had variables for quite some time, the values of them can't be changed at runtime. Meaning, there's
no way to change a single value and have all other dependent properties update with the new value. In contrast, when a variable
in CSS is altered, every property that uses it will also be updated and repainted. This allows the programmer to change just
one value such as a color, and multiple elements on the page will be updated simultaneously.

## What I Learned

I had heard about variables coming to CSS but have never looked into them much. So this was the first time I've ever used
them. The syntax of variables is a bit odd especially if you've used a CSS preprocessor before. Personally I've used LESS
in the past. I feel the syntax is a bit clunky but I understand them wanting to maintain backwards compatibility with existing
tooling. For example if `$var` was used instead, how would a preprocessor know if the user wants the variable "compiled"
or if it's meant to be a standard CSS variable. So dispite the syntax, I see variables as a great step forward and opens
up possibilities for more maintainable JavaScript and styles.

## Final Thoughts

CSS variable are really nice and I can see where I may use them in the future. As for compatibility, all the evergreen
browsers support them with a couple minor issues in Edge. Internet Explorer has no compatibility at all so if IE support
is still needed, variables can't be used.
