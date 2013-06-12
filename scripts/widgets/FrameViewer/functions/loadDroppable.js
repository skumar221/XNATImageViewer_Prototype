FrameViewer.prototype.loadDroppable = function (droppable) {

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
					var cCount = that.currDroppable[that.currViewPlane + "FrameCount"];

	
					// increments
					that.currDroppable.frames[mPath]['img'] = img;			
					that.currDroppable[vp + "LoadCount"] += 1;
					that.progBar.update({"add": 1});

					//if (vp == 'sagittal')
					//	console.log("Scan ", utils.convert.int(that.currDroppable.scanData.sessionInfo["Scan"].value), ":  ", vp, lCount, cCount, that.frames.length);
											
					// load if at the appropriate pint
					var equalFrameCounts = (that.frames.length ==  that.currDroppable[that.currViewPlane + "FrameCount"]);
					
					
					
					if (($(that.progBar.bar).progressbar( "option", "value" ) == cCount) && !that.loaded) {
						that.loaded = true;
						utils.dom.debug("loaded...")
						// Show canvas
						that.progBar.hide(GLOBALS.animFast, function() {});	
						$(that.canvas).fadeIn(GLOBALS.animFast);
						
						// Load Frames By ViewPlane
						that.loadFramesByViewPlane(that.currViewPlane);					
					}					
				}

			}
		})
	}
	else{
		throw "FrameViewer.js: Invalid Droppable for FrameViewer."
	}

}