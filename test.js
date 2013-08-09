goog.require('X');
goog.require('X.volume');
goog.require('X.mesh');
goog.require('X.fibers');
goog.require('X.sphere');

window.onload = function() {

  //
  // try to create the 3D renderer
  //
  _webGLFriendly = true;
  try {
    // try to create and initialize a 3D renderer
    threeD = new X.renderer3D();
    threeD.container = '3d';
    threeD.init();
  } catch (Exception) {
    
    // no webgl on this machine
    _webGLFriendly = false;
    
  }
  
  //
  // create the 2D renderers
  // .. for the X orientation
  sliceX = new X.renderer2D();
  sliceX.container = 'sliceX';
  sliceX.orientation = 'X';
  sliceX.init();
  // .. for Y
  var sliceY = new X.renderer2D();
  sliceY.container = 'sliceY';
  sliceY.orientation = 'Y';
  sliceY.init();
  // .. and for Z
  var sliceZ = new X.renderer2D();
  sliceZ.container = 'sliceZ';
  sliceZ.orientation = 'Z';
  sliceZ.init();
  

  //
  // THE VOLUME DATA
  //
  // create a X.volume
  volume = new X.volume();
  // .. and attach the single-file dicom in .NRRD format
  // this works with gzip/gz/raw encoded NRRD files but XTK also supports other
  // formats like MGH/MGZ
  volume.file = 'http://x.babymri.org/?vol.nrrd';
  // we also attach a label map to show segmentations on a slice-by-slice base
  volume.labelmap.file = 'http://x.babymri.org/?seg.nrrd';
  // .. and use a color table to map the label map values to colors
  volume.labelmap.colortable.file = 'http://x.babymri.org/?genericanatomy.txt';
  
  // add the volume in the main renderer
  // we choose the sliceX here, since this should work also on
  // non-webGL-friendly devices like Safari on iOS
  sliceX.add(volume);
  
  // start the loading/rendering
  sliceX.render();
  

  //
  // THE GUI
  //
  // the onShowtime method gets executed after all files were fully loaded and
  // just before the first rendering attempt
  sliceX.onShowtime = function() {

    //
    // add the volume to the other 3 renderers
    //
    sliceY.add(volume);
    sliceY.render();
    sliceZ.add(volume);
    sliceZ.render();
    
    if (_webGLFriendly) {
      threeD.add(volume);
      threeD.render();
    }
    
    
    
  };
  
};
