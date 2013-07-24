
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');

/**
 * Set properties and starting values of x/y/zSliders and x/y/zIndexBoxes.
 * Only called once *volume* has loaded.
 * @param {Object} obj X object sliders will control
 * @return {undefined}
 */
ThreeDHolder.prototype.initSliceSliders = function() {
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
    var m = this.Viewer.Menu;
    var that = this;

    goog.events.listen(that.xSlider, goog.ui.Component.EventType.CHANGE, function() {
        m.currentVolObject.indexX = that.xSlider.getValue();
        that.xBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexX) + ' / ' + m.currentVolObject.dimensions[2];
        m.currentVolObject.modified();
    });
    
    goog.events.listen(that.ySlider, goog.ui.Component.EventType.CHANGE, function() {
        m.currentVolObject.indexY = that.ySlider.getValue();
        that.yBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexY) + ' / ' + m.currentVolObject.dimensions[1];
        m.currentVolObject.modified();
    });
    
    goog.events.listen(that.zSlider, goog.ui.Component.EventType.CHANGE, function() {
        m.currentVolObject.indexZ = that.zSlider.getValue();
        that.zBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexZ) + ' / ' + m.currentVolObject.dimensions[0];
        m.currentVolObject.modified();
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
    var cvo = this.Viewer.Menu.currentVolObject;
    var m = this.Viewer.Menu.currentObjects;
    
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
    
    this.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
    this.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    this.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    
    for (var i = 0; i < m.length; ++i) {
//        console.log('after ' + i + ' current indices: ' + m[i].indexX + ' ' + m[i].indexY + ' ' + m[i].indexZ);
    }
};


ThreeDHolder.prototype.addScrollListeners = function() {
    var m = this.Viewer.Menu;
    var that = this;
    
    that.PlaneHolderX.Renderer.onScroll = function() {
        that.xSlider.setValue(m.currentVolObject.indexX);
        that.xBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexX) + ' / ' + m.currentVolObject.dimensions[2];
    };
    that.PlaneHolderY.Renderer.onScroll = function() {
        that.ySlider.setValue(m.currentVolObject.indexY);
        that.yBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexY) + ' / ' + m.currentVolObject.dimensions[1];
    };
    that.PlaneHolderZ.Renderer.onScroll = function() {
        that.zSlider.setValue(m.currentVolObject.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexZ) + ' / ' + m.currentVolObject.dimensions[0];
    };
};



ThreeDHolder.prototype.addShiftMoveListeners = function() {
    var m = this.Viewer.Menu;
    var that = this;
    
    that.PlaneHolderX.Renderer.xy2ijkOverwrite = function() {
        that.ySlider.setValue(m.currentVolObject.indexY);
        that.yBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexY) + ' / ' + m.currentVolObject.dimensions[1];
        that.zSlider.setValue(m.currentVolObject.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexZ) + ' / ' + m.currentVolObject.dimensions[0];
    };
    that.PlaneHolderY.Renderer.xy2ijkOverwrite = function() {
        that.xSlider.setValue(m.currentVolObject.indexX);
        that.xBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexX) + ' / ' + m.currentVolObject.dimensions[2];
        that.zSlider.setValue(m.currentVolObject.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexZ) + ' / ' + m.currentVolObject.dimensions[0];
    };
    that.PlaneHolderZ.Renderer.xy2ijkOverwrite = function() {
        that.xSlider.setValue(m.currentVolObject.indexX);
        that.xBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexX) + ' / ' + m.currentVolObject.dimensions[2];
        that.ySlider.setValue(m.currentVolObject.indexY);
        that.yBox.innerHTML = 'Frame: ' + (m.currentVolObject.indexY) + ' / ' + m.currentVolObject.dimensions[1];
    };
};



