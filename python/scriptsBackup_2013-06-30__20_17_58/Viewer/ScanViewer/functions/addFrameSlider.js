/**
 * @protected
 */	
ScanViewerBox.prototype.addFrameSlider = function () {


	var that = this;


	this.FrameSlider = new FrameSlider(utils.dom.mergeArgs(this.args.sliderCSS, {
		parent: this.widget
	}));
	

	this.FrameSlider.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
		
		//console.log("event 1");
		var subtractor = (that.FrameSlider.getMaximum() > 0) ? that.FrameSlider.getMinimum()  : 0;
		var val = Math.round(that.FrameSlider.getValue());
		
		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber) {	
			var displayText = (that.FrameViewer.frames.length > 0) ?
							  "Frame: "+ (val + 1) + " / " + that.FrameViewer.frames.length :
							  "Drag or click on any thumbnail to view."
	
			that.displayableData.frameNumber.innerHTML = displayText;	
		}
		
		// Draw the frame
		that.FrameViewer.drawFrame(val - subtractor, true); 	
		
		that.FrameViewer.applyImageAdjustments();
		
	});
	
	//
	// Add FrameViewer callback function to synchronize with slider
	//
	this.FrameViewer.addOnloadCallback(function () {

		if (that.FrameSlider) {
			
			that.FrameSlider.setMinimum(0);
			that.FrameSlider.setMaximum(that.FrameViewer.frames.length-1);
			that.FrameSlider.setValue(Math.round(that.FrameViewer.frames.length/2));
			that.FrameViewer.drawFrame(Math.round(that.FrameSlider.getValue()), true);
			
		}		
		else{			
			utils.dom.debug("NO DRAW FRAME");
		}
	});
	
	
	

	this.FrameSlider.bindToMouseWheel(this.FrameViewer.widget);
	


	



}