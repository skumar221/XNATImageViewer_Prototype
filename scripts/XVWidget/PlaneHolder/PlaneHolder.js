
//******************************************************
//  Init
//******************************************************
goog.provide('PlaneHolder');

goog.require('X.renderer3D');
goog.require('X.renderer2D');
goog.require('XVWidget');

/**
 * @constructor
 * @extends {XVWidget}
 */
PlaneHolder = function(id, args) {
	goog.base(this, utils.dom.mergeArgs(PlaneHolder.prototype.defaultArgs, args));
	
	//----------------------------------
	//	ONLOAD CALLBACKS
	//----------------------------------
	this.onloadCallbacks = [];
    
    this.widget.id = id + '_' + this.widget.id;
    goog.dom.classes.add(this.widget, id + 'Plane');

    
    //----------------------------------
    // CREATE RENDERER
    //----------------------------------
    if (id !== 'v') {
        this.Renderer = new X.renderer2D();
        this.Renderer.orientation = id.toUpperCase();
        this.addSliderAndFrameNum(id);
    } else {
 
        this.Renderer = new X.renderer3D();
    }
    
    this.Renderer.container = this.widget.id;
    this.Renderer.init();
    
    if (id === 'v') {
        this.Renderer.render();
    }
    
    //	this.updateCSS();
}
goog.inherits(PlaneHolder, XVWidget);



/*
 * @type {object}
 * @protected
 */
PlaneHolder.prototype.defaultArgs = {
	className: XVGlobals.classNames.PlaneHolder,
	parent: document.body,
	blankMsg : "drag and drop Thumbnail here",
	CSS: {
		position: 'absolute',
		height: '50%',
		width: '50%',
        top: '0%',
        left: '0%',
		"overflow": "hidden",
        'display': 'inline',
        'background': '#000',
  	}
}

PlaneHolder.prototype.sliderDefaultArgs = {
    position: 'absolute',
    left: '5%',
    bottom: '10px',
    width: '90%',
    height: '3px',
    'border-radius': '4px',
    background: '#4AA',
    opacity: '0',
}

PlaneHolder.prototype.frameNumDefaultArgs = {
    position: 'absolute',
    width: '90%',
    left: '5%',
    bottom: '16px',
    color: '#ddd',
    'font-size': '10px',
    opacity: '0',
}

PlaneHolder.prototype.addSliderAndFrameNum = function(id) {
    var color = (id === 'x') ? 'rgba(255,255,0,1)' : (id === 'y') ? 'rgba(0,255,0,1)' : 'rgba(255,0,0,1)';
    
    
    var s = utils.dom.makeElement('div', this.widget, 'sliceSlider',
        utils.dom.mergeArgs(this.sliderDefaultArgs, {background: color}));
    goog.dom.classes.add(s, id + 'Slice');
    
    var b = utils.dom.makeElement('div', this.widget, 'box', this.frameNumDefaultArgs );
    goog.dom.classes.add(b, id + 'Box');
}



//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
PlaneHolder.prototype.addOnloadCallback = function (callback) {
	this.onloadCallbacks.push(callback)
}

/*

PlaneHolder.prototype.initSliceSliders = function() {
    this.createSliders();
    this.createIndexBoxes();
    
//    this.updateSlices();
    
//    addSliderListeners();
//    addIndexBoxListeners();
//    addScrollListeners();
}


PlaneHolder.prototype.createSliders = function() {
    xSlider = new goog.ui.Slider;
    ySlider = new goog.ui.Slider;
    zSlider = new goog.ui.Slider;
    
    xSlider.decorate(goog.dom.getElementByClass('xSlice', this.widget));
    ySlider.decorate(goog.dom.getElementByClass('ySlice', this.widget));
    zSlider.decorate(goog.dom.getElementByClass('zSlice', this.widget));
}




PlaneHolder.prototype.createIndexBoxes = function() {
    xBox = goog.dom.getElementByClass('xBox', this.widget);
    yBox = goog.dom.getElementByClass('yBox', this.widget);
    zBox = goog.dom.getElementByClass('zBox', this.widget);
}






PlaneHolder.prototype.updateSlices = function() {
    var cvo = this.currentVolObject;

    cvo.indexX = Math.round(cvo.indexX);
    cvo.indexY = Math.round(cvo.indexY);
    cvo.indexZ = Math.round(cvo.indexZ);
    
    xSlider.setMaximum(cvo.dimensions[2]-1);
    ySlider.setMaximum(cvo.dimensions[1]-1);
    zSlider.setMaximum(cvo.dimensions[0]-1);
    
    xSlider.setValue(cvo.indexX);
    ySlider.setValue(cvo.indexY);
    zSlider.setValue(cvo.indexZ);
    
    xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
    yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
}





/**
 * Updates volume object's currently displayed slices and index boxes to match
 * slider's position. Called when slider slides or changes.
 * /
PlaneHolder.prototype.addSliderListeners = function() {
    var cvo = this.currentVolObject;

    goog.events.listen(xSlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexX = xSlider.getValue();
        xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        cvo.modified();
    });
    
    goog.events.listen(ySlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexY = ySlider.getValue();
        yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        cvo.modified();
    });
    
    goog.events.listen(zSlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexZ = zSlider.getValue();
        zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
        cvo.modified();
    });
}




/**
 * Changes current indices of volume to match inputted indices. Also updates
 * slider's value. Called when index input box changes. Only called when there
 * is a renderer visible, and when that renderer is displaying a volume.
 * /
PlaneHolder.prototype.addIndexBoxListeners = function() {
    var cvo = this.currentVolObject;
    
    goog.events.listen(xBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(xBox.getValue());
        if (sliceNum < 0 || sliceNum > cvo.dimensions[2] || isNaN(sliceNum)) {
            xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        } else {
            cvo.indexX = sliceNum;
            cvo.modified();
            xSlider.setValue(sliceNum);
        }
    });
    
    goog.events.listen(yBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(yBox.getValue());
        if (sliceNum < 0 || sliceNum > cvo.dimensions[1] || isNaN(sliceNum)) {
            yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        } else {
            cvo._indexY = sliceNum;
            cvo.modified();
            ySlider.setValue(sliceNum);
        }
    });
    
    goog.events.listen(zBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(zBox.getValue());
        if (sliceNum < 0 || sliceNum > cvo.dimensions[0] || isNaN(sliceNum)) {
            zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
        } else {
            cvo._indexZ = sliceNum;
            cvo.modified();
            zSlider.setValue(sliceNum); 
        }
    });
}





PlaneHolder.prototype.addScrollListeners = function() {
    var cvo = this.currentVolObject;
    
    // set up reaction functions for scrolling
    twoDrendererX.onScroll = function() {
        xSlider.setValue(cvo.indexX);
        xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
    };
    twoDrendererY.onScroll = function() {
        ySlider.setValue(cvo.indexY);
        yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    };
    twoDrendererZ.onScroll = function() {
        zSlider.setValue(cvo.indexZ);
        zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
}

*/
