
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
Thumbnail = function (args) {
	
	var that = this;

	XVWidget.call(this, utils.dom.mergeArgs(Thumbnail.prototype.defaultArgs, args));
	goog.fx.DragDrop.call(this, this.widget, undefined);

	
	
	//--------------------------------
	// THUMBNAIL IMAGE (goes Into Canvas)
	//--------------------------------	
	/**
	* @type {Image}
	* @protected
	*/	
	this.ThumbnailImage = new Image();
	
	
	//--------------------------------
	// THUMBNAIL CANVAS
	//--------------------------------
	/**
	* @type {Canvas}
	* @protected
	*/	
	this.ThumbnailCanvas = this.makeThumbnailCanvas("ThumbCanvas");

	
	
	



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
	var nodes = goog.dom.getElementsByClass(that.widget.className);
	
	
	utils.array.forEach(nodes, function(node) { 
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
		
		if (!that.isActive) {
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
	
	
	setDefault();
	
}




/**
* @type {Object}
* @protected
*/
Thumbnail.prototype.defaultArgs = {
	className: GLOBALS.classNames.Thumbnail,
	parent: document.body,
	draggableParent: document.body,
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




