goog.require('PlaneHolder');
goog.provide('PlaneHolder.updatePlaneSlider');

PlaneHolder.prototype.updatePlaneSlider = function() {
    var cvo = this.ThreeDHolder.currentVolObject;
    var plane = this.indexPlane;
    var num = this.indexNumber;
    
    cvo[plane] = Math.round(cvo[plane]);
    
    this.slider.setMaximum(cvo._dimensionsRAS[num]-1);
    this.slider.setValue(cvo[plane]);
    this.indexBox.innerHTML = 'Frame: ' + cvo[plane] + ' / ' + cvo._dimensionsRAS[num];
    
};
goog.exportProperty(PlaneHolder.prototype, 'updatePlaneSlider', PlaneHolder.prototype.updatePlaneSlider);
