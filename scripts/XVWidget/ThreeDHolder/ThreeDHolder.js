/**
 * ThreeDHolder is contained within the Slicer Viewer. Its siblings include the
 * View Plan Menu, Content Divider, and Scan Tabs. Its children are 4 Plane Holders
 * which hold the renderers.
 */


//******************************************************
//  Init
//******************************************************
goog.provide('ThreeDHolder');

goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
ThreeDHolder = function(args) {
	
	goog.base(this, utils.dom.mergeArgs(ThreeDHolder.prototype.defaultArgs, args));
	
    // viewer-specific properties
    this.hasLoaded = false;
    this.firstVolObject = true;
    
    this.xSlider, this.ySlider, this.zSlider;
    this.xBox, this.yBox, this.zBox;
    
    
    
    //----------------------------------
    // VIEW PANES FOR RENDERERS
    //----------------------------------
    this.addViewPanes();
    
	
	//----------------------------------
	//	ONLOAD CALLBACKS
	//----------------------------------
	this.onloadCallbacks = [];
	this.adjustMethods = {};
    
    
//	this.updateCSS();
	

}
goog.inherits(ThreeDHolder, XVWidget);



/*
 * @type {object}
 * @protected
 */
ThreeDHolder.prototype.defaultArgs = {
	className: XVGlobals.classNames.ThreeDHolder,
	parent: document.body,
	blankMsg : "drag and drop Thumbnail here",
	contrastThreshold: .01,
	CSS: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '95%',
		width: '100%',	
		"fontSize": 16,		
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
	    "border" : "solid",
		"borderColor": "rgba(50,50,50,1)",
		"color": "rgba(255,255,255,1)",
	  	"border-width" : 0,
	  	"border-radius": 0,	 
	  	 overflow: "visible"
  	}
}



//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
ThreeDHolder.prototype.addOnloadCallback = function (callback) {
	this.onloadCallbacks.push(callback)
}



//******************************************************
//  
//******************************************************
ThreeDHolder.prototype.applyImageAdjustments = function () {
	
	for (var i in this.adjustMethods) {
		this.imageAdjust(i, this.adjustMethods[i]);	
	}
}


//******************************************************
//  Handles any pixel-related ajustment of the frame.
//  In this case, brightness and contrast.
//******************************************************
ThreeDHolder.prototype.imageAdjust = function (methodType, value) {

	// Arguments are needed only when initializing the adjustMethods
	if (methodType !== 'undefined' && value) {
		
		
		
		/*
		 * ! This particular variable is to account for image adjustments
		 * where both sliders are applied.
		 * Without it, only one slider's methods get applied as opposed
		 * to all of them.
		 */
		this.adjustMethods[methodType] = value;
		
		

		//
		// Apply image adjustment methods
		//
		for (var i in this.adjustMethods) {
			switch (i) {
				case "brightness":
					console.log('adjust brightness');
					break;
				case "contrast":
					console.log('adjust contrast');
					break;
			}
		}
		

	}
}


ThreeDHolder.prototype.addViewPanes = function () {
    this.PlaneHolderX = new PlaneHolder('x', {
		parent: this.widget,
        CSS: {
            left: '0%',
            top: '0%',
        }
	});
    
    this.PlaneHolderY = new PlaneHolder('y', {
		parent: this.widget,
        CSS: {
            left: '50%',
            top: '0%',
        }
	});
    
    this.PlaneHolderZ = new PlaneHolder('z', {
		parent: this.widget,
        CSS: {
            left: '0%',
            top: '50%',
        }
	});
    
    this.PlaneHolder3 = new PlaneHolder('v', {
		parent: this.widget,
        CSS: {
            left: '50%',
            top: '50%',
        }
	});
}


/**
 * Sets the .onShowtime() method of the 3D renderer. If we want to show the 2D
 * renderers, they are prepped and rendered, and the sliders are initialized.
 * @param {Object} object X object to be displayed
 * @param {boolean} show2D True if we want to show 2D renderers
 * @return {undefined}
 */
ThreeDHolder.prototype.setOnShowtime3D = function (show2D, newObj) {
    var that = this;
    if (show2D) { // volume being added
        var m = that.Viewer.Menu;
        m.currentVolObject = newObj;
        that.PlaneHolder3.Renderer.onShowtime = function() {
            if (that.firstVolObject) {
                m.initVolumeOptions();
                that.initSliceSliders();
                that.firstVolObject = false;
                
                m.volOpacitySlider.setVisible(true);
                
                that.fadeOnHoverOut = [that.xSlider.element_,
                                       that.ySlider.element_,
                                       that.zSlider.element_,
                                       that.xBox, that.yBox, that.zBox];
            }
            that.update2Drenderers();
            that.updateSlices();
            
            if (show2D && m.volRenderButton.checked) {
                m.currentVolObject.volumeRendering = true;
                m.currentVolObject.lowerThreshold = m.volThreshSlider.getValue();
                m.currentVolObject.upperThreshold = m.volThreshSlider.getValue() + m.volThreshSlider.getExtent();
            }
            
        };
    } else { // nonvolume being added
        that.PlaneHolder3.Renderer.onShowtime = function() { };
    }
}


/**
 * Adds the provided object to each of the 2D renderers and renders. Calls
 * the slice slider init function to re-init sliders and index boxes for new object.
 * @param {Object} X object to be added
 * @return {undefined}
 */
ThreeDHolder.prototype.update2Drenderers = function() {
    this.PlaneHolderX.Renderer.add(this.Viewer.Menu.currentVolObject);
    this.PlaneHolderX.Renderer.render();
    
    this.PlaneHolderY.Renderer.add(this.Viewer.Menu.currentVolObject);
    this.PlaneHolderY.Renderer.render();
    
    this.PlaneHolderZ.Renderer.add(this.Viewer.Menu.currentVolObject);
    this.PlaneHolderZ.Renderer.render();
    
    this.Viewer.Menu.currentVolObject.modified();
}


/**
 * Destroys all 4 renderers. Called when a 2D file is dropped into a viewport
 * currently displaying 3D images.
 * @param {undefined}
 * @return {undefined}
 */
ThreeDHolder.prototype.destroyRenderers = function() {
    this.PlaneHolderX.Renderer.destroy();
    this.PlaneHolderY.Renderer.destroy();
    this.PlaneHolderZ.Renderer.destroy();
    this.PlaneHolder3.Renderer.destroy();
}

