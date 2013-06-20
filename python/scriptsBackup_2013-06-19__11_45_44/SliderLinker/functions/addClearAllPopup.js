SliderLinker.prototype.addClearAllPopup = function (currViewer, message) {
	
	var that = this;
	
	this.takeSnapshot();

	var messageVal = (typeof message === 'undefined') ?  "Are you sure you want to clear all links?" : message;
		
	
	var b = new utils.gui.dialogBox({	  	
		buttons: ["Yes", "Cancel"],
		message: messageVal,
	  	widgetCSS: {
	  		fontFamily: utils.globals.fontFamily,
	  		fontSize: utils.globals.fontSizeM,
	  		color: "rgba(255,255,255,1)",
	  		border: "solid",
	  		borderWidth: 1,
	  		borderColor: "rgba(255,255,255,1)",
	  		backgroundColor: "rgba(0,0,0,1)",
	  		borderRadius: 0,
	  		zIndex: 10000
	  	},
	  	
	  	buttonCSS: {
	  		height: utils.globals.fontSizeM * 2,
	  		position: "absolute",
	  		border: "solid",
	  		color: "rgba(255,255,255,1)",	  		
	  		borderWidth: 1,
	  		borderColor: "rgba(255,255,255,1)",
	  		backgroundColor: "rgba(125,125,125,1)",
	  		borderRadius: 0,
	  		cursor: "pointer"
	  	}
  	});
	
	var popup = b.widget();	
	
	b.setButtonOnclick("yes", function (event) {
		utils.dom.stopPropagation(event);

		$(popup).fadeOut(GLOBALS.animFast, function () {
			that.clearAll();
			$(popup).remove();
		});

	});


	b.setButtonOnclick("cancel", function (event) {
		utils.dom.stopPropagation(event);
		
		utils.dom.debug("CANCEL!");
		
		$(popup).fadeOut(GLOBALS.animFast).remove();
		
		that.cancel();

	});

	
	
	$(popup).fadeOut(0).fadeIn(GLOBALS.animFast);
		
}