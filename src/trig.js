/* Trig.js v4.2.0 by iDev Games */
class Trig
{
    trigs = [];
    thePos = [];
    height = 0;
    scrollDir = ["trig-scroll-down", "trig-scroll-up"];
    trigClass = 'trig-down';
    observer;
    trigScrollTimeout = null;
    trigAttributesCache = new Map();

    constructor() {
        this.trigInit = this.trigInit.bind(this);
        this.trigWindowHeight = this.trigWindowHeight.bind(this);
        this.trigScroll = this.trigScroll.bind(this);
        this.trigObserver = this.trigObserver.bind(this);
        this.observer = new IntersectionObserver(this.trigObserver);
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
        if (!this.trigs || this.trigs.length === 0) return;
        this.trigs.forEach((element, index) => {
            element.index = index;
            this.observer.observe(element);
        }); 
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
            if (this.scrollPos < y) {
                this.scrollDir = ["trig-scroll-down", "trig-scroll-up"];
                this.trigClass = 'trig-up';
            } else if (this.scrollPos > y) {
                this.scrollDir = ["trig-scroll-up", "trig-scroll-down"];
                this.trigClass = 'trig-down';
            }
        }
        this.scrollPos = y;
    }

    trigObserver(entries){
        requestAnimationFrame(() => { this.trigEntries(entries) });
        entries.forEach((entry) => {
            this.observer.unobserve(entry.target);
        });
    }

    trigIntersecting(entry) {
        if(document.body != entry.target){
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains("trig")) {
                    entry.target.classList.add("trig", this.trigClass);
                }
            } else {
                entry.target.classList.remove("trig", "trig-down", "trig-up");
            }
            return true;
        }
        return false;
    }

    trigPos(entry) {
        const options = this.getTrigOptions(entry);
        const { top: el, height: entryHeight } = entry.boundingClientRect;
        const height = Math.max(this.height, entryHeight);
    
        const posTop = this.calculatePosTop(entry.target, el, options);
        const pos = this.calculatePosition(posTop, height, options, entry.target);
    
        this.trigSetPos(pos, options.min, options.max, entry.target);
    }
    
    getTrigOptions(entry) {
        const defaultOptions = { negativeOffset: 0, offset: 0, height: 0, min: -100, max: 100 };
        Object.keys(defaultOptions).forEach((key) => {
            defaultOptions[key] = this.trigAttributes(entry, defaultOptions, key);
        });
        return defaultOptions;
    }
    
    calculatePosTop(target, el, options) {
        const halfHeight = this.height / 2;
        if (target === document.body) {
            return -el;
        }
        return options.negativeOffset > 0 
            ? -(el - (halfHeight + options.negativeOffset)) 
            : -(el - (halfHeight - options.offset));
    }
    
    calculatePosition(posTop, height, options, target) {
        const divisor = (target === document.body) ? (height - this.height) : (height + options.height);
        return (posTop / divisor) * 100;
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
        const cl = element.classList;
        this.updateScrollDirection(cl);
        this.applySplitPoints(element);
    }
    
    updateScrollDirection(cl) {
        if (cl.contains(this.scrollDir[0])) {
            cl.replace(this.scrollDir[0], this.scrollDir[1]);
        } else if (!cl.contains(this.scrollDir[1])) {
            cl.add("trig-scroll-up");
        }
    }
    
    applySplitPoints(element) {
        const splitPoints = [0, 25, 50, 75, 100];
        splitPoints.forEach((split) => this.trigSplit(split, element.index, element.classList));
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
        const pos = this.thePos[index];
        
        const boundaries = {
            0: { name: "top", min: 0, max: BUFFER },
            100: { name: "bottom", min: 100 - BUFFER, max: 100 }
        };
    
        if (boundaries[split]) {
            const { name, min, max } = boundaries[split];
            cl.toggle(`trig-scroll-${name}`, pos >= min && pos <= max);
        }
    }

    trigSplitMoreThan(name,split,cl,index){
        if(this.thePos[index] >= split){
            cl.add("trig-scroll-"+name);
        } else if(this.thePos[index] < split) {
            cl.remove("trig-scroll-"+name);
        }
    }

    trigSetVars(element, el, id) {
        if (!this.thePos[element.index]) return;
    
        const roundedPos = Math.ceil(this.thePos[element.index]);
    
        const properties = {
            trigVar: { key: '--trig', value: `${roundedPos}%`, reverse: `${-roundedPos}%` },
            trigPixels: { key: '--trig-px', value: `${roundedPos}px`, reverse: `${-roundedPos}px` },
            trigDegrees: { key: '--trig-deg', value: `${Math.ceil((roundedPos / 100) * 360)}deg`, reverse: `${Math.ceil((roundedPos / 100) * -360)}deg` }
        };
        this.setCSSVariables(el, id, properties, element);
    }
    
    setCSSVariables(el, id, properties, element) {
        Object.entries(properties).forEach(([attr, { key, value, reverse }]) => {
            if(el.getPropertyValue(key) != value){
                if (element.dataset[attr]) {
                    element.dataset[attr] = Math.round(parseInt(value) / 10) * 10;
                    el.setProperty(key + id, value);
                    el.setProperty(key + id + "-reverse", reverse);
                }
            }
        });
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