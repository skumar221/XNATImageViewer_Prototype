defaultArgs_ScanThumbnail = {
	id: "ScanThumbnail",
	parent: document.body,
	draggableParent: document.body,
	returnAnimMax: 300,
	activated: false,
	widgetCSS: {
		position: "absolute",
		width: GLOBALS.ThumbnailWidgetWidth,
		height: GLOBALS.ThumbnailWidgetHeight,
		top: 0,
		left: 0,			
	    "border" : "solid",
		"border-color": "rgba(50,50,50,1)",
		"color": "rgba(0,0,0,1)",
	  	//"background-color" : "rgba(120,31,60,1)",
	  	"border-width" : 1,
	  	"border-radius": 0,	 
	  	"cursor": "pointer"
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
		"border-color": "rgba(255,255,255,1)",
		"color": "rgba(0,0,0,1)",
	  	//"background-color" : "rgba(120,31,60,1)",
	  	"border-width" : 1,
	  	"border-radius": 0,	 
	  	"cursor": "pointer"
	}	
}




//******************************************************
//  Init
//
//******************************************************
function ScanThumbnail(scanData, args) {
	var that = this;
	utils.oo.init(this, defaultArgs_ScanThumbnail, args, function () {});


	this.mouseDown = false;

	utils.css.setCSS(this.widget, utils.dom.mergeArgs(defaultArgs_ScanThumbnail.widgetCSS, args.widgetCSS))
	
	
	
	//--------------------------------
	// T
	//--------------------------------
	// AJAX QUERY WOULD BE HERE
	this.scanData = scanData;	
	
	
	
	//--------------------------------
	// THUMBNAIL IMAGE (goes Into Canvas)
	//--------------------------------	
	this.ThumbnailImage = new Image();
	this.ThumbnailImage.src = this.scanData.sagittalPaths[Math.round(this.scanData.sagittalPaths.length/2)]; 

	
	
	//--------------------------------
	// THUMBNAIL CANVAS
	//--------------------------------
	this.ThumbnailCanvas = this.makeThumbnailCanvas("ThumbCanvas");
	this.cloneable = this.ThumbnailCanvas; // for __Droppable__.js
	
	
	
	//--------------------------------
	// FRAMES
	//--------------------------------
	this.sagittalFrames = this.getFrameList("sagittal"); 
	this.coronalFrames = this.getFrameList("coronal");
	this.axialFrames = this.getFrameList("axial");
	
	
	
	//--------------------------------
	// TEXT ELEMENT
	//--------------------------------
	var thumbPos = $(this.ThumbnailCanvas).position()
	var textTop = thumbPos.top;
	var textLeft = thumbPos.left + $(this.ThumbnailCanvas).width() + GLOBALS.ThumbnailImageMarginX;
	
	
	this.TextElement = utils.dom.makeElement("div", this.widget, "TextElement", {
		position: "absolute",
		height: this.args.ThumbnailImageCSS.height,
		width: this.args.ThumbnailImageCSS.width,
		top: textTop,
		left: textLeft,
		color: "rgba(255,255,255,1)",
		fontSize: 11,		
	    fontFamily: 'Helvetica,"Helvetica neue", Arial, sans-serif',	
	});

	this.TextElement.innerHTML += "<b><font size = '3'>" + utils.convert.int(this.scanData.sessionInfo["Scan"].value) + "</font></b><br>";
	this.TextElement.innerHTML += this.scanData.sessionInfo["type"].value.toString().toLowerCase() + "<br>";
	this.TextElement.innerHTML += (this.scanData["sagittalPaths"].length.toString().toLowerCase() + " frames<br>");

	

	
	this.addHoverMethods();
	this.addDraggableMethods();

	
	/*
	__Droppable__(this);
	
	
	//--------------------------------
	// DOUBLE CLICK
	//--------------------------------
	$(this.draggable).dblclick(function () {
		if (that.dropZones) {
			for (var i=0; i<that.dropZones.length; i++) {
	
					if (that.dropZones[i].frames.length == 0) {
						console.log("1")
						that.dropZones[i].loadDroppable(that);
						that.activate(that.dropZones[i].args.id);
						return;
					}		
			}			
		}
	})
	
	

	*/
	
	// Once the image lods, we want to make sure it is also the draggable image
	// and that it's draw on the Thumbnail canvas.

	$(this.ThumbnailImage).load(function () {		
		if (that.ThumbnailCanvas)
		
			that.ThumbnailCanvas.getContext("2d").drawImage(
				 that.ThumbnailImage, 0, 0, 
				 that.args.ThumbnailImageCSS.width, 
				 that.args.ThumbnailImageCSS.height
			);
		
		else
			console.log("No thumb canvas")
	});

}




