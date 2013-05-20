scanViewer.prototype.addLinkMenuPopup = function(){

	var that = this;
	
	this.linkMenu_Popup = __makeElement__("div", this.linkMenu, this.args.id + "_ViewTypeTab_Popup",{
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
	
	

	var popupDesc = __makeElement__("div", this.linkMenu_Popup, this.args.id + "_ViewTypeTab_Popup_Desc",{
		"fontSize": 20,		
		 "font-family": Globals.fontFamily,
		"color": "rgba(255,255,255,1)",
		"vertical-align": "center",
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
	});	
	popupDesc.innerHTML = " Select viewers to link. Click 'Done' when finished. ";
	
	
	
	var doneButton = __makeElement__("div", this.linkMenu_Popup, this.args.id + "_ViewTypeTab_Popup_DoneButton",{
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
		
		//that.widget.selectorBox
		for (var i=0; i<that.args.parent.childNodes.length; i++){			
			that.args.parent.childNodes[i].onclick = undefined
			if (that.args.parent.childNodes[i].selectorBox)
				that.args.parent.childNodes[i].selectorBox.style.cursor = "default"
		}
	}

	

	var clearAllButton = __makeElement__("div", this.linkMenu_Popup, this.args.id + "_ViewTypeTab_Popup_ClearAllButton",{
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
	clearAllButton.onclick = function(){
		Globals.sliderLinker.clearAll();
	}
	
	
		
	var newGroupButton = __makeElement__("div", this.linkMenu_Popup, this.args.id + "_ViewTypeTab_Popup_NewGroupButton",{
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
		Globals.sliderLinker.lastViewerSelected.style.border = Globals.sliderLinker.lastGroup().border;

	}
	
	$(this.linkMenu_Popup).fadeOut(0);
		
}



//******************************************************
//  
//
//******************************************************
scanViewer.prototype.addLinkMenu = function(){

	var that = this;	
	var iconStartLeft = 5;
	var iconStartTop = 25;
	var imgDiv = 7;
	var iconDimSmall = 20;
	var iconDimMed = 35;




	//------------------------------
	// ADD Menu div
	//------------------------------	
	this.linkMenu = __makeElement__("div", this.widget, this.args.id + "_ViewTypeTab_LinkMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,// + spacer*i,
		height: iconDimMed , 
		width: iconDimMed,
		border: "sold 1px rgba(100,100,100,1)"
	});
	this.linkMenu.closed = false;


	
	
	//------------------------------
	// ADD Menu img (child of Menu DIV)
	//------------------------------	
	this.linkMenu_Image = __makeElement__("img", this.linkMenu, this.args.id + "_ViewTypeTab_LinkMenuImage",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
		opacity: .5
	});	
	this.linkMenu_Image.src = "./icons/Chain-Broken.png";
	
	
	

	this.addLinkMenuPopup();
	
	function closePopupDesc(){
		$(that.linkMenu_Popup).fadeOut(Globals.animFast);
	}
	
	this.linkMenu_Popup.onclick = function(){
		closePopupDesc();
	}
	
	
	function setScanViewerClickListen(THAT){
		
		for (var i=0; i<that.args.parent.childNodes.length; i++){
			
			if (that.args.parent.childNodes[i].id.indexOf('xmiv_scanViewer') == 0){
				
				that.args.parent.childNodes[i].onclick = function(){
					
					
					if (typeof this.linked === 'undefined'){
						this.originalBorder = this.style.border;
						this.linked = false;											

						
					}
					
					
					if (typeof this.selectorBox === 'undefined'){
						this.selectorBox =  Globals.sliderLinker.addSelectorBox(this.parentNode, 
																					$(this).position().top, 
																					$(this).position().left,
																					__toInt__(this.style.height),
																					__toInt__(this.style.width));
																					
						var that = this;
						this.selectorBox.onclick = function(){
								that.onclick();						
						}	
					}
					
					this.linked = !this.linked;
					var lImg = $(this).find("img[id*='LinkMenuImage']");
					
					if (this.linked){
						
						lImg.src = "./icons/Chain-Closed.png";
						$(lImg).fadeTo(Globals.animFast, 1);	
						Globals.sliderLinker.lastViewerSelected = this;
						this.selectorBox.style.border = Globals.sliderLinker.lastGroup().border;
						this.selectorBox.groupID = Globals.sliderLinker.lastGroup().groupID;

						Globals.sliderLinker.addToLastGroup(THAT);
						
					}
					else{
						$(this.parentNode).find("div[id*='SelectorBox']").remove();
						this.selectorBox = undefined;
						Globals.sliderLinker.removeFromGroup(THAT);
						lImg.src = "./icons/Chain-Broken.png";
						$(lImg).fadeTo(Globals.animFast, .5);		
					}

									
				}
			
			}
		}
	}
	
	function clearScanViewerClickListen(){
		
	}
	
	this.linkMenu.onclick = function(){
		that.linkMenu.closed = ! that.linkMenu.closed;
		that.linkMenu_Image.src = (that.linkMenu.closed) ? "./icons/Chain-Closed.png" : "./icons/Chain-Broken.png";	
		
		var fadeVal = (that.linkMenu.closed) ? .75 : .5;
		
		//$(linkMenu_Image).fadeTo(400, fadeVal);
		
		if (that.linkMenu.closed){
			
			if ($(that.linkMenu_Popup).css('display') == 'none'){
				
				$(that.linkMenu_Popup).fadeIn(Globals.animFast);	
			
			} 
			
			setScanViewerClickListen(that);
			
		}
		else{
			closePopupDesc();
			clearScanViewerClickListen();
		}
	}


	

}