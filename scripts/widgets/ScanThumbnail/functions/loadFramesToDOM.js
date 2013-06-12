ScanThumbnail.prototype.loadFramesToDOM = function (args) {

	var that = this;
	var primaryQ = [];
	var setLen = this.getFrames(args['viewPlane']).length;

				
	// Call any before methods
	if (args["before"]) {  args["before"] (setLen) };	


	for (i in this.frames) {
		
		var viewPlane = this.frames[i]['viewPlane'];
		
		// only add to queue if if it's not cached
		if (!this.frames[i]['img']) {
			if (args['viewPlane'] && viewPlane == args['viewPlane']) {
				primaryQ.push(this.frames[i]['src']);
			}		
		}
		else {
			//utils.dom.debug("image already loaded!: ", this.frames[i]['img'])
		}
	}
	


		
		
	// if already cached
	if (primaryQ.length == 0) {
		
		XV.ScanViewers( function (ScanViewer, i, j) { 
			if (ScanViewer.FrameViewer.currDroppable == that) {
				utils.dom.debug("Using cached images for " + ScanViewer.FrameViewer.currViewPlane + " plane.");
				ScanViewer.FrameViewer.loadCurrViewPlane();	
			}	
		})
		
	}
	// otherwise send to loader
	else {
		// Add to queue
		GLOBALS.imagePreloader.addToPrimaryQueue(primaryQ);	
		// Begin chain
		GLOBALS.imagePreloader.loadNextImage({ "onload"  : args["onload"], });		
	}
}

ScanThumbnail.prototype.pathSplitter = function (path) {	
	
	splitStrs = path.split("testscans");
	
}

ScanThumbnail.prototype.viewPlaneLoaded = function (viewPlane) {
	
	
}
