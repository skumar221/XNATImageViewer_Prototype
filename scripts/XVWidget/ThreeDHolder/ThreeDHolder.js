
/**
 * PlaneHolderX -- always sagittal (not necessarily always X)
 * PlaneHolderY -- always coronal (not necessarily always Y)
 * PlaneHolderZ -- always axial (not necessarily always Z)
 */



//******************************************************
//  Init
//******************************************************

goog.require('XVGlobals');
goog.require('XVWidget');
goog.provide('ThreeDHolder');
/**
 * @constructor
 * @extends {XVWidget}
 */
ThreeDHolder = function(args) {
	
	goog.base(this, utils.dom.mergeArgs(ThreeDHolder.prototype.defaultArgs, args));
	
    // viewer-specific properties
    this.firstVolObject = true;
    
    this.fadeOnHoverOut = [];


 	/**
	 * @type {SlicerFileHandler}
	 * @private
	 */   
    this.SlicerFileHandler_ = new SlicerFileHandler();
    
        
 	/**
	 * @type {goog.ui.Slider}
	 * @protected
	 */   
    this.xSlider;
 	/**
	 * @type {goog.ui.Slider}
	 * @protected
	 */  
    this.ySlider;
 	/**
	 * @type {goog.ui.Slider}
	 * @protected
	 */  
    this.zSlider;
    
	/**
	 * @type {Element}
	 * @protected
	 */ 
    this.xBox;
	/**
	 * @type {Element}
	 * @protected
	 */ 
    this.yBox;
	/**
	 * @type {Element}
	 * @protected
	 */ 
    this.zBox;
 	/**
	 * @protected
	 */    
    this.currentVolObject;
    this.currentObjects = [];
    
    this.objRadioPairs = [];
    this.objVisiblePairs = [];
    this.objRenderPairs = [];
    this.objOpacityPairs = [];
    this.objThreshPairs = [];
    
    this.slicerCallbacks = [];
    
    
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
goog.exportSymbol('ThreeDHolder', ThreeDHolder);



/**
 * @type {object}
 * @protected
 */
ThreeDHolder.prototype.defaultArgs = {
	'className': XVGlobals.classNames.ThreeDHolder,
	'parent': document.body,
	'blankMsg': "drag and drop Thumbnail here",
	'contrastThreshold': .01,
	'CSS': {
		'position': 'absolute',
		'top': '0',
		'left': '0',
		'height': '95%',
		'width': '100%',	
		"fontSize": '16',		
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
	    "border" : "solid",
		"borderColor": "rgba(50,50,50,1)",
		"color": "rgba(255,255,255,1)",
	  	"border-width" : 0,
	  	"border-radius": 0,	 
	  	'overflow': "visible"
  	}
}



//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
ThreeDHolder.prototype.addOnloadCallback = function (callback) {
	this.onloadCallbacks.push(callback)
}



ThreeDHolder.prototype.addViewPanes = function () {
    this.PlaneHolderX = new PlaneHolder('x', this, {
		'parent': this.widget,
        'CSS': {
            'left': '0%',
            'top': '0%'
        }
	});
    
    this.PlaneHolderY = new PlaneHolder('y', this, {
		'parent': this.widget,
        'CSS': {
            'left': '50%',
            'top': '0%'
        }
	});
    
    this.PlaneHolderZ = new PlaneHolder('z', this, {
		'parent': this.widget,
        'CSS': {
            'left': '0%',
            'top': '50%'
        }
	});
    
    this.PlaneHolder3 = new PlaneHolder('v', this, {
		'parent': this.widget,
        'CSS': {
            'left': '50%',
            'top': '50%'
        }
	});
}



ThreeDHolder.prototype.getObjFromList = function(f) {
    var ext = this.SlicerFileHandler_.getFileExt(f);
    
    if (ext === 'dcm' || ext === 'dicom') {
        for (var i = 0; i < this.currentObjects.length; ++i) {
            if (this.currentObjects[i].file[0].indexOf(f.slice(0,-9)) > -1)
                return this.currentObjects[i];
        }
    } else {
        for (var i = 0; i < this.currentObjects.length; ++i) {
            if (this.currentObjects[i].file == f) return this.currentObjects[i];
        }
    }
}


/**
 * Sets the .onShowtime() method of the 3D renderer. If we want to show the 2D
 * renderers, they are prepped and rendered, and the sliders are initialized.
 * @param {Object} object X object to be displayed
 * @param {boolean} show2D True if we want to show 2D renderers
 * @return {undefined}
 */
ThreeDHolder.prototype.setOnShowtime = function (newObj) {
    var that = this;
    
    // there is a volume to set up
    if (newObj) {
        this.PlaneHolder3.Renderer.onShowtime = function() {
        	console.log(newObj)
            that.currentVolObject = newObj;
            that.initSliceSliders();
            that.update2Drenderers();
            that.updateMenuSliders();
            
        };
    }
    
    else {
        this.PlaneHolder3.Renderer.onShowtime = function() { that.updateMenuSliders(); };
    }
    
}


/**
 * Adds the provided object to each of the 2D renderers and renders. Calls
 * the slice slider init function to re-init sliders and index boxes for new object.
 * @param {Object} X object to be added
 * @return {undefined}
 */
ThreeDHolder.prototype.update2Drenderers = function(newObj) {
    if (newObj) this.currentVolObject = newObj;
    
    this.PlaneHolderX.Renderer.add(this.currentVolObject);
    this.PlaneHolderX.Renderer.render();
    
    this.PlaneHolderY.Renderer.add(this.currentVolObject);
    this.PlaneHolderY.Renderer.render();
    
    this.PlaneHolderZ.Renderer.add(this.currentVolObject);
    this.PlaneHolderZ.Renderer.render();
    
    this.updateSlices();
    
    
    /*
    console.log(this.currentVolObject._slicesX);
    utils.array.forEach(this.currentVolObject._slicesX._children, function(s) {
        s['visible'] = false;
    });
//    this.currentVolObject._slicesX._children[this.currentVolObject.indexX]['visible'] = false;
    */
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

