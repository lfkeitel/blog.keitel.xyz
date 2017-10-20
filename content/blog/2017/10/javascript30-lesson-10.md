---
title: "Javascript30 Lesson 10"
description: "What I learned from lesson 10 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-19T20:50:39-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

So, I'm not gonna lie. This lesson was difficult. The JavaScript itself wasn't difficult, but the logic in the implementation.
Honestly this lesson touched on one of the big issues I feel I have with programming which is thinking through a solution in a
concise and logical way. I feel like many implementations and solutions I write simply aren't correct. They may work, but I
know it's not the right way to do it. My biggest problem is I can tell when my code is bad, but I don't know how to fix it.
Part of it may be because I'm thinking about the problem through the lens of my weird, inefficient solution and don't have
enough "room" to think about another solution. It really bothers me when I get that feeling. I know there's a better way
to do something but I simply can't figure it out. This lesson made me feel that way.

For this lesson the goal was to have a list of checkboxes and check any boxes between two that the use clicked. So the use
clicks checkbox 2 then shift clicks checkbox 4, checkbox 3 should also be checked. I tried working on the solution myself
before finishing the video and seeing Wes's solution. I got it working. But my solution is so horrible I'm not going to post
it. I'll simply describe it. My original solution uses three flags and six if statements while looping over the checkboxes.
My solution was the same general pattern as Wes's. Keep track of the last clicked checkbox and if the user clicks on a box
while holding shift, run .forEach() on the checkbox node list and compare nodes.

Wes's solution is a compact 14 lines if you make the loop if statements one-liners. My solution was 37 lines of spaghetti code.

## Final Thoughts

The prepared solution was elegant and simple. After looking at it, it was obvious to be written that way. I need to work on
simplifying my way of thinking. I've been programming for roughly five years and still think up overly complex beasts for
something that could be solved with half as much time and half as much code. Maybe I'll starting working through logic puzzles.
