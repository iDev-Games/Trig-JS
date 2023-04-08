/* Trig.js v2.1.0 by iDev Games */
class Trig
{
    trigs = [];
    thePos = [];
    height = 0;
    pos = 0;
    scrollDir = ["trig-scroll-down", "trig-scroll-up"];
    observer;
    trigInit() {
        trig.observer = new IntersectionObserver(trig.trigObserver);
        trig.trigs = document.querySelectorAll('body,.enable-trig,[data-trig]');
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
            if(trig.scrollPos < y-1) {
                trig.scrollDir = ["trig-scroll-down", "trig-scroll-up"];
            } else if(trig.scrollPos > y+1) {
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
        if(document.body != entry.target){
            if (entry.isIntersecting) {
                entry.target.classList.add("trig");
            } else {
                entry.target.classList.remove("trig");
            }
        }
    }
    trigPos(entry) {
        var options = { offset: 0, height: 0, min: -100, max: 100 };
        Object.keys(options).forEach(function(key) {
            options[key] = trig.trigAttributes(entry, options, key);
        });
        var el = entry.boundingClientRect.top;
        var height = entry.boundingClientRect.height;
        if(trig.height > height){
            height = trig.height;
        }
        if(document.body == entry.target){
            var posTop = 0 - (el);
            var pos = (posTop / (height - ((trig.height)))) * 100;
        } else {
            var posTop = 0 - (el - ((trig.height / 2) + options.offset));
            var pos = (posTop / (height + options.height)) * 100;
        }
        trig.trigSetPos(pos, options.min, options.max, entry.target);
    }
    trigAttributes(entry, options, name){
        var dSet = entry.target.getAttribute("data-trig-"+name);
        if (dSet) {
            if(dSet.match(/^[0-9]+$/) != null){
                return parseInt(dSet);
            } else {
                return dSet;
            }
        } else {
            return options[name];
        }
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
    trigSetBody(element){
        var bo = element;
        var cl = bo.classList;
        if(cl.contains(trig.scrollDir[0])){
            cl.replace(trig.scrollDir[0], trig.scrollDir[1]);
        }
        if(!cl.contains(trig.scrollDir[0]) && !cl.contains(trig.scrollDir[1])){
            cl.add("trig-scroll-up");
        }
        if(trig.thePos[element.index] == 0){
            cl.add("trig-scroll-top");
        } else {
            cl.remove("trig-scroll-top");
        }
        if(trig.thePos[element.index] == 100){
            cl.add("trig-scroll-bottom");
        } else {
            cl.remove("trig-scroll-bottom");
        }
        var split = [25,50,75];
        for (let i = 0; i < 4; i++) {
            trig.trigSplit(split[i], element.index, cl);
        }
    }
    trigSplit(split, index, cl){
        if(trig.thePos[index] >= split){
            cl.add("trig-scroll-"+split);
        } else if(trig.thePos[index] < split) {
            cl.remove("trig-scroll-"+split);
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
        if(document.body == element){
            trig.trigSetBody(element);
        } else {
            el.setProperty('--trig'+id, trig.thePos[element.index] + "%");
            el.setProperty('--trig-reverse'+id, -(trig.thePos[element.index]) + "%");
            el.setProperty('--trig-px'+id, trig.thePos[element.index] + "px");
            el.setProperty('--trig-px-reverse'+id, -(trig.thePos[element.index]) + "px");
            el.setProperty('--trig-deg'+id, ((trig.thePos[element.index] / 100) * 360) + "deg");
            el.setProperty('--trig-deg-reverse'+id, ((-(trig.thePos[element.index]) / 100) * 360) + "deg");
        }
    }
}
const trig = new Trig;

document.addEventListener('scroll', trig.trigScroll, false);
document.addEventListener('resize', trig.trigInit, false);
document.addEventListener('DOMContentLoaded', trig.trigInit, false);
