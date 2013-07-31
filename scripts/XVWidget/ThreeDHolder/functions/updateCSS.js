goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.updateCSS');

//******************************************************
//  updateCSS
//
//******************************************************
ThreeDHolder.prototype.updateCSS = function (args) {
    var that = this;
	var widgetDims = utils.dom.mergeArgs(utils.css.dims(this.widget), args);
	utils.css.setCSS(this.widget, widgetDims);
    
    // need the conditionals -- called before plane holders are created
    if (this.PlaneHolderX) this.PlaneHolderX.updateCSS();
    if (this.PlaneHolderY) this.PlaneHolderY.updateCSS();
    if (this.PlaneHolderZ) this.PlaneHolderZ.updateCSS();
    if (this.PlaneHolder3) this.PlaneHolder3.updateCSS();
    
    // update slider thumb positions of plane holders
    if (this.xSlider) {
        var x = this.xSlider.getValue();
        if (x < this.xSlider.getMaximum()) this.xSlider.setValue(x + 1);
        else this.xSlider.setValue(x - 1);
        this.xSlider.setValue(x);
    }
    if (this.ySlider) {
        var y = this.ySlider.getValue();
        if (y < this.ySlider.getMaximum()) this.ySlider.setValue(y + 1);
        else this.ySlider.setValue(y - 1);
        this.ySlider.setValue(y);
    }
    if (this.zSlider) {
        var z = this.zSlider.getValue();
        if (z < this.zSlider.getMaximum()) this.zSlider.setValue(z + 1);
        else this.zSlider.setValue(z - 1);
        this.zSlider.setValue(z);
    }
    
    // update slider thumb positions of menu sliders
    utils.array.forEach(this.objOpacityPairs, function(pair) {
        var slider = pair[1];
        var o = slider.getValue();
        if (o < slider.getMaximum()) slider.setValue(o + 1);
        else slider.setValue(o - 1);
        slider.setValue(o);
    });
    utils.array.forEach(this.objThreshPairs, function(pair) {
        var slider = pair[1];
        var lb = slider.getValue();
        if (lb < slider.getMaximum()) slider.setValue(lb + 1);
        else slider.setValue(lb - 1);
        slider.setValue(lb);
    });
    
}
goog.exportProperty(ThreeDHolder.prototype, 'updateCSS', ThreeDHolder.prototype.updateCSS);
