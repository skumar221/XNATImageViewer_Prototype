//******************************************************
//  Loads all of the frames as Image objects, and stores
//  them in an array.
//******************************************************
FrameViewer.prototype.loadFrames = function (frames) {
	
	// Check if there are frame paths given
	if (!frames) {
		throw("Load Frames error: invalid method parameter -- you need frame paths!")
	} 

	
	var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);	
	this.frames = frames;	
	this.currFrame = Math.round(this.frames.length/2);
	this.drawImage_MaintainProportions(this.frames[this.currFrame], this.canvas, this.context);

	
	// Need to get the appropriate contrast threshold for the data set.
	this.args.contrastThreshold = thresholdAutoDetect(imageData.data);

	
	// Run any callbacks once everything is loaded
	for (var k = 0, len = this.onloadCallbacks.length; k < len; k++) {		
		this.onloadCallbacks[k]();
	}		    		
}