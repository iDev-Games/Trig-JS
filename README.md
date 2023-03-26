<p align="center">
  <img src="logo.png">
</p>


[![iDev-Games - Trig-JS](https://img.shields.io/static/v1?label=iDev-Games&message=Trig-JS&color=blue&logo=github)](https://github.com/iDev-Games/Trig-JS "Go to GitHub repo")
[![stars - Trig-JS](https://img.shields.io/github/stars/iDev-Games/Trig-JS?style=social)](https://github.com/iDev-Games/Trig-JS)
[![forks - Trig-JS](https://img.shields.io/github/forks/iDev-Games/Trig-JS?style=social)](https://github.com/iDev-Games/Trig-JS)


[![GitHub tag](https://img.shields.io/github/tag/iDev-Games/Trig-JS?include_prereleases=&sort=semver&color=blue)](https://github.com/iDev-Games/Trig-JS/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

![GitHub all releases](https://img.shields.io/github/downloads/idev-games/trig-js/total?label=Release%20Downloads&logo=Github) ![npm](https://img.shields.io/npm/dt/trig-js?logo=NPM) ![npm](https://img.shields.io/npm/dw/trig-js?logo=NPM) ![npm](https://img.shields.io/npm/dm/trig-js?logo=NPM) ![npm](https://img.shields.io/npm/dy/trig-js?logo=NPM)

The easy way to create CSS scroll animations that react to the position of your HTML element on screen. Animate on scroll (AOS) your CSS.

See it in action here: https://idev-games.github.io/Trig-JS/

Find more examples here: https://github.com/iDev-Games/Trig-JS-Examples

You can download from Github.

Install with NPM

```
npm i trig-js
```

Use Trig.js from a CDN
```
https://cdn.jsdelivr.net/npm/trig-js@1.6.0/dist/trig.js
```
```
https://unpkg.com/trig-js@1.6.0/dist/trig.js
```

# What is Trig.js?
Trig.js is a super simple and lightweight way of making CSS scroll animations that react to the position of your HTML elements. You can also use Trig.js to trigger CSS animations once an element appears on screen.

Using nothing but the power of CSS, HTML and Trig.js. You can make the same effects as you see here: https://idev-games.github.io/Trig-JS/! Not just that, Trig.js is really lightweight with a filesize of less than 2kb! Trig.js is created with javascript and doesn't require any dependencies.

Trig.js is really simple and quick to work with. You can use Trig.js even if you arn't familiar with javascript. 

Trig.js is the perfect solution for CSS scroll animations in any project by developers of any skill level for both light or heavy usage. Making it the perfect alternative to frameworks like scrollmagic or GSAP scrolltrigger for most of your website animation needs.

# How To Install?
All you need to do is add the dist trig.js file into your projects JS folder and add the following code with your trig.js location as the src. Put this code in to your head HTML tags

```
<script src="/js/trig.js"></script>
```

Or just add one of the below CDN instead
```
<script src="https://unpkg.com/trig-js@1.6.0/dist/trig.js"></script>
```
```
<script src="https://cdn.jsdelivr.net/npm/trig-js@1.6.0/dist/trig.js"></script>
```

# How To Use?
To activate trig.js add the data attribute "data-trig" or a class "enable-trig" to your html element. To trigger animations trig.js will place a class of "trig" onto your element when it appears on screen.

```
<div class="fadeIn" data-trig> </div>
```
```
.fadeIn{ opacity:0; }
.fadeIn.trig{ animation: fadeIn 1s normal forwards ease-in-out; }
@keyframes fadeIn { 0% { opacity:0; } 100% { opacity:1; } }
```

# Scroll Animations
Trig.js calculates the percentage that the element is on screen and creates CSS variables that you can use with CSS transform etc.

```
<div class="element" data-trig> </div>
```
```
.element{ transform: translateX( var(--trig) ); }
```

The CSS variables you can use are:

```
--trig --trig-reverse --trig-px --trig-px-reverse --trig-deg --trig-deg-reverse
```

# Data Attributes
You can use the below data attributes for additional features

```
<div id="yourelement" data-trig-min="-100" data-trig-max="100" data-trig-offset="0" data-trig> </div>
```

Check out the code of the documentation as an example.

https://github.com/iDev-Games/Trig-JS/blob/main/index.html
