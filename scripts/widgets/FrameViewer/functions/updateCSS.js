//******************************************************
//  updateCSS
//
//******************************************************
FrameViewer.prototype.updateCSS = function () {



	//----------------------------------
	//	CANVAS
	//----------------------------------
	this.canvas.height = $(this.widget).height();
	this.canvas.width = $(this.widget).width();
	$(this.canvas).css({
		height: $(this.widget).height(),
		width: $(this.widget).width()
	})


		
	//----------------------------------
	//  BLANK CANVAS SCHEME 
	//----------------------------------
	if (this.frames.length == 0) {
		
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
	else{
		this.canvas.style.opacity = 1;
	}


	//
	// Draw the currFrame
	//
	this.drawFrame(this.currFrame); 
}