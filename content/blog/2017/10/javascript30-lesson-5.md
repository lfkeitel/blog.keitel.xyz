---
title: "Javascript30 Lesson 5"
description: "What I learned from lesson 5 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-15T15:29:42-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

After the last lesson which was only JavaScript, this lesson dealt mainly with CSS in particular flex box. The JavaScript that
was used had already been covered in previous lessons such as .querySelectorAll(), .forEach(), and classList. In this lesson, you
make a photo gallery page where each image is shown and clicking on an image will expand it to take up more space to get a better
look. With the expanding image, some text also animates in from the top and bottom giving a nice, smooth feel to the whole thing.

## What I Learned

This lesson gave me a bit better understanding of flex boxes. I've used them before in another project but even after using them
I still didn't feel like I understood them well. I still don't fully understand them but that will come with time and use. Since
flexbox is supported an all major browsers, including IE 11, I'll definitely use them in future projects.

## Things I Changed

In addition to the original assignment, I wanted to see how hard it would be to make so clicking one image would close all the
other ones. This way only one image would be "open" at a time. I found it wasn't too difficult. My solution was the following:

```javascript
const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    panels.forEach(panel => { if (panel !== this) panel.classList.remove('open'); });
    this.classList.toggle('open');
}

function toggleActive(e) {
    if (!e.propertyName.includes('flex')) return;

    if (this.classList.contains('open')) {
        this.classList.add('open-active');
    } else {
        this.classList.remove('open-active');
    }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

The .forEach() in toggleOpen() ensures that no other panel has the `open` class then the class is toggled on the clicked panel.
The toggleActive() functions checks if the item has the `open` class and if so, adds the `open-active` class otherwise it removes
it. This was needed because if a panel was clicked open before another one ended its transitions, the classes would get out of
sync where a closed panel would still have the top and bottom text. Having the if statement ensures that only open panels will
have that text.

## Final Thoughts

Flex box is really nice. It makes design a lot cleaner and easier to manage. As I said before I certainly don't know everything
about them, but it will be added to my list of things to learn.
