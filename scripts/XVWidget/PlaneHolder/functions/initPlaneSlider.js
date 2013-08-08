goog.require('PlaneHolder');
goog.provide('PlaneHolder.initPlaneSlider');

PlaneHolder.prototype.initPlaneSlider = function() {
    var that = this;
    var plane = that.indexPlane;
    var num = that.indexNumber;
    
    
    // update slider
    this.updatePlaneSlider();
    
    // add slider listener
    goog.events.listen(this.slider, goog.ui.Component.EventType.CHANGE, function() {
        var cvo = that.ThreeDHolder.currentVolObject;
        
        cvo[plane] = that.slider.getValue();
        cvo.modified();
        that.indexBox.innerHTML = 'Frame: ' + (cvo[plane]) + ' / ' + cvo._dimensionsRAS[num];
    });
    
    // add scroll listener
    this.Renderer.onScroll = function() {
        var cvo = that.ThreeDHolder.currentVolObject;
        
        that.slider.setValue(cvo[plane]);
        that.indexBox.innerHTML = 'Frame: ' + (cvo[plane]) + ' / ' + cvo._dimensionsRAS[num];
    };
    
};
goog.exportProperty(PlaneHolder.prototype, 'initPlaneSlider', PlaneHolder.prototype.initPlaneSlider);
