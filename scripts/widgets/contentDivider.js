



//******************************************************
//  Init
//
//******************************************************
var contentDivider = function(args){

  	this.setArgs(args); 
	var that = this;


	
	//-------------------------------
	// The Widget
	//-------------------------------	 
	var widget = __makeElement__("div", this.currArgs().parent, this.currArgs().id, this.currArgs().widgetCSS);

	 
	 
	//-------------------------------
	// UpdateCSS
	//-------------------------------
	this.updateCSS = function(args){		
		if (args) { this.setArgs(args) };
		__setCSS__(widget, this.currArgs().widgetCSS);
		widget.updateDragBounds(this.currArgs().boundaryCSS);
	}
	


	//-------------------------------
	// Set the widget as draggable
	//-------------------------------	
	__draggable__(widget, this.currArgs().boundaryCSS);
	



	//-------------------------------
	// Callbacks
	//-------------------------------	
	this.clearCallbacks = function(){
		widget.clearDragCallbacks();
	}		
	this.addMoveCallback = function(callback){
		widget.addDragCallback(callback);
	}
}






contentDivider.prototype.defaultArgs = function(){
	return {
		id: "contentDivider",
		parent: document.body,
		orientation: "vertical",
		widgetCSS: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: 200,
			height: 6,
			cursor: "n-resize",
			backgroundColor: "rgba(50,50,50, 1)"
		},
		boundaryCSS: {
			top: 0,
			left: 0,
			width: 650,
			height: 400,
		}
	}
}



//******************************************************
//  
//******************************************************
contentDivider.prototype.setArgs = function(newArgs){

	
	// See if newArgs are valid for entry based on the default keys
	__validateArgs__("contentDivider", this.defaultArgs(), newArgs, function(){});

	
	// Define currArgs either as default or previously entered args;
	var currArgs = (this.currArgs)? this.currArgs() : this.defaultArgs();	

	
	// merge currArgs with newArgs
	var mergedArgs = (newArgs) ? __mergeArgs__(currArgs, newArgs) : currArgs;
	
	// Define the currArgsfunction
	this.currArgs = function(){return mergedArgs};
}

