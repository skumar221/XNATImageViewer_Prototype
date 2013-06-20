goog.require( 'goog.events' );
goog.require( 'goog.net.ImageLoader' );

ScanThumbnail.prototype.loadFramesToDOM = function (args) {

	var that = this;
	var loadQueue = [];
	var setLen = this.getFrames(args['viewPlane']).length;

				
	// Call any before methods
	if (args["before"]) {  args["before"] (setLen) };	


	for (i in this.frames) {
		
		var viewPlane = this.frames[i]['viewPlane'];
		
		// only add to queue if if it's not cached
		if (!this.frames[i]['img']) {
			if (args['viewPlane'] && viewPlane === args['viewPlane']) {
				loadQueue.push(this.frames[i]['src']);
			}		
		}
		else {
			//utils.dom.debug("image already loaded!: ", this.frames[i]['img'])
		}
	}
	


		
		
	// if already cached
	if (loadQueue.length === 0) {
		
		XV.Viewers( function (ScanViewer, i, j) { 
			if (ScanViewer.FrameViewer.currDroppable === that) {
				utils.dom.debug("Using cached images for " + ScanViewer.FrameViewer.currViewPlane + " plane.");
				ScanViewer.FrameViewer.loadCurrViewPlane();	
			}	
		})
		
	}
	// otherwise send to loader
	else {
		
		var imageLoader = new goog.net.ImageLoader();
		
		goog.events.listen(imageLoader , goog.events.EventType.LOAD, function(e) { 
			args["load"](e.target);
		} );
		
		goog.events.listen(imageLoader, goog.net.EventType.COMPLETE, function(e) { 
			args["complete"](e);
		} );

		for (var i=0, len = loadQueue.length; i < len; i++) {
			var id = utils.convert.replaceIllegalChars(loadQueue[i])
			imageLoader.addImage(id, loadQueue[i]);	
		}
		
		imageLoader.start();
	}
}

ScanThumbnail.prototype.pathSplitter = function (path) {	
	
	splitStrs = path.split("testscans");
	
}

ScanThumbnail.prototype.viewPlaneLoaded = function (viewPlane) {
	
	
}
