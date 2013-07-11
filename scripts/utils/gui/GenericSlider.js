//******************************************************
//  
//******************************************************

goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');
goog.require('goog.events.EventTarget')
goog.provide('utils.gui.GenericSlider');	

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

	/**
	 * @expose
	 * @return {number}
	 */	
	this.getMin = function() {
		return this.getMinimum();
	}
	
	/**
	 * @expose
	 * @return {number}
	 */	
	this.getMax = function() {
		return this.getMaximum();
	}
	
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


	//----------------------------
	// TRACK
	//----------------------------	
	/**
	 * @private
	 */	
	this.track_ = utils.dom.makeElement("div", this.widget_, "SliderTrack", args_['trackCSS']);

	/**
	 * @expose
	 */	
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
			
			/**
			 * @expose
			 */	
			that.getThumb = function () {
				return child;
				
			}	
		}		
	})
	



	
	/*
	 * @expose
	 */
	this.enable = function(bool) {
		utils.gui.GenericSlider.superClass_.setEnabled.call(this, bool);
	}

	
}

goog.inherits(utils.gui.GenericSlider, goog.ui.Slider);		
goog.exportSymbol('utils.gui.GenericSlider', utils.gui.GenericSlider);	 


/**
 * @expose
 * @return {Element}
 */	
utils.gui.GenericSlider.prototype.getWidget = function () {
	return this.widget_;
}
	
	
 /**
 * @expose
 * @override
 */
utils.gui.GenericSlider.prototype.getValue = function() {
   return utils.gui.GenericSlider.superClass_.getValue.call(this);
};



 /**
 * @expose
 * @override
 */
utils.gui.GenericSlider.prototype.setValue = function(a) {
   return utils.gui.GenericSlider.superClass_.setValue.call(this, a);
};
 
 
 
/**
 * @expose
 * @param {Element}
 */
utils.gui.GenericSlider.prototype.bindToMouseWheel = function (element) {
	//
	// Bind mousewheel scrolling to slider	
	//	
	var that = this;
	var mwh = new goog.events.MouseWheelHandler(element);
	
	mwh.addEventListener( 
		goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, function(e) { 
		that.setValue(Math.round(that.getValue() 
			+ e.deltaY / 3));
		e.preventDefault();		
	});		
}



/**
 * @expose
 * @param {Function} callback
 * @param {Object} args_
 */
utils.gui.GenericSlider.prototype.addSlideCallback = function (callback, args_) {
	var that = this;
	
	utils.gui.GenericSlider.superClass_.addEventListener.call(this, goog.ui.Component.EventType.CHANGE, function (e) {
		e.stopPropagation();
		utils.dom.stopPropagation(e);
		callback(that, args_, e);
	});	
	
}

