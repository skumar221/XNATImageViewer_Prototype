
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');

/**
 * Set properties and starting values of x/y/zSliders and x/y/zIndexBoxes.
 * Only called once *volume* has loaded.
 * @param {Object} obj X object sliders will control
 * @return {undefined}
 */
ThreeDHolder.prototype.initSliceSliders = function() {
    // need to set parent element to have display: block in order to init properly
    this.PlaneHolderX.widget.style.display = 'block';
    this.PlaneHolderY.widget.style.display = 'block';
    this.PlaneHolderZ.widget.style.display = 'block';
    
    //----------------------------------
    // CREATE SLIDERS
    //----------------------------------
    this.xSlider = new goog.ui.Slider;
    this.ySlider = new goog.ui.Slider;
    this.zSlider = new goog.ui.Slider;
    
    this.xSlider.decorate(goog.dom.getElementByClass('xSlice', this.widget));
    this.ySlider.decorate(goog.dom.getElementByClass('ySlice', this.widget));
    this.zSlider.decorate(goog.dom.getElementByClass('zSlice', this.widget));
    
    
    
    //----------------------------------
    // CREATE FRAME INDEX LABELS
    //----------------------------------
    this.xBox = goog.dom.getElementByClass('xBox', this.widget);
    this.yBox = goog.dom.getElementByClass('yBox', this.widget);
    this.zBox = goog.dom.getElementByClass('zBox', this.widget);
    
    
    
    //----------------------------------
    // UPDATE SLIDERS
    //----------------------------------
    this.updateSlices();
    
    
    
    //----------------------------------
    // ADD SLIDER LISTENERS
    //----------------------------------
    var that = this;

    goog.events.listen(that.xSlider, goog.ui.Component.EventType.CHANGE, function() {
        var cvo = that.currentVolObject;    // must be inside the function!!!
        cvo.indexX = that.xSlider.getValue();
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        cvo.modified();
    });
    
    goog.events.listen(that.ySlider, goog.ui.Component.EventType.CHANGE, function() {
        var cvo = that.currentVolObject;
        cvo.indexY = that.ySlider.getValue();
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        cvo.modified();
    });
    
    goog.events.listen(that.zSlider, goog.ui.Component.EventType.CHANGE, function() {
        var cvo = that.currentVolObject;
        cvo.indexZ = that.zSlider.getValue();
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
        cvo.modified();
    });
    
    
    
    //----------------------------------
    // ADD SCROLL LISTENERS
    //----------------------------------
    this.addScrollListeners();
    
    
    
    
    //----------------------------------
    // ADD SHIFT/MOVE LISTENERS
    //----------------------------------
    this.addShiftMoveListeners();
    
    
    
//    addIndexBoxListeners(viewer);
};


ThreeDHolder.prototype.updateSlices = function() {
    var cvo = this.currentVolObject;
    var m = this.currentObjects;
    
//    console.log(cvo);
//    console.log(m);
    
//    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    
    for (var i = 0; i < m.length; ++i) {
//        console.log('before ' + i + ' current indices: ' + m[i].indexX + ' ' + m[i].indexY + ' ' + m[i].indexZ);
    }
    
    cvo.indexX = Math.round(cvo.indexX);
    cvo.indexY = Math.round(cvo.indexY);
    cvo.indexZ = Math.round(cvo.indexZ);
    
    this.xSlider.setMaximum(cvo.dimensions[2]-1);
    this.ySlider.setMaximum(cvo.dimensions[1]-1);
    this.zSlider.setMaximum(cvo.dimensions[0]-1);
    
    this.xSlider.setValue(cvo.indexX);
    this.ySlider.setValue(cvo.indexY);
    this.zSlider.setValue(cvo.indexZ);
    for (var i = 0; i < m.length; ++i) {
//        console.log('after ' + i + ' current indices: ' + m[i].indexX + ' ' + m[i].indexY + ' ' + m[i].indexZ);
    }
    
    this.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
    this.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    this.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    
    
};


ThreeDHolder.prototype.addScrollListeners = function() {
    var that = this;
    
    that.PlaneHolderX.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;    // this MUST be inside the function!
        that.xSlider.setValue(cvo.indexX);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        
    };
    that.PlaneHolderY.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;
        that.ySlider.setValue(cvo.indexY);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    };
    that.PlaneHolderZ.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;
        that.zSlider.setValue(cvo.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
};



ThreeDHolder.prototype.addShiftMoveListeners = function() {
    var that = this;
    
    that.PlaneHolderX.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;    // this MUST be inside the function!
        that.ySlider.setValue(cvo.indexY);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        that.zSlider.setValue(cvo.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
    that.PlaneHolderY.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        that.xSlider.setValue(cvo.indexX);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        that.zSlider.setValue(cvo.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
    that.PlaneHolderZ.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        that.xSlider.setValue(cvo.indexX);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        that.ySlider.setValue(cvo.indexY);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    };
};



