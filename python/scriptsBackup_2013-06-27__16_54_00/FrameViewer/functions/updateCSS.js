//******************************************************
//  updateCSS
//
//******************************************************
FrameViewer.prototype.updateCSS = function () {



	//----------------------------------
	//	CANVAS
	//----------------------------------
	var widgetDims = utils.css.dims(this.widget, 'height', 'width');
	this.canvas.height = widgetDims['height'];
	this.canvas.width = widgetDims['width'];
	utils.css.setCSS(this.canvas, widgetDims);


		
	//----------------------------------
	//  BLANK CANVAS SCHEME 
	//----------------------------------
	if (this.frames.length === 0) {
		
		//
		// Fill the canvas with black color 
	    //
	    this.context.fillStyle = "black";
	    this.context.fillRect(0,0, this.canvas.height, this.canvas.width);


		
		
		//
		// Rescale image		
		//
		
		var ddImg = GLOBALS.dragAndDropImage;
		ddImg.width = 249/2.5;
		ddImg.height = 156/2.5; 
		this.context.drawImage(ddImg, this.canvas.width/2 - ddImg.width/2, 
								      this.canvas.height/2 - ddImg.height/2, 
								       ddImg.width, ddImg.height);

	}



	//
	// Draw the currFrame
	//
	this.drawFrame(this.currFrame); 
}