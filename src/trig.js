/* Trig.js v2.1.7 by iDev Games */
class Trig
{
    trigs = [];
    thePos = [];
    height = 0;
    pos = 0;
    scrollDir = ["trig-scroll-down", "trig-scroll-up"];
    observer;
    constructor() {
        self = this;       
    }
    trigInit() {
        self.observer = new IntersectionObserver(self.trigObserver);
        self.trigs = document.querySelectorAll('body,.enable-trig,[data-trig]');
        self.height = innerHeight;
        self.trigScroll();
    }
    trigScroll(){
        if (self.trigs) {
            self.trigs.forEach(function(element, index) {
                element.index = index;
                self.observer.observe(element);
            });
        }
    }
    trigEntries(entries) {
        entries.forEach(function(entry) {
            self.trigIntersecting(entry);
            if(entry.target.index == 0){
                self.trigDirection(entry);
            }
            self.trigPos(entry);
            self.updatePos(entry.target);
        });
    }
    trigDirection(entry){
        var y = entry.boundingClientRect.y;
        if(self.scrollPos){
            if(self.scrollPos < y-1) {
                self.scrollDir = ["trig-scroll-down", "trig-scroll-up"];
            } else if(self.scrollPos > y+1) {
                self.scrollDir = ["trig-scroll-up", "trig-scroll-down"];
            }
        }
        self.scrollPos = y;
    }
    trigObserver(entries){
        self.trigEntries(entries);
        self.observer.disconnect();
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
            options[key] = self.trigAttributes(entry, options, key);
        });
        var el = entry.boundingClientRect.top;
        var height = entry.boundingClientRect.height;
        if(self.height > height){
            height = self.height;
        }
        if(document.body == entry.target){
            var posTop = 0 - (el);
            var pos = (posTop / (height - ((self.height)))) * 100;
        } else {
            var posTop = 0 - (el - ((self.height / 2) + options.offset));
            var pos = (posTop / (height + options.height)) * 100;
        }
        self.trigSetPos(pos, options.min, options.max, entry.target);
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
            self.thePos[entry.index] = pos;
        } else if (pos <= min) {
            self.thePos[entry.index] = min;
        } else if (pos >= max) {
            self.thePos[entry.index] = max;
        }    
    }
    trigSetBody(element){
        var bo = element;
        var cl = bo.classList;
        if(cl.contains(self.scrollDir[0])){
            cl.replace(self.scrollDir[0], self.scrollDir[1]);
        }
        if(!cl.contains(self.scrollDir[0]) && !cl.contains(self.scrollDir[1])){
            cl.add("trig-scroll-up");
        }
        var split = [0,25,50,75,100];
        for (let i = 0; i < split.length; i++) {
            self.trigSplit(split[i], element.index, cl);
        }
    }
    trigSplit(split, index, cl){
        var name = split;
        if(split == 0 || split == 100){ 
            self.trigSplitEquals(name,split,cl,index);
        } else {   
            self.trigSplitMoreThan(name,split,cl,index);
        }
    }
    trigSplitEquals(name,split,cl,index){
        if(split == 0){
            name = "top";
        } else if(split == 100) {
            name = "bottom";
        }
        if(self.thePos[index] == split){
            cl.add("trig-scroll-"+name);
        } else {
            cl.remove("trig-scroll-"+name);
        }
    }
    trigSplitMoreThan(name,split,cl,index){
        if(self.thePos[index] >= split){
            cl.add("trig-scroll-"+name);
        } else if(self.thePos[index] < split) {
            cl.remove("trig-scroll-"+name);
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
            self.trigSetBody(element);
        } else {
            el.setProperty('--trig'+id, self.thePos[element.index] + "%");
            el.setProperty('--trig-reverse'+id, -(self.thePos[element.index]) + "%");
            el.setProperty('--trig-px'+id, self.thePos[element.index] + "px");
            el.setProperty('--trig-px-reverse'+id, -(self.thePos[element.index]) + "px");
            el.setProperty('--trig-deg'+id, ((self.thePos[element.index] / 100) * 360) + "deg");
            el.setProperty('--trig-deg-reverse'+id, ((-(self.thePos[element.index]) / 100) * 360) + "deg");
        }
    }
}
const trig = new Trig;

document.addEventListener('scroll', trig.trigScroll, false);
document.addEventListener('resize', trig.trigInit, false);
document.addEventListener('DOMContentLoaded', trig.trigInit, false);