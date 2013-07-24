/**
 * Creates a 'file' div to contain a button and file label (and opacity slider
 * if not a volume). Adds components to content of folder and attaches listeners.
 * @param {Element} parent Folder content being added to
 * @param {String} file Filename / filepath
 * @param {String} type Type of X object file represents
 * @return {undefined}
 */
Menu.prototype.addFileToFolder = function(newObj, file, filetype) {
    var that = this;
    
    var parent;
    if (filetype == 'volume') {
        parent = that.voluContent;
        if (that.currentVolObject) {
            that.currentVolObject.visible = false;
            // deal with scrolling still
        }
    }
    else if (filetype == 'mesh') parent = that.meshContent;
    else if (filetype == 'fiber') parent = that.fibrContent;
    
    if (file.split('/3D/')[1])
        file = file.split('/3D/')[1];
    // outer file element containing both button and label
    var outerFileDiv = goog.dom.createDom('div', {
        'id': 'outerFileDiv' + file,
        'class': 'outerFileDiv ' + filetype + 'File' });
    
    // create button and label
    this.addFileAndButton(outerFileDiv, file, filetype);
    
    // add to folder's contents
    if (filetype == 'volume')
        goog.dom.insertSiblingBefore(outerFileDiv, goog.dom.getElementByClass('Marker', parent));
    else {
        goog.dom.insertChildAt(parent, outerFileDiv, -1);
        
        // if not a volume, each file get its own opacity slider
        
        // must set tab pane visibility to 'block' in order for sliders to init properly
        this.widget.parentElement.style.display = 'block';
        
        var updateNonvolOpacity = new goog.ui.Slider;
        updateNonvolOpacity.decorate(
            utils.dom.makeElement('div', outerFileDiv, 'OpacityNonvol',
                utils.dom.mergeArgs(this.longSliderCSS, {position: 'relative'}) )
        );
        updateNonvolOpacity.setMaximum(1);
        updateNonvolOpacity.setStep(0.01);
        updateNonvolOpacity.setValue(1);
        
        goog.events.listen(updateNonvolOpacity, goog.ui.Component.EventType.CHANGE, function(event) {
            newObj.opacity = updateNonvolOpacity.getValue();
        });
    }
    
};

/**
 * Creates a 'visibility button' (either checkbox or radio button) and a label.
 * @param {Element} parent Outer file div element to add to
 * @param {String} file Filename / filepath
 * @param {String} type Type of X object file represents
 * @return {undefined}
 */
Menu.prototype.addFileAndButton = function(parent, file, type) {
    var that = this;
    var buttontype;
    if (type == 'volume') buttontype = 'radio'; else buttontype = 'checkbox';
    
    var button = goog.dom.createDom('input', {
            'id': type + 'ButtonFor' + file,
            'type': buttontype,
            'class': 'Checkbox',
            'name': type + 'Button' + that.widget.id,
            'checked': 'checked'});
    goog.dom.append(parent, [
        button,
        goog.dom.createDom('label', { 
            'for': type + 'ButtonFor' + file,
            'class': 'innerFileDiv',
            'innerHTML': file })
    ]);
    
    goog.events.listen(button, goog.events.EventType.CHANGE, function(event) {
        var selectedObject = that.getObjFromList(file);
        if (type == 'volume') { that.toggleVolumeVisibility(selectedObject); }
        else {
            if (this.checked) { selectedObject.visible = true; } // add to viewer
            else { selectedObject.visible = false; } // remove from viewer
        }
    });
    
};

