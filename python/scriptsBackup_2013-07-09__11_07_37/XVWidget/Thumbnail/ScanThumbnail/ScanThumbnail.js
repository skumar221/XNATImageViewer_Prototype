
//*******************************************************
//  Init
//
//*******************************************************

//goog.require('goog.array');
goog.require('Thumbnail');



goog.provide('ScanThumbnail');



/**
 * @constructor
 * @extends {Thumbnail}
 */
ScanThumbnail = function (scanData, args) {
	


	Thumbnail.call(this, utils.dom.mergeArgs(ScanThumbnail.prototype.defaultArgs, args));

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

	this.ThumbnailImage.src = this.scanData.sagittalPaths[Math.round(this.scanData.sagittalPaths.length/2)]; 
	
	
	
	//--------------------------------
	// FRAMES
	//--------------------------------
	this.frames = {};

	/**
	* @type {function(string)}
	*/		
	function populateFramesObject(viewPlane) {
		
		var pathNames = that.getFrameList(viewPlane);

		that[viewPlane + "FrameCount"] = pathNames.length;
		that[viewPlane + "LoadCount"] = 0;
		
		utils.array.forEach(pathNames, function(pathName){			
			that.frames[that.pathMolder(pathName)] = {
				'viewPlane': viewPlane, 
				'src' : pathName
			}
		}); 

	}

	this.getFrames = function (args1) {

		var isObject = (typeof args1 === 'object');
		var isString = (typeof args1 === 'string');
		
		if (isString) {
			var viewPlane = args1;
			var returnArr = [];	

			for (var i in that.frames) {
				if (that.frames[i]['viewPlane'] === viewPlane) {
					returnArr.push(that.frames[i])					
				}
			}	

			return returnArr;			
		}		
		
		else if (isObject) {
			
			var viewPlane = args1["viewPlane"];
			var isFilter = args1['filter'] ? args1['filter'] : false;
			var returnArr = [];
	
			
			for (var i in that.frames) {
				if (that.frames[i]['viewPlane'] === viewPlane) {
					
					
					if (isFilter && that.frames[i][args1['filter']]) {
						//utils.dom.debug(that.frames[i]['img'])
						returnArr.push(that.frames[i][args1['filter']]);	
					}

				}
			}
			return returnArr;			
		}
		


	}

	populateFramesObject("sagittal");
	populateFramesObject("coronal");
	populateFramesObject("transverse");


	this.ThumbnailCanvas.metaText = [];
	this.ThumbnailCanvas.metaText[0] = utils.convert.toInt(this.scanData.sessionInfo["Scan"].value);
	this.ThumbnailCanvas.metaText[1] = this.scanData.sessionInfo["type"].value.toString().toLowerCase();
	this.ThumbnailCanvas.metaText[2] = this.scanData["sagittalPaths"].length.toString().toLowerCase();
	
	
	this.TextElement.innerHTML += "<b><font size = '3'>" + this.ThumbnailCanvas.metaText[0]  + "</font></b><br>";
	this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[1]  + "<br>";
	this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[2]  + " frames<br>";

	this.addHoverMethods();


	
		


}
goog.inherits(ScanThumbnail, Thumbnail);






/**
* @type {function(element)}
* @protected
*/
ScanThumbnail.prototype.createDragElement = function(srcElt) {

	var parent, clonedElt, srcCanv, clonedCanv, context;

	parent = goog.dom.getAncestorByClass(srcElt, this.args.className);
	//
	// Create draggable ghost by cloning the parent
	//	
	clonedElt = parent.cloneNode(true);	


	
	//
	// Get canvases for reference
	//
	srcCanv = goog.dom.getElementByClass(GLOBALS.classNames.ThumbnailCanvas, parent);
	clonedCanv = goog.dom.getElementByClass(GLOBALS.classNames.ThumbnailCanvas, clonedElt);


	
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
ScanThumbnail.prototype.defaultArgs = {
	className: GLOBALS.classNames.ScanThumbnail
}


/**
* @type {function(string)}
*/
ScanThumbnail.prototype.getFrameList = function (type) {

	return (type === "sagittal") ? this.scanData.sagittalPaths : (type === "transverse") ? this.scanData.axialPaths : this.scanData.coronalPaths;
}




//*****************************************
// WINDOW RESIZING
//*****************************************
ScanThumbnail.prototype.updateCSS = function () {

}



//*****************************************
// activated callaback
//*****************************************
/**
* @type {function(function)}
*/
ScanThumbnail.prototype.addActivatedCallback = function (callback) {
	if(!this.activatedCallbacks)
		this.activatedCallbacks = [];
	
	this.activatedCallbacks.push(callback)
}


/**
* @type {function(string)}
*/
Thumbnail.prototype.getFrameList = function (type) {

	return (type === "sagittal") ? this.scanData.sagittalPaths : (type === "transverse") ? this.scanData.axialPaths : this.scanData.coronalPaths;
}

