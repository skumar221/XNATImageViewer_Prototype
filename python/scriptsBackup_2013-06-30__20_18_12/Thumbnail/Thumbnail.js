
//*******************************************************
//  Init
//
//*******************************************************


goog.require('goog.fx.DragDrop');
goog.require('goog.fx.DragDropGroup');
goog.require('goog.array');
goog.require(GLOBALS.classNames.XVWidget);



goog.provide(GLOBALS.classNames.Thumbnail);



/**
 * @constructor
 * @extends {XVWidget}
 */
Thumbnail = function (scanData, args) {
	
	var that = this;

	XVWidget.call(this, args);
	goog.fx.DragDrop.call(this, this.widget, undefined);

	
	
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
	this.ThumbnailImage = new Image();
	this.ThumbnailImage.src = this.scanData.sagittalPaths[Math.round(this.scanData.sagittalPaths.length/2)]; 

	
	
	//--------------------------------
	// THUMBNAIL CANVAS
	//--------------------------------
	/**
	* @type {Canvas}
	* @protected
	*/	
	this.ThumbnailCanvas = this.makeThumbnailCanvas("ThumbCanvas");

	
	
	
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

	//--------------------------------
	// TEXT ELEMENT
	//--------------------------------
	/**
	* @type {Element}
	* @protected
	*/	
	this.TextElement = utils.dom.makeElement("div", this.widget, "TextElement", {
		position: "absolute",
		height: this.args.ThumbnailImageCSS.height,
		width: this.args.ThumbnailImageCSS.width,
		top: GLOBALS.ThumbnailImageMarginX*1,
		left: this.args.ThumbnailImageCSS.width + GLOBALS.ThumbnailImageMarginX*2,
		fontSize: 11,		
	    fontFamily: 'Helvetica,"Helvetica neue", Arial, sans-serif'
	});
	utils.dom.addClass(this.ThumbnailCanvas, GLOBALS.classNames.ThumbnailCanvas);

	this.ThumbnailCanvas.metaText = [];
	this.ThumbnailCanvas.metaText[0] = utils.convert.toInt(this.scanData.sessionInfo["Scan"].value);
	this.ThumbnailCanvas.metaText[1] = this.scanData.sessionInfo["type"].value.toString().toLowerCase();
	this.ThumbnailCanvas.metaText[2] = this.scanData["sagittalPaths"].length.toString().toLowerCase();
	
	
	this.TextElement.innerHTML += "<b><font size = '3'>" + this.ThumbnailCanvas.metaText[0]  + "</font></b><br>";
	this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[1]  + "<br>";
	this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[2]  + " frames<br>";

	this.addHoverMethods();

	
		

	
	
	// Once the image lods, we want to make sure it is also the draggable image
	// and that it's draw on the Thumbnail canvas.

	this.ThumbnailImage.onload = function () {		
		if (that.ThumbnailCanvas)
		
			that.ThumbnailCanvas.getContext("2d").drawImage(
				 that.ThumbnailImage, 0, 0, 
				 that.args.ThumbnailImageCSS.width, 
				 that.args.ThumbnailImageCSS.height
			);
		
		else {
			utils.dom.debug("No thumb canvas")
		}
		
		if (args['onloadCallbacks']) {
			for (var i=0, len = args['onloadCallbacks'].length; i < len; i++) {
				args['onloadCallbacks'][i]();	
			}
		}
	}

}
goog.inherits(Thumbnail, XVWidget);
goog.inherits(Thumbnail, goog.fx.DragDrop);


/**
* @type {function(boolean)}
*/
Thumbnail.prototype.setActive = function(active) {
	
	var that = this;
	var bgColor = (active) ? that.args.bgHighlight : that.args.bgDefault;	
	var nodes = goog.dom.getElementsByClass(that.widget.id);
	
	
	utils.array.forEach(nodes, function(node) { 
		node.isActive = active;
		utils.css.setCSS(node, {
			backgroundColor: bgColor,
		})		
	})


	this.isActive = function () {
		return active;
	}		
}


