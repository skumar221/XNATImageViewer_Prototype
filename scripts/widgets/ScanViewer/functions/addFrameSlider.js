//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addFrameSlider = function () {


	var that = this;


	/**
	 * Sets the component's root element to the given element.
	 * Considered protected and final.
	 * @protected
	 */	
	this.FrameSlider = new FrameSlider({
		parent: this.widget
	});
	
	
	

	this.FrameSlider.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
		
		var subtractor = (that.FrameSlider.getMaximum() > 0) ? that.FrameSlider.getMinimum()  : 0;
		var val = Math.round(that.FrameSlider.getValue());
		// Update any displayable data
		if (that.displayableData && that.displayableData.frameNumber) {		
			that.displayableData.frameNumber.innerHTML = "Frame: "+ (val + 1) + " / " + that.FrameViewer.frames.length;	
		}
		
		// Draw the frame
		that.FrameViewer.drawFrame(val - subtractor, true); 	
			
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
	
	
	
	function handleMouseWheel(e) {
		
	  var addVal = Math.round(that.FrameSlider.getValue() + e.deltaY / 3);
	  that.FrameSlider.setValue(addVal);
	  e.preventDefault();	
	  
	}
	

	
	//
	// Bind mousewheel scrolling to slider	
	//
	var MouseWheelHandler = goog.events.MouseWheelHandler;
	var MOUSEWHEEL = MouseWheelHandler.EventType.MOUSEWHEEL;
	var mwh = new MouseWheelHandler(this.FrameViewer.widget);
	goog.events.listen(mwh, MOUSEWHEEL, handleMouseWheel);


	
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

}