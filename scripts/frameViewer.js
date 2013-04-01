var defaultArgs_frameViewer = {
	id: "frameViewer",
	parent: document.body,
	onloadFrame: 0,
	blankMsg : "drop thumbnail here",
	contrastThreshold: .1,
	_css: {
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

function frameViewer(args){

	__Init__(this, defaultArgs_frameViewer, args);
		
	this.currFrame = this.args.onloadFrame;
	

	this.canvas = __MakeElement__("canvas", this.widget, this.args.id + "_canvas", {
		top: 0,
		left: 0
	});
	this.canvas.height = this._css.height;
	this.canvas.width = this._css.width;
//	console.log("this._css.height: " + this._css.height)


	this.context = this.canvas.getContext('2d');
	this.onloadCallbacks = [];

	this.adjustMethods = {};
	
	this.context.font = _px(10) + " " + this.args._css["font-family"];
	this.context.fillStyle = "white"

	
	this.frames = [];
	var that = this;
	var loadDropable = function(dropable){
		if (dropable.frames){
			that.loadFrames(dropable.frames);
		}
	}


	this.updateCSS();
}



frameViewer.prototype.updateCSS = function(){
	//$(this.widget).css(this._css);
	//console.log($(this.widget).height())
	this.canvas.height = $(this.widget).height();
	this.canvas.width = $(this.widget).width();
	$(this.canvas).css({
		height: $(this.widget).height(),
		width: $(this.widget).width(),
	})

	
	if (this.frames.length == 0){
	    this.context.fillStyle = "black";
	    this.context.fillRect(0,0, this.canvas.height, this.canvas.width);
	    this.context.fillStyle = "white";	    
		this.context.fillText(this.args.blankMsg, this.canvas.width/2 - 52, this.canvas.width/2);	
	}
}

frameViewer.prototype.addOnloadCallback = function(callback){
	this.onloadCallbacks.push(callback)
}

frameViewer.prototype.loadDroppable = function(droppable){
	if (droppable.frames){
		this.currDroppable = droppable;
		this.loadFrames(droppable.frames);
	}
	else{
		throw "FrameViewer.js: Invalid Droppable for frameViewer."
	}

}

frameViewer.prototype.loadFrames = function(frames){
	
	var framePaths = (this.args.framePaths) ? this.args.framePaths : frames
	if (!framePaths){
		throw("Load Frames error: invalid method parameter -- you need frame paths!")
	} 
	var that = this;
	this.frames = [];
	for (var i=0; i < framePaths.length; i++){
		var img = new Image();
		if (i == framePaths.length-1){
			that.endImage = img;
		}
	    img.onload = function() {
	    	if (this == that.endImage){
	   			that.context.drawImage(that.frames[that.currFrame], 0, 0, that.canvas.width, that.canvas.height);
	   			
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

frameViewer.prototype.drawFrame = function(frameNumber, adjustments){		
	if (this.frames){
		if (frameNumber < 0) frameNumber = 0;
		else if (frameNumber > this.frames.length) frameNumber = this.frames.length -1;
		
		if (this.frames.length > 0){
			this.currFrame = frameNumber;
			this.context.drawImage(this.frames[frameNumber], 0, 0, this.canvas.width, this.canvas.height);	
		}
		
		
		if (adjustments === true){
			this.imageAdjust();
		}		
	}	
}

//
//
//
frameViewer.prototype.imageAdjust = function(methodType, value){

	//***********************************************
	// Arguments are only needed for initializing the
	// imageAdjust database.  Otherwise, none are 
	// needed.
	if (methodType && value){
		this.adjustMethods[methodType] = value;
	}
	
	//***********************************************
	//Then we cycle through all known adjust methods
	//using their saved parameters
	
	//Draw original frame
	this.drawFrame(this.currFrame); 
	
	//Get canvas's imageData
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

