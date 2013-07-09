//******************************************************
//  
//******************************************************

goog.provide('utils.gui.DialogBox');

/**
 * @constructor
 */
utils.gui.DialogBox = function (args) {

	var that = this;
	
	
	/**
	 * @param {Object}
	 * @private
	 */	
	this.setArgs = function (newArgs) {
		// Define currArgs either as default or previously entered args;
		var currArgs = (this.currArgs)? this.currArgs() : this.defaultArgs();	
	
		
		// merge currArgs with newArgs
		var mergedArgs = (newArgs) ? utils.dom.mergeArgs(currArgs, newArgs) : currArgs;
	
		// Define the currArgsfunction
		this.currArgs = function () {return mergedArgs};		
	}	
	
	this.setArgs(args); 

	

	//-----------------------
	// WIDGET	
	//-----------------------
	var widget = utils.dom.makeElement("div", this.currArgs().parent, this.currArgs().className, this.currArgs().widgetCSS);
	/**
	 * @expose
	 * @return {Element}
	 */
	this.widget = function () {return widget};


	//-----------------------
	// BUTTONS	
	//-----------------------
	var buttonManager = {};
	var buttonList = (this.currArgs().buttons && (this.currArgs().buttons.length > 0)) ? this.currArgs().buttons : this.currArgs().defaultButtons;

	for (var i = buttonList.length-1; i >= 0; i--) {
		
		var b = utils.dom.makeElement("button", widget, 'DialogBoxButton', this.currArgs().buttonCSS);

		b.innerHTML = buttonList[i];
		b.title = buttonList[i].toLowerCase();
		
		
		buttonManager[b.title] = {
			element: b,
			callbacks: []
		}
		
		
		b.onclick = function () {
			
		}	
	}
	



	//-----------------------
	// MOVE BAR
	//-----------------------
	var moveBar = utils.dom.makeElement("div", widget, 'moveBar', this.currArgs().mouseListenerCSS);

	
	
	//-----------------------
	// DISPLAY MESSAGE	
	//-----------------------
	var message = utils.dom.makeElement("div", widget, 'message', this.currArgs().messageCSS);
	message.innerHTML = this.currArgs().message;

	
	/**
	 * @expose
	 */	
	this.addStandardButton = function () {
		
	}
	
	/**
	 * @expose
	 */		
	this.addStandardButton = function () {
		
	}
	
	/**
	 * @expose
	 */		
	this.addButton = function () {
		
	}
	

	/**
	 * @expose
	 * @param {Object=}
	 */
	this.updateCSS = function (args) {
		// If there are inputted args, we need to set + validate them
		if (args) { this.setArgs(args) };
		
		
		utils.css.setCSS(widget, this.currArgs().widgetCSS);
		
		var buttonHeight = this.currArgs().buttonCSS.height + this.currArgs().widgetCSS.margin;
		var startL = this.currArgs().widgetCSS.width;		
		var startT = this.currArgs().widgetCSS.height - buttonHeight;
		var l = startL;
		var t = startT;		

		for (var i in buttonManager) {

			utils.css.setCSS(buttonManager[i].element, this.currArgs().buttonCSS);	

			l -= (70 + this.currArgs().widgetCSS.margin);

			
			if (l < this.currArgs().margin) { 
				utils.dom.debug("HERE")
				l = startL; 
				t -= buttonHeight;
			}
			
			buttonManager[i].element.style.left = utils.convert.px(l);
			buttonManager[i].element.style.top = utils.convert.px(t);

		}
		
		
		//
		//  Message
		//
		utils.css.setCSS(message, utils.dom.mergeArgs(this.currArgs().messageCSS, {
			top: utils.convert.toInt(moveBar.style.height) + this.currArgs().widgetCSS.margin,
			left: this.currArgs().widgetCSS.margin,
			width: utils.convert.toInt(widget.style.width) - this.currArgs().widgetCSS.margin * 2
		}));	
	}
	
	
	
	//----------------------------
	//  BUTTON CALLBACKS
	//----------------------------
	/**
	 * @expose
	 * @param {string}
	 * @param {function}
	 */
	this.setButtonOnclick = function (name, callback) {
		
		for (var i in buttonManager) {
			
			if (name.toLowerCase() === i.toLowerCase()) {
				
				buttonManager[i].element.onclick = callback;
				return;
			}
			
		}			
	}
	
	
	
	
	
	//
	//  Set drag options
	//
	goog.events.listen(widget, goog.events.EventType.MOUSEDOWN, function(e) {
	
		var d = new goog.fx.Dragger(widget);
		
		d.addEventListener(goog.fx.Dragger.EventType.DRAG, function(e) {});
		
		d.addEventListener(goog.fx.Dragger.EventType.END, function(e) {
			d.dispose();
		});
		
		d.startDrag(e);
	
	});
	
	
	this.updateCSS();
}
goog.exportSymbol('utils.gui.DialogBox', utils.gui.DialogBox);


/**
 * @type {function}
 * @returns {Object}
 * @private
 */
utils.gui.DialogBox.prototype.defaultArgs = function () {
	
	var args =  { 
		className: "utils.gui.DialogBox",			//def "sliderScroller"
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
	  		fontFamily: utils.globals.fontFamily,
	  		fontSize: utils.globals.fontSizeS,
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
	  		marginBottom: 10
	  	},
	  	messageCSS: {
			position: "absolute"
	  	},	
	  	mouseListenerCSS: {
	  		top: 0,
	  		left: 0,
	  		width: "100%",
	  		height: 15,
	  		backgroundColor: "rgba(55,55,55,1)"
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
	  	}
  }
  
  return args;
}