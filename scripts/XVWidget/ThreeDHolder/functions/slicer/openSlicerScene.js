
ThreeDHolder.prototype.openSlicerScene = function(file, droppable) {
    var that = this;
    var selectedVolumeFile;
    
    // load MRML file
    var mrml = loadXMLDoc(file);
    
    // get specific scene
    var scene = extractScene(mrml, droppable.scanData.sceneName);
    
    // extract info about objects to load
    var objects = [];
    objects = objects.concat(extractFileInfo(scene, 'Volume', 'VolumeArchetypeStorage'));
    objects = objects.concat(extractFileInfo(scene, 'Model', 'ModelStorage'));
    objects = objects.concat(extractFileInfo(scene, 'FiberBundle', 'FiberBundleStorage'));
    
    // shorten filepath to exclude the mrml file -- now it is path to scene directory
    file = droppable.scanData.filePath.slice(0, file.lastIndexOf('/')) + '/';
    
    // use extracted info to make objects
    utils.array.forEach(objects, function(o) {
        that.addObject(file + o['file'], o['attributes']);
        if (o['isSelectedVolume']) selectedVolumeFile = file + o['file'];
    });
    
    // access each annotation component
    var annotations = extractAnnotations(scene);
    this.addAnnotations(annotations);
    
    // set up camera
    var cameraPosition = extractCamera(scene);
    this.PlaneHolder3.Renderer.camera.position = cameraPosition;
}

