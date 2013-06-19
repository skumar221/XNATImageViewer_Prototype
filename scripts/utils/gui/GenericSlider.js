//******************************************************
//  
//******************************************************


goog.require('goog.ui.Slider'); 
goog.require('goog.dom'); 
goog.provide('utils.gui.GenericSlider');
	
/**
 * @constructor
 * @extends {goog.ui.Slider}
 */
utils.gui.GenericSlider = function () {	 
	
	goog.base(this);
	 
	var args = {};
	var that = this;
	 
	if (typeof arguments[0] === 'object') {
		args = arguments[0];
	}
	
	this.id = (args['id']) ? args['id'] : "GenericSlider";
	
	
	//----------------------------
	// Set CSS - VERTICAL ORIENTATION
	//----------------------------
	if (args['orientation'] && args['orientation'].toLowerCase() == 'vertical') {
		
		this.setOrientation(goog.ui.Slider.Orientation.VERTICAL);
		this.setValue(this.getMaximum());
		this.setStep(-1);

		args['holderCSS'] = utils.dom.mergeArgs({
			'position' : 'absolute',
			'width' : 10,
			'height' : '100%',
			'left' : 0,
			'top' : 0,	
			'backgroundColor' : 'rgb(255,255,255)',		
		}, args['holderCSS']);

		args['thumbCSS'] = utils.dom.mergeArgs({
			'position' : 'absolute',
			'top' : 0,
			'height' : 10,
			'width': args['holderCSS']['width'],
			'backgroundColor': "rgb(225, 225, 225)",				
		}, args['thumbCSS']);
		
	}
	//----------------------------
	// Set CSS - HORIZONTAL ORIENTATION
	//----------------------------
	else {
		
		args['holderCSS'] = utils.dom.mergeArgs({
			'position' : 'absolute',
			'width' : '100%',
			'height' : 10,
			'left' : 0,
			'top' : 0,	
			'borderColor' : 'rgba(200,200,200,1)'			
		}, args['holderCSS']);
	

		args['thumbCSS'] = utils.dom.mergeArgs({
			'position': 'absolute',
			'height': args['holderCSS']['height'],
			'width': args['holderCSS']['height'],
			'backgroundColor': "rgb(225, 225, 225)",
			'borderRadius': 0	
		}, args['thumbCSS']);
			
	}
	
	

	//----------------------------
	// HOLDER
	//----------------------------	
	var holder = utils.dom.makeElement('div', args['parent'], "holder", args['holderCSS']);
	this.getHolder = function () {
		return holder;
	}
	that.decorate(holder);		
	


	//----------------------------
	// TRACK
	//----------------------------		
	if (args['trackCSS']) {

		var track = utils.dom.makeElement("div", holder, "SliderTrack", args['trackCSS']);
		this.getTrack = function () {
			return track;
		}		
	}



	
	//----------------------------
	// TRACK
	//----------------------------	
	//var sliderThumb = goog.dom.getElementsByClass( 'goog-slider-thumb', holder)[0];
	var childNodes = goog.dom.getChildren(holder);
	for (var i=0; i < childNodes.length; i++) {
		if (childNodes[i].className === 'goog-slider-thumb') {
			var sliderThumb  = childNodes[i]; 
			utils.css.setCSS( sliderThumb, args['thumbCSS']);
			break;
		}
	}
	


	this.bindToMouseWheel = function (element) {
		
		function handleMouseWheel(e) {
			
		  var addVal = Math.round(that.getValue() + e.deltaY / 3);
		  that.setValue(addVal);
		  e.preventDefault();	
		  
		}
		//
		// Bind mousewheel scrolling to slider	
		//
		var MouseWheelHandler = goog.events.MouseWheelHandler;
		var MOUSEWHEEL = MouseWheelHandler.EventType.MOUSEWHEEL;
		var mwh = new MouseWheelHandler(element);
		goog.events.listen(mwh, MOUSEWHEEL, handleMouseWheel);		
	}
	
	
	
	
	this.addSlideCallback = function (callback) {
		if (callback) {
			that.addEventListener(goog.ui.Component.EventType.CHANGE, function () {
				callback(that)
			});		
		}	
	}
	

}

goog.inherits(utils.gui.GenericSlider, goog.ui.Slider);