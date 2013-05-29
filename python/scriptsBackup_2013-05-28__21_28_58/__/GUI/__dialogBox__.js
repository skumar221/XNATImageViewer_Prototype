//******************************************************
//  
//******************************************************
function __dialogBox__(args) {
	
	this.setArgs = function (newArgs) {
		// Define currArgs either as default or previously entered args;
		var currArgs = (this.currArgs)? this.currArgs() : this.defaultArgs();	
	
		
		// merge currArgs with newArgs
		var mergedArgs = (newArgs) ? __mergeArgs__(currArgs, newArgs) : currArgs;
	
		// Define the currArgsfunction
		this.currArgs = function () {return mergedArgs};		
	}	
	
	this.setArgs(args); 
	var that = this;
	

	//-----------------------
	// WIDGET	
	//-----------------------
	var widget = __makeElement__("div", this.currArgs().parent, this.currArgs().id, this.currArgs().widgetCSS);
	__draggable_jQuery__(widget);
	this.widget = function () {return widget};


	//-----------------------
	// BUTTONS	
	//-----------------------
	var buttonManager = {};
	var buttonList = (this.currArgs().buttons && (this.currArgs().buttons.length > 0)) ? this.currArgs().buttons : this.currArgs().defaultButtons;

	for (var i=buttonList.length-1; i>=0; i--) {
		
		var b = __makeElement__("button", widget, 'button', this.currArgs().buttonCSS);

		b.innerHTML = buttonList[i];
		b.title = buttonList[i].toLowerCase();
		
		
		buttonManager[b.title] = {
			element: b,
			callbacks: [],
		}
		
		
		b.onclick = function () {
			
		}	
	}
	



	//-----------------------
	// MOVE BAR
	//-----------------------
	var moveBar = __makeElement__("div", widget, 'moveBar', this.currArgs().mouseListenerCSS);

	
	
	//-----------------------
	// DISPLAY MESSAGE	
	//-----------------------
	var message = __makeElement__("div", widget, 'message', this.currArgs().messageCSS);
	message.innerHTML = this.currArgs().message;

	
	
	this.addStandardButton = function () {
		
	}
	
	
	this.addStandardButton = function () {
		
	}
	
	
	this.addButton = function () {
		
	}
	

	this.updateCSS = function (args) {
		// If there are inputted args, we need to set + validate them
		if (args) { this.setArgs(args) };
		
		
		__setCSS__(widget, this.currArgs().widgetCSS);
		
		

		var buttonHeight = this.currArgs().buttonCSS.height + this.currArgs().widgetCSS.margin;
		
		
		var startL = this.currArgs().widgetCSS.width;		
		var startT = this.currArgs().widgetCSS.height - buttonHeight;
		var l = startL;
		var t = startT;		

		for (var i in buttonManager) {

			__setCSS__(buttonManager[i].element, this.currArgs().buttonCSS);	

			l -= (70 + this.currArgs().widgetCSS.margin);

			
			if (l < this.currArgs().margin) { 
				console.log("HERE")
				l = startL; 
				t -= buttonHeight;
			}
			
			buttonManager[i].element.style.left = __toPx__(l);
			buttonManager[i].element.style.top = __toPx__(t);

		}
		
		
		//
		//  Message
		//
		__setCSS__(message, __mergeArgs__(this.currArgs().messageCSS, {
			top: __toInt__(moveBar.style.height) + this.currArgs().widgetCSS.margin,
			left: this.currArgs().widgetCSS.margin,
			width: __toInt__(widget.style.width) - this.currArgs().widgetCSS.margin * 2,
		}));	
	}
	
	
	
	//
	//  BUTTON CALLBACKS
	//
	this.setButtonOnclick = function (name, callback) {
		
		for (var i in buttonManager) {
			
			if (name.toLowerCase() == i.toLowerCase()) {
				
				buttonManager[i].element.onclick = callback;
				return;
			}
			
		}			
	}
	
	this.updateCSS();
}


__dialogBox__.prototype.defaultArgs = function () {
	
	return {
		
	  	id: "__dialogBox__",			//def "sliderScroller"
	  	parent: document.body,
		defaultButtons: ["OK", "Cancel"],
		defaultButtonList: ["OK", "Done", "Cancel", "Next", "Yes", "No"],
		buttons: [],
		message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	  	widgetCSS: {
	  		position: "absolute",
	  		top: window.innerHeight/2 - 100,
	  		left: window.innerWidth/2 - 150,
	  		width: 330,
	  		height: 140,
	  		fontFamily: __globals__.fontFamily,
	  		fontSize: __globals__.fontSizeS,
	  		color: "rgba(255,0,0,1)",
	  		border: "solid",
	  		borderWidth: 1,
	  		borderColor: "rgba(0,255,0,1)",
	  		backgroundColor: "rgba(155,155,155,1)",
	  		borderRadius: 0,
	  		zIndex: 10000,
	  		margin: 15,
	  		marginLeft: 10,
	  		marginRight: 10,
	  		marginTop: 10,
	  		marginBottom: 10,
	  	},
	  	messageCSS: {
			position: "absolute",
	  	},	
	  	mouseListenerCSS: {
	  		top: 0,
	  		left: 0,
	  		width: "100%",
	  		height: 15,
	  		backgroundColor: "rgba(55,55,55,1)",
	  	},  	
	  	buttonCSS: {
	  		height: 15,
	  		position: "absolute",
	  		border: "solid",
	  		borderWidth: 1,
	  		borderColor: "rgba(0,0,0,1)",
	  		backgroundColor: "rgba(125,125,125,1)",
	  		borderRadius: 0,
	  		cursor: "pointer"
	  	},
  }
}