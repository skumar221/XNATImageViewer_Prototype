sliderLinker.prototype.addLinkMenuPopup = function(){


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
	return;
	
	var that = this;
	
	this.linkMenu_Popup = __makeElement__("div", document.body, "SliderLinker_Popup",{
		position: "fixed",
		left: window.innerWidth/2 - 500/2,
		top: window.innerHeight/2 - 150/2,
		width: 500,
		height: 150,
		zIndex: 50000,
		background: "rgba(100, 100, 100, 1)",
		cursor: "pointer",
		border: "solid 1px rgba(255,255,255,1)",
		borderRadius : "5px",
		"vertical-align": "center",
		marginLeft: 10
	});	
	
	

	var popupDesc = __makeElement__("div", this.linkMenu_Popup, "SliderLinker_Popup_Desc",{
		"fontSize": 20,		
		 "font-family": Globals.fontFamily,
		"color": "rgba(255,255,255,1)",
		"vertical-align": "center",
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
	});	
	popupDesc.innerHTML = " Select viewers to link. Click 'Done' when finished. ";
	
	
	
	var doneButton = __makeElement__("div", this.linkMenu_Popup, "SliderLinker_Popup_DoneButton",{
		position: "absolute",
		top: 110,
		left: 420,
		"fontSize": 20,		
		 "font-family": Globals.fontFamily,
		color: "black",
		backgroundColor: "rgba(200,200,200,1)",
		border: "solid 1px rgba(0,0,0,1)",
		"vertical-align": "bottom",
		borderRadius: "5px"
	});		
	
	
	doneButton.innerHTML = "Done";
	doneButton.onclick = function(event){
		event.stopPropagation();

		$(that.linkMenu_Popup).fadeOut(Globals.animFast);
		
		Globals.sliderLinker.processGroups();

	}

	

	var clearAllButton = __makeElement__("div", this.linkMenu_Popup, "SliderLinker_Popup_ClearAllButton",{
		position: "absolute",
		top: 110,
		left: 180,
		"fontSize": 20,		
		 "font-family": Globals.fontFamily,
		color: "black",
		backgroundColor: "rgba(200,200,200,1)",
		border: "solid 1px rgba(0,0,0,1)",
		"vertical-align": "bottom",
		borderRadius: "5px"
	});		
	clearAllButton.innerHTML = "Clear All";
	clearAllButton.onclick = function(event){
		event.stopPropagation();
		Globals.sliderLinker.clearAll();
	}
	$(clearAllButton).hide();
	
		
	var newGroupButton = __makeElement__("div", this.linkMenu_Popup, "SliderLinker_Popup_NewGroupButton",{
		position: "absolute",
		top: 110,
		marginLeft: 10,
		"fontSize": 20,		
		 "font-family": Globals.fontFamily,
		color: "black",
		backgroundColor: "rgba(200,200,200,1)",
		border: "solid 1px rgba(0,0,0,1)",
		"vertical-align": "bottom",
		borderRadius: "5px"
	});		
	newGroupButton.innerHTML = "New Group"
	newGroupButton.onclick = function(event){
		event.stopPropagation();
		Globals.sliderLinker.addGroup();
		Globals.sliderLinker.lastViewerSelected.selectorBox.onclick();
		Globals.sliderLinker.lastViewerSelected.selectorBox.onclick();
	}
	$(newGroupButton).hide();
	
	$(this.linkMenu_Popup).fadeOut(0);
		
}