/* Trig.js v1.0 by iDev Games */
window.onload = (event) => {
    
    var updateSpeed = 1;
    var active = true;
    var trigs = document.querySelectorAll('[data-trig]');
    var oldPos = [];
    var thePos = [];
    trigs.forEach(function (element, index) {
        trig(element, index);
    });

    function isVisiblePos(object,offset) {
        var elementTop = object.getBoundingClientRect().top + window.scrollY;
        var windowTop = document.body.scrollTop;
        var posTop = windowTop - (elementTop - ((window.innerHeight / 2) + offset));
        var percent = (posTop / document.body.clientHeight) * 100;
        return percent;
    }
    
    function isVisible(object, bOffset) {
        var elementTop = object.getBoundingClientRect().top + window.scrollY;
        var elementBottom = (elementTop + getAbsoluteHeight(object)) + bOffset;
        var windowTop = document.body.scrollTop;
        var windowBottom = windowTop + window.innerHeight;
        return elementBottom > windowTop && elementTop < windowBottom;
    }

    
    window.addEventListener(['scroll'], function() {
        if(trigs){
            trigs.forEach(function (element, index) {
                trig(element, index);
            });
        } 
    });
    window.addEventListener(['resize'], function() {
        if(trigs){
            trigs.forEach(function (element, index) {
                trig(element, index);
            });
        } 
    });


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
        var activeNow = isVisible(item, height);
        var pos = isVisiblePos(item, offset);
        if(activeNow){
            if (pos >= min && pos <= max) {
                thePos[index] = pos;
            } else if(pos <= min) {
                thePos[index] = min;
            } else if(pos >= max) {
                thePos[index] = max;
            }
        }
        if(item.dataset.height){
            height = item.dataset.height;
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
            if(!oldPos[index]){
                oldPos[index] = 0;
            }
            if(element.id){
                if(oldPos[index] != thePos[index]){
                    document.documentElement.style.setProperty('--trig-'+element.id, thePos[index]+"%");
                    document.documentElement.style.setProperty('--trig-reverse-'+element.id, (-thePos[index])+"%");
                    document.documentElement.style.setProperty('--trig-deg-'+element.id, ((thePos[index]/100)*360)+"deg");
                    document.documentElement.style.setProperty('--trig-deg-'+element.id, ((thePos[index]/100)*360)+"deg");
                }
            }
        });
    }

    function getAbsoluteHeight(element) {
        var styles = window.getComputedStyle(element);
        var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
        return Math.ceil(element.offsetHeight + margin);
      }
};