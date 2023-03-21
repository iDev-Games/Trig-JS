/* Trig.js v1.2.0 by iDev Games */
onload = () => {
    
    var trigs = document.querySelectorAll('[data-trig]');
    var thePos = [];
    document.addEventListener('scroll', trigScroll, false);
    document.addEventListener('resize', trigScroll, false);
    trigScroll();
    
    function isVisible(object, bOffset, offset) {
        var elementTop = object.getBoundingClientRect().top + scrollY;
        var elementBottom = (elementTop + getItemHeight(object)) + bOffset;
        var posTop = pageYOffset - (elementTop - ((innerHeight / 2) + offset));
        if(offset == null){
            return elementBottom > pageYOffset && elementTop < (pageYOffset + innerHeight);
        } else {
            return (posTop / document.body.clientHeight) * 100;
        }
    }

    function trigScroll(){
        if(trigs){
            trigs.forEach(function (element, index) {
                trig(element, index);
            });
        } 
    }

    function trig(item, index){
        var height = 0;
        var offset = 0;
        var min = -100;
        var max = 100;
        if(item.dataset.trigOffset){
            offset = parseInt(item.dataset.trigOffset);
        } 
        if(item.dataset.trigMin){
            min = parseInt(item.dataset.trigMin);
        } 
        if(item.dataset.trigMax){
            max = parseInt(item.dataset.trigMax);
        } 
        if(item.dataset.height){
            height = item.dataset.height;
        } 
        var activeNow = isVisible(item, height);
        var pos = isVisible(item, height, offset);
        if(activeNow){
            if (pos >= min && pos <= max) {
                thePos[index] = pos;
            } else if(pos <= min) {
                thePos[index] = min;
            } else if(pos >= max) {
                thePos[index] = max;
            }
        }
        if (activeNow) {
            item.classList.add("trig");
        } else {
            item.classList.remove("trig");
        }
        updatePos();
    }

    function updatePos(){
        trigs.forEach(function (element, index) {
            if(element.id){
                var el = document.documentElement.style;
                el.setProperty('--trig-'+element.id, thePos[index]+"%");
                el.setProperty('--trig-reverse-'+element.id, opposite(thePos[index])+"%");
                el.setProperty('--trig-deg-'+element.id, ((thePos[index]/100)*360)+"deg");
                el.setProperty('--trig-deg-reverse-'+element.id, ((opposite(thePos[index])/100)*360)+"deg");
            }
        });
    }

    function opposite(num){
        if(num < 0){
            return Math.abs(num);
        } else {
            return -Math.abs(num);
        }
    }

    function getItemHeight(element) {
        var styles = getComputedStyle(element);
        var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
        return Math.ceil(element.offsetHeight + margin);
    }
};