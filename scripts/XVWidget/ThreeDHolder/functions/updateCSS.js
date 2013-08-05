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
    
}
goog.exportProperty(ThreeDHolder.prototype, 'updateCSS', ThreeDHolder.prototype.updateCSS);
