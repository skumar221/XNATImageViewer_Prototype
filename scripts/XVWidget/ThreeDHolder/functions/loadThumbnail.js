
goog.require('goog.events');

ThreeDHolder.prototype.loadThumbnail = function (droppable, viewPlane) {
    this.currDroppable = droppable;

    var m = this.Viewer.Menu;
    var file = droppable.scanData.filePath;
    var filetype = getFileObjectType(file);
    
    
    
    var droppedObj = m.getObjFromList(file);
    
    if (droppedObj) { // dropped file is already in viewer
        this.dontReloadObj(droppedObj, file, filetype);
    } else {          // dropped file is new, create it and add it
        this.createAndLoadObj(file, filetype);
    }
    
    if (m.currentObjects.length < 2) {
        this.currViewPlane = "All";
        this.Viewer.ViewPlaneMenu.activateIcon('All', true);
    }
    
    // Run any callbacks once everything is loaded
    utils.array.forEach(this.onloadCallbacks, function(callback) {
        callback(this.widget);
    })	
    

};


ThreeDHolder.prototype.dontReloadObj = function(droppedObj, file, filetype) {
    // set to be visible
    if (filetype == 'volume' && this.Viewer.Menu.currentVolObject != droppedObj) {
        this.Viewer.Menu.toggleVolumeVisibility(droppedObj);
    } else {
        droppedObj.visible = true;
    }
    // make it 'selected'
    this.Viewer.Menu.findAndSelectCheckbox(file, filetype);
};


ThreeDHolder.prototype.createAndLoadObj = function(file, filetype) {
    var that = this;
    var m = this.Viewer.Menu;
	
    var show2D = filetype == 'volume';
    var newObj = createXObject(file);
    
    m.currentObjects.push(newObj);
    m.addFileToFolder(newObj, file, filetype);
    
    
    that.PlaneHolder3.Renderer.add(newObj);
    that.setOnShowtime3D(show2D, newObj);
};


// http://jsfiddle.net/QpAcf/