//****************************************
// THUMB CANVASES
//****************************************
ScanThumbnail.prototype.makeThumbnailCanvas = function (idAppend) {
	
	var that = this;
	
	var elt = utils.dom.makeElement("canvas", this.widget, idAppend, utils.dom.mergeArgs(this.args.ThumbnailImageCSS,{
		top: GLOBALS.ThumbnailImageMarginY,
		left: GLOBALS.ThumbnailImageMarginX,
		 color: "rgb(255,255,255)"
	}));

	elt.width = this.args.ThumbnailImageCSS.width;
	elt.height = this.args.ThumbnailImageCSS.height;
	
	// Might want to put the progress indicator here.
	return elt;
}









ScanThumbnail.prototype.addHoverMethods = function () {
	
	var that = this;
	var inactiveFade = .6;
	
	
	//--------------------------
	// Setup procedure, defines the mouseenters
	//--------------------------		
	
	
	$(this.widget).bind('mouseenter.browse', function () {

		$(that.widget).stop().animate({
			
			opacity: 1,
			borderColor: "rgb(255,255,255)"
			
		}, 0);
		
		$(that.ThumbnailCanvas).stop().animate({

			borderColor: "rgb(155,155,155)"
			
		}, 0);
	
	}).bind('mouseleave.browse', function(){
		
		$(that.widget).stop().animate({
			
			opacity: inactiveFade,
			borderColor: "rgb(0,0,0)"
			
		}, 0);

		$(that.ThumbnailCanvas).stop().animate({

			borderColor: "rgb(85,85,85)"
			
		}, 0);
		
	});
	
	$(this.widget).mouseleave();
	
}




//****************************************
// DEACTIVATE
//****************************************
ScanThumbnail.prototype.deactivate = function () { 
	//console.log("DEACTIVATING: " + this.args.id)
	
	var that = this;
	this.args.activated = false;
	
	
	//--------------------------
	// GENERIC BORDER HIGHLIGHT
	//--------------------------	
	borderHighlightOnHover(this.widget);
	
	
	//--------------------------
	// SHOW HOVERING METADATA
	//--------------------------
	$(this.widget).mouseenter(function () {
		that.hoverOn(that.args.animtime);
	}).mouseleave(function () {
		that.hoverOff(that.args.animtime);
	});	
	
	
	this.hoverOff(100);
}




//****************************************
// ACTIVATE
//****************************************
ScanThumbnail.prototype.activate = function (activeTarget) { 
	var that = this;
	this.args.activated = true;
	
	// Do the hover On
	this.hoverOn(0);
	
	
	// Unbind all hover existing methods
	$(this.widget).unbind('mouseenter').unbind('mouseleave');
	

	// Since we're unbinding everything we have to rebind
	// the generic hover (border highlighting)	
	borderHighlightOnHover(this.widget);
		
	// Callbacks	
	if (this.activatedCallbacks && this.activatedCallbacks.length > 0) {
		for (var i=0;i<this.activatedCallbacks.length;i++) {
			this.activatedCallbacks[i](that, {
				"activeTarget": activeTarget
			});
		}
	}
}




//****************************************
// FRAMES
//****************************************
ScanThumbnail.prototype.getFrameList = function (type) {
	
	return (type == "sagittal") ? this.scanData.sagittalPaths : (type == "axial") ? this.scanData.axialPaths : this.scanData.coronalPaths;
}




//****************************************
// WINDOW RESIZING
//****************************************
ScanThumbnail.prototype.updateCSS = function () {

}



//****************************************
// activated callaback
//****************************************
ScanThumbnail.prototype.addActivatedCallback = function (callback) {
	if(!this.activatedCallbacks)
		this.activatedCallbacks = [];
	
	this.activatedCallbacks.push(callback)
}




