defaultArgs_scanThumbnail = {
	id: "scanThumbnail",
	parent: document.body,
	draggableParent: document.body,
	returnAnimMax: 300,
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
	  	"background-color" : "rgba(120,31,60,1)",
	  	"border-width" : 1,
	  	"border-radius": 0,	 
	  	"cursor": "pointer"
	}	
}


function scanThumbnail(args){
	var that = this;
	__Init__(this, defaultArgs_scanThumbnail, args, function(){});


	this.mouseDown = false;



	
	
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



	//--------------------------------
	// INTERACTION METHODS
	//--------------------------------
	
	//--------------------------------
	// HOVER STUFF
	//--------------------------------
	this.hoverData = __MakeElement__("div", this.widget, this.args.id + "_hoverData", {
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
	this.hoverData.text = __MakeElement__("div", this.hoverData, this.hoverData.id + "_text",{
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
}




//-----------------------------
// THUMB CANVASES
//-----------------------------
scanThumbnail.prototype.makeThumbnailCanvas = function(idAppend){

	elt = __MakeElement__("canvas", this.widget, this.args.id + idAppend, __MergeArgs__(this.CSS,{
		top: 0,
		left: 0,
		"border-width": 0,
		"font-size": 12,			
	    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
		color: "rgb(255,255,255)"
	}));

	elt.width = this.CSS.width;
	elt.height = this.CSS.height;
	elt.getContext("2d").drawImage(this.thumbImage, 0, 0, this.CSS.width, this.CSS.height);

	return elt;	
}




//-----------------------------
// HIGHLIGHT HOVER
//-----------------------------
scanThumbnail.prototype.setHoverMethods = function(){
	var that = this;
	var animtime = 100;
		
	applyHoverAnim(this.widget);
	$(this.widget).mouseover(function(){

	  $(that.hoverData).stop().fadeTo(animtime,1);
		
	}).mouseleave(
		function(){ 
		$(that.hoverData).stop().fadeTo(100,0);
	});
	
}




//-----------------------------
// FRAMES
//-----------------------------
scanThumbnail.prototype.getFrameList = function(){
	return this.scanData.scanPaths;
}




//-----------------------------
// WINDOW RESIZING
//-----------------------------
scanThumbnail.prototype.updateCSS = function(){
	$(this.widget).css(this.CSS);
}






