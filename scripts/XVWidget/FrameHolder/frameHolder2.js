



//******************************************************
//  Init
//
//******************************************************
goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
FrameHolder = function(args) {
	
	XVWidget.call(this, args);
	
	
	
	this.currFrame = this.args.onloadFrame;
	

	//----------------------------------
	//	PROGRESS BAR
	//----------------------------------
	this.progBar = utils.gui.ProgressBar(this.widget);
	this.progBar.hide();
	
	
	
	//----------------------------------
	//	CANVAS AND CONTEXT
	//----------------------------------
	this.canvas = utils.dom.makeElement("canvas", this.widget, GLOBALS.classNames.FrameHolderCanvas, {
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
	this.context.font = utils.convert.px(10) + " " + this.args.CSS["font-family"];
	this.context.fillStyle = "white"

	
	
	//----------------------------------
	// Droppable
	//----------------------------------
	this.frames = [];
	var that = this;
	var loadDropable = function (droppable) {
		if (droppable.frames) {
			that.loadFrames(dropable.frames);
		}
	}
	

	this.updateCSS();
	

}
goog.inherits(FrameHolder, XVWidget);



/**
 * @type {object}
 * @protected
 */
FrameHolder.prototype.defaultArgs = {
	className: GLOBALS.classNames.FrameHolder,
	parent: document.body,
	onloadFrame: 0,
	blankMsg : "drag and drop Thumbnail here",
	contrastThreshold: .01,
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
  	}
}






//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
FrameHolder.prototype.addOnloadCallback = function (callback) {
	this.onloadCallbacks.push(callback)
}






//******************************************************
//  Draws a "frame" (i.e. an Image object) onto the canvas.
//******************************************************
FrameHolder.prototype.drawFrame = function (frameNumber, adjustments) {	

	if (this.frames) {		

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
		if (this.frames.length > 0) {
			
			frameNumber = Math.round(frameNumber)
			this.currFrame = frameNumber;
			this.drawImage_MaintainProportions(this.frames[frameNumber], this.canvas, this.context);
			
		}
		

		//
		//  Apply image adjustments if needed
		//			
		if (adjustments === true) {
			
			this.imageAdjust();
			
		}		
	}	
}





//******************************************************
//  Draws a "frame" (i.e. an Image object) onto the canvas.
//******************************************************
FrameHolder.prototype.drawImage_MaintainProportions = function (img, canvas, context) {

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
//  
//******************************************************
FrameHolder.prototype.applyImageAdjustments = function () {
	
	for (var i in this.adjustMethods) {
		this.imageAdjust(i, this.adjustMethods[i]);	
	}
}


//******************************************************
//  Handles any pixel-related ajustment of the frame.
//  In this case, brightness and contrast.
//******************************************************
FrameHolder.prototype.imageAdjust = function (methodType, value) {


	//
	// Arguments are needed only when initializing the adjustMethods
	//
	if (methodType !== 'undefined' && value  && this.canvas.height > 0 && this.canvas.width > 0) {
		
		
		
		/*
		 * ! This particular variable is to account for image adjustments
		 * where both sliders are applied.
		 * Without it, only one slider's methods get applied as opposed
		 * to all of them.
		 */
		this.adjustMethods[methodType] = value;
		
		
		
		//
		// Draw original frame
		//
		this.drawFrame(this.currFrame); 

	
		//
		// Get canvas's imageData
		//
		var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);	


		//
		// Apply image adjustment methods
		//
		for (var i in this.adjustMethods) {
			switch (i) {
				case "brightness":
					imageData.data = linearBrightness(imageData.data, this.adjustMethods[i]);
					break;
				case "contrast":
					imageData.data = linearContrast(imageData.data, this.adjustMethods[i], this.defaultArgs.contrastThreshold);
					break;
			}
		}
		

		//
		// Put the new image data back into canvas
		//
		this.context.putImageData(imageData, 0, 0);	
	}
}

