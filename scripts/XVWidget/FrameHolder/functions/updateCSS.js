goog.require('FrameHolder');
goog.provide('FrameHolder.updateCSS');
//******************************************************
//  updateCSS
//
//******************************************************
FrameHolder.prototype.updateCSS = function (args) {



	//----------------------------------
	//	CANVAS
	//----------------------------------
	var widgetDims = utils.dom.mergeArgs(utils.css.dims(this.widget), args);
	
	utils.css.setCSS(this.widget, widgetDims);
	
	this.canvas.height = widgetDims['height'];
	this.canvas.width = widgetDims['width'];
	
	utils.css.setCSS(this.canvas, widgetDims);



	//
	// Draw the currFrame
	//
	this.drawFrame(this.currFrame); 
}
goog.exportProperty(FrameHolder.prototype, 'updateCSS', FrameHolder.prototype.updateCSS);
