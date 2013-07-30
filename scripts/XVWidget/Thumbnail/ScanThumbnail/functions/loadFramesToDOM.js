
goog.require('ScanThumbnail');
goog.require('Thumbnail');
goog.require('goog.net.ImageLoader');
goog.require('goog.events');

goog.provide('ScanThumbnail.loadFramesToDOM');
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
		} else {
			//utils.dom.debug("image already loaded!: ", this.frames[i]['img'])
		}
		
	}
	


		
		
	// if already cached
	if (loadQueue.length === 0) {
		
		XV.ViewerManager( function (Viewer, i, j) { 
			
			
			
			
			if (Viewer.FrameHolder.currDroppable === that) {
				
				utils.dom.debug("Using cached images for " + Viewer.FrameHolder.currViewPlane + " plane.");
				Viewer.FrameHolder.loadCurrViewPlane();	
			}	
			
		})
		
	} else {
		
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
goog.exportProperty(ScanThumbnail.prototype, 'loadFramesToDOM', ScanThumbnail.prototype.loadFramesToDOM);

goog.provide('Thumbnail.pathSplitter');
Thumbnail.prototype.pathSplitter = function (path) {	
	
	splitStrs = path.split("testscans");
	
}
goog.exportProperty(Thumbnail.prototype, 'viewPlaneLoaded', Thumbnail.prototype.viewPlaneLoaded);


