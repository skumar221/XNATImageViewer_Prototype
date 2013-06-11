FrameViewer.prototype.loadDroppable = function (droppable) {

	if (droppable.sagittalFrames) {
		

		
		
		var that = this;		
		this.currDroppable = droppable;
		this.currViewPlane = "sagittal";

	 	
		//---------------------------------
		// asyc Image loading
		//---------------------------------			
		this.currDroppable.asyncLoad({
			
			"priority" : this.currViewPlane,
			
			"start" : function (prioritySet) {
				
				//---------------------------------
				// Progress bar labeling
				//---------------------------------
				var viewPlaneStr = "<b>" + that.currViewPlane.charAt(0).toUpperCase() + that.currViewPlane.slice(1) + " View Plane</b>";	
				var loadStr = "<br> Scan " + (that.currDroppable.scanData.sessionInfo["Scan"].value).toString() + " / " + viewPlaneStr + " / " + that.frames.length.toString() + " frames <br>";
		
						
				//---------------------------------
				// Update progress bar
				//---------------------------------
				that.progBar.update({
					"max" : prioritySet.length,
					"clear": true,
					'label': "Loading...  " + loadStr
				});
				$(that.canvas).stop().fadeOut(0);
				that.progBar.show();	
							
			},
			
			"during" : function() {
		    	that.progBar.update({"add": 1});
			},
			
			"finish" : function() {

				// Show canvas
				that.progBar.hide(GLOBALS.animFast, function() {});	
				$(that.canvas).fadeIn(GLOBALS.animFast);
				
				// Load Frames By ViewPlane
				that.loadFramesByViewPlane(that.currViewPlane);
				
			}
		})


	}
	else{
		throw "FrameViewer.js: Invalid Droppable for FrameViewer."
	}

}