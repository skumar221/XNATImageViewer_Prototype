goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.openSlicerScene');

/**
 * Takes a MRML file and the dropped Thumbnail. Creates an XML Doc from the file.
 * Extracts wanted scene from MRML file (gets scene name from dropped Thumbnail).
 * Extracts object information from scene, and creates all objects. Sets the
 * 2D renderers to display the correct volume (or the first loaded, if selected
 * is inaccessible). Adds annotations and sets camera position.
 */
ThreeDHolder.prototype.openSlicerScene = function(file, droppable) {
    var that = this;
    
    //----------------------------------
    // PARSE MRML FILE
    //----------------------------------
    
    // load MRML file
    var mrml = loadXMLDoc(file);
    
    // get specific scene
    var scene = extractScene(mrml, droppable['scanData']['sceneName']);
    
    // extract info about objects to load
    var objects = [];
    objects = objects.concat(extractFileInfo(scene, 'Volume', 'VolumeArchetypeStorage'));
    objects = objects.concat(extractFileInfo(scene, 'Model', 'ModelStorage'));
    objects = objects.concat(extractFileInfo(scene, 'FiberBundle', 'FiberBundleStorage'));
    
    
    
    //----------------------------------
    // CREATE OBJECTS AND ADD TO VIEWER
    //----------------------------------
    
    // shorten filepath to exclude the mrml file -- now it is path to scene directory
    file = droppable.scanData.filePath.slice(0, file.lastIndexOf('/')) + '/';
    
    // use extracted info to make objects, load each into viewer
    var selectedVolume;
    utils.array.forEach(objects, function(o) {
        var obj = that.addObject(file + o['file'], o['attributes']);
        
        // if it's actually the selected volume, choose that
        if (o['isSelectedVolume']) {
            selectedVolume = obj;
        }
        
        // if there's a colortable, choose that if there isn't a selection
        if (!selectedVolume && o['colorTable']) {
            console.log('picking the color table');
            selectedVolume = obj;
        }
    });
    
    
    
    //----------------------------------
    // SET SELECTED VOLUME
    //----------------------------------
    
    // if no selected volume, just pick the first
    if (!selectedVolume) {
        selectedVolume = that.getObjFromList(file + objects[0]['file']);
    }
    
    // also need to set radio buttons to match
    utils.array.forEach(this.objRadioPairs, function(pair) {
        if (pair[0] === selectedVolume) {
//            pair[0].visible = true;
            pair[1].checked = 'checked';
        }
    });
    
    // load the selected volume into the 2D renderers
    this.setOnShowtime(selectedVolume);
    
    
    
    //----------------------------------
    // PARSE MRML FILE
    //----------------------------------
    
    // access each annotation component and load into viewer
    var annotations = extractAnnotations(scene);
    this.addAnnotations(annotations);
    
    // set up camera
    var cameraPosition = extractCamera(scene);
    this.PlaneHolder3.Renderer.camera.position = cameraPosition;
    
}
goog.exportProperty(ThreeDHolder.prototype, 'openSlicerScene', ThreeDHolder.prototype.openSlicerScene);

