//******************************************************
//  
//******************************************************
goog.provide('utils.dom.getMouseXY');
utils.dom.getMouseXY = function (e) {
    if (navigator.appName === 'Microsoft Internet Explorer') {
      tempX = event.clientX + document.body.scrollLeft;
      tempY = event.clientY + document.body.scrollTop;
    }
    else {  // grab the x-y pos.s if browser is NS
      tempX = e.pageX;
      tempY = e.pageY;
    }  

    if (tempX < 0) {tempX = 0;}
    if (tempY < 0) {tempY = 0;}  

    return {x:tempX, y:tempY};
}
goog.exportSymbol('utils.dom.getMouseXY', utils.dom.getMouseXY);
