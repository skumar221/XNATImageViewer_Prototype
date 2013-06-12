ScanThumbnail.prototype.loadFramesToDOM = function (args) {

	var that = this;
	var primaryQ = [];
	var secondaryQ = [];
	
	var prioritySetLength = 0;
	
	// Create a priority ladder based on view plane of frames
	for (i in this.frames) {
		
		var vp = this.frames[i]['viewPlane'];
		
		// only add to queue if there's no img object -- no need if it's already cashed in the DOM
		if (!this.frames[i]['img']) {
			if (args['priority'] && vp == args['priority']) {
				
				// since the preloader reverses the array, we want prioritised loads at the end
				primaryQ.push(this.frames[i]['src']);
				prioritySetLength++;
			}
			else{
				
				// and unprioritised loads in the beginning
				secondaryQ.push(this.frames[i]['src']);
			}			
		}
	}
	
	
	// Add to queue
	GLOBALS.imagePreloader.addToPrimaryQueue(primaryQ);
	GLOBALS.imagePreloader.addToBackgroundQueue(secondaryQ);
	
	// Call any preload methods
	if (args["before"]) { args["before"] (prioritySetLength) };

	// Begin chain
	GLOBALS.imagePreloader.loadNextImage({ 
		"onload"  : args["onload"], 
	});
	
}

ScanThumbnail.prototype.pathSplitter = function (path) {	
	
	splitStrs = path.split("testscans");
	
}

ScanThumbnail.prototype.viewPlaneLoaded = function (viewPlane) {
	
	
}
