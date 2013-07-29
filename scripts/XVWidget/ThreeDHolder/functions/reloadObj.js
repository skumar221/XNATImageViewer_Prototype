ThreeDHolder.prototype.reloadObj = function(droppedObj, file, filetype) {
    // set to be visible
    if (filetype == 'volume' && this.currentVolObject != droppedObj) {
        this.currentVolObject = newObj;
        this.update2Drenderers(droppedObj);
    } else {
        droppedObj.visible = true;
    }
    
    // make it 'selected'
    // shortens file names, but we're still using http addresses for some files
    if (file.split('/3D/')[1])
        file = file.split('/3D/')[1];
    
    var menuWidget = this.Viewer.Menu.widget;
    var fileBoxes = goog.dom.getElementsByClass('Checkbox', menuWidget);
    var checkType = (filetype === 'volume') ? 'radio' : 'checkbox';
    utils.array.forEach(fileBoxes, function(box) {
        // set radio button or checkbox
        var id = checkType + 'ButtonFor' + file + file + menuWidget.id;
        if (box.id === id) box.checked = 'checked';
        
        
        // set visibility button
//        id = 'checkboxButtonForVisible' + file + menuWidget.id;
//        if (box.id === id) box.checked = 'checked';
        // also need to enable other elements...
    });
};