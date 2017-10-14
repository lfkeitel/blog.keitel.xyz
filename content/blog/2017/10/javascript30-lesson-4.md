---
title: "Javascript30 Lesson 4"
description: "What I learned from lesson 4 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-14T13:30:00-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

This lesson dealt with JavaScript array fundamentals rather than making a functional application. Not as fun,
but still very important.

## What I Learned

I've used array functions like map, filter, and reduce in other languages but not JavaScript. The implementations are
simple to understand and doesn't take long to learn.

My solutions to the sort problems are a bit simpler then what Wes used in the video:

```javascript
// Problem 3
// Original Answer
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);

// My Answer
const sortedBirths = inventors.sort((a, b) => a.year - b.year);

// Problem 5
// Original Answer
const oldest = inventors.sort(function(a, b) {
    const lastInventor = a.passed - a.year;
    const nextInventor = b.passed - b.year;
    return lastInventor > nextInventor ? -1 : 1;
});

// My Answer
const sortedYearsAlive = inventors.sort((a, b) => (b.passed - b.year) - (a.passed - a.year));
```

For a couple other solutions the only differences were removing a `return` keyword or something similar.

## Final Thoughts

Not much to say for this one. Nothing fancy or ground breaking, just working on basic JavaScript stuffs.
