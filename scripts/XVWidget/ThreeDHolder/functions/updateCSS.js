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
    
    // update plane holder css
    // need the conditionals -- called before plane holders are created
    if (this.PlaneHolderX) this.PlaneHolderX.updateCSS();
    if (this.PlaneHolderY) this.PlaneHolderY.updateCSS();
    if (this.PlaneHolderZ) this.PlaneHolderZ.updateCSS();
    if (this.PlaneHolder3) this.PlaneHolder3.updateCSS();
    /*
    // update positions of slider thumbs within menus
    utils.array.forEach(this.volumeMenuComponents, function(c) {
        var slider = c['opacity'][0];
        
        var pos = slider.getValue();
        if (pos < slider.getMaximum()) slider.setValue(pos + 1);
        else slider.setValue(pos - 1);
        slider.setValue(pos);
        
        var slider = c['thresh'][0];
        
        var pos = slider.getValue();
        if (pos < slider.getMaximum()) slider.setValue(pos + 1);
        else slider.setValue(pos - 1);
        slider.setValue(pos);
    });
    utils.array.forEach(this.meshMenuComponents, function(c) {
        var slider = c['opacity'][0];
        
        var pos = slider.getValue();
        if (pos < slider.getMaximum()) slider.setValue(pos + 1);
        else slider.setValue(pos - 1);
        slider.setValue(pos);
    });
    utils.array.forEach(this.fiberMenuComponents, function(c) {
        var slider = c['opacity'][0];
        
        var pos = slider.getValue();
        if (pos < slider.getMaximum()) slider.setValue(pos + 1);
        else slider.setValue(pos - 1);
        slider.setValue(pos);
    });
    */
}
goog.exportProperty(ThreeDHolder.prototype, 'updateCSS', ThreeDHolder.prototype.updateCSS);
