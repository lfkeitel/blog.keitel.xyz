---
title: "Javascript30 Lesson 6 & 7"
description: "What I learned from lessons 6 & 7 of JavaScript30"
author: "Lee Keitel"
date: 2017-10-15T21:30:30-05:00

type: "post"
categories: ["JavaScript30", "JavaScript", "web dev"]
---

For this post I decided to lump together lessons 6 and 7 because 7 was another one that dealt with array functions. It went over
four functions .some(), .every(), .find(), and .findIndex(). All of them are simple to understand. The some() function returns if
any item in an Array satisfies the function you give to some. This could be used to determine if an Array of people has at least
one adult (age >= 18). The every() function returns if all items in an Array satisfy the given functions. For example if ALL people
in an Array are an adult, not just some. find() and findIndex() return the first item (or its index) that satisfies the given
functions. Using the index one can remove an element from an Array or create a new Array without the unwanted element.

Lesson 6 was much more fun. It demonstrated a type ahead system where a list of options are presented to the user and then filtered
down as the user types. In this case it was a list of cities where the user could search for a city or state name. Each entry
also had the search text highlighted to show that it matched the query. For fun, the population of each city was also show
formatted with commas.

## What I Learned

In lesson 6 I learned how to use the new fetch() API. I had heard and read about it before, but have stuck with traditional AJAX
requests. I would really like to use the API going forward but I'll need to use a polyfill for IE 11 as the evergreen browsers
all support it.

Another API I learned was actually something extra I added at the nudging of Wes in his video which was the geo location API.
I used it to sort the search results by distance using the simple distance formula `sqrt((x2 - x1)^2 + (y2 - y1)^2)`. Code below.
I found this to be a very good exercise because yet again, geo location was something I've never used before. It was cool to be
able to use it even for something so simple.

```javascript
// Simple straight line distance formula
function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

function displayMatches() {
  if (this.value === '') {
    suggestions.innerHTML = '<li>Filter for a city</li><li>or a state</li>';
    return
  }

  const matches = findMatches(this.value, cities);

  let sortedMatches = matches
  if (loc.lat !== 0 && loc.long !== 0) { // If the location was not recieved, don't attempt location sort
    sortedMatches = matches.sort((a, b) => {
      const dist1 = calcDistance(loc.lat, loc.long, a.latitude, a.longitude);
      const dist2 = calcDistance(loc.lat, loc.long, b.latitude, b.longitude);
      return dist1 > dist2 ? 1 : -1;
    });
  }

  const html = sortedMatches.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

// Get geo location on page load
const loc = {lat: 0, long: 0};
navigator.geolocation.getCurrentPosition(function(pos) {
  loc.lat = pos.coords.latitude;
  loc.long = pos.coords.longitude;
});
```

Apart from those two things, everything else was either a topic already discussed in earlier lessons or something I was already
familiar with.

## Final Thoughts

Realtime type ahead is one of those features that's really nice to have an makes the user's life much easier. In this case, the
possible completions were retrieved on page load and didn't change but this could fairly easily be converted to get suggestions
from a server API. In that case it would probably be better to wait for a short amount of time before retrieve results so as
not to make tons of requests in quick succession that would be "expired" by time they returned. Geo location is also a nice
API even though many people (including myself) don't like giving away location information.
