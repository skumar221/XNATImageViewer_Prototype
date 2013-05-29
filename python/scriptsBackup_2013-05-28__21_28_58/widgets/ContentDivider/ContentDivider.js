



//******************************************************
//  Init
//
//******************************************************
var ContentDivider = function (args) {

  	this.setArgs(args); 
	var that = this;


	
	//-------------------------------
	// The Widget
	//-------------------------------	 
	this.widget = __makeElement__("div", this.currArgs().parent, this.currArgs().id, this.currArgs().widgetCSS);

	this.widget.style.cursor = "n-resize";
	 
	//-------------------------------
	// UpdateCSS
	//-------------------------------
	this.updateCSS = function (args) {		
		if (args) { this.setArgs(args) };
		__setCSS__(that.widget, this.currArgs().widgetCSS);

	}

	
	$(that.widget).draggable({
		containment: "parent"
	});	
	
}






ContentDivider.prototype.defaultArgs = function () {
	return {
		id: "ContentDivider",
		parent: document.body,
		orientation: "vertical",
		widgetCSS: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: 200,
			height: 6,
			cursor: "n-resize",
			backgroundColor: "rgba(250,50,50, 1)",
			//border: "solid 1px rgba(255,0,0,1)"
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
ContentDivider.prototype.setArgs = function (newArgs) {

	
	// See if newArgs are valid for entry based on the default keys
	__validateArgs__("ContentDivider", this.defaultArgs(), newArgs, function () {});

	
	// Define currArgs either as default or previously entered args;
	var currArgs = (this.currArgs)? this.currArgs() : this.defaultArgs();	

	
	// merge currArgs with newArgs
	var mergedArgs = (newArgs) ? __mergeArgs__(currArgs, newArgs) : currArgs;
	
	// Define the currArgsfunction
	this.currArgs = function () {return mergedArgs};
}

