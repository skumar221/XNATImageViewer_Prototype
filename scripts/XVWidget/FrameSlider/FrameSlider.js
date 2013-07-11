
goog.require('utils.gui.GenericSlider'); 
goog.require('goog.ui.Component'); 

goog.provide('FrameSlider');

/**
 * @constructor
 * @extends {utils.gui.GenericSlider}
 */
FrameSlider = function (args) {	

	
	goog.base(this, args);	
	
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
  	
  	
  	this.addSlideCallback(function() {

			
		if (that.linkedCallbacks && that.linkedCallbacks.length > 0) {		
			
			utils.array.forEach(that.linkedCallbacks, function(callback) { 
				callback(that);
			})
			
		}	
			
		
	});

	

}
goog.inherits(FrameSlider, utils.gui.GenericSlider);



FrameSlider.prototype.updateCSS = function(args) {
	utils.css.setCSS(this.widget_, args);
}


