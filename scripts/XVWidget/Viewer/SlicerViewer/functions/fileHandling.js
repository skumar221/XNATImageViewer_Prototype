// include all X-classes used -- only required when using xtk-deps.js
goog.require('X.volume');
goog.require('X.mesh');
goog.require('X.fibers');


/** 
 * Returns file extension.
 * @param {String} file Filename / filepath
 * @return {String} Extension of file in all lowercase
 */
function getFileExt(file) {
    if (file[0].length > 1) file = file[0];
    
    // extract all letters following last period
    var ext = file.slice(file.lastIndexOf(".") + 1, file.length);
    // .nii.gz files will be wrongly stripped to .gz, check and correct for it
    if (ext == "gz") ext = "nii." + ext;
    return ext.toLowerCase();
}

/**
 * Returns XTK object (mesh, volume, ...) to be created, as determined by
 * file extension. https://github.com/xtk/X/wiki/X%3AFileformats
 * @param {String} ext Extension of file, all lowercase
 * @return {Object} New X object
 */
function getXTKObjName(ext) {
    var obj;
    switch(ext) {
        // surface models / mesh files
        case ("stl"):       // tested - link supported, UNKNOWN local
        case ("vtk"):       // tested - link supported, not local supported
        case ("obj"):       // tested - UNKNOWN link, local supported
        case ("fsm"):       //    // freesurfer
        case ("inflated"):  //    // freesurfer
        case ("smoothwm"):  // tested - link supported // freesurfer
        case ("pial"):      //    // freesurfer
        case ("orig"):      //    // freesurfer
            obj = new X.mesh();
            break;
        
        // DICOM / volume files
        case ("nrrd"):      // tested - file supported
        case ("nii"):       // tested - file supported
        case ("nii.gz"):    // tested - failed: Uncaught Error: Unsupported NII data type: 4096 (xtk.js:370)
        case ("mgh"):       // tested - file supported
        case ("mgz"):       // tested - file supported
        case ("dicom"):     // 
        case ("dcm"):       // tested - file supported
            obj = new X.volume();
            break;
        
        // tractography files
        case ("trk"):       // tested - file supported
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

/**
 * Returns T iff file extension is associated with volume object.
 * @param {String} file Filename / filepath
 * @return {boolean} T iff file ext = volume object
 */
function isVolume(file) {
    var ext = getFileExt(file);
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

/**
 * Returns the type of the object associated with the given file type. Will be
 * either 'volume', 'mesh', or 'fiber'.
 * @param {String} file Filename / filepath
 * @return {String} Type of object
 */
function getFileObjectType(file) {
    var ext = getFileExt(file);
    
    if (ext == 'trk') return 'fiber';
    if (isVolume(file)) return 'volume';
    else return 'mesh';
}


/**
 * Creates and returns a new X object (object depends on file type).
 * @param {string} file File name or path
 * @return {Object} X object
 */
function createXObject(file) {
	var ext = getFileExt(file);
    obj = getXTKObjName(ext);
    
    // associate file 
    if (ext == "dcm" || ext == "dicom") {
        var dicomFiles = [];
        var numFiles = 160;     // TODO read this in at some point
        for (var i=1; i <= numFiles; ++i) {
//            var p;
//            if (i < 10) p = '00' + i; 
//            else if (i < 100) p = '0' + i;
//            else p = i;
            dicomFiles.push(i);
        }
        obj.file = dicomFiles.sort().map(function(obj) {
            return file.slice(0, -4) + obj + ".dcm";
        });
    } else {
        obj.file = file;
    }
    
    return obj;
}

