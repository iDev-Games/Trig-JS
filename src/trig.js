/* Trig.js v3.1 by iDev Games */
class Trig
{
    trigs = [];
    thePos = [];
    height = 0;
    pos = 0;
    scrollDir = ["trig-scroll-down", "trig-scroll-up"];
    observer;
    lastCall = 0;
    trigScrollTimeout = null;
    trigAttributesCache = new Map();

    constructor() {
        this.trigInit = this.trigInit.bind(this);
        this.trigWindowHeight = this.trigWindowHeight.bind(this);
        this.trigScroll = this.trigScroll.bind(this);
        this.trigObserver = this.trigObserver.bind(this);
        this.trigWindowHeight();
    }

    trigInit() {
        this.observer = new IntersectionObserver(this.trigObserver);
        this.trigs = document.querySelectorAll('body,.enable-trig,[data-trig]');
        this.trigScroll();
    }

    trigWindowHeight(){
        this.height = innerHeight;
    };

    trigScroll() {
        if (this.trigScrollTimeout) {
            clearTimeout(this.trigScrollTimeout);
        }
        this.trigScrollTimeout = setTimeout(() => {
            if (this.trigs) {
                this.trigs.forEach((element, index) => {
                    element.index = index;
                    this.observer.observe(element);
                });
            }
        }, 12);
    }

    trigEntries(entries) {
        entries.forEach((entry) => {
            if(this.trigIntersecting(entry) == true){
                this.trigPos(entry);
                this.updatePos(entry.target);
            } else if(document.body == entry.target){
                if(entry.target.index == 0){
                    this.trigDirection(entry);
                }
                this.trigPos(entry);
                this.updatePos(entry.target);
            }
        });
    }

    trigDirection(entry){
        var y = entry.boundingClientRect.y;
        if(this.scrollPos){
            if(this.scrollPos < y-1) {
                this.scrollDir = ["trig-scroll-down", "trig-scroll-up"];
            } else if(this.scrollPos > y+1) {
                this.scrollDir = ["trig-scroll-up", "trig-scroll-down"];
            }
        }
        this.scrollPos = y;
    }

    trigObserver(entries){
        requestAnimationFrame(() => { this.trigEntries(entries) });
        this.observer.disconnect();
    }

    trigIntersecting(entry) {
        if(document.body != entry.target){
            if (entry.isIntersecting) {
                entry.target.classList.add("trig");
            } else {
                entry.target.classList.remove("trig");
            }
            return true;
        }
        return false;
    }

    trigPos(entry) {
        var options = { negativeOffset: 0, offset: 0, height: 0, min: -100, max: 100 };
        Object.keys(options).forEach((key) => {
            options[key] = this.trigAttributes(entry, options, key);
        });
        var el = entry.boundingClientRect.top;
        var height = entry.boundingClientRect.height;
        if(this.height > height){
            height = this.height;
        }
        if(document.body == entry.target){
            var posTop = 0 - (el);
            var pos = (posTop / (height - ((this.height)))) * 100;
        } else {
            if(options.negativeOffset > 0){
                var posTop = 0 - (el - ((this.height / 2) + options.negativeOffset));
            } else {
                var posTop = 0 - (el - ((this.height / 2) - options.offset));
            }
            var pos = (posTop / (height + options.height)) * 100;
        }
        this.trigSetPos(pos, options.min, options.max, entry.target);
    }

    trigAttributes(entry, options, name) {
        let cachedValue = this.trigAttributesCache.get(entry.target);
        if (!cachedValue) {
            cachedValue = {};
            this.trigAttributesCache.set(entry.target, cachedValue);
        }
    
        let dSet = entry.target.getAttribute("data-trig-" + name);
        if (dSet) {
            cachedValue[name] = dSet;
        }
    
        return cachedValue[name] || options[name];
    }

    trigSetPos(pos, min, max, entry) {
        if (pos >= min && pos <= max) {
            this.thePos[entry.index] = pos;
        } else if (pos <= min) {
            this.thePos[entry.index] = min;
        } else if (pos >= max) {
            this.thePos[entry.index] = max;
        }    
    }

    trigSetBody(element) {
        var currentTime = Date.now();
        if (currentTime - this.lastCall > 100) {
            this.lastCall = currentTime;

            var bo = element;
            var cl = bo.classList;
            if (cl.contains(this.scrollDir[0])) {
                cl.replace(this.scrollDir[0], this.scrollDir[1]);
            }
            if (!cl.contains(this.scrollDir[0]) && !cl.contains(this.scrollDir[1])) {
                cl.add("trig-scroll-up");
            }

            var split = [0, 25, 50, 75, 100];
            for (let i = 0; i < split.length; i++) {
                this.trigSplit(split[i], element.index, cl);
            }
        }
    }

    trigSplit(split, index, cl){
        var name = split;
        if(split == 0 || split == 100){ 
            this.trigSplitEquals(name,split,cl,index);
        } else {   
            this.trigSplitMoreThan(name,split,cl,index);
        }
    }

    trigSplitEquals(name, split, cl, index) {
        const BUFFER = 1;
        let pos = this.thePos[index];
        
        if (split == 0) {
            name = "top";
            if (pos >= 0 && pos <= BUFFER) {
                cl.add("trig-scroll-" + name);
            } else {
                cl.remove("trig-scroll-" + name);
            }
        } else if (split == 100) {
            name = "bottom";
            if (pos >= 100 - BUFFER && pos <= 100) {
                cl.add("trig-scroll-" + name);
            } else {
                cl.remove("trig-scroll-" + name);
            }
        }
    }

    trigSplitMoreThan(name,split,cl,index){
        if(this.thePos[index] >= split){
            cl.add("trig-scroll-"+name);
        } else if(this.thePos[index] < split) {
            cl.remove("trig-scroll-"+name);
        }
    }

    trigSetVars(element, el, id){
        if(this.thePos[element.index]){
            let roundedPos = Math.ceil(this.thePos[element.index]);
            if (element.dataset.trigVar == "true") {
                el.setProperty('--trig' + id, roundedPos + "%");
                el.setProperty('--trig-reverse' + id, -roundedPos + "%");
            }    
            if (element.dataset.trigPixels == "true") {
                el.setProperty('--trig-px' + id, roundedPos + "px");
                el.setProperty('--trig-px-reverse' + id, -roundedPos + "px");
            }    
            if (element.dataset.trigDegrees == "true") {
                let roundedDeg = Math.ceil((roundedPos / 100) * 360);
                el.setProperty('--trig-deg' + id, roundedDeg + "deg");
                el.setProperty('--trig-deg-reverse' + id, -roundedDeg + "deg"); 
            }
        }
    }

    updatePos(element) {
        if (element.dataset.trigGlobal == "true") {
            var el = document.documentElement.style;
            var id = "-"+element.id;
        } else {
            var el = element.style;
            var id = "";
        }
        if(document.body == element){
            this.trigSetBody(element);
        } else {
            this.trigSetVars(element, el, id);
        }
    }
}
const trig = new Trig;

window.addEventListener("scroll", trig.trigScroll, { passive: true });
window.addEventListener('resize', trig.trigWindowHeight, { passive: true });
window.addEventListener('load', trig.trigInit, { passive: true });