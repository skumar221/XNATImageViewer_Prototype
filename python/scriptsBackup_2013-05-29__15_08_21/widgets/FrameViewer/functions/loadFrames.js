//******************************************************
//  Loads all of the frames as Image objects, and stores
//  them in an array.
//******************************************************
FrameViewer.prototype.loadFrames = function (frames) {

	var framePaths = (this.args.framePaths) ? this.args.framePaths : frames
	// Check if there are frame paths given
	if (!framePaths) {
		throw("Load Frames error: invalid method parameter -- you need frame paths!")
	} 
	var that = this;
	
	
	// track frames as image objects.  store them in an array.
	this.frames = [];
	for (var i=0; i < framePaths.length; i++) {
		var img = new Image();
		if (i == framePaths.length-1) {
			that.endImage = img;
		}
		
		// Once the image is loaded, check to see if it's an "endImage",
		// if so, draw it to the frame.
	    img.onload = function () {
	    	if (this == that.endImage) {
//				console.log("1 ", that.currFrame, that.frames.length, that.frames[Math.round(that.currFrame)]);
				
				// check to see that there are enough frames to acommodate the currFrame number;
				if (that.currFrame > that.frames.length) { 
					that.currFrame = Math.round(that.frames.length/2);
				}
	   			that.drawImage_MaintainProportions(that.frames[Math.round(that.currFrame)], that.canvas, that.context);
	   			// Need to get the appropriate contrast 
	   			// threshold for the data set.
	   			var imageData = that.context.getImageData(0, 0, that.canvas.width, that.canvas.height);	
	   			that.args.contrastThreshold = thresholdAutoDetect(imageData.data);
	   			
	   			// Run any callbacks once everything is loaded
	   			for (var k=0; k<that.onloadCallbacks.length; k++) {
	   				that.onloadCallbacks[k]();
	   			}		    		
	    	}
	  	};
	  	img.src = framePaths[i];
	  	this.frames.push(img);
	 }
}