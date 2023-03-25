/* Trig.js v1.4.0 by iDev Games */
document.addEventListener('DOMContentLoaded', initTrig, false);
function initTrig(){
    var trigs = document.querySelectorAll('[data-trig]');
    var thePos = [];
    var styles = [];
    document.addEventListener('scroll', trigScroll, false);
    document.addEventListener('resize', trigScroll, false);
    trigScroll();
    
    function isVisible(object, index, bOffset, offset) {
        var elementTop = object.getBoundingClientRect().top + scrollY;
        var elementBottom = (elementTop + getItemHeight(object, index)) + bOffset;
        var posTop = pageYOffset - (elementTop - ((innerHeight / 2) + offset));
        return [elementBottom > pageYOffset && elementTop < (pageYOffset + innerHeight), (posTop / innerHeight) * 100];
    }

    function trigScroll(){
        if(trigs){
            trigs.forEach(function (element, index) {
                if(!styles[index]){
                    styles[index] = getComputedStyle(element);
                }
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
        if(item.dataset.trigHeight){
            height = item.dataset.height;
        } 
        var pos = isVisible(item, index, height, offset);
        if(pos[0]){
            item.classList.add("trig");
            if (pos[1] >= min && pos[1] <= max) {
                thePos[index] = pos[1];
            } else if(pos[1] <= min) {
                thePos[index] = min;
            } else if(pos[1] >= max) {
                thePos[index] = max;
            }
        } else {
            item.classList.remove("trig");
        }
        updatePos();
    }

    function updatePos(){
        trigs.forEach(function (element, index) {
            var el = element.style;
            el.setProperty('--trig', thePos[index]+"%");
            el.setProperty('--trig-reverse', -(thePos[index])+"%");
            el.setProperty('--trig-px', thePos[index]+"px");
            el.setProperty('--trig-px-reverse', -(thePos[index])+"px");
            el.setProperty('--trig-deg', ((thePos[index]/100)*360)+"deg");
            el.setProperty('--trig-deg-reverse', ((-(thePos[index])/100)*360)+"deg");
        });
    }

    function getItemHeight(element, index) {
        var margin = parseFloat(styles[index]['marginTop']) + parseFloat(styles[index]['marginBottom']);
        return Math.ceil(element.offsetHeight + margin);
    }
}