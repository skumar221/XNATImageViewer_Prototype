//******************************************************
//  updateCSS
//
//******************************************************
frameViewer.prototype.updateCSS = function(){



	//----------------------------------
	//	CANVAS
	//----------------------------------
	this.canvas.height = $(this.widget).height();
	this.canvas.width = $(this.widget).width();
	$(this.canvas).css({
		height: $(this.widget).height(),
		width: $(this.widget).width(),
	})


		
	//----------------------------------
	//  BLANK CANVAS SCHEME 
	//----------------------------------
	if (this.frames.length == 0){
		
		//
		// Fill the canvas with black color 
	    //
	    this.context.fillStyle = "black";
	    this.context.fillRect(0,0, this.canvas.height, this.canvas.width);
		
		
		//
		// Add empty image to add to canvas
		//
		var img = __makeElement__("img", this.canvas, this.widget.id + "_dragAndDropImage");
		img.src = "./icons/DragAndDrop-3pt.png";
		
		
		//
		// Rescale image		
		//
		img.width = 249/2.5;
		img.height = 156/2.5; 
		this.context.drawImage(img, this.canvas.width/2 - img.width/2, this.canvas.height/2 - img.height/2, img.width, img.height);

	}


	//
	// Draw the currFrame
	//
	this.drawFrame(this.currFrame); 
}