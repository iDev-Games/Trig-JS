/* Trig.js v2.0.0 by iDev Games */
class Trig
{
    trigs = [];
    thePos = [];
    height = 0;
    scrollDir = ["trig-scroll-down", "trig-scroll-up"];
    observer;
    trigInit() {
        trig.observer = new IntersectionObserver(trig.trigObserver);
        trig.trigs = document.querySelectorAll('.enable-trig,[data-trig]');
        trig.height = innerHeight;
        trig.trigScroll();
    }
    trigScroll(){
        if (trig.trigs) {
            trig.trigs.forEach(function(element, index) {
                element.index = index;
                trig.observer.observe(element);
            });
        }
    }
    trigEntries(entries) {
        entries.forEach(function(entry) {
            trig.trigIntersecting(entry);
            if(entry.target.index == 0){
                trig.trigDirection(entry);
            }
            trig.trigPos(entry);
            trig.updatePos(entry.target);
        });
    }
    trigDirection(entry){
        var y = entry.boundingClientRect.y;
        if(trig.scrollPos){
            if(trig.scrollPos <= y) {
                trig.scrollDir = ["trig-scroll-down", "trig-scroll-up"];
            } else {
                trig.scrollDir = ["trig-scroll-up", "trig-scroll-down"];
            }
        }
        trig.scrollPos = y;
    }
    trigObserver(entries){
        trig.trigEntries(entries);
        trig.observer.disconnect();
    }
    trigIntersecting(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("trig");
        } else {
            entry.target.classList.remove("trig");
        }
    }
    trigPos(entry) {
        var offset = 0;
        var hOffset = 0;
        var min = -100;
        var max = 100;
        var el = entry.boundingClientRect.top;
        var height = entry.boundingClientRect.height;
        var dSet = entry.target.dataset;
        if (dSet.trigOffset) {
            offset = parseInt(dSet.trigOffset);
        }
        if (dSet.trigMin) {
            min = parseInt(dSet.trigMin);
        }
        if (dSet.trigMax) {
            max = parseInt(dSet.trigMax);
        }
        if (dSet.trigHeight) {
            hOffset = parseInt(dSet.trigHeight);
        }
        if(trig.height > height){
            height = trig.height;
        }
        var posTop = 0 - (el - ((trig.height / 2) + offset));
        var pos = (posTop / (height + hOffset)) * 100;
        trig.trigSetPos(pos, min, max, entry.target);
    }
    trigSetPos(pos, min, max, entry) {
        if (pos >= min && pos <= max) {
            trig.thePos[entry.index] = pos;
        } else if (pos <= min) {
            trig.thePos[entry.index] = min;
        } else if (pos >= max) {
            trig.thePos[entry.index] = max;
        }    
    }
    updatePos(element) {
        if (element.dataset.trigGlobal == "true" && element.id) {
            var el = document.documentElement.style;
            var id = "-"+element.id;
        } else {
            var el = element.style;
            var id = "";
        }
        var bo = document.body.classList;
        if(bo.contains(trig.scrollDir[0])){
            bo.replace(trig.scrollDir[0], trig.scrollDir[1]);
        }
        if(!bo.contains(trig.scrollDir[0]) && !bo.contains(trig.scrollDir[1])){
            bo.add("trig-scroll-up");
        }
        el.setProperty('--trig'+id, trig.thePos[element.index] + "%");
        el.setProperty('--trig-reverse'+id, -(trig.thePos[element.index]) + "%");
        el.setProperty('--trig-px'+id, trig.thePos[element.index] + "px");
        el.setProperty('--trig-px-reverse'+id, -(trig.thePos[element.index]) + "px");
        el.setProperty('--trig-deg'+id, ((trig.thePos[element.index] / 100) * 360) + "deg");
        el.setProperty('--trig-deg-reverse'+id, ((-(trig.thePos[element.index]) / 100) * 360) + "deg");
    }
}
const trig = new Trig;

document.addEventListener('scroll', trig.trigScroll, false);
document.addEventListener('resize', trig.trigInit, false);
document.addEventListener('DOMContentLoaded', trig.trigInit, false);