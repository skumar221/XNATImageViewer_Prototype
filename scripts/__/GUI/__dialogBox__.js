//******************************************************
//  
//******************************************************
function __dialogBox__(args){
	
	this.setArgs = function(newArgs){
		// Define currArgs either as default or previously entered args;
		var currArgs = (this.currArgs)? this.currArgs() : this.defaultArgs();	
	
		
		// merge currArgs with newArgs
		var mergedArgs = (newArgs) ? __mergeArgs__(currArgs, newArgs) : currArgs;
	
		// Define the currArgsfunction
		this.currArgs = function(){return mergedArgs};		
	}	
	
	this.setArgs(args); 
	var that = this;
	

	//-----------------------
	// WIDGET	
	//-----------------------
	var widget = __makeElement__("div", this.currArgs().parent, this.currArgs().id, this.currArgs().widgetCSS);
	__draggable_jQuery__(widget);


	//-----------------------
	// BUTTONS	
	//-----------------------
	var buttons = [];
	var buttonList = (this.currArgs().buttons && (this.currArgs().buttons.length > 0)) ? this.currArgs().buttons : this.currArgs().defaultButtons;

	for (var i=0; i<buttonList.length; i++){
		
		var b = __makeElement__("button", widget, 'button', this.currArgs().buttonCSS);

		b.innerHTML = buttonList[i];
		b.title = buttonList[i].toLowerCase();
		buttons.push(b);
		
		b.onclick = function(){
			console.log("click!");
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

	
	
	this.addStandardButton = function(){
		
	}
	
	
	this.addStandardButton = function(){
		
	}
	
	
	this.addButton = function(){
		
	}
	

	this.updateCSS = function(args){
		// If there are inputted args, we need to set + validate them
		if (args) { this.setArgs(args) };
		
		
		__setCSS__(widget, this.currArgs().widgetCSS);
		
		
		var buttonWidth = this.currArgs().buttonCSS.width + this.currArgs().widgetCSS.margin;
		var buttonHeight = this.currArgs().buttonCSS.height + this.currArgs().widgetCSS.margin;
		
		
		var startL = this.currArgs().widgetCSS.width;		
		var startT = this.currArgs().widgetCSS.height - buttonHeight;
		var l = startL;
		var t = startT;		
		for (var i=buttons.length-1; i>-1; i--){
			
			__setCSS__(buttons[i], this.currArgs().buttonCSS);	

			l -= buttonWidth;
			
			if (l < this.currArgs().margin) { 
				l = startL; 
				t -= buttonHeight;
			}
			
			buttons[i].style.left = __toPx__(l);
			buttons[i].style.top = __toPx__(t);

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
	
	
	this.updateCSS();
}


__dialogBox__.prototype.defaultArgs = function() {
	
	return {
		
	  	id: "__dialogBox__",			//def "sliderScroller"
	  	parent: document.body,
		defaultButtons: ["OK", "Cancel"],
		defaultButtonList: ["OK", "Done", "Cancel", "Next"],
		buttons: [],
		message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	  	widgetCSS: {
	  		position: "absolute",
	  		top: window.innerHeight/2 - 100,
	  		left: window.innerWidth/2 - 150,
	  		width: 300,
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
	  		width: 45,
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