var defaultArgs_frameViewer = {
	id: "frameViewer",
	parent: document.body,
	onloadFrame: 0,
	blankMsg : "drag and drop thumbnail here",
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
		  	"border-width" : 0,
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
	//	CANVAS AND CONTEXT
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

	
	
	//----------------------------------
	// Droppable
	//----------------------------------
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
frameViewer.prototype.loadDroppable = function(droppable){}




//******************************************************
//  Draws a "frame" (i.e. an Image object) onto the canvas.
//******************************************************
frameViewer.prototype.drawFrame = function(frameNumber, adjustments){	

	if (this.frames){		
		
		//
		//  Adjust frameNumber to start at 1 instead of 0
		//
		if (frameNumber < 0) {
			
			frameNumber = 0;
		
		}
		else if (frameNumber > this.frames.length) {
			
			frameNumber = this.frames.length -1;
			
		}


		//
		//  Sync currFrame to frameNumber
		//		
		if (this.frames.length > 0){
			
			frameNumber = Math.round(frameNumber)
			this.currFrame = frameNumber;
			this.drawImage_MaintainProportions(this.frames[frameNumber], this.canvas, this.context);
			
		}
		

		//
		//  Apply image adjustments if needed
		//			
		if (adjustments === true){
			
			this.imageAdjust();
			
		}		
	}	
}





//******************************************************
//  Draws a "frame" (i.e. an Image object) onto the canvas.
//******************************************************
frameViewer.prototype.drawImage_MaintainProportions = function(img, canvas, context){

	var startX = 0;
	var startY = 0;
	var width = canvas.width;
	var height = canvas.height;
	
	
	//
	// Clear the canvas
	//	
	context.clearRect(0, 0, canvas.width, canvas.height);


	//
	// When the image is longer in height
	//
	if (img.width < img.height) {
		
		newH = canvas.height;
		newW = Math.round(img.width * canvas.height/img.height);
		startX = Math.round(canvas.width - newW)/2;
		width = newW;
		
	}
	//
	// When the image is longer in width
	//
	else if (img.width > img.height) {
		
		newW = canvas.width;
		newH = Math.round(img.height * canvas.width/img.width);
		startY = Math.round(canvas.height - newH)/2;
		height = newH;
	
	}	
	
	
	//
	// Draw image
	//
	context.drawImage(img, startX, startY, width, height);		
}






//******************************************************
//  Handles any pixel-related ajustment of the frame.
//  In this case, brightness and contrast.
//******************************************************
frameViewer.prototype.imageAdjust = function(methodType, value){


	//
	// Arguments are needed only when initializing the adjustMethods
	//
	if (methodType && value){
		this.adjustMethods[methodType] = value;
	}
	


	//
	// Draw original frame
	//
	this.drawFrame(this.currFrame); 
	

	if (this.canvas.height > 0 && this.canvas.width > 0){

		
		//
		// Get canvas's imageData
		//
		var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);	

	
		//
		// Apply image adjustment methods
		//
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
		
		
		//
		// Put the new image data back into canvas
		//
		this.context.putImageData(imageData, 0, 0);	
	}
}

