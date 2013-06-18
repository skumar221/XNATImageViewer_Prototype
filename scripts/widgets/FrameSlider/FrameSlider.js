


goog.provide('FrameSlider');

/**
 * @constructor
 * @extends {goog.ui.Slider}
 */
FrameSlider = function () {	
	
	//goog.base(this);	
	goog.ui.Slider.call(this);
	
	var that = this;

	 //----------------------------------
	 // FRAME SLIDER
	 //----------------------------------	
	this.divHolder = utils.dom.makeElement('div', arguments[0]['parent'], "divHolder", {
		'position' : 'absolute',
		'height' : 10,
		'width' : '96%',
		'left' : '2%',
		'backgroundColor' : 'rgba(255,120,20, .2)'
	})

	that.decorate(this.divHolder);
	
	
	var sliderThumb = goog.dom.getElementsByClass( 'goog-slider-thumb');
	$(sliderThumb).css({
		position: 'absolute',
		height: that.divHolder.style.height,
		width: that.divHolder.style.height,
		backgroundColor: "rgb(225, 225, 225)",
		borderRadius: '3px'
	})
	


	
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
			var bVal = Math.round(bDiff * (a.value / aDiff));
			
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
  	
}

goog.inherits(FrameSlider, goog.ui.Slider);
