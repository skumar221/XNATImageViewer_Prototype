goog.require('FrameHolder');
goog.provide('FrameHolder.loadFrames');
//******************************************************
//  Loads all of the frames as Image objects, and stores
//  them in an array.
//******************************************************
FrameHolder.prototype.loadFrames = function (frames) {
	var that = this;
	// Check if there are frame paths given
	if (!frames) {
		throw("Load Frames error: invalid method parameter -- you need frame paths!")
	} 

		
	var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);	
	this.frames = frames;	
	this.currFrame = Math.round(this.frames.length/2);
		
	this.drawImage_MaintainProportions(this.frames[this.currFrame], this.canvas, this.context);

		
	// Need to get the appropriate contrast threshold for the data set.
	this.args['contrastThreshold'] = IP.thresholdAutoDetect(imageData.data);

	
	// Run any callbacks once everything is loaded
	utils.array.forEach(this.onloadCallbacks, function(callback) {
			
		callback(that.widget);
			
	})	
	
		    		
}
goog.exportProperty(FrameHolder.prototype, 'loadFrames', FrameHolder.prototype.loadFrames);
