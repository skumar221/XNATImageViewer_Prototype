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

    // if we want the background to be the purple...
//    this.PlaneHolder3.widget.style.background = '#cce';
    
    
    //----------------------------------
    // PARSE MRML FILE
    //----------------------------------
    
    // load MRML file
    var mrml = this.SlicerParser.loadXMLDoc(file);
    
    // get specific scene
    var scene = this.SlicerParser.extractScene(mrml, droppable['scanData']['sceneName']);
    
    // extract info about objects to load
    var objects = [];
    objects = objects.concat(this.SlicerParser.extractFileInfo(scene, 'Volume', 'VolumeArchetypeStorage'));
    objects = objects.concat(this.SlicerParser.extractFileInfo(scene, 'Model', 'ModelStorage'));
    objects = objects.concat(this.SlicerParser.extractFileInfo(scene, 'FiberBundle', 'FiberBundleStorage'));
    
    
    
    //----------------------------------
    // CREATE OBJECTS AND ADD TO VIEWER
    //----------------------------------
    
    // shorten filepath to exclude the mrml file -- now it is path to scene directory
    file = droppable['scanData']['filePath'].slice(0, file.lastIndexOf('/')) + '/';
    
    // use extracted info to make objects, load each into viewer
    var selectedVolume;
    utils.array.forEach(objects, function(o) {
        var obj = that.addObject(file + o['file'], o['attributes']);
        
        // if it's actually the selected volume, choose that
        if (o['isSelectedVolume']) {
            selectedVolume = obj;
        }
        
        // if there's a colortable, choose that if there isn't a selection
        if (!selectedVolume && o['attributes']['colorTable']) {
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
    var radiobuttons = goog.dom.getElementsByClass('Checkbox', this.Viewer.Menu2D.widget);
    utils.array.forEach(radiobuttons, function(b) {
        var droppedFile;
        if (selectedVolume.file[0].length > 1) // it's dicom
            droppedFile = selectedVolume.file[0];
        else
            droppedFile = selectedVolume.file;
        
        if (b.getAttribute('file') === droppedFile) {
            b.checked = 'checked';
        }
    });
    
    // load the selected volume into the 2D renderers
    this.setOnShowtime(selectedVolume);
    
    
    
    //----------------------------------
    // ADD ANNOTATIONS AND SET CAMERA
    //----------------------------------
    
    // access each annotation component and load into viewer
    var annotations = this.SlicerParser.extractAnnotations(scene);
    this.addAnnotations(annotations);
    
    // set up camera
    var cameraInfo = this.SlicerParser.extractCamera(scene);
    var cameraPosition = cameraInfo[0];
    var cameraViewUp = cameraInfo[1];
    this.PlaneHolder3.Renderer.camera.position = cameraPosition;
    this.PlaneHolder3.Renderer.camera.up = cameraViewUp;
    
}
goog.exportProperty(ThreeDHolder.prototype, 'openSlicerScene', ThreeDHolder.prototype.openSlicerScene);

