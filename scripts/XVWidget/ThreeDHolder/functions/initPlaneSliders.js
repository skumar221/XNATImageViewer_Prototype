goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.initPlaneSliders');

ThreeDHolder.prototype.initPlaneSliders = function() {
    var that = this;
    
    this.PlaneHolderX.initPlaneSlider();
    this.PlaneHolderY.initPlaneSlider();
    this.PlaneHolderZ.initPlaneSlider();
    
    this.PlaneHolderX.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;    // this MUST be inside the function!
        
        that.PlaneHolderY.slider.setValue(cvo.indexPA);
        that.PlaneHolderY.indexBox.innerHTML = 'Frame: ' + (cvo.indexPA) + ' / ' + cvo._dimensionsRAS[1];
        that.PlaneHolderZ.slider.setValue(cvo.indexIS);
        that.PlaneHolderZ.indexBox.innerHTML = 'Frame: ' + (cvo.indexIS) + ' / ' + cvo._dimensionsRAS[2];
    };
    
    this.PlaneHolderY.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        
        that.PlaneHolderX.slider.setValue(cvo.indexLR);
        that.PlaneHolderX.indexBox.innerHTML = 'Frame: ' + (cvo.indexLR) + ' / ' + cvo._dimensionsRAS[0];
        that.PlaneHolderZ.slider.setValue(cvo.indexIS);
        that.PlaneHolderZ.indexBox.innerHTML = 'Frame: ' + (cvo.indexIS) + ' / ' + cvo._dimensionsRAS[2];
    };
    
    this.PlaneHolderZ.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        
        that.PlaneHolderX.slider.setValue(cvo.indexLR);
        that.PlaneHolderX.indexBox.innerHTML = 'Frame: ' + (cvo.indexLR) + ' / ' + cvo._dimensionsRAS[0];
        that.PlaneHolderY.slider.setValue(cvo.indexPA);
        that.PlaneHolderY.indexBox.innerHTML = 'Frame: ' + (cvo.indexPA) + ' / ' + cvo._dimensionsRAS[1];
    };
};
goog.exportProperty(ThreeDHolder.prototype, 'initPlaneSliders', ThreeDHolder.prototype.initPlaneSliders);
