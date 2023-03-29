/* Trig.js v1.7.2 by iDev Games */
const trig = {
    trigs: [],
    thePos: [],
    documentHeight: 0,
    trigIntersecting: function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("trig");
        } else {
            entry.target.classList.remove("trig");
        }
    },
    trigEntries: function(entries) {
        entries.forEach(function(entry) {
            trigObject.trigIntersecting(entry);
            trigObject.trigPos(entry);
        });
    },
    trigSetPos: function(el, min, max, entry, offset) {
        var posTop = 0 - (el - ((trigObject.documentHeight / 2) + offset));
        var pos = (posTop / trigObject.documentHeight) * 100;
        if (pos >= min && pos <= max) {
            trigObject.thePos[entry.target.index] = pos;
        } else if (pos <= min) {
            trigObject.thePos[entry.target.index] = min;
        } else if (pos >= max) {
            trigObject.thePos[entry.target.index] = max;
        }    
    },
    trigPos: function(entry) {
        var offset = 0;
        var min = -100;
        var max = 100;
        var el = entry.boundingClientRect.top;
        if (entry.target.dataset.trigOffset) {
            offset = parseInt(entry.target.dataset.trigOffset);
        }
        if (entry.target.dataset.trigMin) {
            min = parseInt(entry.target.dataset.trigMin);
        }
        if (entry.target.dataset.trigMax) {
            max = parseInt(entry.target.dataset.trigMax);
        }
        trigObject.trigSetPos(el, min, max, entry, offset);
    },
    updatePos: function() {
        trigObject.trigs.forEach(function(element, index) {
            var el = element.style;
            el.setProperty('--trig', trigObject.thePos[index] + "%");
            el.setProperty('--trig-reverse', -(trigObject.thePos[index]) + "%");
            el.setProperty('--trig-px', trigObject.thePos[index] + "px");
            el.setProperty('--trig-px-reverse', -(trigObject.thePos[index]) + "px");
            el.setProperty('--trig-deg', ((trigObject.thePos[index] / 100) * 360) + "deg");
            el.setProperty('--trig-deg-reverse', ((-(trigObject.thePos[index]) / 100) * 360) + "deg");
        });
    }
};

const observer = new IntersectionObserver(function(entries) {
    trigObject.trigEntries(entries);
    trigObject.updatePos(trigObject.trigs);
    observer.disconnect();
});
  
const trigObject = Object.create(trig);

document.addEventListener('scroll', trigScroll, false);
document.addEventListener('resize', trigInit, false);
document.addEventListener('DOMContentLoaded', trigInit, false);

function trigInit(){
    trigObject.trigs = document.querySelectorAll('.enable-trig,[data-trig]');
    trigObject.documentHeight = innerHeight;
    trigScroll();
}

function trigScroll() {
    if (trigObject.trigs) {
        trigObject.trigs.forEach(function(element, index) {
            element.index = index;
            observer.observe(element);
        });
    }
}