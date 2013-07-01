//******************************************************
//  updateCSS
//
//******************************************************
FrameHolder.prototype.updateCSS = function () {



	//----------------------------------
	//	CANVAS
	//----------------------------------
	var widgetDims = utils.css.dims(this.widget);
	this.canvas.height = widgetDims['height'];
	this.canvas.width = widgetDims['width'];
	utils.css.setCSS(this.canvas, widgetDims);



	//
	// Draw the currFrame
	//
	this.drawFrame(this.currFrame); 
}