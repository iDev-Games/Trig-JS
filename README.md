# Trig.js
Trig.js is a simple and lightweight way to take more control of your animations with simple data attributes.

See it in action here: https://idev-games.github.io/Trig-JS/

# What is Trig.js?
Trig.js is a super simple and lightweight way of making CSS animations that react to the position of your HTML elements. You can also use Trig.js to trigger CSS animations once an element appears on screen.

Using nothing but the power of CSS, HTML and Trig.js. You can make the same effects as you see here! Not just that, Trig.js is really lightweight with a filesize of less than 5kb! Trig.js is created with javascript and doesn't require any dependencies.

Trig.js is really simple and quick to work with. You can use Trig.js even if you arn't familiar with javascript.

# How to install?
All you need to do is add the dist trig.js file into your projects JS folder and add the following code with your trig.js location as the src. Put this code in to your head HTML tags

```
<script src="/js/trig.js"></script>
```

# How to use?
To activate trig.js add the data attribute "data-trig" to your html element. To trigger animations trig.js will place a class of "trig" onto your element when it appears on screen.

```
<div class="fadeIn" data-trig> </div>
```
```
.fadeIn{ opacity:0; }
.fadeIn.trig{ animation: fadeIn 1s normal forwards ease-in-out; }
@keyframes fadeIn { 0% { opacity:0; } 100% { opacity:1; } }
```

# Scroll Animations
Trig.js calculates the percentage that the element is on screen and creates CSS variables using the elements id that you can use with CSS transform.

```
<div id="yourelementid" data-trig> </div>
```
```
#yourelementid{ transform: translateX( var(--trig-yourelementid) ); }
```

The CSS variables you can use are:

```
--trig-yourelementid --trig-reverse-yourelementid --trig-deg-yourelementid --trig-deg-reverse-yourelementid
```

# Data Attributes
You can use the below data attributes for additional features

```
<div id="yourelement" data-trig-min="-100" data-trig-max="100" data-trig-offset="0" data-trig-height="0" data-trig> </div>
```

Check out the code of the documentation as an example.

https://github.com/iDev-Games/Trig-JS/blob/main/index.html