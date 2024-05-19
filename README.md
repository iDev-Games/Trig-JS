<p align="center">
  <img src="https://github.com/iDev-Games/Trig-JS/blob/main/logo.png">
</p>


[![iDev-Games - Trig-JS](https://img.shields.io/static/v1?label=iDev-Games&message=Trig-JS&color=blue&logo=github)](https://github.com/iDev-Games/Trig-JS "Go to GitHub repo")
[![stars - Trig-JS](https://img.shields.io/github/stars/iDev-Games/Trig-JS?style=social)](https://github.com/iDev-Games/Trig-JS)

[![Stargazers repo roster for @iDev-Games/Trig-JS](https://reporoster.com/stars/iDev-Games/Trig-JS)](https://github.com/iDev-Games/Trig-JS/stargazers)

[![GitHub tag](https://img.shields.io/github/tag/iDev-Games/Trig-JS?include_prereleases=&sort=semver&color=blue)](https://github.com/iDev-Games/Trig-JS/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
![npm bundle size](https://img.shields.io/bundlephobia/min/trig-js)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ce378a75b36040f9a820005742a225ac)](https://app.codacy.com/gh/iDev-Games/Trig-JS/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/0d58ec40b6b2e8231b19/maintainability)](https://codeclimate.com/github/iDev-Games/Trig-JS/maintainability)

![npm](https://img.shields.io/npm/dt/trig-js?logo=NPM) ![npm](https://img.shields.io/npm/dw/trig-js?logo=NPM) ![npm](https://img.shields.io/npm/dm/trig-js?logo=NPM) ![npm](https://img.shields.io/npm/dy/trig-js?logo=NPM) ![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/trig-js)

The easy way to create CSS scroll animations that react to the position of your HTML element on screen. Animate on scroll (AOS) your CSS.

<p align="center">
  <img src="https://github.com/iDev-Games/Trig-JS/raw/main/creative.gif">
</p>


See it in action here: https://idev-games.github.io/Trig-JS/

Find more examples here: https://github.com/iDev-Games/Trig-JS-Examples

You can download from Github.

Install with NPM

```css
npm i trig-js
```

Use Trig.js from a CDN
```
https://cdn.jsdelivr.net/npm/trig-js/src/trig.min.js
```

# What is Trig.js?
Trig.js is a super simple, efficient and lightweight way of making CSS scroll animations that react to the position of your HTML elements. You can also use Trig.js to trigger CSS animations once an element appears on screen.

Using nothing but the power of CSS, HTML and Trig.js. You can make the same effects as you see here: https://idev-games.github.io/Trig-JS/! Not just that, Trig.js is really lightweight with a filesize of ![npm bundle size](https://img.shields.io/bundlephobia/min/trig-js)! Trig.js is created with javascript and doesn't require any dependencies.

Trig.js is really simple and quick to work with. You can use Trig.js even if you arn't familiar with javascript. 

Trig.js is the perfect solution for CSS scroll animations in any project by developers of any skill level for both light or heavy usage. Making it the perfect alternative to libraries like scrollmagic or GSAP scrolltrigger for most of your website animation needs.

# How To Install?
All you need to do is add the dist trig.js file into your projects JS folder and add the following code with your trig.js location as the src. Put this code in to your head HTML tags

```html
<script src="/js/trig.js"></script>
```

Or just add a CDN instead
```html
<script src="https://cdn.jsdelivr.net/npm/trig-js/src/trig.min.js"></script>
```

# How To Use?
To activate trig.js add the data attribute "data-trig" or a class "enable-trig" to your html element. To trigger animations trig.js will place a class of "trig" onto your element when it appears on screen.

```html
<div class="fadeIn" data-trig> </div>
```
```css
.fadeIn{ 
    opacity:0;
}
.fadeIn.trig{ 
    animation: fadeIn 1s normal forwards ease-in-out; 
}
@keyframes fadeIn { 
  0% { 
    opacity:0;
  } 
  100% { 
    opacity:1; 
  } 
}
```

# Scroll Animations
Trig.js calculates the percentage that the element is on screen and creates CSS variables that you can use with CSS transform etc.

```html
<div class="element" data-trig> </div>
```
```css
.element{ 
    transform: translateX( var(--trig) );
}
```

The CSS variables you can use by adding data-trig-var="true", data-trig-pixels="true" or data-trig-degrees="true" are:

```css
var(--trig) /* Percentage */
var(--trig-reverse) /* Reverse percentage */
var(--trig-px) /* Pixels */
var(--trig-px-reverse) /* Reverse pixels */
var(--trig-deg) /* Degrees */
var(--trig-deg-reverse) /* Reverse degrees */
```

# Scroll Direction
Trig.js creates a class of "trig-scroll-up" or "trig-scroll-down" onto the body of the document depending on the last scroll direction.

# Scroll Position
Trig.js creates a class of "trig-scroll-top" or "trig-scroll-bottom" onto the body of the document depending on the last scroll position. To give the ability to make something happen at different break points down the page. The classes "trig-scroll-25", "trig-scroll-50" and "trig-scroll-75" are added to the body of the document depending on the scroll position percentage down the page.

# Data Attributes
You can use the below data attributes for additional features

```html
<div id="yourelement" data-trig-min="-100" data-trig-max="100" data-trig-offset="0" data-trig-negativeOffset="0" data-trig-height="0" data-trig-global="false" data-trig> </div>
```

Check out the code of the documentation as an example.

https://github.com/iDev-Games/Trig-JS/blob/main/index.html