/**
* @type {function(element)}
* @protected
*/
Thumbnail.prototype.createDragElement = function(srcElt) {

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
* @type {function(string)}
* @protected
*/
Thumbnail.prototype.pathMolder = function (path) {	
	
	splitStrs = path.split("testscans");
	return splitStrs[1];
}



//*****************************************
// THUMB CANVASES
//*****************************************
/**
* @type {function()}
* @protected
*/
Thumbnail.prototype.makeThumbnailCanvas = function (idAppend) {
	
	var that = this;
	
	var elt = utils.dom.makeElement("canvas", this.widget, idAppend, utils.dom.mergeArgs(this.args.ThumbnailImageCSS,{
		top: GLOBALS.ThumbnailImageMarginY,
		left: GLOBALS.ThumbnailImageMarginX,
		 //color: "rgb(255,255,255)"
	}));

	elt.width = this.args.ThumbnailImageCSS.width;
	elt.height = this.args.ThumbnailImageCSS.height;
	
	// Might want to put the progress indicator here.
	return elt;
}


/**
* @type {function()}
* @protected
*/
Thumbnail.prototype.addHoverMethods = function () {
	
	var that = this;

	//
	// SET HOVER METHOD
	//			

	
	
	// set defaults
	function setDefault() {
		
		if (!that.widget.isActive) {
			utils.css.setCSS(that.widget, {
				backgroundColor: that.args.bgDefault,
			})
		}
		
		utils.css.setCSS(that.TextElement, {
			color: that.args.textDefault,
		})	
		
		utils.css.setCSS(that.ThumbnailCanvas, {
			borderColor: that.args.textDefault,
		})			
	}
	setDefault();
	
	function highlight() {

		utils.css.setCSS(that.widget, {
			backgroundColor: that.args.bgHighlight,
		})			


		utils.css.setCSS(that.TextElement, {
			color: that.args.textHighlight,
		})	
		
		utils.css.setCSS(that.ThumbnailCanvas, {
			borderColor: that.args.textHighlight,
		})			
	}
	
	// hover function
	function applyHover(hover) {
		if (hover) {
			highlight();
		}   
		else {
			setDefault();
		}
	}

	// mouseover
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOVER, function() {applyHover(true) });
	                   
	// mouseout
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOUT, function() {applyHover(false) });	
	
}




/**
* @type {Object}
* @protected
*/
Thumbnail.prototype.defaultArgs = {
	className: GLOBALS.classNames.ScanThumbnail,
	parent: document.body,
	draggableParent: document.body,
	returnAnimMax: 300,
	activated: false,
	bgDefault : "rgb(0,0,0)",
	bgHighlight: "rgb(50, 50, 50)",
	textDefault : "rgb(120,120,120)",
	textHighlight: "rgb(230, 230, 230)",
	widgetCSS: {
		position: "absolute",
		width: GLOBALS.ThumbnailWidgetWidth,
		height: GLOBALS.ThumbnailWidgetHeight,
		top: 0,
		left: 0,			 
	  	"cursor": "pointer",
	  	backgroundColor: "rgb(244,0,0)"
	},
	ThumbnailImageCSS: {
		position: "absolute",
		width: GLOBALS.ThumbnailImageWidth - 2,
		height: GLOBALS.ThumbnailImageHeight - 2,
		top: 0,
		left: 0,	
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "border" : "solid",
		"border-color": "rgb(120,120,120)",
		//"color": "rgba(0,0,0,1)",
	  	//"background-color" : "rgba(120,31,60,1)",
	  	"border-width" : 1,
	  	"border-radius": 0,	 
	  	"cursor": "pointer"
	}	
}


/**
* @type {function(string)}
*/
Thumbnail.prototype.getFrameList = function (type) {

	return (type === "sagittal") ? this.scanData.sagittalPaths : (type === "transverse") ? this.scanData.axialPaths : this.scanData.coronalPaths;
}




//*****************************************
// WINDOW RESIZING
//*****************************************
Thumbnail.prototype.updateCSS = function () {

}



//*****************************************
// activated callaback
//*****************************************
/**
* @type {function(function)}
*/
Thumbnail.prototype.addActivatedCallback = function (callback) {
	if(!this.activatedCallbacks)
		this.activatedCallbacks = [];
	
	this.activatedCallbacks.push(callback)
}



