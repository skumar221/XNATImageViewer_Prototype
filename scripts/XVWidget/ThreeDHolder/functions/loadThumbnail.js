goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.loadThumbnail');

ThreeDHolder.prototype.loadThumbnail = function (droppable, viewPlane) {
    this.currDroppable = droppable;
    
    var m = this.Viewer.Menu;
    var file = droppable['scanData']['filePath'];
    var filetype = this.SlicerParser.getFileObjectType(file);
    
    //----------------------------------
    // SET VIEW PLANE MENU
    //----------------------------------
    
    // if slicer, show 3D plane only
    if (filetype == 'slicer') {
        this.currViewPlane = '3D';
        this.Viewer.ViewPlaneMenu.activateIcon('3D', true);
        this.changeViewManyToOne(this.Viewer, '3D');
    }
    
    // if not slicer, show all planes only if this is the first object,
    // otherwise keep view pane the same
    else if (this.currentObjects.length == 0) {
        this.currViewPlane = "All";
        this.Viewer.ViewPlaneMenu.activateIcon('All', true);
    }
    
    
    //----------------------------------
    // ADD OBJECT TO RENDERER(S)
    //----------------------------------
    
    // we're opening a whole slicer scene
    if (filetype == 'slicer') {
        this.openSlicerScene(file, droppable);
    }
    
    
    // we're just opening a single file
    else {
        
        // if object has already been loaded, don't recreate it, just reload it
        var droppedObj = this.getObjFromList(file);
        if (droppedObj) {
            this.reloadObj(droppedObj, filetype);
        }
        
        // object has not been created yet, let's create it and load it
        else {
            var newObj = this.addObject(file);
            
            if (filetype == 'volume') this.setOnShowtime(newObj);
            else this.setOnShowtime();
        }
    }
    
    // Run any callbacks once everything is loaded
    utils.array.forEach(this.onloadCallbacks, function(callback) {
        callback(this.widget);
    })

};
goog.exportProperty(ThreeDHolder.prototype, 'loadThumbnail', ThreeDHolder.prototype.loadThumbnail);

