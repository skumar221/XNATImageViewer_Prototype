
//*******************************************************
//  Init
//*******************************************************

goog.require('goog.array');
goog.require('Thumbnail');

goog.provide('SlicerThumbnail');

/**
 * @constructor
 * @extends {Thumbnail}
 */
SlicerThumbnail = function (scanData, args) {
	
	Thumbnail.call(this, utils.dom.mergeArgs(SlicerThumbnail.prototype.defaultArgs, args));

	var that = this;
	
	//--------------------------------
	// T
	//--------------------------------
	// AJAX QUERY WOULD BE HERE
	this.scanData = scanData;	


	//--------------------------------
	// THUMBNAIL IMAGE (goes Into Canvas)
	//--------------------------------	
	/**
	* @type {Image}
	* @protected
	*/
//    if (this.scanData.filePath.slice(-3, this.scanData.filePath.length) === 'dcm')
//        this.ThumbnailImage.src = this.scanData.filePath.slice(0, -4) + '80.dcm';
    
    
    var file = this.scanData['filePath'];
    
    if (this.scanData['filePath'].split('slicer')[1])
        this.ThumbnailImage.src = file.slice(0, file.lastIndexOf('/')) + '/Data/' + this.scanData['sceneName'] + '.png';
    else
        this.ThumbnailImage.src = "./demoscans/3D/placeholder.jpg";

	this.ThumbnailCanvas.metaText = [];
	this.ThumbnailCanvas.metaText[0] = this.scanData['sessionInfo']["SessionID"]['value'];
	this.ThumbnailCanvas.metaText[1] = this.scanData['sessionInfo']["Format"]['value'].toString().toUpperCase();
    if (this.scanData['filePath'].split('/3D/')[1])
        this.ThumbnailCanvas.metaText[2] = this.scanData['filePath'].split('/3D/')[1];
	else
        this.ThumbnailCanvas.metaText[2] = this.scanData['filePath'];
        
	
	this.TextElement.innerHTML += "<b><font size = '3'>" + this.ThumbnailCanvas.metaText[0]  + "</font></b><br>";
	this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[1]  + "<br>";
    this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[2];

	this.addHoverMethods();

}
goog.inherits(SlicerThumbnail, Thumbnail);
goog.exportSymbol('SlicerThumbnail', SlicerThumbnail)


/**
* @type {function(element)}
* @protected
*/
SlicerThumbnail.prototype.createDragElement = function(srcElt) {

	var parent, clonedElt, srcCanv, clonedCanv, context;

	parent = goog.dom.getAncestorByClass(srcElt, this.args.className);
	//
	// Create draggable ghost by cloning the parent
	//	
	clonedElt = parent.cloneNode(true);	


	
	//
	// Get canvases for reference
	//
	srcCanv = goog.dom.getElementByClass(XVGlobals.classNames.ThumbnailCanvas, parent);
	clonedCanv = goog.dom.getElementByClass(XVGlobals.classNames.ThumbnailCanvas, clonedElt);


	
	//
	// Draw text on draggable ghost
	//
	context = clonedCanv.getContext("2d");
	context.drawImage(srcCanv, 0, 0);		  
  	clonedElt.style.opacity = .5;	
	clonedElt.className = "CLONE";
	clonedElt.id = "CLONE";
	
	goog.events.removeAll(clonedElt);
	
	return clonedElt;
}


/**
* @type {Object}
* @protected
*/
SlicerThumbnail.prototype.defaultArgs = {
	'className': XVGlobals.classNames.SlicerThumbnail
}

//*****************************************
// WINDOW RESIZING
//*****************************************
SlicerThumbnail.prototype.updateCSS = function () {

}

//*****************************************
// activated callaback
//*****************************************
/**
* @type {function(function)}
*/
SlicerThumbnail.prototype.addActivatedCallback = function (callback) {
	if(!this.activatedCallbacks)
		this.activatedCallbacks = [];
	
	this.activatedCallbacks.push(callback)
}

