/* Trig.js v1.6.0 by iDev Games */
document.addEventListener('DOMContentLoaded', initTrig, false);

function initTrig() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(function(entry) {
            const intersecting = entry.isIntersecting;
            if (intersecting) {
                entry.target.classList.add("trig");
            } else {
                entry.target.classList.remove("trig");
            }
            var offset = 0;
            var min = -100;
            var max = 100;
            var el = entry.boundingClientRect.top + scrollY;
            if (entry.target.dataset.trigOffset) {
                offset = parseInt(entry.target.dataset.trigOffset);
            }
            if (entry.target.dataset.trigMin) {
                min = parseInt(entry.target.dataset.trigMin);
            }
            if (entry.target.dataset.trigMax) {
                max = parseInt(entry.target.dataset.trigMax);
            }
            var posTop = pageYOffset - (el - ((innerHeight / 2) + offset));
            var pos = (posTop / innerHeight) * 100;
            if (pos >= min && pos <= max) {
                thePos[entry.target.index] = pos;
            } else if (pos <= min) {
                thePos[entry.target.index] = min;
            } else if (pos >= max) {
                thePos[entry.target.index] = max;
            }
        });
        updatePos();
        observer.disconnect();
    });
    var trigs = document.querySelectorAll('.enable-trig,[data-trig]');
    var thePos = [];
    document.addEventListener('scroll', trigScroll, false);
    document.addEventListener('resize', trigScroll, false);
    trigScroll();

    function trigScroll() {
        if (trigs) {
            trigs.forEach(function(element, index) {
                element.index = index;
                observer.observe(element);
            });
        }
    }

    function updatePos() {
        trigs.forEach(function(element, index) {
            var el = element.style;
            el.setProperty('--trig', thePos[index] + "%");
            el.setProperty('--trig-reverse', -(thePos[index]) + "%");
            el.setProperty('--trig-px', thePos[index] + "px");
            el.setProperty('--trig-px-reverse', -(thePos[index]) + "px");
            el.setProperty('--trig-deg', ((thePos[index] / 100) * 360) + "deg");
            el.setProperty('--trig-deg-reverse', ((-(thePos[index]) / 100) * 360) + "deg");
        });
    }
}