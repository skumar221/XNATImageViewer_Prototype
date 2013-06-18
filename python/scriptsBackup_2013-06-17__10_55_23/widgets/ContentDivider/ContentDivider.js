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

	this.containmentDiv = utils.dom.makeElement("div", this.currArgs().parent, "Containment", {
		position: "absolute",
		//backgroundColor: "rgba(255,0,0,.2)",
		"pointer-events": "none"
	});
	this.widget = utils.dom.makeElement("div", this.currArgs().parent, "ContentDivider", this.currArgs().widgetCSS);	 
	 
	//-------------------------------
	// UpdateCSS
	//-------------------------------
	this.updateCSS = function (args) {		
		if (args) { 
			this.setArgs(args) 
			utils.css.setCSS(that.widget, this.currArgs().widgetCSS);
		};

	}

	
	$(that.widget).draggable({containment: this.containmentDiv});
	this.updateCSS();	
}






ContentDivider.prototype.defaultArgs = function () {
	return {
		id: "ContentDivider",
		parent: document.body,
		orientation: "vertical",
		widgetCSS: {
			position: 'absolute',
			top: "90%",
			left: 0,
			width: "100%",
			height: 6,
			cursor: "n-resize",
			//backgroundColor: "rgba(250,50,50, 1)",
			opacity: 1
		},
		boundaryCSS: {
			top: 0,
			left: 0,
			width: 650,
			height: 400
		}
	}
}



//******************************************************
//  
//******************************************************
ContentDivider.prototype.setArgs = function (newArgs) {

	
	// See if newArgs are valid for entry based on the default keys
	utils.dom.validateArgs("ContentDivider", this.defaultArgs(), newArgs, function () {});

	
	// Define currArgs either as default or previously entered args;
	var currArgs = (this.currArgs)? this.currArgs() : this.defaultArgs();	

	
	// merge currArgs with newArgs
	var mergedArgs = (newArgs) ? utils.dom.mergeArgs(currArgs, newArgs) : currArgs;
	
	// Define the currArgsfunction
	this.currArgs = function () {return mergedArgs};
}

