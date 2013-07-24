/**
 * Add a single opacity slider, a single threshold slider, and a single volume
 * rendering checkbox option for the Volumes folder.
 * @param {undefined}
 * @return {undefined}
 */
Menu.prototype.initVolumeOptions = function() {
    var that = this;
    
    // create threshold label and slider
    var tl = utils.dom.makeElement('div', this.voluContent, 'Label', this.labelCSS).innerHTML = 'threshold';
    var ts = utils.dom.makeElement('div', this.voluContent, 'ThresholdSlider', this.longSliderCSS);
    this.initThreshSlider(ts);
    
    // create opacity label and slider
    var ol = utils.dom.makeElement('div', this.voluContent, 'Label', this.labelCSS).innerHTML = 'opacity';
    var os = utils.dom.makeElement('div', this.voluContent, 'OpacitySlider', this.longSliderCSS);
    this.initVolOpacitySlider(os);
    
    // create volume rendering label and checkbox
    this.initRenderButton();
    
    // create visibility option
    this.initVisibleButton();

};



/**
 * Set up single threshold slider for volume folder.
 * @param {undefined}
 * @return {undefined}
 */
Menu.prototype.initThreshSlider = function(elt) {
    // must set tab pane visibility to 'block' in order for sliders to init properly
    this.widget.parentElement.style.display = 'block';
    
    // set attributes
    this.volThreshSlider = new goog.ui.TwoThumbSlider;
    this.volThreshSlider.decorate(goog.dom.getElement(elt));
    this.volThreshSlider.setMinimum(this.currentVolObject.min);
    this.volThreshSlider.setMaximum(this.currentVolObject.max);
    this.volThreshSlider.setStep(1);
    this.volThreshSlider.setValueAndExtent(
        this.currentVolObject.max * 0.05, this.currentVolObject.max * 0.95 - 1);
    
    var that = this;
    goog.events.listen(that.volThreshSlider, goog.ui.Component.EventType.CHANGE, function(event) {
        that.currentVolObject.lowerThreshold = that.volThreshSlider.getValue();
        that.currentVolObject.upperThreshold =
            that.volThreshSlider.getValue() + that.volThreshSlider.getExtent();
    });
    
    this.currentVolObject.lowerThreshold = this.currentVolObject.max * 0.05;
};


/**
 * Set up single volume folder's opacity slider.
 * @param {undefined}
 * @return {undefined}
 */
Menu.prototype.initVolOpacitySlider = function(elt) {
    // must set tab pane visibility to 'block' in order for sliders to init properly
    this.widget.parentElement.style.display = 'block';
    
    // set attributes
    this.volOpacitySlider = new goog.ui.Slider;
    this.volOpacitySlider.decorate(elt);
    this.volOpacitySlider.setMaximum(1);
    this.volOpacitySlider.setStep(0.01);
    this.volOpacitySlider.setValue(1);
    //this.volOpacitySlider.setVisible(true);
    
    var that = this;
    goog.events.listen(that.volOpacitySlider, goog.ui.Component.EventType.CHANGE, function(event) {
        that.currentVolObject.opacity = that.volOpacitySlider.getValue();
    });
};


Menu.prototype.initRenderButton = function() {
    var that = this;
    
    var rWrapper = utils.dom.makeElement('div', this.voluContent, 'Wrapper', this.wrapperCSS);
    this.volRenderButton = utils.dom.makeElement('input', rWrapper, 'RenderButton');
    this.volRenderButton.type = 'checkbox';
    goog.dom.appendChild(rWrapper, goog.dom.createDom('label', {
        'class': 'innerFileDiv',
        'for': this.volRenderButton.id,
        'innerHTML': 'RENDER VOLUME'
    }));
    goog.events.listen(this.volRenderButton, goog.events.EventType.CHANGE,
        function() {
            if (this.checked) { that.currentVolObject.volumeRendering = true; } // add rendering
            else { that.currentVolObject.volumeRendering = false; } // remove rendering
    });
};


Menu.prototype.initVisibleButton = function() {
    var that = this;
    
    var vWrapper = utils.dom.makeElement('div', this.voluContent, 'Wrapper', this.wrapperCSS);
    this.volVisibleButton = utils.dom.makeElement('input', vWrapper, 'VisibleButton');
    this.volVisibleButton.type = 'checkbox';
    this.volVisibleButton.checked = 'checked';
    goog.dom.appendChild(vWrapper, goog.dom.createDom('label', {
        'class': 'innerFileDiv',
        'for': this.volVisibleButton.id,
        'innerHTML': 'VISIBLE',
    }));
    goog.events.listen(this.volVisibleButton, goog.events.EventType.CHANGE,
        function() {
            if (this.checked) { that.currentVolObject.visible = true; }
            else { that.currentVolObject.visible = false; }
    });
};



/**
 * Toggles the volume folder's sliders and checkboxes to match the values
 * of the currently displayed object. Called when the volume object that is 
 * displayed changes.
 * @param {Object} newObj X object that is newly selected
 * @return {undefined}
 */
Menu.prototype.toggleVolumeVisibility = function(newObj) {
    if (this.volVisibleButton.checked) { newObj.visible = true; }
    
    this.currentVolObject.visible = false;
    this.currentVolObject = newObj;
    
    // set threshold sliders to match object properties
    this.volThreshSlider.setMinimum(this.currentVolObject.min);
    this.volThreshSlider.setMaximum(this.currentVolObject.max);
    this.volThreshSlider.setValueAndExtent(this.currentVolObject.lowerThreshold,
        this.currentVolObject.upperThreshold - this.currentVolObject.lowerThreshold);
    
    // set opacity slider to match object property
    this.volOpacitySlider.setValue(this.currentVolObject.opacity);
    
    // set rendering option to match object property
    this.volRenderButton.checked = (this.currentVolObject.volumeRendering) ? 'checked' : '';
    
    this.ThreeDHolder.update2Drenderers(newObj);  // updates 2D renderers so that correct images are displayed
    this.ThreeDHolder.updateSlices();
//    this.ThreeDHolder.addScrollListeners();
};


Menu.prototype.findAndSelectCheckbox = function(file, filetype) {
    if (file.split('/3D/')[1])
        file = file.split('/3D/')[1];
        
    var fileBoxes = goog.dom.getElementsByClass('Checkbox', this.widget);
    utils.array.forEach(fileBoxes, function(box) {
        if (box.id === filetype + 'ButtonFor' + file) {
            box.checked = 'checked';
        }
    });
};


