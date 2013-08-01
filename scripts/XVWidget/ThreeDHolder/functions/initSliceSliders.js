goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.initSliceSliders');


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
        cvo.indexLR = that.xSlider.getValue();
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexLR) + ' / ' + cvo._dimensionsRAS[0];
        cvo.modified();
    });
    
    goog.events.listen(that.ySlider, goog.ui.Component.EventType.CHANGE, function() {
        var cvo = that.currentVolObject;
        cvo.indexPA = that.ySlider.getValue();
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexPA) + ' / ' + cvo._dimensionsRAS[1];
        cvo.modified();
    });
    
    goog.events.listen(that.zSlider, goog.ui.Component.EventType.CHANGE, function() {
        var cvo = that.currentVolObject;
        cvo.indexIS = that.zSlider.getValue();
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexIS) + ' / ' + cvo._dimensionsRAS[2];
        cvo.modified();
    });
    
    
    
    //----------------------------------
    // ADD SCROLL LISTENERS
    //----------------------------------
    that.PlaneHolderX.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;    // this MUST be inside the function!
        that.xSlider.setValue(cvo.indexLR);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexLR) + ' / ' + cvo._dimensionsRAS[0];
    };
    
    that.PlaneHolderY.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;
        that.ySlider.setValue(cvo.indexPA);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexPA) + ' / ' + cvo._dimensionsRAS[1];
    };
    
    that.PlaneHolderZ.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;
        that.zSlider.setValue(cvo.indexIS);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexIS) + ' / ' + cvo._dimensionsRAS[2];
    };
    
    
    
    
    //----------------------------------
    // ADD SHIFT/MOVE LISTENERS
    //----------------------------------
    that.PlaneHolderX.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;    // this MUST be inside the function!
        
        that.ySlider.setValue(cvo.indexPA);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexPA) + ' / ' + cvo._dimensionsRAS[1];
        that.zSlider.setValue(cvo.indexIS);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexIS) + ' / ' + cvo._dimensionsRAS[2];
    };
    that.PlaneHolderY.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        
        that.xSlider.setValue(cvo.indexLR);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexLR) + ' / ' + cvo._dimensionsRAS[0];
        that.zSlider.setValue(cvo.indexIS);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexIS) + ' / ' + cvo._dimensionsRAS[2];
    };
    that.PlaneHolderZ.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        
        that.xSlider.setValue(cvo.indexLR);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexLR) + ' / ' + cvo._dimensionsRAS[0];
        that.ySlider.setValue(cvo.indexPA);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexPA) + ' / ' + cvo._dimensionsRAS[1];
    };
    
};
goog.exportProperty(ThreeDHolder.prototype, 'initSliceSliders', ThreeDHolder.prototype.initSliceSliders);

