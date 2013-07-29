
goog.require('goog.events');

ThreeDHolder.prototype.loadThumbnail = function (droppable, viewPlane) {
    this.currDroppable = droppable;
    
    var m = this.Viewer.Menu;
    var file = droppable.scanData.filePath;
    var filetype = getFileObjectType(file);
    
    // activate correct view plane menu
    // if slicer, show 3D plane only
    if (filetype == 'slicer') {
        this.currViewPlane = '3D';
        this.Viewer.ViewPlaneMenu.activateIcon('3D', true);
        handle3Dto2D(this.Viewer, '3D');
    }
    
    // if not slicer, show all planes only if this is the first object,
    // otherwise keep view pane the same
    else if (this.currentObjects.length < 2) {
        this.currViewPlane = "All";
        this.Viewer.ViewPlaneMenu.activateIcon('All', true);
    }
    
    // add new object or bring up existing one
    var droppedObj = this.getObjFromList(file);
    if (droppedObj) {
        // need to deal with enabling other parts
//        this.reloadObj(droppedObj, file, filetype);
    } else {
        if (filetype == 'slicer') this.openSlicerScene(file, droppable);
        else {
            this.addObject(file);
        }
    }
    
    // Run any callbacks once everything is loaded
    utils.array.forEach(this.onloadCallbacks, function(callback) {
        callback(this.widget);
    })

};

