
//*******************************************************
//  Init
//
//*******************************************************


//goog.require('goog.fx.DragDrop');
//goog.require('goog.fx.DragDropGroup');
//goog.require('goog.array');
goog.require('XVWidget');
goog.require('XVGlobals');



goog.provide('Thumbnail');

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
	this.ThumbnailImage.className = 'ThumbnailImage';
	
	
	
	
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
		top: XVGlobals.ThumbnailImageMarginX*1,
		left: this.args.ThumbnailImageCSS.width + XVGlobals.ThumbnailImageMarginX*2,
		fontSize: 11,		
	    fontFamily: 'Helvetica,"Helvetica neue", Arial, sans-serif'
	});
	utils.dom.addClass(this.ThumbnailCanvas, XVGlobals.classNames.ThumbnailCanvas);


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
goog.exportSymbol('Thumbnail', Thumbnail);


/**
* @type {function(boolean)}
*/
Thumbnail.prototype.setActive = function(active) {
	
	/**
	 *@private 
	 */
	this.isActive_ = active;
	this.hoverMethods.setDefault();	
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
* @type {function(string)}
* @protected
*/
Thumbnail.prototype.pathMolder = function (path) {	
	
	splitStrs = path.split("demoscans");
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
		top: XVGlobals.ThumbnailImageMarginY,
		left: XVGlobals.ThumbnailImageMarginX
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
	
	if (!this.hoverMethods) { this.hoverMethods = /**@private*/{}};

	//
	// SET HOVER METHOD
	//			

	
	
	// set defaults
	this.hoverMethods.setDefault = function() {
		
		var hText = (that.isActive_) ? that.args.textHighlight : that.args.textDefault;
		utils.css.setCSS(that.TextElement, {
			color: hText
		})		

		
		utils.css.setCSS(that.ThumbnailCanvas, {
			borderColor: hText
		})	
		
		utils.css.setCSS(that.widget, {
			backgroundColor: that.args.bgDefault
		})			
	}
	
	
	
	this.hoverMethods.highlight = function() {

		utils.css.setCSS(that.widget, {
			backgroundColor: that.args.bgHighlight
		})			


		utils.css.setCSS(that.TextElement, {
			color: that.args.textHighlight
		})	
		
		utils.css.setCSS(that.ThumbnailCanvas, {
			borderColor: that.args.textHighlight
		})			
	}
	
	// hover function
	this.hoverMethods.applyHover = function(hover) {
		if (hover) {
			that.hoverMethods.highlight();
		}   
		else {
			that.hoverMethods.setDefault();
		}
	}

	// mouseover
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOVER, function() {that.hoverMethods.applyHover(true) });
	                   
	// mouseout
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOUT, function() {that.hoverMethods.applyHover(false) });	
	
	
	that.hoverMethods.setDefault();
	
}




/**
* @type {Object}
* @protected
*/
Thumbnail.prototype.defaultArgs = {
	className: XVGlobals.classNames.Thumbnail,
	parent: document.body,
	draggableParent: document.body,
	activated: false,
	bgDefault : "rgb(0,0,0)",
	bgHighlight: "rgb(50, 50, 50)",
	textDefault : "rgb(120,120,120)",
	textHighlight: "rgb(230, 230, 230)",
	widgetCSS: {
		position: "absolute",
		width: XVGlobals.ThumbnailWidgetWidth,
		height: XVGlobals.ThumbnailWidgetHeight,
		top: 0,
		left: 0,			 
	  	"cursor": "pointer",
	  	backgroundColor: "rgb(0,0,0)"
	},
	ThumbnailImageCSS: {
		position: "absolute",
		width: XVGlobals.ThumbnailImageWidth - 2,
		height: XVGlobals.ThumbnailImageHeight - 2,
		top: 0,
		left: 0,	
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "border" : "solid",
		"border-color": "rgb(120,120,120)",
		//"color": "rgba(0,0,0,1)",
	  	//"background-color" : "rgba(120,31,60,1)",
	  	"borderWidth" : 1,
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




