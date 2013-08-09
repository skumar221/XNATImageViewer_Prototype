// include all X-classes used -- only required when using xtk-deps.js
goog.require('X.volume');
goog.require('X.mesh');
goog.require('X.fibers');
goog.require('X.sphere');

goog.require('SlicerParser');
goog.provide('SlicerParser.getFileExt');
goog.provide('SlicerParser.getXTKObjName');
goog.provide('SlicerParser.isVolume');
goog.provide('SlicerParser.getFileObjectType');
goog.provide('SlicerParser.createXObject');


/** 
 * Returns file extension.
 * @param {String} file Filename / filepath
 * @return {String} Extension of file in all lowercase
 */
SlicerParser.prototype.getFileExt = function(file) {
    if (file[0].length > 1) file = file[0];
    
    // extract all letters following last period
    var ext = file.slice(file.lastIndexOf(".") + 1);
    // .nii.gz files will be wrongly stripped to .gz, check and correct for it
    if (ext == "gz") ext = "nii." + ext;
    return ext.toLowerCase();
}
goog.exportProperty(SlicerParser.prototype, 'getFileExt', SlicerParser.prototype.getFileExt);





/**
 * Returns XTK object (mesh, volume, ...) to be created, as determined by
 * file extension. https://github.com/xtk/X/wiki/X%3AFileformats
 * @param {String} ext Extension of file, all lowercase
 * @return {Object} New X object
 */
SlicerParser.prototype.getXTKObjName = function(ext) {
    var obj;
    switch(ext) {
        // surface models / mesh files
        case ("stl"):
        case ("vtk"):
        case ("obj"):
        case ("fsm"):
        case ("inflated"):
        case ("smoothwm"):
        case ("pial"):
        case ("orig"):
            obj = new X.mesh();
            break;
        
        // DICOM / volume files
        case ("nrrd"):
        case ("nii"):
        case ("nii.gz"):
        case ("mgh"):
        case ("mgz"):
        case ("dicom"):
        case ("dcm"):
            obj = new X.volume();
            break;
        
        // tractography files
        case ("trk"):
            obj = new X.fibers();
            break;
        /*
        // scalar overlay files
        case ("crv"):
        case ("label"):
            obj = new X. ...;
            break;
        */
        default:
            console.log("haven't added support for ." + ext + " files yet");
            break;
    }
    return obj;
};
goog.exportProperty(SlicerParser.prototype, 'getXTKObjName', SlicerParser.prototype.getXTKObjName);




/**
 * Returns T iff file extension is associated with volume object.
 * @param {String} file Filename / filepath
 * @return {boolean} T iff file ext = volume object
 */
SlicerParser.prototype.isVolume = function(file) {
    var ext = this.getFileExt(file);
    var volumeExts = ['nrrd', 'nii', 'nii.gz', 'mgh', 'mgz', 'dicom', 'dcm'];
    
    var isVol = false;
    for (var i=0; i < volumeExts.length; ++i) {
        if (volumeExts[i] == ext) {
            isVol = true;
            break;
        }
    }
    
    return isVol;
};
goog.exportProperty(SlicerParser.prototype, 'isVolume', SlicerParser.prototype.isVolume);




/**
 * Returns the type of the object associated with the given file type. Will be
 * either 'volume', 'mesh', or 'fiber'.
 * @param {String} file Filename / filepath
 * @return {String} Type of object
 */

SlicerParser.prototype.getFileObjectType = function(file) {
    // annotations (spheres) won't have files
    if (!file) return 'sphere';
    
    var ext = this.getFileExt(file);
    
    if (ext == 'mrml') return 'slicer';
    if (ext == 'trk') return 'fiber';
    if (this.isVolume(file)) return 'volume';
    else return 'mesh';
}
goog.exportProperty(SlicerParser.prototype, 'getFileObjectType', SlicerParser.prototype.getFileObjectType);



/**
 * Creates and returns a new X object (object depends on file type).
 * @param {string} file File name or path
 * @return {Object} X object
 */
SlicerParser.prototype.createXObject = function(file) {
	var ext = this.getFileExt(file);
    obj = this.getXTKObjName(ext);
    
    // Here we set the object's file. For DICOM data, all of the files must be
    // set as an array. All of the files should be read into the array 'dicomFiles'
    
    // associate file 
    if (ext == "dcm" || ext == "dicom") {
        var dicomFiles = [];
        
        // REST CALL TODO
        // set dicomFiles to contain all of the .dcm files from the folder
        
        // from here...
        var numFiles = 160;
        for (var i=1; i <= numFiles; ++i) {
            dicomFiles.push(i);
        }
        // ...until here is a workaround while we're outside of XNAT.
        
        obj.file = dicomFiles.sort().map(function(obj) {
            return file.slice(0, -5) + obj + ".dcm";
            
            // refer to http://jsfiddle.net/gh/get/toolkit/edge/xtk/lessons/tree/master/15/#run .
            // when making REST calls, use the following line instead:
            // return obj;  // (I think)
        });
    } else {
        obj.file = file;
    }
    
    return obj;
}
goog.exportProperty(SlicerParser.prototype, 'createXObject', SlicerParser.prototype.createXObject);
