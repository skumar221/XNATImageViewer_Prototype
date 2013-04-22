defaultArgs_scanThumbnail = {
	id: "scanThumbnail",
	parent: document.body,
	draggableParent: document.body,
	returnAnimMax: 300,
	activated: false,
	CSS: {
		position: "absolute",
		width: 80,
		height: 80,
		top: 0,
		left: 0,	
		"overflow-y": "hidden",
		"overflow-x": "hidden",
		"font-size": 12,			
	    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	    "border" : "solid",
		"border-color": "rgba(50,50,50,1)",
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
function scanThumbnail(scanData, args){
	var that = this;
	INIT(this, defaultArgs_scanThumbnail, args, function(){});


	this.mouseDown = false;

	
	//--------------------------------
	// THUMBNAIL IMAGE
	//--------------------------------
	// AJAX QUERY WOULD BE HERE
	this.scanData = scanData;	
	
	
	
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



	//--------------------------------
	// INTERACTION METHODS
	//--------------------------------
	
	
	
	//--------------------------------
	// HOVER STUFF
	//--------------------------------
	this.hoverData = __makeElement__("div", this.widget, this.args.id + "_hoverData", {
		position: "absolute",
		height: this.args.CSS.height,
		width: this.args.CSS.width,
		top: 0,
		left: 0,
		color: "rgba(255,255,255,1)",
		backgroundColor: "rgba(80,80,80,.5)",
	});
	$(this.hoverData).fadeTo(0,0)
	this.hoverData.align = "right";
	this.hoverData.text = __makeElement__("div", this.hoverData, this.hoverData.id + "_text",{
		position: "absolute",
		padding: 12,
		fontSize: 10
		//marginRight: 10
	})
	this.hoverData.text.innerHTML += "<div style='margin-right:10px'>";
	this.hoverData.text.innerHTML += this.scanData.sessionInfo["SessionID"].value + "<br>";
	this.hoverData.text.innerHTML += this.scanData.sessionInfo["scannumber"].value + "<br>";
	this.hoverData.text.innerHTML += this.scanData.sessionInfo["type"].value + "<br>";
	this.hoverData.text.innerHTML += this.scanData.sessionInfo["quality"].value + "<br>";
	this.hoverData.text.innerHTML += "</div>";
	this.setHoverMethods();
	__Droppable__(this);
	this.updateCSS();	
	
	
	// Once the image lods, we want to make sure it is also the draggable image
	// and that it's draw on the thumbnail canvas.
	$(this.thumbImage).load(function(){		
		if (that.thumb && that.thumb.nodeName == "CANVAS")
			that.thumb.getContext("2d").drawImage(that.thumbImage, 0, 0, that.CSS.width, that.CSS.height);
		else
			console.log("No thumb canvas")
	});
}




//****************************************
// THUMB CANVASES
//****************************************
scanThumbnail.prototype.makeThumbnailCanvas = function(idAppend){
	
	var that = this;
	
	var elt = __makeElement__("canvas", this.widget, this.args.id + idAppend, __mergeArgs__(this.CSS,{
		top: 0,
		left: 0,
		"border-width": 0,
		"font-size": 12,			
	    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
		color: "rgb(255,255,255)"
	}));

	elt.width = this.CSS.width;
	elt.height = this.CSS.height;
	
	// Might want to put the progress indicator here.
	return elt;
}



//****************************************
// Hover On
//****************************************
scanThumbnail.prototype.hoverOn = function(animtime){
	$(this.hoverData).stop().fadeTo(animtime,1);
}




//****************************************
// Hover Off
//****************************************
scanThumbnail.prototype.hoverOff = function(animtime){ 
	$(this.hoverData).stop().fadeTo(animtime,0);
}



//****************************************
// SET HOVER HIGHLIGHTING
//****************************************
scanThumbnail.prototype.setHoverMethods = function(){
	var that = this;
	that.args.animtime = 100;


	//--------------------------
	// Setup procedure, defines the mouseovers
	//--------------------------		
	//console.log("thumb deactivate");
	this.deactivate();
}




//****************************************
// DEACTIVATE
//****************************************
scanThumbnail.prototype.deactivate = function(){ 
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
	$(this.widget).mouseover(function(){
		that.hoverOn(that.args.animtime);
	}).mouseleave(function(){
		that.hoverOff(that.args.animtime);
	});	
	
	
	this.hoverOff(100);
}




//****************************************
// ACTIVATE
//****************************************
scanThumbnail.prototype.activate = function(activeDropZoneID){ 
	var that = this;
	this.args.activated = true;
	
	// Do the hover On
	this.hoverOn(0);
	
	
	// Unbind all hover existing methods
	$(this.widget).unbind('mouseover').unbind('mouseleave');
	

	// Since we're unbinding everything we have to rebind
	// the generic hover (border highlighting)	
	borderHighlightOnHover(this.widget);
		
	// Callbacks	
	if (this.activatedCallbacks && this.activatedCallbacks.length > 0){
		for (var i=0;i<this.activatedCallbacks.length;i++){
			this.activatedCallbacks[i](that, {
				"activeDropZoneID": activeDropZoneID
			});
		}
	}
}




//****************************************
// FRAMES
//****************************************
scanThumbnail.prototype.getFrameList = function(){
	return this.scanData.scanPaths;
}




//****************************************
// WINDOW RESIZING
//****************************************
scanThumbnail.prototype.updateCSS = function(){
	$(this.widget).css(this.CSS);
}



//****************************************
// activated callaback
//****************************************
scanThumbnail.prototype.addActivatedCallback = function(callback){
	if(!this.activatedCallbacks)
		this.activatedCallbacks = [];
	
	this.activatedCallbacks.push(callback)
}




