sliderLinker.prototype.addLinkMenuPopup = function(){

	var that = this;
	
	var b = new __dialogBox__({	  	
		buttons: ["DONE", "Cancel"],
		message: " Select viewers to link. Click 'Done' when finished.",
	  	widgetCSS: {
	  		fontFamily: __globals__.fontFamily,
	  		fontSize: __globals__.fontSizeM,
	  		color: "rgba(255,255,255,1)",
	  		border: "solid",
	  		borderWidth: 1,
	  		borderColor: "rgba(255,255,255,1)",
	  		backgroundColor: "rgba(0,0,0,1)",
	  		borderRadius: 0,
	  		zIndex: 10000,
	  	},
	  	
	  	buttonCSS: {
	  		height: __globals__.fontSizeM * 2,
	  		position: "absolute",
	  		border: "solid",
	  		color: "rgba(255,255,255,1)",	  		
	  		borderWidth: 1,
	  		borderColor: "rgba(255,255,255,1)",
	  		backgroundColor: "rgba(125,125,125,1)",
	  		borderRadius: 0,
	  		cursor: "pointer"
	  	},
  	});
	
	this.linkMenu_Popup = b.widget();	
	$(this.linkMenu_Popup).fadeOut(0);
	
	//b.setButtonCallback = function;
	
	doneButton.onclick = function(event){
		event.stopPropagation();

		$(that.linkMenu_Popup).fadeOut(Globals.animFast);
		
		Globals.sliderLinker.processGroups();

	}


	
	$(this.linkMenu_Popup).fadeOut(0);
		
}