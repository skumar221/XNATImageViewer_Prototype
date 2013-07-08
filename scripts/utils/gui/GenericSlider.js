//******************************************************
//  
//******************************************************
//goog.require('goog.ui.Component');
////////@extends goog.ui.Slider
goog.provide('utils.gui.GenericSlider');	
goog.require('goog.ui.Slider');

/**
 * @constructor
 * @extends {goog.ui.Slider}
 */
utils.gui.GenericSlider = function (args) {	 


	goog.ui.Slider.call(this)


	var args_ = (typeof args === 'object') ? args : {};
	var that = this;	
	var className = (args_['className']) ? args_['className'] : "GenericSlider";
	this.id = className + "_" + utils.dom.uniqueId();


	
	//----------------------------
	// Set CSS - VERTICAL ORIENTATION
	//----------------------------
	if (args_['orientation'] && args_['orientation'].toLowerCase() == 'vertical') {
		
		this.setOrientation(goog.ui.Slider.Orientation.VERTICAL);
		this.setValue(this.getMaximum());
		this.setStep(-1);

		args_['widgetCSS'] = utils.dom.mergeArgs({
			'position' : 'absolute',
			'width' : 10,
			'height' : '100%',
			'left' : 0,
			'top' : 0,	
			'backgroundColor' : 'rgb(255,255,255)'		
		}, args_['widgetCSS']);

		args_['thumbCSS'] = utils.dom.mergeArgs({
			'position' : 'absolute',
			'top' : 0,
			'height' : 10,
			'width': args_['widgetCSS']['width'],
			'backgroundColor': "rgb(225, 225, 225)"				
		}, args_['thumbCSS']);
		
		args_['trackCSS'] = utils.dom.mergeArgs({
			'position': 'absolute',
			'width' : '40%',
			'height' : '100%',
			'left': '30%',
			'borderRadius' : 3,
			'backgroundColor' : 'rgba(100,100,100,0)'				
		}, args_['trackCSS']);
		
	}
	//----------------------------
	// Set CSS - HORIZONTAL ORIENTATION
	//----------------------------
	else {
		
		args_['widgetCSS'] = utils.dom.mergeArgs({
			'position' : 'absolute',
			'width' : '100%',
			'height' : 10,
			'left' : 0,
			'top' : 0,	
			'borderColor' : 'rgba(200,200,200,1)'			
		}, args_['widgetCSS']);
	

		args_['thumbCSS'] = utils.dom.mergeArgs({
			'position': 'absolute',
			'height': args_['widgetCSS']['height'],
			'width': args_['widgetCSS']['height'],
			'backgroundColor': "rgb(225, 225, 225)",
			'borderRadius': 0	
		}, args_['thumbCSS']);
			
		args_['trackCSS'] = utils.dom.mergeArgs({
			'position': 'absolute',
			'width' : '100%',
			'height' : '40%',
			'top': '30%',
			'borderRadius' : 3,
			'backgroundColor' : 'rgba(100,100,100,0)'			
		}, args_['trackCSS']);
	}

	//----------------------------
	// HOLDER
	//----------------------------	
	/**
	 * @private
	 */
	this.widget_ = utils.dom.makeElement('div', args_['parent'], args_['className'], args_['widgetCSS']);
	this.getWidget = function () {
		return this.widget_;
	}


	//----------------------------
	// TRACK
	//----------------------------	
	/**
	 * @private
	 */	
	this.track_ = utils.dom.makeElement("div", this.widget_, "SliderTrack", args_['trackCSS']);
	this.getTrack = function () {
		return this.track_;
	}			
	that.decorate(this.widget_);		


	
	//----------------------------
	// TRACK
	//----------------------------	
	utils.array.forEach(goog.dom.getChildren(this.widget_), function(child) {
		
		if (child.className === 'goog-slider-thumb') {
			utils.css.setCSS(child, args_['thumbCSS']);
			
			that.getThumb = function () {
				return child;
				
			}	
		}		
	})
	


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
	
	
	
	
	this.addSlideCallback = function (callback, args_) {
		//console.log("callback: ", callback.toString())
		if (callback) {

			that.addEventListener(goog.ui.Component.EventType.CHANGE, function (event) {
				event.stopPropagation();
				utils.dom.stopPropagation(event);
				callback(that, args_);
			});		
		}	
	}
	
	

	this.addEventListener(goog.ui.Component.EventType.CHANGE, function (event) {
		event.stopPropagation();
		utils.dom.stopPropagation(event);
	});	

	

}
goog.inherits(utils.gui.GenericSlider, goog.ui.Slider);		
goog.exportSymbol('utils.gui.GenericSlider', utils.gui.GenericSlider);	 