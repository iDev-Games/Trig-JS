window.onload=t=>{var e=document.querySelectorAll("[data-trig]"),r=[],i=[];function n(t,e){var r=t.getBoundingClientRect().top+window.scrollY;return(window.pageYOffset-(r-(window.innerHeight/2+e)))/document.body.clientHeight*100}function a(t,e){var r=t.getBoundingClientRect().top+window.scrollY,i=r+g(t)+e,n=window.pageYOffset,a=n+window.innerHeight;return i>n&&r<a}function o(){e&&e.forEach(function(t,e){s(t,e)})}function s(t,e){var r=0,o=0,s=-100,g=100;t.dataset.trigOffset&&(o=parseInt(t.dataset.trigOffset)),t.dataset.trigMin&&(s=parseInt(t.dataset.trigMin)),t.dataset.trigMax&&(g=parseInt(t.dataset.trigMax));var l=a(t,r),c=n(t,o);l&&(c>=s&&c<=g?i[e]=c:c<=s?i[e]=s:c>=g&&(i[e]=g)),t.dataset.height&&(r=t.dataset.height),l?t.classList.add("trig"):t.classList.remove("trig"),d()}function d(){e.forEach(function(t,e){r[e]||(r[e]=0),t.id&&r[e]!=i[e]&&(document.documentElement.style.setProperty("--trig-"+t.id,i[e]+"%"),document.documentElement.style.setProperty("--trig-reverse-"+t.id,-i[e]+"%"),document.documentElement.style.setProperty("--trig-deg-"+t.id,i[e]/100*360+"deg"),document.documentElement.style.setProperty("--trig-deg-reverse-"+t.id,-i[e]/100*360+"deg"))})}function g(t){var e=window.getComputedStyle(t),r=parseFloat(e.marginTop)+parseFloat(e.marginBottom);return Math.ceil(t.offsetHeight+r)}window.addEventListener("scroll",o,!1),window.addEventListener("resize",o,!1),o()};