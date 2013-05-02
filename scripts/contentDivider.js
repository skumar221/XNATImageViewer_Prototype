



//******************************************************
//  Init
//
//******************************************************
var contentDivider = function(args){

  	this.setArgs(args); 
	var that = this;


	
	//-------------------------------
	// THE WIDGET
	//-------------------------------	 
	var mainElement = __makeElement__("div", this.currArgs().parent, this.currArgs().id, this.currArgs().widgetCSS);

	 
	 
	// Defining the update css version
	this.updateCSS = function(args){
		// If there are inputted args, we need to set + validate them
		if (args) { this.setArgs(args) };
		
		__setCSS__(mainElement, this.currArgs().widgetCSS);
		mainElement.updateDragBounds(this.currArgs().boundaryCSS);

	}
	
	
	__draggable__(mainElement, this.currArgs().boundaryCSS, this.currArgs().boundaryCSS);
	
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

