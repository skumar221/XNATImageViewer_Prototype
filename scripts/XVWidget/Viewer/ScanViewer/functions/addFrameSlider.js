/**
 * @protected
 */	
ScanViewer.prototype.addFrameSlider = function () {


	var that = this;


	this.FrameSlider = new FrameSlider(utils.dom.mergeArgs(this.args.sliderCSS, {
		parent: this.widget
	}));


	

	
	this.FrameSlider.addSlideCallback(function() {

		var subtractor = (that.FrameSlider.getMaximum() > 0) ? that.FrameSlider.getMinimum()  : 0;
		var val = Math.round(that.FrameSlider.getValue());
		
		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber) {	
			var displayText = (that.FrameHolder.frames.length > 0) ?
							  "Frame: "+ (val + 1) + " / " + that.FrameHolder.frames.length :
							  "Drag or click on any thumbnail to view."
	
			that.displayableData.frameNumber.innerHTML = displayText;	
		}
		
		// Draw the frame
		that.FrameHolder.drawFrame(val - subtractor, true); 	
		
		that.FrameHolder.applyImageAdjustments();
		
	});
	
	//
	// Add FrameHolder callback function to synchronize with slider
	//
	this.FrameHolder.addOnloadCallback(function () {

		if (that.FrameSlider) {
			
			that.FrameSlider.setMinimum(0);
			that.FrameSlider.setMaximum(that.FrameHolder.frames.length-1);
			that.FrameSlider.setValue(Math.round(that.FrameHolder.frames.length/2));
			that.FrameHolder.drawFrame(Math.round(that.FrameSlider.getValue()), true);
			
		}		
		else{			
			utils.dom.debug("NO DRAW FRAME");
		}
	});
	
	
	

	this.FrameSlider.bindToMouseWheel(this.FrameHolder.widget);
	


	



}