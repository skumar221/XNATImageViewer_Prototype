FrameViewer.prototype.loadCurrViewPlane = function() {
	
	var that = this;
	var cCount = that.currDroppable[that.currViewPlane + "FrameCount"];
	var preload = that.currDroppable.getPreloadedFrames(that.currViewPlane);
					
	if ((cCount == preload.length) && !that.loaded) {
		that.loaded = true;
		utils.dom.debug("loaded...")
		// Show canvas
		that.progBar.hide(GLOBALS.animFast, function() {});	
		$(that.canvas).fadeIn(GLOBALS.animFast);
		
		// Load Frames By ViewPlane
		that.loadFramesByViewPlane(that.currViewPlane);					
	}		
}



FrameViewer.prototype.loadDroppable = function (droppable) {

	var that = this;
	
	if (droppable.frames) {
		

		var that = this;		
		this.currDroppable = droppable;
		this.currViewPlane = "sagittal";
	 	
	 	
		//---------------------------------
		// asyc Image loading
		//---------------------------------			
		this.currDroppable.loadFramesToDOM({
			
			"priority" : that.currViewPlane,
			
			"before" : function (setLength) {
				
				that.loaded = false;
				
				//---------------------------------
				// Progress bar labeling
				//---------------------------------
				var viewPlaneStr = "<b>" + that.currViewPlane.charAt(0).toUpperCase() + that.currViewPlane.slice(1) + " View Plane</b>";	
				var loadStr = "<br> Scan " + (that.currDroppable.scanData.sessionInfo["Scan"].value).toString() + " / " + viewPlaneStr + " / " + setLength.toString() + " frames <br>";
		
						
				//---------------------------------
				// Update progress bar
				//---------------------------------
				that.progBar.update({
					"max" : setLength,
					"clear": true,
					'label': "Loading...  " + loadStr
				});
				$(that.canvas).stop().fadeOut(0);
				that.progBar.show();	
							
			},
			
			"onload" : function(img) {
			
				var mPath = that.currDroppable.pathMolder(img.src);
				
				// this makes sure that we're putting the image back
				// with the correct scanThumbnail
				if (that.currDroppable.frames[mPath]) {
					
					// vars
					var vp = that.currDroppable.frames[mPath]["viewPlane"];				
					var lCount = that.currDroppable[that.currViewPlane + "LoadCount"];


	
					// increments
					that.currDroppable.frames[mPath]['img'] = img;			
					that.currDroppable[vp + "LoadCount"] += 1;
					that.progBar.update({"add": 1});

											
					// load if at the appropriate pint
					
					that.loadCurrViewPlane();
					
				}

			}
		})
	}
	else{
		throw "FrameViewer.js: Invalid Droppable for FrameViewer."
	}

}