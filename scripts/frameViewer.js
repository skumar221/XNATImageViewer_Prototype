var defaultArgs_frameViewer = {
	id: "frameViewer",
	parent: document.body,
	onloadFrame: 0,
	blankMsg : "drop thumbnail here",
	contrastThreshold: .1,
	CSS: {
			position: 'absolute',
			top: 15,
			left: 20,
			height: 300,
			width: 300,	
			"fontSize": 16,		
			"overflow-y": "hidden",
			"overflow-x": "hidden",
		    "font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
		    "border" : "solid",
			"borderColor": "rgba(50,50,50,1)",
			"color": "rgba(255,255,255,1)",
		  	"border-width" : 1,
		  	"border-radius": 0,	 
		  	 overflow: "visible"
  		 },
}



//******************************************************
//  Init
//
//******************************************************
function frameViewer(args){

	INIT(this, defaultArgs_frameViewer, args);
		
	this.currFrame = this.args.onloadFrame;
	


	//----------------------------------
	//	THE GENERAL CANVAS AND CONTEXT
	//----------------------------------
	this.canvas = __makeElement__("canvas", this.widget, this.args.id + "_canvas", {
		top: 0,
		left: 0
	});
	this.canvas.height = this.CSS.height;
	this.canvas.width = this.CSS.width;
	this.context = this.canvas.getContext('2d');
	
	
	
	//----------------------------------
	//	ONLOAD CALLBACKS
	//----------------------------------
	this.onloadCallbacks = [];
	this.adjustMethods = {};
	
	
	
	//----------------------------------
	//	CAVAS STYLING
	//----------------------------------
	this.context.font = __toPx__(10) + " " + this.args.CSS["font-family"];
	this.context.fillStyle = "white"

	
	this.frames = [];
	var that = this;
	var loadDropable = function(droppable){
		if (droppable.frames){
			that.loadFrames(dropable.frames);
		}
	}


	this.updateCSS();
}




//******************************************************
//  updateCSS
//
//******************************************************
frameViewer.prototype.updateCSS = function(){


	//----------------------------------
	//	CAVAS Dims
	//----------------------------------
	this.canvas.height = $(this.widget).height();
	this.canvas.width = $(this.widget).width();
	$(this.canvas).css({
		height: $(this.widget).height(),
		width: $(this.widget).width(),
	})

	
	
	//  Fill the canvas with a default scheme if 
	//	there are no frames.  
	if (this.frames.length == 0){
	    this.context.fillStyle = "black";
	    this.context.fillRect(0,0, this.canvas.height, this.canvas.width);
	    this.context.fillStyle = "white";	    
		this.context.fillText(this.args.blankMsg, this.canvas.width/2 - 52, this.canvas.width/2);	
	}


	this.drawFrame(this.currFrame); 
}




//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
frameViewer.prototype.addOnloadCallback = function(callback){
	this.onloadCallbacks.push(callback)
}




//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the scanThumbnails.
//******************************************************
frameViewer.prototype.loadDroppable = function(droppable){


}




//******************************************************
//  Loads all of the frames as Image objects, and stores
//  them in an array.
//******************************************************
frameViewer.prototype.loadFrames = function(frames){
	
	var framePaths = (this.args.framePaths) ? this.args.framePaths : frames
	// Check if there are frame paths given
	if (!framePaths){
		throw("Load Frames error: invalid method parameter -- you need frame paths!")
	} 
	var that = this;
	
	
	// track frames as image objects.  store them in an array.
	this.frames = [];
	for (var i=0; i < framePaths.length; i++){
		var img = new Image();
		if (i == framePaths.length-1){
			that.endImage = img;
		}
		
		// Once the image is loaded, check to see if it's an "endImage",
		// if so, draw it to the frame.
	    img.onload = function() {
	    	if (this == that.endImage){
	   			//that.context.drawImage(that.frames[that.currFrame], 0, 0, that.canvas.width, that.canvas.height);
	   			that.drawImage_MaintainProportions(that.frames[that.currFrame], that.canvas, that.context);
	   			// Need to get the appropriate contrast 
	   			// threshold for the data set.
	   			var imageData = that.context.getImageData(0, 0, that.canvas.width, that.canvas.height);	
	   			that.args.contrastThreshold = thresholdAutoDetect(imageData.data);
	   			
	   			// Run any callbacks once everything is loaded
	   			for (var k=0; k<that.onloadCallbacks.length; k++){
	   				that.onloadCallbacks[k]();
	   			}		    		
	    	}
	  	};
	  	img.src = framePaths[i];
	  	this.frames.push(img);
	 }
}





//******************************************************
//  Draws a "frame" (i.e. an Image object) onto the canvas.
//******************************************************
frameViewer.prototype.drawFrame = function(frameNumber, adjustments){		
	if (this.frames){
		if (frameNumber < 0) frameNumber = 0;
		else if (frameNumber > this.frames.length) frameNumber = this.frames.length -1;
		
		if (this.frames.length > 0){
			this.currFrame = frameNumber;
			//this.context.drawImage(this.frames[frameNumber], 0, 0, this.canvas.width, this.canvas.height);	
			this.drawImage_MaintainProportions(this.frames[frameNumber], this.canvas, this.context);
		}
		
		
		if (adjustments === true){
			this.imageAdjust();
		}		
	}	
}





//******************************************************
//  Draws a "frame" (i.e. an Image object) onto the canvas.
//******************************************************
frameViewer.prototype.drawImage_MaintainProportions = function(img, canvas, context){

	if (canvas.width == canvas.height){
		if (img.width == img.height) {
			context.drawImage(img, 0, 0, canvas.width, canvas.height)
		}
		else if (img.width < img.height) {
			console.log("HERE")
			startX = canvas.width * (img.width/canvas.width);
			endX = img.width + startX;
			context.drawImage(img, startX, 0, endX, canvas.height);
		}
		else if (img.width > img.height) {
			startY = canvas.height * (img.height/canvas.height);
			endY = img.height + startY;
			context.drawImage(img, 0, startY, canvas.width, endY);
		}	
	}
		
}






//******************************************************
//  Handles any pixel-related ajustment of the frame.
//  In this case, brightness and contrast.
//******************************************************
frameViewer.prototype.imageAdjust = function(methodType, value){


	// Arguments are only needed for initializing the
	// imageAdjust database.  Otherwise, none are 
	// needed.
	if (methodType && value){
		this.adjustMethods[methodType] = value;
	}
	

	//Then we cycle through all known adjust methods
	//using their saved parameters
	
	//Draw original frame

	this.drawFrame(this.currFrame); 
	
	//Get canvas's imageData
	if (this.canvas.height > 0 && this.canvas.width > 0){
		var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);	
	
		//Apply image adjustment methods
		for (var i in this.adjustMethods){
			switch (i){
				case "brightness":
					imageData.data = linearBrightness(imageData.data, this.adjustMethods[i]);
					break;
				case "contrast":
					imageData.data = linearContrast(imageData.data, 
												    this.adjustMethods[i], 
												    this.args.contrastThreshold);
					break;
			}
		}
		//Put data back into canvas
		this.context.putImageData(imageData, 0, 0);	
	}
}

