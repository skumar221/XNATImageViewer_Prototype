goog.provide('FrameSlider');
goog.require('utils.gui.GenericSlider'); 


/**
 * @constructor
 * @extends {utils.gui.GenericSlider}
 */
FrameSlider = function (arguments) {	

	goog.base(this, arguments);	

	var that = this;
	
	
	//******************************************************
	//  Links the inputted slider (b)
	//******************************************************
	this.linkSlider = function (b) {

		
		if (that.linkedSliders) {
			for (var i = 0, len = that.linkedSliders.length; i < len; i++) {			
				if (b === that.linkedSliders[i]) {
					return;
				}				
			}
			that.linkedSliders.push(b);		
		}
		else{
			that.linkedSliders = [];
			that.linkedSliders.push(b);	
		}
	
		that.addLinkedCallback( function (a) {  
			
			var aDiff = a.getMaximum() - a.getMinimum();
			var bDiff = b.getMaximum() - b.getMinimum();
			
			// percentage-based linking
			var bVal = Math.round(bDiff * (a.getValue() / aDiff));
			
			b.setValue(bVal);
			
	  	});
	}


	this.clearLinked = function () {
		that.linkedCallbacks = [];
		that.linkedSliders = [];
	}



	//----------------------------------
	// linkedCallbacks - Handler
	//----------------------------------	
	this.addLinkedCallback = function (func) {
  		if (!that.linkedCallbacks) {
  			that.linkedCallbacks = [];	
  		}

  		that.linkedCallbacks.push(func);
  	}
  	
  	
 	//----------------------------------
	// linkedCallbacks - Caller
	//---------------------------------- 	
	this.addEventListener(goog.ui.Component.EventType.CHANGE, function() {

		if (that.linkedCallbacks && that.linkedCallbacks.length > 0) {
			for (var i=0, len = that.linkedCallbacks.length; i < len; i++) {
				that.linkedCallbacks[i](that);
			}
		}	
	});
  	

}




goog.inherits(FrameSlider, utils.gui.GenericSlider);

