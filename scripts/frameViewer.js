var defaultArgs_frameViewer = {
	id: "frameViewer",
	parent: document.body,
	framePaths: imageScans,
	onloadFrame: 0,//Math.round(imageScans.length/2),
	_css: {
			"position": 'absolute',
			"top": 15,
			"left": 20,
			"height": 300,
			"width": 300,	
			"fontSize": 12,		
			"overflow-y": "hidden",
			"overflow-x": "hidden",
		    "font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
		    "border" : "solid",
			"border-color": "rgba(220,220,220,1)",
			"color": "rgba(0,0,0,1)",
		  	"background-color" : "rgba(251,251,251,1)",
		  	"border-width" : 1,
		  	"border-radius": 0,	 
  		 },
}

function frameViewer(args){
	this.args = (args) ? mergeArgs(defaultArgs_frameViewer, args) : defaultArgs_frameViewer;
	this._css = this.args._css;
	this.currFrame = this.args.onloadFrame;
	
	this.widget = document.createElement("div");
	this.widget.setAttribute("id", this.args["id"]);
	this.args.parent.appendChild(this.widget);
	
	this.canvas = document.createElement("canvas");
	this.canvas.setAttribute("id", this.args["id"] + "_canvas");
	this.canvas.height = this._css.height;
	this.canvas.width = this._css.width;
	this.widget.appendChild(this.canvas);
	
	this.frames = [this.args.framePaths.length];
	this.context = this.canvas.getContext('2d');
	
	this.onloadCallbacks = [];
	
	this.loadFrames();
	this.restyle();
	
	this.adjustMethods = {};
}

frameViewer.prototype.restyle = function(){
	$(this.widget).css(this._css);
}

frameViewer.prototype.addOnloadCallback = function(callback){
	this.onloadCallbacks.push(callback)
}

frameViewer.prototype.loadFrames = function(){
	var that = this;
	for (var i=0; i < this.args.framePaths.length; i++){
		var k = new Image();
		if (i == that.args.framePaths.length-1){
			that.endImage = k;
		}
	    k.onload = function() {
	    	if (this == that.endImage){
	   			that.context.drawImage(that.frames[that.currFrame], 0, 0, that.canvas.width, that.canvas.height);
	   			for (var k=0; k<that.onloadCallbacks.length; k++){
	   				that.onloadCallbacks[k]();
	   			}		    		
	    	}
	  	};
	  	k.src = this.args.framePaths[i];
	  	this.frames[i] = k;
	 }
}

frameViewer.prototype.drawFrame = function(frameNumber, adjustments){
	
	if (frameNumber < 0) frameNumber = 0;
	else if (frameNumber > this.frames.length) frameNumber = this.frames.length -1;
	
	this.currFrame = frameNumber;
	this.context.drawImage(this.frames[frameNumber], 0, 0, this.canvas.width, this.canvas.height);
	
	if (adjustments === true){
		this.imageAdjust();
	}
}

frameViewer.prototype.imageAdjust = function(_t, value){

	//***********************************************
	//When you pass a parameter through, we need to save 
	//the associated value for refresh
		
	if (_t){
		this.adjustMethods[_t] = value;
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
				imageData.data = linearContrast(imageData.data, this.adjustMethods[i]);		
				break;
		}
	}
	
	//Put data back into canvas
	this.context.putImageData(imageData, 0, 0);
}

