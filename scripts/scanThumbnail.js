defaultArgs_scanThumbnail = {
	id: "scanThumbnail",
	parent: document.body,
	draggableParent: document.body,
	returnAnimMax: 300,
	_css: {
		position: "absolute",
		width: 80,
		height: 80,
		top: 0,
		left: 0,
		"font-size": 12,		
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	    "border" : "solid",
		"border-color": "rgba(50,50,50,1)",
		"color": "rgba(0,0,0,1)",
	  	"background-color" : "rgba(120,31,60,1)",
	  	"border-width" : 1,
	  	"border-radius": 0,	 
	  	"cursor": "pointer"
	}	
}


function scanThumbnail(args){
	var that = this;
	__Init__(this, defaultArgs_scanThumbnail, args, function(){});


	//--------------------------------
	// MOUSE INTERACTIONS
	//--------------------------------
	this.mouseDown = false;
	this.setHoverMethods();
	
	
	//--------------------------------
	// THUMBNAIL IMAGE
	//--------------------------------
	// AJAX QUERY WOULD BE HERE
	// this.scanData = getXNATScanDataFromURL();TESTING_testData1;	
	this.scanData = TESTING_testData1;	
	
	//--------------------------------
	// THUMBNAIL IMAGE
	//--------------------------------	
	this.thumbImage = new Image();
	this.thumbImage.src = this.scanData.scanPaths[Math.round(this.scanData.scanPaths.length/2)]; 
	
	//--------------------------------
	// THUMBNAIL CANVAS
	//--------------------------------
	this.thumb = this.makeThumbnailCanvas("_thumb");
	this.cloneable = this.thumb; // for __Droppable__.js
	
	
	//--------------------------------
	// FRAMES
	//--------------------------------
	this.frames = this.getFrameList();

	__Droppable__(this);
	this.updateCSS();
}


//*********************************************
// THUMB CANVASES
//*********************************************
scanThumbnail.prototype.makeThumbnailCanvas = function(idAppend){

	elt = __MakeElement__("canvas", this.widget, this.args.id + idAppend, mergeArgs(this._css,{
		top: 0,
		left: 0,
		"border-width": 0
	}));

	elt.width = this._css.width;
	elt.height = this._css.height;

	elt.getContext("2d").drawImage(this.thumbImage, 0, 0, this._css.width, this._css.height);

	return elt;	
}

//*********************************************
// HIGHLIGHT HOVER
//*********************************************
scanThumbnail.prototype.setHoverMethods = function(){
	var that = this;
	applyHoverAnim(this.widget);
}

//*********************************************
// FRAMES
//*********************************************
scanThumbnail.prototype.getFrameList = function(){
	return this.scanData.scanPaths;
}


//*********************************************
// WINDOW RESIZING
//*********************************************
scanThumbnail.prototype.updateCSS = function(){
	$(this.widget).css(this._css);
}






