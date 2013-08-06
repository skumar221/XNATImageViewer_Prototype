goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.reloadObj');

/**
 * Select radio button matching droppedObj to be checked. Set object to be 
 * visible, set gui visibility component to be checked, and set all other gui
 * components to be enabled.
 * 
 * Essentially, performs the desired functionality the user expects when
 * dropping a file (make it visible, selected, enabled, etc).
 */
ThreeDHolder.prototype.reloadObj = function(droppedObj, filetype) {
    
    // set radio button to match
    var radiobuttons = goog.dom.getElementsByClass('Checkbox', this.Viewer.Menu2D.widget);
    utils.array.forEach(radiobuttons, function(b) {
        var droppedFile;
        if (droppedObj.file[0].length > 1) // it's dicom
            droppedFile = droppedObj.file[0];
        else
            droppedFile = droppedObj.file;
        
        if (b.getAttribute('file') === droppedFile) {
            b.checked = 'checked';
        }
    });
    
    // set to be visible
    droppedObj.visible = true;
    if (filetype == 'volume' && this.currentVolObject != droppedObj) {
        this.update2Drenderers(droppedObj);
    }
    
    this.updateMenuSliders();
};
goog.exportProperty(ThreeDHolder.prototype, 'reloadObj', ThreeDHolder.prototype.reloadObj);
